const express = require('express');
const router = express.Router();
const LearningRoadmap = require('../models/LearningRoadmap');
const CareerPath = require('../models/CareerPath');

// Get user's roadmaps
router.get('/user/:userId', async (req, res) => {
  try {
    const roadmaps = await LearningRoadmap.find({ userId: req.params.userId })
      .populate('careerPathId')
      .sort({ createdAt: -1 });
    res.json(roadmaps);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching roadmaps', error: error.message });
  }
});

// Create new roadmap
router.post('/', async (req, res) => {
  try {
    const { userId, careerPathId, title, description } = req.body;
    
    const careerPath = await CareerPath.findById(careerPathId);
    if (!careerPath) {
      return res.status(404).json({ message: 'Career path not found' });
    }

    const roadmap = generateLearningRoadmap(userId, careerPath, title, description);
    const newRoadmap = new LearningRoadmap(roadmap);
    await newRoadmap.save();

    res.status(201).json(newRoadmap);
  } catch (error) {
    res.status(500).json({ message: 'Error creating roadmap', error: error.message });
  }
});

// Update roadmap progress
router.put('/:id/progress', async (req, res) => {
  try {
    const { phaseIndex, milestoneIndex, completed } = req.body;
    const roadmap = await LearningRoadmap.findById(req.params.id);
    
    if (!roadmap) {
      return res.status(404).json({ message: 'Roadmap not found' });
    }

    if (phaseIndex !== undefined && milestoneIndex !== undefined) {
      // Update specific milestone
      roadmap.phases[phaseIndex].milestones[milestoneIndex].completed = completed;
      if (completed) {
        roadmap.phases[phaseIndex].milestones[milestoneIndex].completedAt = new Date();
      }
    } else if (phaseIndex !== undefined) {
      // Update entire phase
      roadmap.phases[phaseIndex].completed = completed;
      if (completed) {
        roadmap.phases[phaseIndex].completedAt = new Date();
      }
    }

    // Recalculate overall progress
    roadmap.progress = calculateProgress(roadmap);
    await roadmap.save();

    res.json(roadmap);
  } catch (error) {
    res.status(500).json({ message: 'Error updating roadmap progress', error: error.message });
  }
});

// Get roadmap details
router.get('/:id', async (req, res) => {
  try {
    const roadmap = await LearningRoadmap.findById(req.params.id)
      .populate('careerPathId');
    
    if (!roadmap) {
      return res.status(404).json({ message: 'Roadmap not found' });
    }
    
    res.json(roadmap);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching roadmap', error: error.message });
  }
});

// Delete roadmap
router.delete('/:id', async (req, res) => {
  try {
    const roadmap = await LearningRoadmap.findByIdAndDelete(req.params.id);
    if (!roadmap) {
      return res.status(404).json({ message: 'Roadmap not found' });
    }
    res.json({ message: 'Roadmap deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting roadmap', error: error.message });
  }
});

function generateLearningRoadmap(userId, careerPath, title, description) {
  const roadmapTemplates = {
    'AI/ML Engineer': {
      phases: [
        {
          name: 'Foundation',
          description: 'Build fundamental programming and math skills',
          duration: '2-3 months',
          order: 1,
          skills: ['Python', 'Mathematics', 'Statistics'],
          resources: [
            {
              title: 'Python for Data Science',
              type: 'course',
              provider: 'Coursera',
              duration: '4 weeks',
              difficulty: 'beginner',
              cost: 'Free',
              description: 'Learn Python fundamentals for data science'
            },
            {
              title: 'Mathematics for Machine Learning',
              type: 'course',
              provider: 'edX',
              duration: '6 weeks',
              difficulty: 'intermediate',
              cost: 'Free',
              description: 'Linear algebra and calculus for ML'
            }
          ],
          milestones: [
            {
              title: 'Complete Python basics',
              description: 'Finish Python programming fundamentals'
            },
            {
              title: 'Complete math course',
              description: 'Finish mathematics for ML course'
            }
          ]
        },
        {
          name: 'Machine Learning Fundamentals',
          description: 'Learn core ML concepts and algorithms',
          duration: '3-4 months',
          order: 2,
          skills: ['Machine Learning', 'Scikit-learn', 'Data Analysis'],
          resources: [
            {
              title: 'Machine Learning Course',
              type: 'course',
              provider: 'Stanford',
              duration: '11 weeks',
              difficulty: 'intermediate',
              cost: 'Free',
              description: 'Andrew Ng\'s famous ML course'
            }
          ],
          milestones: [
            {
              title: 'Complete ML course',
              description: 'Finish Stanford ML course'
            },
            {
              title: 'Build first ML project',
              description: 'Create a complete ML project'
            }
          ]
        },
        {
          name: 'Deep Learning',
          description: 'Advanced neural networks and deep learning',
          duration: '2-3 months',
          order: 3,
          skills: ['Deep Learning', 'TensorFlow', 'PyTorch'],
          resources: [
            {
              title: 'Deep Learning Specialization',
              type: 'course',
              provider: 'Coursera',
              duration: '5 months',
              difficulty: 'advanced',
              cost: '$49/month',
              description: 'Comprehensive deep learning course'
            }
          ],
          milestones: [
            {
              title: 'Complete deep learning course',
              description: 'Finish deep learning specialization'
            },
            {
              title: 'Build deep learning project',
              description: 'Create a deep learning application'
            }
          ]
        }
      ]
    },
    'Cybersecurity Analyst': {
      phases: [
        {
          name: 'Security Fundamentals',
          description: 'Learn basic security concepts and principles',
          duration: '2-3 months',
          order: 1,
          skills: ['Network Security', 'Information Security', 'Risk Assessment'],
          resources: [
            {
              title: 'Introduction to Cybersecurity',
              type: 'course',
              provider: 'Coursera',
              duration: '4 weeks',
              difficulty: 'beginner',
              cost: 'Free',
              description: 'Basic cybersecurity concepts'
            }
          ],
          milestones: [
            {
              title: 'Complete security fundamentals',
              description: 'Finish basic security course'
            }
          ]
        },
        {
          name: 'Ethical Hacking',
          description: 'Learn penetration testing and ethical hacking',
          duration: '3-4 months',
          order: 2,
          skills: ['Ethical Hacking', 'Penetration Testing', 'Vulnerability Assessment'],
          resources: [
            {
              title: 'Certified Ethical Hacker (CEH)',
              type: 'certification',
              provider: 'EC-Council',
              duration: '5 days',
              difficulty: 'intermediate',
              cost: '$1,199',
              description: 'Official CEH certification course'
            }
          ],
          milestones: [
            {
              title: 'Complete CEH course',
              description: 'Finish ethical hacking course'
            },
            {
              title: 'Pass CEH exam',
              description: 'Obtain CEH certification'
            }
          ]
        }
      ]
    }
  };

  const template = roadmapTemplates[careerPath.title] || roadmapTemplates['AI/ML Engineer'];
  
  return {
    userId,
    careerPathId: careerPath._id,
    title: title || `${careerPath.title} Learning Path`,
    description: description || `Comprehensive learning path for ${careerPath.title}`,
    phases: template.phases,
    totalDuration: calculateTotalDuration(template.phases),
    difficulty: careerPath.level || 'beginner',
    progress: 0,
    status: 'not-started'
  };
}

function calculateTotalDuration(phases) {
  const totalMonths = phases.reduce((total, phase) => {
    const duration = phase.duration.match(/(\d+)-(\d+)/);
    if (duration) {
      return total + (parseInt(duration[1]) + parseInt(duration[2])) / 2;
    }
    return total;
  }, 0);
  
  return `${Math.round(totalMonths)} months`;
}

function calculateProgress(roadmap) {
  const totalMilestones = roadmap.phases.reduce((total, phase) => total + phase.milestones.length, 0);
  const completedMilestones = roadmap.phases.reduce((total, phase) => {
    return total + phase.milestones.filter(milestone => milestone.completed).length;
  }, 0);
  
  return totalMilestones > 0 ? Math.round((completedMilestones / totalMilestones) * 100) : 0;
}

module.exports = router;
