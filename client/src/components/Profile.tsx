import React, { useState } from 'react';
import {
  Container,
  Card,
  CardContent,
  Typography,
  Box,
  TextField,
  Button,
  Chip,
  Avatar,
  LinearProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import {
  Edit,
  Save,
  Cancel,
  Add,
  Delete,
  School,
  Work,
  Psychology,
  Schedule,
  TrendingUp,
  CheckCircle,
} from '@mui/icons-material';

interface UserProfile {
  name: string;
  email: string;
  currentField: string;
  experienceLevel: string;
  interests: string[];
  skills: Array<{
    name: string;
    level: string;
    progress: number;
  }>;
  careerGoals: string[];
  learningPreferences: {
    preferredFormat: string[];
    timeCommitment: string;
    learningStyle: string;
  };
}

const Profile: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile>({
    name: 'Student User',
    email: 'student@example.com',
    currentField: 'CSE',
    experienceLevel: 'beginner',
    interests: ['Artificial Intelligence', 'Data Science', 'Web Development'],
    skills: [
      { name: 'Python', level: 'practitioner', progress: 60 },
      { name: 'JavaScript', level: 'practitioner', progress: 40 },
      { name: 'Machine Learning', level: 'practitioner', progress: 20 },
      { name: 'React', level: 'practitioner', progress: 30 },
    ],
    careerGoals: ['Become an AI/ML Engineer', 'Work at a tech company', 'Start my own startup'],
    learningPreferences: {
      preferredFormat: ['video', 'hands-on'],
      timeCommitment: 'medium',
      learningStyle: 'visual',
    },
  });

  const [editing, setEditing] = useState(false);
  const [openSkillDialog, setOpenSkillDialog] = useState(false);
  const [newSkill, setNewSkill] = useState({ name: '', level: 'practitioner', progress: 0 });

  const fields = [
    { value: 'CSE', label: 'Computer Science Engineering' },
    { value: 'ECE', label: 'Electronics & Communication' },
    { value: 'Mechanical', label: 'Mechanical Engineering' },
    { value: 'Civil', label: 'Civil Engineering' },
  ];

  const experienceLevels = [
    { value: 'beginner', label: 'Beginner (0-1 years)' },
    { value: 'intermediate', label: 'Intermediate (1-3 years)' },
    { value: 'advanced', label: 'Advanced (3+ years)' },
  ];

  const learningFormats = [
    { value: 'video', label: 'Video Courses' },
    { value: 'text', label: 'Text/Articles' },
    { value: 'interactive', label: 'Interactive Tutorials' },
    { value: 'hands-on', label: 'Hands-on Projects' },
  ];

  const learningStyles = [
    { value: 'visual', label: 'Visual' },
    { value: 'auditory', label: 'Auditory' },
    { value: 'kinesthetic', label: 'Kinesthetic' },
    { value: 'reading', label: 'Reading/Writing' },
  ];

  const timeCommitments = [
    { value: 'low', label: 'Low (1-2 hours/week)' },
    { value: 'medium', label: 'Medium (3-5 hours/week)' },
    { value: 'high', label: 'High (6+ hours/week)' },
  ];

  const handleSave = () => {
    // In production, this would save to the backend
    console.log('Saving profile:', profile);
    setEditing(false);
  };

  const handleAddSkill = () => {
    if (newSkill.name.trim()) {
      setProfile({
        ...profile,
        skills: [...profile.skills, { ...newSkill }],
      });
      setNewSkill({ name: '', level: 'practitioner', progress: 0 });
      setOpenSkillDialog(false);
    }
  };

  const handleRemoveSkill = (skillName: string) => {
    setProfile({
      ...profile,
      skills: profile.skills.filter(skill => skill.name !== skillName),
    });
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'professional': return 'success';
      case 'intermediate': return 'warning';
      case 'practitioner': return 'primary';
      default: return 'default';
    }
  };

  const getLevelLabel = (level: string) => {
    switch (level) {
      case 'professional': return 'Professional';
      case 'intermediate': return 'Intermediate';
      case 'practitioner': return 'Practitioner';
      default: return level;
    }
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
          Profile Settings ⚙️
        </Typography>
        <Button
          variant={editing ? 'contained' : 'outlined'}
          startIcon={editing ? <Save /> : <Edit />}
          onClick={editing ? handleSave : () => setEditing(true)}
        >
          {editing ? 'Save Changes' : 'Edit Profile'}
        </Button>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        {/* Basic Information */}
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
          <Box sx={{ flex: '1 1 50%' }}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Basic Information
              </Typography>
              <Box display="flex" alignItems="center" mb={3}>
                <Avatar sx={{ width: 64, height: 64, mr: 2, bgcolor: 'primary.main' }}>
                  {profile.name.charAt(0)}
                </Avatar>
                <Box>
                  <Typography variant="h6">{profile.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {profile.email}
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField
                  fullWidth
                  label="Name"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  disabled={!editing}
                />
                <TextField
                  fullWidth
                  label="Email"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  disabled={!editing}
                />
                <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
                  <FormControl fullWidth disabled={!editing}>
                    <InputLabel>Field</InputLabel>
                    <Select
                      value={profile.currentField}
                      onChange={(e) => setProfile({ ...profile, currentField: e.target.value })}
                      label="Field"
                    >
                      {fields.map((field) => (
                        <MenuItem key={field.value} value={field.value}>
                          {field.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl fullWidth disabled={!editing}>
                    <InputLabel>Experience Level</InputLabel>
                    <Select
                      value={profile.experienceLevel}
                      onChange={(e) => setProfile({ ...profile, experienceLevel: e.target.value })}
                      label="Experience Level"
                    >
                      {experienceLevels.map((level) => (
                        <MenuItem key={level.value} value={level.value}>
                          {level.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              </Box>
            </CardContent>
          </Card>
          </Box>

          {/* Skills */}
          <Box sx={{ flex: '1 1 50%' }}>
          <Card>
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h6">Skills</Typography>
                <Button
                  startIcon={<Add />}
                  onClick={() => setOpenSkillDialog(true)}
                  disabled={!editing}
                  size="small"
                >
                  Add Skill
                </Button>
              </Box>
              <List>
                {profile.skills.map((skill, index) => (
                  <ListItem key={index} sx={{ px: 0 }}>
                    <ListItemIcon>
                      <School color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Box display="flex" alignItems="center" gap={1}>
                          <Typography variant="body1">{skill.name}</Typography>
                          <Chip
                            label={getLevelLabel(skill.level)}
                            color={getLevelColor(skill.level) as any}
                            size="small"
                          />
                        </Box>
                      }
                      secondary={
                        <Box>
                          <LinearProgress
                            variant="determinate"
                            value={skill.progress}
                            sx={{ height: 6, borderRadius: 3, mb: 0.5 }}
                          />
                          <Typography variant="caption" color="text.secondary">
                            {skill.progress}% complete
                          </Typography>
                        </Box>
                      }
                    />
                    {editing && (
                      <IconButton
                        onClick={() => handleRemoveSkill(skill.name)}
                        color="error"
                        size="small"
                      >
                        <Delete />
                      </IconButton>
                    )}
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
          </Box>
        </Box>

        {/* Interests */}
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
          <Box sx={{ flex: '1 1 50%' }}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Interests
              </Typography>
              <Box display="flex" flexWrap="wrap" gap={1} mb={2}>
                {profile.interests.map((interest, index) => (
                  <Chip
                    key={index}
                    label={interest}
                    color="primary"
                    variant="outlined"
                    onDelete={editing ? () => {
                      setProfile({
                        ...profile,
                        interests: profile.interests.filter((_, i) => i !== index)
                      });
                    } : undefined}
                  />
                ))}
              </Box>
              {editing && (
                <TextField
                  fullWidth
                  label="Add Interest"
                  placeholder="Type and press Enter to add"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      const input = e.target as HTMLInputElement;
                      if (input.value.trim()) {
                        setProfile({
                          ...profile,
                          interests: [...profile.interests, input.value.trim()]
                        });
                        input.value = '';
                      }
                    }
                  }}
                />
              )}
            </CardContent>
          </Card>
          </Box>

          {/* Career Goals */}
          <Box sx={{ flex: '1 1 50%' }}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Career Goals
              </Typography>
              <List>
                {profile.careerGoals.map((goal, index) => (
                  <ListItem key={index} sx={{ px: 0 }}>
                    <ListItemIcon>
                      <Work color="primary" />
                    </ListItemIcon>
                    <ListItemText primary={goal} />
                    {editing && (
                      <IconButton
                        onClick={() => {
                          setProfile({
                            ...profile,
                            careerGoals: profile.careerGoals.filter((_, i) => i !== index)
                          });
                        }}
                        color="error"
                        size="small"
                      >
                        <Delete />
                      </IconButton>
                    )}
                  </ListItem>
                ))}
              </List>
              {editing && (
                <TextField
                  fullWidth
                  label="Add Career Goal"
                  placeholder="Type and press Enter to add"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      const input = e.target as HTMLInputElement;
                      if (input.value.trim()) {
                        setProfile({
                          ...profile,
                          careerGoals: [...profile.careerGoals, input.value.trim()]
                        });
                        input.value = '';
                      }
                    }
                  }}
                />
              )}
            </CardContent>
          </Card>
          </Box>
        </Box>

        {/* Learning Preferences */}
        <Box>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Learning Preferences
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
                <Box sx={{ flex: '1 1 33%' }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Preferred Learning Format
                  </Typography>
                  {learningFormats.map((format) => (
                    <FormControlLabel
                      key={format.value}
                      control={
                        <Switch
                          checked={profile.learningPreferences.preferredFormat.includes(format.value)}
                          onChange={(e) => {
                            const newFormats = e.target.checked
                              ? [...profile.learningPreferences.preferredFormat, format.value]
                              : profile.learningPreferences.preferredFormat.filter(f => f !== format.value);
                            setProfile({
                              ...profile,
                              learningPreferences: {
                                ...profile.learningPreferences,
                                preferredFormat: newFormats
                              }
                            });
                          }}
                          disabled={!editing}
                        />
                      }
                      label={format.label}
                    />
                  ))}
                </Box>
                <Box sx={{ flex: '1 1 33%' }}>
                  <FormControl fullWidth disabled={!editing}>
                    <InputLabel>Time Commitment</InputLabel>
                    <Select
                      value={profile.learningPreferences.timeCommitment}
                      onChange={(e) => setProfile({
                        ...profile,
                        learningPreferences: {
                          ...profile.learningPreferences,
                          timeCommitment: e.target.value
                        }
                      })}
                      label="Time Commitment"
                    >
                      {timeCommitments.map((commitment) => (
                        <MenuItem key={commitment.value} value={commitment.value}>
                          {commitment.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
                <Box sx={{ flex: '1 1 33%' }}>
                  <FormControl fullWidth disabled={!editing}>
                    <InputLabel>Learning Style</InputLabel>
                    <Select
                      value={profile.learningPreferences.learningStyle}
                      onChange={(e) => setProfile({
                        ...profile,
                        learningPreferences: {
                          ...profile.learningPreferences,
                          learningStyle: e.target.value
                        }
                      })}
                      label="Learning Style"
                    >
                      {learningStyles.map((style) => (
                        <MenuItem key={style.value} value={style.value}>
                          {style.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>

      {/* Add Skill Dialog */}
      <Dialog
        open={openSkillDialog}
        onClose={() => setOpenSkillDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Add New Skill</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Skill Name"
            value={newSkill.name}
            onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
            margin="normal"
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Level</InputLabel>
            <Select
              value={newSkill.level}
              onChange={(e) => setNewSkill({ ...newSkill, level: e.target.value })}
              label="Level"
            >
              <MenuItem value="practitioner">Practitioner</MenuItem>
              <MenuItem value="intermediate">Intermediate</MenuItem>
              <MenuItem value="professional">Professional</MenuItem>
            </Select>
          </FormControl>
          <TextField
            fullWidth
            label="Progress (%)"
            type="number"
            value={newSkill.progress}
            onChange={(e) => setNewSkill({ ...newSkill, progress: parseInt(e.target.value) || 0 })}
            margin="normal"
            inputProps={{ min: 0, max: 100 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenSkillDialog(false)}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleAddSkill}>
            Add Skill
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Profile;
