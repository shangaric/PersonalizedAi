import React, { useState, useEffect } from 'react';
import {
  Container,
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  LinearProgress,
  Button,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
} from '@mui/material';
import {
  TrendingUp,
  School,
  Assessment,
  Schedule,
  CheckCircle,
  PlayArrow,
} from '@mui/icons-material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface UserProfile {
  name: string;
  currentField: string;
  experienceLevel: string;
  skills: Array<{
    name: string;
    level: string;
    progress: number;
  }>;
  interests: string[];
}

interface CareerRecommendation {
  title: string;
  domain: string;
  matchScore: number;
  skills: string[];
  salaryRange: { min: number; max: number };
}

const Dashboard: React.FC = () => {
  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: 'Student User',
    currentField: 'CSE',
    experienceLevel: 'beginner',
    skills: [
      { name: 'Python', level: 'practitioner', progress: 60 },
      { name: 'JavaScript', level: 'practitioner', progress: 40 },
      { name: 'Machine Learning', level: 'practitioner', progress: 20 },
    ],
    interests: ['Artificial Intelligence', 'Data Science', 'Web Development'],
  });

  const [recommendations, setRecommendations] = useState<CareerRecommendation[]>([
    {
      title: 'AI/ML Engineer',
      domain: 'Artificial Intelligence',
      matchScore: 85,
      skills: ['Python', 'Machine Learning', 'Deep Learning'],
      salaryRange: { min: 800000, max: 2500000 },
    },
    {
      title: 'Data Scientist',
      domain: 'Data Science',
      matchScore: 78,
      skills: ['Python', 'Statistics', 'Data Analysis'],
      salaryRange: { min: 900000, max: 2200000 },
    },
    {
      title: 'Full Stack Developer',
      domain: 'Web Development',
      matchScore: 65,
      skills: ['JavaScript', 'React', 'Node.js'],
      salaryRange: { min: 600000, max: 1800000 },
    },
  ]);

  const skillProgressData = userProfile.skills.map(skill => ({
    name: skill.name,
    progress: skill.progress,
    level: skill.level,
  }));

  const careerMatchData = recommendations.map(rec => ({
    name: rec.title,
    match: rec.matchScore,
  }));

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <Container maxWidth="xl" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#1976d2' }}>
        Welcome back, {userProfile.name}! 👋
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 4 }}>
        Here's your personalized career development overview
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        {/* Quick Stats */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
          <Box sx={{ flex: '1 1 300px', minWidth: '300px' }}>
            <Card sx={{ height: '100%', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
              <CardContent sx={{ color: 'white' }}>
                <Box display="flex" alignItems="center" mb={2}>
                  <TrendingUp sx={{ mr: 1 }} />
                  <Typography variant="h6">Career Match</Typography>
                </Box>
                <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
                  {Math.round(recommendations.reduce((acc, rec) => acc + rec.matchScore, 0) / recommendations.length)}%
                </Typography>
                <Typography variant="body2">Average match score</Typography>
              </CardContent>
            </Card>
          </Box>

          <Box sx={{ flex: '1 1 300px', minWidth: '300px' }}>
            <Card sx={{ height: '100%', background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}>
              <CardContent sx={{ color: 'white' }}>
                <Box display="flex" alignItems="center" mb={2}>
                  <School sx={{ mr: 1 }} />
                  <Typography variant="h6">Skills Learning</Typography>
                </Box>
                <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
                  {userProfile.skills.length}
                </Typography>
                <Typography variant="body2">Active skills</Typography>
              </CardContent>
            </Card>
          </Box>

          <Box sx={{ flex: '1 1 300px', minWidth: '300px' }}>
            <Card sx={{ height: '100%', background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' }}>
              <CardContent sx={{ color: 'white' }}>
                <Box display="flex" alignItems="center" mb={2}>
                  <Assessment sx={{ mr: 1 }} />
                  <Typography variant="h6">Progress</Typography>
                </Box>
                <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
                  {Math.round(userProfile.skills.reduce((acc, skill) => acc + skill.progress, 0) / userProfile.skills.length)}%
                </Typography>
                <Typography variant="body2">Overall progress</Typography>
              </CardContent>
            </Card>
          </Box>

          <Box sx={{ flex: '1 1 300px', minWidth: '300px' }}>
            <Card sx={{ height: '100%', background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' }}>
              <CardContent sx={{ color: 'white' }}>
                <Box display="flex" alignItems="center" mb={2}>
                  <Schedule sx={{ mr: 1 }} />
                  <Typography variant="h6">Roadmaps</Typography>
                </Box>
                <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
                  3
                </Typography>
                <Typography variant="body2">Active roadmaps</Typography>
              </CardContent>
            </Card>
          </Box>
        </Box>

        {/* Main Content */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
          {/* Skills Progress */}
          <Box sx={{ flex: '1 1 500px', minWidth: '500px' }}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Your Skills Progress
                </Typography>
                {skillProgressData.map((skill, index) => (
                  <Box key={index} sx={{ mb: 2 }}>
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                      <Typography variant="body1">{skill.name}</Typography>
                      <Chip 
                        label={skill.level} 
                        size="small" 
                        color={skill.level === 'professional' ? 'success' : skill.level === 'intermediate' ? 'warning' : 'default'}
                      />
                    </Box>
                    <LinearProgress 
                      variant="determinate" 
                      value={skill.progress} 
                      sx={{ height: 8, borderRadius: 4 }}
                    />
                    <Typography variant="caption" color="text.secondary">
                      {skill.progress}% complete
                    </Typography>
                  </Box>
                ))}
              </CardContent>
            </Card>
          </Box>

          {/* Career Recommendations */}
          <Box sx={{ flex: '1 1 500px', minWidth: '500px' }}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Top Career Matches
                </Typography>
                <List>
                  {recommendations.map((rec, index) => (
                    <React.Fragment key={index}>
                      <ListItem sx={{ px: 0 }}>
                        <ListItemIcon>
                          <CheckCircle color="primary" />
                        </ListItemIcon>
                        <ListItemText
                          primary={rec.title}
                          secondary={
                            <Box>
                              <Typography variant="body2" color="text.secondary">
                                {rec.domain} • {rec.matchScore}% match
                              </Typography>
                              <Box sx={{ mt: 1 }}>
                                {rec.skills.map((skill, skillIndex) => (
                                  <Chip
                                    key={skillIndex}
                                    label={skill}
                                    size="small"
                                    sx={{ mr: 0.5, mb: 0.5 }}
                                  />
                                ))}
                              </Box>
                              <Typography variant="caption" color="text.secondary">
                                ₹{rec.salaryRange.min.toLocaleString()} - ₹{rec.salaryRange.max.toLocaleString()}
                              </Typography>
                            </Box>
                          }
                        />
                      </ListItem>
                      {index < recommendations.length - 1 && <Divider />}
                    </React.Fragment>
                  ))}
                </List>
                <Button
                  variant="contained"
                  startIcon={<PlayArrow />}
                  sx={{ mt: 2, width: '100%' }}
                >
                  Explore All Careers
                </Button>
              </CardContent>
            </Card>
          </Box>
        </Box>

        {/* Learning Roadmap Preview */}
        <Box>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Your Learning Roadmap
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                <Box sx={{ flex: '1 1 300px', minWidth: '300px' }}>
                  <Paper sx={{ p: 2, textAlign: 'center', bgcolor: '#e3f2fd' }}>
                    <Typography variant="h6" color="primary">
                      Foundation Phase
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Python, Mathematics, Statistics
                    </Typography>
                    <LinearProgress 
                      variant="determinate" 
                      value={75} 
                      sx={{ mt: 1, height: 6, borderRadius: 3 }}
                    />
                    <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                      75% Complete
                    </Typography>
                  </Paper>
                </Box>
                <Box sx={{ flex: '1 1 300px', minWidth: '300px' }}>
                  <Paper sx={{ p: 2, textAlign: 'center', bgcolor: '#f3e5f5' }}>
                    <Typography variant="h6" color="secondary">
                      ML Fundamentals
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Machine Learning, Scikit-learn
                    </Typography>
                    <LinearProgress 
                      variant="determinate" 
                      value={30} 
                      sx={{ mt: 1, height: 6, borderRadius: 3 }}
                    />
                    <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                      30% Complete
                    </Typography>
                  </Paper>
                </Box>
                <Box sx={{ flex: '1 1 300px', minWidth: '300px' }}>
                  <Paper sx={{ p: 2, textAlign: 'center', bgcolor: '#e8f5e8' }}>
                    <Typography variant="h6" color="success.main">
                      Advanced Topics
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Deep Learning, TensorFlow
                    </Typography>
                    <LinearProgress 
                      variant="determinate" 
                      value={0} 
                      sx={{ mt: 1, height: 6, borderRadius: 3 }}
                    />
                    <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                      Not Started
                    </Typography>
                  </Paper>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Container>
  );
};

export default Dashboard;