const mongoose = require('mongoose');

const careerPathSchema = new mongoose.Schema({
  field: {
    type: String,
    required: true,
    enum: ['CSE', 'ECE', 'Mechanical', 'Civil', 'Chemical', 'Aerospace', 'Biotech', 'Other']
  },
  domain: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  level: {
    type: String,
    required: true,
    enum: ['practitioner', 'intermediate', 'professional', 'expert']
  },
  skills: [{
    name: String,
    importance: {
      type: String,
      enum: ['essential', 'important', 'nice-to-have'],
      default: 'important'
    },
    description: String,
    prerequisites: [String]
  }],
  certifications: [{
    name: String,
    provider: String,
    level: String,
    duration: String,
    cost: String,
    validity: String,
    description: String
  }],
  salaryRange: {
    min: Number,
    max: Number,
    currency: {
      type: String,
      default: 'INR'
    }
  },
  jobMarket: {
    demand: {
      type: String,
      enum: ['low', 'medium', 'high', 'very-high'],
      default: 'medium'
    },
    growth: {
      type: String,
      enum: ['declining', 'stable', 'growing', 'explosive'],
      default: 'stable'
    },
    competition: {
      type: String,
      enum: ['low', 'medium', 'high'],
      default: 'medium'
    }
  },
  companies: [String],
  locations: [String],
  lastUpdated: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('CareerPath', careerPathSchema);
