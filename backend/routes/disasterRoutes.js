const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const {
  getCamps,
  createCamp,
  getBarters,
  proposeBarter,
  uploadDroneData,
} = require('../controllers/disasterController');

const router = express.Router();

router.use(authMiddleware);

/**
 * @swagger
 * components:
 *   schemas:
 *     Camp:
 *       type: object
 *       required: [name, location, priorityLevel]
 *       properties:
 *         name:
 *           type: string
 *           example: Riverside Relief Camp
 *         location:
 *           type: object
 *           required: [latitude, longitude]
 *           properties:
 *             latitude:
 *               type: number
 *               example: 27.7172
 *             longitude:
 *               type: number
 *               example: 85.324
 *         layout:
 *           type: object
 *           properties:
 *             medicalRoom:
 *               type: boolean
 *               example: true
 *             storageArea:
 *               type: boolean
 *               example: true
 *         priorityLevel:
 *           type: string
 *           enum: [High, Medium, Low]
 *         neededResources:
 *           type: array
 *           items:
 *             type: string
 *           example: [Clean water, First-aid kits]
 *     BarterItem:
 *       type: object
 *       required: [name, quantity]
 *       properties:
 *         name:
 *           type: string
 *           example: Bottled water
 *         quantity:
 *           type: number
 *           example: 100
 *         unit:
 *           type: string
 *           example: bottles
 *     DroneCoordinate:
 *       type: object
 *       required: [latitude, longitude]
 *       properties:
 *         latitude:
 *           type: number
 *           example: 27.7172
 *         longitude:
 *           type: number
 *           example: 85.324
 *         recordedAt:
 *           type: string
 *           format: date-time
 *     SilentCampLog:
 *       type: object
 *       required: [recordedAt]
 *       properties:
 *         camp:
 *           type: string
 *           description: Camp MongoDB ID, when known.
 *         recordedAt:
 *           type: string
 *           format: date-time
 *         waterLevel:
 *           type: string
 *           example: Water level rose 20 cm
 *         structuralDamage:
 *           type: string
 *           example: New roof damage on the east side
 *         changes:
 *           type: array
 *           items:
 *             type: string
 *     DroneData:
 *       type: object
 *       required: [droneId]
 *       properties:
 *         droneId:
 *           type: string
 *           example: DRONE-07
 *         recordedCoordinates:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/DroneCoordinate'
 *         foodDepletionETA:
 *           type: string
 *           format: date-time
 *           description: Estimated timestamp when food stocks will be depleted.
 *         foodDepletionHoursRemaining:
 *           type: number
 *           minimum: 0
 *           description: Estimated hours until food stocks are depleted.
 *         silentCampLogs:
 *           type: array
 *           description: Camp observations, typically collected every six hours.
 *           items:
 *             $ref: '#/components/schemas/SilentCampLog'
 */

/**
 * @swagger
 * /api/disaster/camps:
 *   get:
 *     summary: List relief camps, layouts, and priority needs
 *     tags: [Disaster Relief]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Camp list
 *       401:
 *         description: Missing or invalid bearer token
 *   post:
 *     summary: Create a relief camp
 *     tags: [Disaster Relief]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Camp'
 *     responses:
 *       201:
 *         description: Camp created
 *       400:
 *         description: Invalid camp data
 *       401:
 *         description: Missing or invalid bearer token
 */
router.route('/camps').get(getCamps).post(createCamp);

/**
 * @swagger
 * /api/disaster/barter:
 *   get:
 *     summary: List resource barter proposals
 *     tags: [Disaster Relief]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: sourceCamp
 *         schema:
 *           type: string
 *         description: Filter by source camp MongoDB ID.
 *       - in: query
 *         name: targetCamp
 *         schema:
 *           type: string
 *         description: Filter by target camp MongoDB ID.
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [Pending, Approved]
 *     responses:
 *       200:
 *         description: Barter proposals
 *       401:
 *         description: Missing or invalid bearer token
 * /api/disaster/barter/propose:
 *   post:
 *     summary: Propose an inventory exchange between two camps
 *     tags: [Disaster Relief]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [sourceCamp, targetCamp, itemsOffered, itemsRequested]
 *             properties:
 *               sourceCamp:
 *                 type: string
 *                 description: Source camp MongoDB ID.
 *               targetCamp:
 *                 type: string
 *                 description: Target camp MongoDB ID.
 *               itemsOffered:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/BarterItem'
 *               itemsRequested:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/BarterItem'
 *     responses:
 *       201:
 *         description: Barter proposal created with Pending status
 *       400:
 *         description: Invalid barter data
 *       401:
 *         description: Missing or invalid bearer token
 *       404:
 *         description: A camp was not found
 */
router.get('/barter', getBarters);
router.post('/barter/propose', proposeBarter);

/**
 * @swagger
 * /api/disaster/drone/upload:
 *   post:
 *     summary: Upload drone location, food depletion estimate, and camp observations
 *     tags: [Disaster Relief]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DroneData'
 *     responses:
 *       201:
 *         description: Drone data recorded
 *       400:
 *         description: Invalid drone data
 *       401:
 *         description: Missing or invalid bearer token
 */
router.post('/drone/upload', uploadDroneData);

module.exports = router;
