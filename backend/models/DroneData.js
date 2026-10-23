const mongoose = require('mongoose');

const coordinateSchema = new mongoose.Schema(
  {
    latitude: {
      type: Number,
      required: true,
      min: -90,
      max: 90,
    },
    longitude: {
      type: Number,
      required: true,
      min: -180,
      max: 180,
    },
    recordedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: false }
);

const silentCampLogSchema = new mongoose.Schema(
  {
    camp: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Camp',
    },
    recordedAt: {
      type: Date,
      required: true,
    },
    waterLevel: {
      type: String,
      trim: true,
    },
    structuralDamage: {
      type: String,
      trim: true,
    },
    changes: {
      type: [String],
      default: [],
    },
  },
  { _id: false }
);

const droneDataSchema = new mongoose.Schema(
  {
    droneId: {
      type: String,
      required: true,
      trim: true,
    },
    recordedCoordinates: {
      type: [coordinateSchema],
      default: [],
    },
    foodDepletionETA: {
      type: Date,
    },
    foodDepletionHoursRemaining: {
      type: Number,
      min: 0,
    },
    silentCampLogs: {
      type: [silentCampLogSchema],
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('DroneData', droneDataSchema);
