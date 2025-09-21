import React, { useState, useEffect } from 'react';
import {
  Container,
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Tabs,
  Tab,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Rating,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import {
  Search,
  FilterList,
  TrendingUp,
  Work,
  School,
  Star,
  LocationOn,
  AttachMoney,
  Schedule,
  CheckCircle,
} from '@mui/icons-material';

interface CareerPath {
  _id: string;
  field: string;
  domain: string;
  title: string;
  description: string;
  level: string;
  skills: Array<{
    name: string;
    importance: string;
    description: string;
  }>;
  certifications: Array<{
    name: string;
    provider: string;
    level: string;
    duration: string;
    cost: string;
  }>;
  salaryRange: {
    min: number;
    max: number;
    currency: string;
  };
  jobMarket: {
    demand: string;
    growth: string;
    competition: string;
  };
  companies: string[];
  locations: string[];
}

const CareerExplorer: React.FC = () => {
  const [careerPaths, setCareerPaths] = useState<CareerPath[]>([]);
  const [filteredPaths, setFilteredPaths] = useState<CareerPath[]>([]);
  const [selectedField, setSelectedField] = useState('CSE');
  const [selectedDomain, setSelectedDomain] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedCareer, setSelectedCareer] = useState<CareerPath | null>(null);
  const [openDialog, setOpenDialog] = useState(false);

  const fields = [
    { value: 'CSE', label: 'Computer Science Engineering' },
    { value: 'ECE', label: 'Electronics & Communication' },
    { value: 'Mechanical', label: 'Mechanical Engineering' },
    { value: 'Civil', label: 'Civil Engineering' },
  ];

  const domains = {
    CSE: [
      'Artificial Intelligence',
      'Machine Learning',
      'Data Science',
      'Cybersecurity',
      'DevOps',
      'Web Development',
      'Mobile Development',
      'Cloud Computing',
      'Blockchain',
      'IoT',
    ],
    ECE: ['VLSI', 'Embedded Systems', 'Telecommunications', 'Signal Processing'],
    Mechanical: ['Automotive', 'Aerospace', 'Manufacturing', 'Robotics'],
    Civil: ['Construction', 'Structural Engineering', 'Environmental', 'Transportation'],
  };

  // Mock data - in production, this would come from API
  const mockCareerPaths: CareerPath[] = [
    {
      _id: '1',
      field: 'CSE',
      domain: 'Artificial Intelligence',
      title: 'AI/ML Engineer',
      description: 'Develop and implement machine learning models and AI solutions',
      level: 'intermediate',
      skills: [
        { name: 'Python', importance: 'essential', description: 'Primary programming language' },
        { name: 'Machine Learning', importance: 'essential', description: 'Core ML algorithms' },
        { name: 'TensorFlow', importance: 'important', description: 'Deep learning framework' },
        { name: 'Statistics', importance: 'important', description: 'Mathematical foundation' },
      ],
      certifications: [
        { name: 'AWS Machine Learning Specialty', provider: 'Amazon', level: 'Professional', duration: '3 months', cost: '$300' },
        { name: 'Google ML Engineer', provider: 'Google', level: 'Professional', duration: '6 months', cost: '$200' },
      ],
      salaryRange: { min: 800000, max: 2500000, currency: 'INR' },
      jobMarket: { demand: 'very-high', growth: 'explosive', competition: 'high' },
      companies: ['Google', 'Microsoft', 'Amazon', 'TCS', 'Infosys'],
      locations: ['Bangalore', 'Hyderabad', 'Pune', 'Mumbai'],
    },
    {
      _id: '2',
      field: 'CSE',
      domain: 'Cybersecurity',
      title: 'Cybersecurity Analyst',
      description: 'Protect systems and networks from cyber threats',
      level: 'intermediate',
      skills: [
        { name: 'Network Security', importance: 'essential', description: 'Network protection' },
        { name: 'Ethical Hacking', importance: 'essential', description: 'Penetration testing' },
        { name: 'SIEM', importance: 'important', description: 'Security monitoring' },
        { name: 'Risk Assessment', importance: 'important', description: 'Threat evaluation' },
      ],
      certifications: [
        { name: 'CEH', provider: 'EC-Council', level: 'Professional', duration: '5 days', cost: '$1,199' },
        { name: 'CISSP', provider: 'ISC2', level: 'Expert', duration: '6 months', cost: '$749' },
      ],
      salaryRange: { min: 600000, max: 1800000, currency: 'INR' },
      jobMarket: { demand: 'high', growth: 'growing', competition: 'medium' },
      companies: ['IBM', 'Accenture', 'Wipro', 'HCL', 'Cognizant'],
      locations: ['Bangalore', 'Delhi', 'Mumbai', 'Chennai'],
    },
    {
      _id: '3',
      field: 'CSE',
      domain: 'DevOps',
      title: 'DevOps Engineer',
      description: 'Bridge development and operations for efficient software delivery',
      level: 'intermediate',
      skills: [
        { name: 'AWS', importance: 'essential', description: 'Cloud platform' },
        { name: 'Docker', importance: 'essential', description: 'Containerization' },
        { name: 'Kubernetes', importance: 'important', description: 'Container orchestration' },
        { name: 'CI/CD', importance: 'important', description: 'Automated deployment' },
      ],
      certifications: [
        { name: 'AWS DevOps Engineer', provider: 'Amazon', level: 'Professional', duration: '4 months', cost: '$300' },
        { name: 'CKA', provider: 'CNCF', level: 'Professional', duration: '2 months', cost: '$300' },
      ],
      salaryRange: { min: 700000, max: 2000000, currency: 'INR' },
      jobMarket: { demand: 'high', growth: 'growing', competition: 'medium' },
      companies: ['Amazon', 'Microsoft', 'Google', 'TCS', 'Infosys'],
      locations: ['Bangalore', 'Hyderabad', 'Pune', 'Mumbai'],
    },
  ];

  useEffect(() => {
    setCareerPaths(mockCareerPaths);
    setFilteredPaths(mockCareerPaths);
  }, []);

  useEffect(() => {
    filterCareerPaths();
  }, [selectedField, selectedDomain, searchQuery, careerPaths]);

  const filterCareerPaths = () => {
    let filtered = careerPaths.filter(path => path.field === selectedField);
    
    if (selectedDomain !== 'all') {
      filtered = filtered.filter(path => path.domain === selectedDomain);
    }
    
    if (searchQuery) {
      filtered = filtered.filter(path =>
        path.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        path.domain.toLowerCase().includes(searchQuery.toLowerCase()) ||
        path.skills.some(skill => skill.name.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    
    setFilteredPaths(filtered);
  };

  const getDemandColor = (demand: string) => {
    switch (demand) {
      case 'very-high': return 'success';
      case 'high': return 'primary';
      case 'medium': return 'warning';
      case 'low': return 'error';
      default: return 'default';
    }
  };

  const getDemandLabel = (demand: string) => {
    switch (demand) {
      case 'very-high': return 'Very High';
      case 'high': return 'High';
      case 'medium': return 'Medium';
      case 'low': return 'Low';
      default: return demand;
    }
  };

  const handleCareerClick = (career: CareerPath) => {
    setSelectedCareer(career);
    setOpenDialog(true);
  };

  const handleCreateRoadmap = (career: CareerPath) => {
    // Navigate to roadmap creation
    console.log('Creating roadmap for:', career.title);
    setOpenDialog(false);
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#1976d2' }}>
        Career Explorer 🚀
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 4 }}>
        Discover career paths that match your interests and skills
      </Typography>

      {/* Filters */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, alignItems: 'center' }}>
          <Box sx={{ flex: '1 1 300px', minWidth: '300px' }}>
            <TextField
              fullWidth
              label="Search careers"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: <Search sx={{ mr: 1, color: 'text.secondary' }} />,
              }}
            />
          </Box>
          <Box sx={{ flex: '1 1 300px', minWidth: '300px' }}>
            <FormControl fullWidth>
              <InputLabel>Field</InputLabel>
              <Select
                value={selectedField}
                onChange={(e) => setSelectedField(e.target.value)}
                label="Field"
              >
                {fields.map((field) => (
                  <MenuItem key={field.value} value={field.value}>
                    {field.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ flex: '1 1 300px', minWidth: '300px' }}>
            <FormControl fullWidth>
              <InputLabel>Domain</InputLabel>
              <Select
                value={selectedDomain}
                onChange={(e) => setSelectedDomain(e.target.value)}
                label="Domain"
              >
                <MenuItem value="all">All Domains</MenuItem>
                {domains[selectedField as keyof typeof domains]?.map((domain) => (
                  <MenuItem key={domain} value={domain}>
                    {domain}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ flex: '1 1 300px', minWidth: '300px' }}>
            <Button
              variant="outlined"
              startIcon={<FilterList />}
              fullWidth
              sx={{ height: '56px' }}
            >
              More Filters
            </Button>
          </Box>
        </Box>
      </Paper>

      {/* Career Cards */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
        {filteredPaths.map((career) => (
          <Box key={career._id} sx={{ flex: '1 1 350px', minWidth: '350px', maxWidth: '500px' }}>
            <Card 
              sx={{ 
                height: '100%', 
                cursor: 'pointer',
                transition: 'transform 0.2s',
                '&:hover': { transform: 'translateY(-4px)' }
              }}
              onClick={() => handleCareerClick(career)}
            >
              <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="start" mb={2}>
                  <Box>
                    <Typography variant="h6" gutterBottom>
                      {career.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {career.domain}
                    </Typography>
                  </Box>
                  <Chip
                    label={career.level}
                    color={career.level === 'professional' ? 'success' : career.level === 'intermediate' ? 'warning' : 'default'}
                    size="small"
                  />
                </Box>

                <Typography variant="body2" sx={{ mb: 2, minHeight: '40px' }}>
                  {career.description}
                </Typography>

                <Box mb={2}>
                  <Typography variant="subtitle2" gutterBottom>
                    Key Skills:
                  </Typography>
                  <Box display="flex" flexWrap="wrap" gap={0.5}>
                    {career.skills.slice(0, 3).map((skill, index) => (
                      <Chip
                        key={index}
                        label={skill.name}
                        size="small"
                        variant="outlined"
                      />
                    ))}
                    {career.skills.length > 3 && (
                      <Chip
                        label={`+${career.skills.length - 3} more`}
                        size="small"
                        variant="outlined"
                      />
                    )}
                  </Box>
                </Box>

                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Salary Range
                    </Typography>
                    <Typography variant="h6" color="primary">
                      ₹{career.salaryRange.min.toLocaleString()} - ₹{career.salaryRange.max.toLocaleString()}
                    </Typography>
                  </Box>
                  <Box textAlign="right">
                    <Typography variant="body2" color="text.secondary">
                      Demand
                    </Typography>
                    <Chip
                      label={getDemandLabel(career.jobMarket.demand)}
                      color={getDemandColor(career.jobMarket.demand) as any}
                      size="small"
                    />
                  </Box>
                </Box>

                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Box display="flex" alignItems="center">
                    <LocationOn sx={{ fontSize: 16, mr: 0.5, color: 'text.secondary' }} />
                    <Typography variant="caption" color="text.secondary">
                      {career.locations.slice(0, 2).join(', ')}
                    </Typography>
                  </Box>
                  <Button
                    variant="contained"
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCareerClick(career);
                    }}
                  >
                    Learn More
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Box>

      {/* Career Detail Dialog */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth="md"
        fullWidth
      >
        {selectedCareer && (
          <>
            <DialogTitle>
              <Typography variant="h5" gutterBottom>
                {selectedCareer.title}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                {selectedCareer.domain} • {selectedCareer.level}
              </Typography>
            </DialogTitle>
            <DialogContent>
              <Typography variant="body1" paragraph>
                {selectedCareer.description}
              </Typography>

              <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
                Required Skills
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
                {selectedCareer.skills.map((skill, index) => (
                  <Box key={index}>
                    <Chip
                      label={skill.name}
                      color={skill.importance === 'essential' ? 'error' : skill.importance === 'important' ? 'warning' : 'default'}
                      variant={skill.importance === 'essential' ? 'filled' : 'outlined'}
                    />
                  </Box>
                ))}
              </Box>

              <Typography variant="h6" gutterBottom>
                Recommended Certifications
              </Typography>
              <List>
                {selectedCareer.certifications.map((cert, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      <School color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary={cert.name}
                      secondary={`${cert.provider} • ${cert.level} • ${cert.duration} • ${cert.cost}`}
                    />
                  </ListItem>
                ))}
              </List>

              <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
                Job Market Info
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                <Box sx={{ flex: '1 1 200px', minWidth: '200px' }}>
                  <Paper sx={{ p: 2, textAlign: 'center' }}>
                    <Typography variant="h6" color="primary">
                      {getDemandLabel(selectedCareer.jobMarket.demand)}
                    </Typography>
                    <Typography variant="body2">Demand</Typography>
                  </Paper>
                </Box>
                <Box sx={{ flex: '1 1 200px', minWidth: '200px' }}>
                  <Paper sx={{ p: 2, textAlign: 'center' }}>
                    <Typography variant="h6" color="secondary">
                      {selectedCareer.jobMarket.growth}
                    </Typography>
                    <Typography variant="body2">Growth</Typography>
                  </Paper>
                </Box>
                <Box sx={{ flex: '1 1 200px', minWidth: '200px' }}>
                  <Paper sx={{ p: 2, textAlign: 'center' }}>
                    <Typography variant="h6" color="warning.main">
                      {selectedCareer.jobMarket.competition}
                    </Typography>
                    <Typography variant="body2">Competition</Typography>
                  </Paper>
                </Box>
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenDialog(false)}>
                Close
              </Button>
              <Button
                variant="contained"
                onClick={() => handleCreateRoadmap(selectedCareer)}
                startIcon={<CheckCircle />}
              >
                Create Learning Roadmap
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Container>
  );
};

export default CareerExplorer;
