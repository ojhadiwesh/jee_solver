import mongoose from 'mongoose';

const testProgressSchema = new mongoose.Schema({
  userEmail: {
    type: String,
    required: true,
  },
  testId: {
    type: String,
    required: true,
  },
  answers: {
    type: Map,
    of: mongoose.Schema.Types.Mixed,
    default: {},
  },
  timeRemaining: {
    type: Number,
    required: true,
  },
  selectedTopic: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
  config: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
  lastUpdated: {
    type: Date,
    default: Date.now,
  },
});

// Index for faster queries by userEmail
testProgressSchema.index({ userEmail: 1 });

// Compound unique index
testProgressSchema.index({ userEmail: 1, testId: 1 }, { unique: true });

const TestProgress = mongoose.models.TestProgress || mongoose.model('TestProgress', testProgressSchema);

export default TestProgress; 