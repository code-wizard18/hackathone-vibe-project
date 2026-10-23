const mongoose = require('mongoose');

const campSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
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
    },
    layout: {
      medicalRoom: {
        type: Boolean,
        default: false,
      },
      storageArea: {
        type: Boolean,
        default: false,
      },
    },
    priorityLevel: {
      type: String,
      enum: ['High', 'Medium', 'Low'],
      default: 'Medium',
      required: true,
    },
    neededResources: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Camp', campSchema);
