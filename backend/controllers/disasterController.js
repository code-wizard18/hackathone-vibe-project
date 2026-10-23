const Camp = require('../models/Camp');
const ResourceBarter = require('../models/ResourceBarter');
const DroneData = require('../models/DroneData');

const getCamps = async (req, res) => {
  try {
    const camps = await Camp.find().sort({ name: 1 });
    return res.status(200).json({ camps });
  } catch (error) {
    console.error('Failed to fetch camps:', error.message);
    return res.status(500).json({ message: 'Failed to fetch camps.' });
  }
};

const createCamp = async (req, res) => {
  try {
    if (!req.body || typeof req.body !== 'object' || Array.isArray(req.body)) {
      return res.status(400).json({ message: 'A camp object is required.' });
    }

    const camp = await Camp.create(req.body);
    return res.status(201).json({ camp });
  } catch (error) {
    if (error.name === 'ValidationError' || error.name === 'CastError') {
      return res.status(400).json({ message: error.message });
    }

    console.error('Failed to create camp:', error.message);
    return res.status(500).json({ message: 'Failed to create camp.' });
  }
};

const getBarters = async (req, res) => {
  try {
    const filter = {};
    if (req.query.sourceCamp) filter.sourceCamp = req.query.sourceCamp;
    if (req.query.targetCamp) filter.targetCamp = req.query.targetCamp;
    if (req.query.status) filter.status = req.query.status;

    const barters = await ResourceBarter.find(filter)
      .populate('sourceCamp', 'name location')
      .populate('targetCamp', 'name location')
      .sort({ createdAt: -1 });

    return res.status(200).json({ barters });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid barter filter.' });
    }

    console.error('Failed to fetch barters:', error.message);
    return res.status(500).json({ message: 'Failed to fetch barters.' });
  }
};

const proposeBarter = async (req, res) => {
  try {
    if (!req.body || typeof req.body !== 'object' || Array.isArray(req.body)) {
      return res.status(400).json({ message: 'A barter proposal object is required.' });
    }

    const { sourceCamp, targetCamp, itemsOffered, itemsRequested } = req.body;

    if (sourceCamp === targetCamp) {
      return res.status(400).json({ message: 'Source and target camps must be different.' });
    }

    const camps = await Camp.find({ _id: { $in: [sourceCamp, targetCamp] } }).select('_id');
    if (camps.length !== 2) {
      return res.status(404).json({ message: 'Source camp or target camp was not found.' });
    }

    const barter = await ResourceBarter.create({
      sourceCamp,
      targetCamp,
      itemsOffered,
      itemsRequested,
      status: 'Pending',
    });

    await barter.populate([
      { path: 'sourceCamp', select: 'name location' },
      { path: 'targetCamp', select: 'name location' },
    ]);

    return res.status(201).json({ barter });
  } catch (error) {
    if (error.name === 'ValidationError' || error.name === 'CastError') {
      return res.status(400).json({ message: error.message });
    }

    console.error('Failed to propose barter:', error.message);
    return res.status(500).json({ message: 'Failed to propose barter.' });
  }
};

const uploadDroneData = async (req, res) => {
  try {
    if (!req.body || typeof req.body !== 'object' || Array.isArray(req.body)) {
      return res.status(400).json({ message: 'A drone data object is required.' });
    }

    const droneData = await DroneData.create(req.body);
    return res.status(201).json({ droneData });
  } catch (error) {
    if (error.name === 'ValidationError' || error.name === 'CastError') {
      return res.status(400).json({ message: error.message });
    }

    console.error('Failed to upload drone data:', error.message);
    return res.status(500).json({ message: 'Failed to upload drone data.' });
  }
};

module.exports = {
  getCamps,
  createCamp,
  getBarters,
  proposeBarter,
  uploadDroneData,
};
