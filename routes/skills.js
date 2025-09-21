const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Get user's skills
router.get('/user/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user.profile.skills);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user skills', error: error.message });
  }
});

// Add or update skill
router.post('/user/:userId', async (req, res) => {
  try {
    const { name, level, progress } = req.body;
    const user = await User.findById(req.params.userId);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const existingSkillIndex = user.profile.skills.findIndex(skill => skill.name === name);
    
    if (existingSkillIndex >= 0) {
      // Update existing skill
      user.profile.skills[existingSkillIndex] = { name, level, progress };
    } else {
      // Add new skill
      user.profile.skills.push({ name, level, progress });
    }

    await user.save();
    res.json({ message: 'Skill updated successfully', skills: user.profile.skills });
  } catch (error) {
    res.status(500).json({ message: 'Error updating skill', error: error.message });
  }
});

// Remove skill
router.delete('/user/:userId/:skillName', async (req, res) => {
  try {
    const { skillName } = req.params;
    const user = await User.findById(req.params.userId);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.profile.skills = user.profile.skills.filter(skill => skill.name !== skillName);
    await user.save();
    
    res.json({ message: 'Skill removed successfully', skills: user.profile.skills });
  } catch (error) {
    res.status(500).json({ message: 'Error removing skill', error: error.message });
  }
});

// Get skill recommendations based on career path
router.post('/recommendations', async (req, res) => {
  try {
    const { careerPath, currentSkills, experienceLevel } = req.body;
    
    // This would typically use AI to generate recommendations
    const recommendations = generateSkillRecommendations(careerPath, currentSkills, experienceLevel);
    
    res.json({ recommendations });
  } catch (error) {
    res.status(500).json({ message: 'Error generating skill recommendations', error: error.message });
  }
});

// Get skill gap analysis
router.post('/gap-analysis', async (req, res) => {
  try {
    const { userId, targetCareerPath } = req.body;
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const gapAnalysis = analyzeSkillGaps(user.profile.skills, targetCareerPath);
    res.json({ gapAnalysis });
  } catch (error) {
    res.status(500).json({ message: 'Error analyzing skill gaps', error: error.message });
  }
});

function generateSkillRecommendations(careerPath, currentSkills, experienceLevel) {
  // This is a simplified version - in production, this would use AI
  const skillRecommendations = {
    'AI/ML Engineer': {
      essential: ['Python', 'Machine Learning', 'Deep Learning', 'Statistics'],
      important: ['TensorFlow', 'PyTorch', 'Data Analysis', 'SQL'],
      niceToHave: ['Docker', 'AWS', 'Git', 'Jupyter']
    },
    'Cybersecurity Analyst': {
      essential: ['Network Security', 'Ethical Hacking', 'Risk Assessment'],
      important: ['SIEM', 'Compliance', 'Incident Response', 'Linux'],
      niceToHave: ['Cloud Security', 'Python', 'Forensics', 'CISSP']
    },
    'DevOps Engineer': {
      essential: ['AWS', 'Docker', 'Kubernetes', 'CI/CD'],
      important: ['Linux', 'Git', 'Infrastructure as Code', 'Monitoring'],
      niceToHave: ['Python', 'Terraform', 'Jenkins', 'Prometheus']
    },
    'Data Scientist': {
      essential: ['Python', 'Statistics', 'Machine Learning', 'Data Analysis'],
      important: ['SQL', 'R', 'Data Visualization', 'Pandas'],
      niceToHave: ['Deep Learning', 'Big Data', 'Cloud Platforms', 'Git']
    }
  };

  const recommendations = skillRecommendations[careerPath] || {};
  const currentSkillNames = currentSkills.map(skill => skill.name);
  
  // Filter out skills user already has
  const missingSkills = {
    essential: recommendations.essential?.filter(skill => !currentSkillNames.includes(skill)) || [],
    important: recommendations.important?.filter(skill => !currentSkillNames.includes(skill)) || [],
    niceToHave: recommendations.niceToHave?.filter(skill => !currentSkillNames.includes(skill)) || []
  };

  return missingSkills;
}

function analyzeSkillGaps(currentSkills, targetCareerPath) {
  // Simplified skill gap analysis
  const currentSkillNames = currentSkills.map(skill => skill.name);
  const skillLevels = currentSkills.reduce((acc, skill) => {
    acc[skill.name] = skill.level;
    return acc;
  }, {});

  return {
    currentSkills: currentSkillNames,
    missingSkills: [], // Would be populated based on target career
    skillLevels,
    recommendations: []
  };
}

module.exports = router;
