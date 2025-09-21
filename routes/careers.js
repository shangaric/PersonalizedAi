const express = require('express');
const router = express.Router();
const CareerPath = require('../models/CareerPath');
const ragService = require('../services/ragService');

// Get all career paths for a specific field
router.get('/field/:field', async (req, res) => {
  try {
    const { field } = req.params;
    const careerPaths = await CareerPath.find({ field: field.toUpperCase() });
    res.json(careerPaths);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching career paths', error: error.message });
  }
});

// Get career paths by domain
router.get('/domain/:domain', async (req, res) => {
  try {
    const { domain } = req.params;
    const careerPaths = await CareerPath.find({ 
      domain: { $regex: domain, $options: 'i' } 
    });
    res.json(careerPaths);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching career paths by domain', error: error.message });
  }
});

// Get career recommendations based on user profile
router.post('/recommendations', async (req, res) => {
  try {
    const userProfile = req.body;
    const recommendations = await ragService.getCareerRecommendations(userProfile);
    res.json({ recommendations });
  } catch (error) {
    res.status(500).json({ message: 'Error generating recommendations', error: error.message });
  }
});

// Get specific career path details
router.get('/:id', async (req, res) => {
  try {
    const careerPath = await CareerPath.findById(req.params.id);
    if (!careerPath) {
      return res.status(404).json({ message: 'Career path not found' });
    }
    res.json(careerPath);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching career path', error: error.message });
  }
});

// Search career paths
router.get('/search/:query', async (req, res) => {
  try {
    const { query } = req.params;
    const careerPaths = await CareerPath.find({
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { domain: { $regex: query, $options: 'i' } },
        { 'skills.name': { $regex: query, $options: 'i' } }
      ]
    });
    res.json(careerPaths);
  } catch (error) {
    res.status(500).json({ message: 'Error searching career paths', error: error.message });
  }
});

// Get trending skills
router.get('/trending/skills', async (req, res) => {
  try {
    const trendingSkills = await CareerPath.aggregate([
      { $unwind: '$skills' },
      { $group: { 
        _id: '$skills.name', 
        count: { $sum: 1 },
        avgSalary: { $avg: '$salaryRange.max' },
        domains: { $addToSet: '$domain' }
      }},
      { $sort: { count: -1 } },
      { $limit: 20 }
    ]);
    res.json(trendingSkills);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching trending skills', error: error.message });
  }
});

// Update career data from RAG service
router.post('/update-data', async (req, res) => {
  try {
    await ragService.updateCareerData();
    res.json({ message: 'Career data updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating career data', error: error.message });
  }
});

module.exports = router;
