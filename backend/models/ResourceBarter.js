const mongoose = require('mongoose');

const barterItemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 0.01,
    },
    unit: {
      type: String,
      trim: true,
    },
  },
  { _id: false }
);

const resourceBarterSchema = new mongoose.Schema(
  {
    sourceCamp: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Camp',
      required: true,
    },
    targetCamp: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Camp',
      required: true,
      validate: {
        validator(value) {
          return !value || !this.sourceCamp || value.toString() !== this.sourceCamp.toString();
        },
        message: 'Source and target camps must be different.',
      },
    },
    itemsOffered: {
      type: [barterItemSchema],
      required: true,
      validate: {
        validator(items) {
          return items.length > 0;
        },
        message: 'At least one offered item is required.',
      },
    },
    itemsRequested: {
      type: [barterItemSchema],
      required: true,
      validate: {
        validator(items) {
          return items.length > 0;
        },
        message: 'At least one requested item is required.',
      },
    },
    status: {
      type: String,
      enum: ['Pending', 'Approved'],
      default: 'Pending',
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('ResourceBarter', resourceBarterSchema);
