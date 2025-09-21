const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  profile: {
    interests: [String],
    currentField: String,
    experienceLevel: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      default: 'beginner'
    },
    skills: [{
      name: String,
      level: {
        type: String,
        enum: ['practitioner', 'intermediate', 'professional'],
        default: 'practitioner'
      },
      progress: {
        type: Number,
        default: 0,
        min: 0,
        max: 100
      }
    }],
    careerGoals: [String],
    learningPreferences: {
      preferredFormat: [String], // ['video', 'text', 'interactive', 'hands-on']
      timeCommitment: String, // 'low', 'medium', 'high'
      learningStyle: String // 'visual', 'auditory', 'kinesthetic', 'reading'
    }
  },
  googleCalendar: {
    calendarId: String,
    accessToken: String,
    refreshToken: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  lastLogin: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('User', userSchema);
