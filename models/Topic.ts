import mongoose from 'mongoose';

const topicSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
  subject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subject',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Compound index to ensure unique topic names within a subject
topicSchema.index({ name: 1, subject: 1 }, { unique: true });

const Topic = mongoose.models.Topic || mongoose.model('Topic', topicSchema);

export default Topic; 