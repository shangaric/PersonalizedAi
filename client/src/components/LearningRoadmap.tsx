import React, { useState, useEffect } from 'react';
import {
  Container,
  Card,
  CardContent,
  Typography,
  Box,
  LinearProgress,
  Button,
  Chip,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Checkbox,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import {
  PlayArrow,
  Pause,
  CheckCircle,
  School,
  Schedule,
  TrendingUp,
  Add,
  Edit,
  Delete,
} from '@mui/icons-material';

interface Roadmap {
  _id: string;
  title: string;
  description: string;
  careerPath: string;
  phases: Phase[];
  progress: number;
  status: string;
  totalDuration: string;
  difficulty: string;
}

interface Phase {
  name: string;
  description: string;
  duration: string;
  order: number;
  skills: string[];
  resources: Resource[];
  milestones: Milestone[];
  completed: boolean;
  completedAt?: Date;
}

interface Resource {
  title: string;
  type: string;
  provider: string;
  duration: string;
  difficulty: string;
  cost: string;
  description: string;
  url?: string;
}

interface Milestone {
  title: string;
  description: string;
  completed: boolean;
  completedAt?: Date;
}

const LearningRoadmap: React.FC = () => {
  const [roadmaps, setRoadmaps] = useState<Roadmap[]>([]);
  const [selectedRoadmap, setSelectedRoadmap] = useState<Roadmap | null>(null);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  // Mock data - in production, this would come from API
  const mockRoadmaps: Roadmap[] = [
    {
      _id: '1',
      title: 'AI/ML Engineer Learning Path',
      description: 'Complete learning path to become an AI/ML Engineer',
      careerPath: 'AI/ML Engineer',
      progress: 45,
      status: 'in-progress',
      totalDuration: '8 months',
      difficulty: 'intermediate',
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
              description: 'Learn Python fundamentals for data science',
              url: 'https://coursera.org/learn/python-data-science'
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
              description: 'Finish Python programming fundamentals',
              completed: true,
              completedAt: new Date('2024-01-15')
            },
            {
              title: 'Complete math course',
              description: 'Finish mathematics for ML course',
              completed: false
            }
          ],
          completed: false
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
              description: 'Finish Stanford ML course',
              completed: false
            },
            {
              title: 'Build first ML project',
              description: 'Create a complete ML project',
              completed: false
            }
          ],
          completed: false
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
              description: 'Finish deep learning specialization',
              completed: false
            },
            {
              title: 'Build deep learning project',
              description: 'Create a deep learning application',
              completed: false
            }
          ],
          completed: false
        }
      ]
    }
  ];

  useEffect(() => {
    setRoadmaps(mockRoadmaps);
    if (mockRoadmaps.length > 0) {
      setSelectedRoadmap(mockRoadmaps[0]);
    }
  }, []);

  const handlePhaseToggle = (phaseIndex: number) => {
    if (!selectedRoadmap) return;

    const updatedRoadmap = { ...selectedRoadmap };
    updatedRoadmap.phases[phaseIndex].completed = !updatedRoadmap.phases[phaseIndex].completed;
    
    if (updatedRoadmap.phases[phaseIndex].completed) {
      updatedRoadmap.phases[phaseIndex].completedAt = new Date();
    }

    // Recalculate progress
    const completedPhases = updatedRoadmap.phases.filter(phase => phase.completed).length;
    updatedRoadmap.progress = Math.round((completedPhases / updatedRoadmap.phases.length) * 100);

    setSelectedRoadmap(updatedRoadmap);
    setRoadmaps(roadmaps.map(rm => rm._id === updatedRoadmap._id ? updatedRoadmap : rm));
  };

  const handleMilestoneToggle = (phaseIndex: number, milestoneIndex: number) => {
    if (!selectedRoadmap) return;

    const updatedRoadmap = { ...selectedRoadmap };
    const milestone = updatedRoadmap.phases[phaseIndex].milestones[milestoneIndex];
    milestone.completed = !milestone.completed;
    
    if (milestone.completed) {
      milestone.completedAt = new Date();
    }

    setSelectedRoadmap(updatedRoadmap);
    setRoadmaps(roadmaps.map(rm => rm._id === updatedRoadmap._id ? updatedRoadmap : rm));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'success';
      case 'in-progress': return 'primary';
      case 'paused': return 'warning';
      case 'not-started': return 'default';
      default: return 'default';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'success';
      case 'intermediate': return 'warning';
      case 'advanced': return 'error';
      default: return 'default';
    }
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Box>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#1976d2' }}>
            Learning Roadmaps 📚
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Track your learning progress and achieve your career goals
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => setOpenCreateDialog(true)}
        >
          Create New Roadmap
        </Button>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
        {/* Roadmap List */}
        <Box sx={{ flex: { xs: '1', md: '0 0 33%' } }}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Your Roadmaps
              </Typography>
              <List>
                {roadmaps.map((roadmap) => (
                  <ListItem
                    key={roadmap._id}
                    onClick={() => setSelectedRoadmap(roadmap)}
                    sx={{ 
                      mb: 1, 
                      borderRadius: 1,
                      cursor: 'pointer',
                      backgroundColor: selectedRoadmap?._id === roadmap._id ? 'action.selected' : 'transparent',
                      '&:hover': { backgroundColor: 'action.hover' }
                    }}
                  >
                    <ListItemIcon>
                      <School color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary={roadmap.title}
                      secondary={
                        <Box>
                          <Typography variant="caption" display="block">
                            {roadmap.careerPath} • {roadmap.totalDuration}
                          </Typography>
                          <Box display="flex" alignItems="center" mt={0.5}>
                            <LinearProgress
                              variant="determinate"
                              value={roadmap.progress}
                              sx={{ width: '100%', mr: 1, height: 4, borderRadius: 2 }}
                            />
                            <Typography variant="caption">
                              {roadmap.progress}%
                            </Typography>
                          </Box>
                        </Box>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Box>

        {/* Roadmap Details */}
        <Box sx={{ flex: { xs: '1', md: '0 0 67%' } }}>
          {selectedRoadmap ? (
            <Card>
              <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="start" mb={3}>
                  <Box>
                    <Typography variant="h5" gutterBottom>
                      {selectedRoadmap.title}
                    </Typography>
                    <Typography variant="body1" color="text.secondary" paragraph>
                      {selectedRoadmap.description}
                    </Typography>
                    <Box display="flex" gap={1} mb={2}>
                      <Chip
                        label={selectedRoadmap.status}
                        color={getStatusColor(selectedRoadmap.status) as any}
                        size="small"
                      />
                      <Chip
                        label={selectedRoadmap.difficulty}
                        color={getDifficultyColor(selectedRoadmap.difficulty) as any}
                        size="small"
                      />
                      <Chip
                        label={selectedRoadmap.totalDuration}
                        icon={<Schedule />}
                        size="small"
                      />
                    </Box>
                  </Box>
                  <Box textAlign="right">
                    <Typography variant="h4" color="primary">
                      {selectedRoadmap.progress}%
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Complete
                    </Typography>
                  </Box>
                </Box>

                <LinearProgress
                  variant="determinate"
                  value={selectedRoadmap.progress}
                  sx={{ height: 8, borderRadius: 4, mb: 4 }}
                />

                <Stepper activeStep={activeStep} orientation="vertical">
                  {selectedRoadmap.phases.map((phase, phaseIndex) => (
                    <Step key={phaseIndex} completed={phase.completed}>
                      <StepLabel>
                        <Box display="flex" alignItems="center" gap={1}>
                          <Typography variant="h6">{phase.name}</Typography>
                          <Chip
                            label={phase.duration}
                            size="small"
                            variant="outlined"
                          />
                          {phase.completed && <CheckCircle color="success" />}
                        </Box>
                      </StepLabel>
                      <StepContent>
                        <Typography variant="body2" color="text.secondary" paragraph>
                          {phase.description}
                        </Typography>

                        <Box mb={2}>
                          <Typography variant="subtitle2" gutterBottom>
                            Skills to Learn:
                          </Typography>
                          <Box display="flex" flexWrap="wrap" gap={0.5}>
                            {phase.skills.map((skill, skillIndex) => (
                              <Chip
                                key={skillIndex}
                                label={skill}
                                size="small"
                                variant="outlined"
                              />
                            ))}
                          </Box>
                        </Box>

                        <Box mb={2}>
                          <Typography variant="subtitle2" gutterBottom>
                            Resources:
                          </Typography>
                          <List dense>
                            {phase.resources.map((resource, resourceIndex) => (
                              <ListItem key={resourceIndex} sx={{ py: 0.5 }}>
                                <ListItemIcon>
                                  <School fontSize="small" />
                                </ListItemIcon>
                                <ListItemText
                                  primary={resource.title}
                                  secondary={`${resource.provider} • ${resource.duration} • ${resource.cost}`}
                                />
                              </ListItem>
                            ))}
                          </List>
                        </Box>

                        <Box mb={2}>
                          <Typography variant="subtitle2" gutterBottom>
                            Milestones:
                          </Typography>
                          {phase.milestones.map((milestone, milestoneIndex) => (
                            <Box key={milestoneIndex} display="flex" alignItems="center" mb={1}>
                              <Checkbox
                                checked={milestone.completed}
                                onChange={() => handleMilestoneToggle(phaseIndex, milestoneIndex)}
                                size="small"
                              />
                              <Box flexGrow={1}>
                                <Typography variant="body2">
                                  {milestone.title}
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                  {milestone.description}
                                </Typography>
                              </Box>
                            </Box>
                          ))}
                        </Box>

                        <Box display="flex" gap={1} mt={2}>
                          <Button
                            variant="contained"
                            startIcon={phase.completed ? <CheckCircle /> : <PlayArrow />}
                            onClick={() => handlePhaseToggle(phaseIndex)}
                            size="small"
                          >
                            {phase.completed ? 'Completed' : 'Mark Complete'}
                          </Button>
                          <Button
                            variant="outlined"
                            startIcon={<Edit />}
                            size="small"
                          >
                            Edit
                          </Button>
                        </Box>
                      </StepContent>
                    </Step>
                  ))}
                </Stepper>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent sx={{ textAlign: 'center', py: 8 }}>
                <School sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
                <Typography variant="h6" gutterBottom>
                  No Roadmap Selected
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Select a roadmap from the list to view details and track progress
                </Typography>
              </CardContent>
            </Card>
          )}
        </Box>
      </Box>

      {/* Create Roadmap Dialog */}
      <Dialog
        open={openCreateDialog}
        onClose={() => setOpenCreateDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Create New Learning Roadmap</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Roadmap Title"
            margin="normal"
            placeholder="e.g., AI/ML Engineer Learning Path"
          />
          <TextField
            fullWidth
            label="Description"
            margin="normal"
            multiline
            rows={3}
            placeholder="Describe what this roadmap will help you achieve"
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Career Path</InputLabel>
            <Select label="Career Path">
              <MenuItem value="ai-ml">AI/ML Engineer</MenuItem>
              <MenuItem value="data-scientist">Data Scientist</MenuItem>
              <MenuItem value="cybersecurity">Cybersecurity Analyst</MenuItem>
              <MenuItem value="devops">DevOps Engineer</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel>Difficulty Level</InputLabel>
            <Select label="Difficulty Level">
              <MenuItem value="beginner">Beginner</MenuItem>
              <MenuItem value="intermediate">Intermediate</MenuItem>
              <MenuItem value="advanced">Advanced</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenCreateDialog(false)}>
            Cancel
          </Button>
          <Button variant="contained">
            Create Roadmap
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default LearningRoadmap;
