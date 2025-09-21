const mongoose = require('mongoose');

const roadmapSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  careerPathId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CareerPath',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: String,
  phases: [{
    name: String,
    description: String,
    duration: String, // e.g., "2-3 months"
    order: Number,
    skills: [String],
    resources: [{
      title: String,
      type: String, // 'course', 'book', 'video', 'project', 'certification'
      url: String,
      provider: String,
      duration: String,
      difficulty: String,
      cost: String,
      description: String
    }],
    milestones: [{
      title: String,
      description: String,
      completed: {
        type: Boolean,
        default: false
      },
      completedAt: Date
    }],
    completed: {
      type: Boolean,
      default: false
    },
    completedAt: Date
  }],
  totalDuration: String,
  difficulty: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    default: 'beginner'
  },
  progress: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },
  status: {
    type: String,
    enum: ['not-started', 'in-progress', 'paused', 'completed'],
    default: 'not-started'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

roadmapSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

module.exports = mongoose.model('LearningRoadmap', roadmapSchema);
