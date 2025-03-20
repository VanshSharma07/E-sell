import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  TextField,
  MenuItem,
  Button,
  Card,
  CardContent,
  CardMedia,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Chip,
  Divider,
  alpha,
  Slider,
  FormControl,
  FormControlLabel,
  FormLabel,
  RadioGroup,
  Radio,
  InputAdornment,
} from '@mui/material';
import { motion } from 'framer-motion';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DevicesIcon from '@mui/icons-material/Devices';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import RecyclingIcon from '@mui/icons-material/Recycling';
import useTheme from '../hooks/useTheme';
import { fadeIn } from '../animations/fadeVariants';

// Available device categories
const deviceCategories = [
  { value: 'smartphone', label: 'Smartphone' },
  { value: 'laptop', label: 'Laptop' },
  { value: 'tablet', label: 'Tablet' },
  { value: 'smartwatch', label: 'Smartwatch' },
  { value: 'camera', label: 'Camera' },
  { value: 'other', label: 'Other' },
];

// Device brands by category
const deviceBrands: Record<string, { value: string; label: string }[]> = {
  smartphone: [
    { value: 'apple', label: 'Apple' },
    { value: 'samsung', label: 'Samsung' },
    { value: 'google', label: 'Google' },
    { value: 'xiaomi', label: 'Xiaomi' },
    { value: 'oneplus', label: 'OnePlus' },
    { value: 'other', label: 'Other' },
  ],
  laptop: [
    { value: 'apple', label: 'Apple' },
    { value: 'dell', label: 'Dell' },
    { value: 'hp', label: 'HP' },
    { value: 'lenovo', label: 'Lenovo' },
    { value: 'asus', label: 'ASUS' },
    { value: 'other', label: 'Other' },
  ],
  tablet: [
    { value: 'apple', label: 'Apple' },
    { value: 'samsung', label: 'Samsung' },
    { value: 'microsoft', label: 'Microsoft' },
    { value: 'amazon', label: 'Amazon' },
    { value: 'other', label: 'Other' },
  ],
  smartwatch: [
    { value: 'apple', label: 'Apple' },
    { value: 'samsung', label: 'Samsung' },
    { value: 'garmin', label: 'Garmin' },
    { value: 'fitbit', label: 'Fitbit' },
    { value: 'other', label: 'Other' },
  ],
  camera: [
    { value: 'canon', label: 'Canon' },
    { value: 'nikon', label: 'Nikon' },
    { value: 'sony', label: 'Sony' },
    { value: 'fujifilm', label: 'Fujifilm' },
    { value: 'other', label: 'Other' },
  ],
  other: [
    { value: 'other', label: 'Other' },
  ],
};

// Base values for device types (in USD)
const baseValues: Record<string, number> = {
  smartphone: 200,
  laptop: 300,
  tablet: 150,
  smartwatch: 100,
  camera: 180,
  other: 80,
};

// Condition options
const deviceConditions = [
  { value: 'excellent', label: 'Like New', multiplier: 1.0 },
  { value: 'good', label: 'Good', multiplier: 0.8 },
  { value: 'fair', label: 'Fair', multiplier: 0.6 },
  { value: 'poor', label: 'Poor', multiplier: 0.4 },
];

// Form initial values
interface FormValues {
  category: string;
  brand: string;
  model: string;
  condition: string;
  age: number;
  description: string;
  photos: string[];
  expectedPrice: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  zip: string;
}

const initialFormValues: FormValues = {
  category: '',
  brand: '',
  model: '',
  condition: '',
  age: 1,
  description: '',
  photos: [],
  expectedPrice: 0,
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  address1: '',
  address2: '',
  city: '',
  state: '',
  zip: '',
};

const SellItemPage: React.FC = () => {
  const { theme, isDark } = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const [formValues, setFormValues] = useState<FormValues>(initialFormValues);
  const [estimatedValue, setEstimatedValue] = useState<number | null>(null);
  
  const handleNext = () => {
    setActiveStep((prev) => prev + 1);
  };
  
  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
    
    // Recalculate value estimate when device details change
    if (['category', 'condition', 'age'].includes(name)) {
      calculateEstimatedValue();
    }
  };
  
  const handleSliderChange = (name: string) => (event: Event, value: number | number[]) => {
    setFormValues((prev) => ({
      ...prev,
      [name]: value as number,
    }));
    
    if (name === 'age') {
      calculateEstimatedValue();
    }
  };
  
  const handleSelectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // If changing category, reset brand
    if (name === 'category') {
      setFormValues((prev) => ({
        ...prev,
        [name]: value,
        brand: '',
      }));
    } else {
      setFormValues((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
    
    // Recalculate value estimate when device details change
    if (['category', 'condition'].includes(name)) {
      calculateEstimatedValue();
    }
  };
  
  const calculateEstimatedValue = () => {
    if (formValues.category && formValues.condition) {
      const baseValue = baseValues[formValues.category] || 100;
      const conditionOption = deviceConditions.find(c => c.value === formValues.condition);
      const conditionMultiplier = conditionOption ? conditionOption.multiplier : 0.7;
      const ageMultiplier = Math.max(0.4, 1 - ((formValues.age - 1) * 0.15));
      
      const estimatedPrice = baseValue * conditionMultiplier * ageMultiplier;
      setEstimatedValue(Math.round(estimatedPrice));
      setFormValues((prev) => ({ ...prev, expectedPrice: Math.round(estimatedPrice) }));
    }
  };
  
  // Handle form submission
  const handleSubmit = () => {
    // In a real app, would send formValues to server
    console.log(formValues);
    handleNext();
  };
  
  // File input handler (mock)
  const handleFileChange = () => {
    // In a real app, would handle file uploads
    const mockPhotoPaths = ['https://cdn-icons-png.flaticon.com/512/3474/3474360.png'];
    setFormValues(prev => ({ ...prev, photos: mockPhotoPaths }));
  };
  
  // Content for each step
  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <TextField
                  select
                  name="category"
                  label="Device Category"
                  value={formValues.category}
                  onChange={handleSelectChange}
                  fullWidth
                  required
                >
                  {deviceCategories.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </FormControl>
            </Grid>
            
            {formValues.category && (
              <>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <TextField
                      select
                      name="brand"
                      label="Brand"
                      value={formValues.brand}
                      onChange={handleSelectChange}
                      fullWidth
                      required
                    >
                      {deviceBrands[formValues.category]?.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </FormControl>
                </Grid>
                
                <Grid item xs={12}>
                  <TextField
                    name="model"
                    label="Model"
                    value={formValues.model}
                    onChange={handleInputChange}
                    fullWidth
                    required
                    placeholder="e.g. iPhone 12 Pro, ThinkPad X1, etc."
                  />
                </Grid>
                
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <TextField
                      select
                      name="condition"
                      label="Device Condition"
                      value={formValues.condition}
                      onChange={handleSelectChange}
                      fullWidth
                      required
                    >
                      {deviceConditions.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </FormControl>
                </Grid>
                
                <Grid item xs={12}>
                  <Typography gutterBottom>
                    Age (in years)
                  </Typography>
                  <Slider
                    value={formValues.age}
                    onChange={handleSliderChange('age')}
                    valueLabelDisplay="auto"
                    step={1}
                    marks
                    min={1}
                    max={10}
                  />
                </Grid>
                
                <Grid item xs={12}>
                  <TextField
                    name="description"
                    label="Additional Details"
                    value={formValues.description}
                    onChange={handleInputChange}
                    fullWidth
                    multiline
                    rows={4}
                    placeholder="Please provide any additional details about your device..."
                  />
                </Grid>
              </>
            )}
          </Grid>
        );
      case 1:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Card sx={{ mb: 3, borderRadius: '12px', bgcolor: alpha(theme.palette.primary.main, 0.05) }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Upload Photos (Optional)
                  </Typography>
                  <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                    Clear photos help us provide a more accurate estimate
                  </Typography>
                  <Button
                    variant="outlined"
                    component="label"
                    startIcon={<CloudUploadIcon />}
                    sx={{ mb: 2 }}
                  >
                    Upload Photos
                    <input
                      type="file"
                      hidden
                      accept="image/*"
                      multiple
                      onChange={handleFileChange}
                    />
                  </Button>
                  {formValues.photos.length > 0 && (
                    <Box sx={{ mt: 2 }}>
                      <Typography variant="body2" sx={{ mb: 1 }}>
                        {formValues.photos.length} photo(s) added
                      </Typography>
                    </Box>
                  )}
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12}>
              <Card sx={{ borderRadius: '12px', bgcolor: alpha(theme.palette.background.paper, 0.6) }}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h6">
                      Estimated Value
                    </Typography>
                    <Chip
                      label={formValues.condition ? deviceConditions.find(c => c.value === formValues.condition)?.label : 'N/A'}
                      color="primary"
                      size="small"
                    />
                  </Box>
                  
                  <Typography variant="h3" color="primary" sx={{ fontWeight: 700 }}>
                    ${estimatedValue || '0'}
                  </Typography>
                  
                  <Typography variant="body2" color="textSecondary" sx={{ mt: 1, mb: 2 }}>
                    This is an estimated value based on the information provided
                  </Typography>
                  
                  <Divider sx={{ my: 2 }} />
                  
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="body2" gutterBottom>
                      <strong>Device:</strong> {formValues.brand && formValues.model ? `${deviceBrands[formValues.category]?.find(b => b.value === formValues.brand)?.label} ${formValues.model}` : 'Not specified'}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      <strong>Age:</strong> {formValues.age} {formValues.age === 1 ? 'year' : 'years'}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        );
      case 2:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                name="firstName"
                label="First Name"
                value={formValues.firstName}
                onChange={handleInputChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="lastName"
                label="Last Name"
                value={formValues.lastName}
                onChange={handleInputChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="email"
                label="Email"
                value={formValues.email}
                onChange={handleInputChange}
                fullWidth
                required
                type="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="phone"
                label="Phone Number"
                value={formValues.phone}
                onChange={handleInputChange}
                fullWidth
                required
              />
            </Grid>
            
            <Grid item xs={12}>
              <Typography variant="subtitle1" sx={{ mt: 2, mb: 1 }}>
                Shipping Address
              </Typography>
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                name="address1"
                label="Address Line 1"
                value={formValues.address1}
                onChange={handleInputChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="address2"
                label="Address Line 2"
                value={formValues.address2}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="city"
                label="City"
                value={formValues.city}
                onChange={handleInputChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                name="state"
                label="State"
                value={formValues.state}
                onChange={handleInputChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                name="zip"
                label="ZIP Code"
                value={formValues.zip}
                onChange={handleInputChange}
                fullWidth
                required
              />
            </Grid>
          </Grid>
        );
      case 3:
        return (
          <Box sx={{ textAlign: 'center', py: 2 }}>
            <CheckCircleIcon color="success" sx={{ fontSize: 60, mb: 2 }} />
            <Typography variant="h5" gutterBottom>
              Thank you for your submission!
            </Typography>
            <Typography variant="body1" color="textSecondary" paragraph>
              We've received your information and we'll review your device details. You should receive an email confirmation shortly.
            </Typography>
            <Typography variant="body1" paragraph>
              Estimated value: <strong>${formValues.expectedPrice}</strong>
            </Typography>
            <Box sx={{ mt: 3 }}>
              <Button
                variant="contained"
                color="primary"
                component={Button}
                onClick={() => window.location.href = '/'}
              >
                Return to Homepage
              </Button>
            </Box>
          </Box>
        );
      default:
        return 'Unknown step';
    }
  };

  const steps = [
    {
      label: 'Device Details',
      description: 'Tell us about your device',
      icon: <DevicesIcon />
    },
    {
      label: 'Photos & Value',
      description: 'Upload photos and see your device\'s estimated value',
      icon: <AttachMoneyIcon />
    },
    {
      label: 'Contact Details',
      description: 'Provide your contact and shipping information',
      icon: <VerifiedUserIcon />
    },
  ];

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box
        component={motion.div}
        variants={fadeIn}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <Box sx={{ mb: 6, textAlign: 'center' }}>
          <Typography
            variant="h2"
            component="h1"
            sx={{ 
              fontWeight: 700,
              mb: 2,
              background: isDark
                ? 'linear-gradient(90deg, #4d8df7, #1de9b6)'
                : 'linear-gradient(90deg, #0062e6, #00b248)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Sell Your Device
          </Typography>
          
          <Typography variant="h5" color="textSecondary" sx={{ mb: 3 }}>
            Get cash for your used electronics in just a few simple steps
          </Typography>
          
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center',
            alignItems: 'center',
            mb: 2,
            flexWrap: 'wrap',
            gap: 2
          }}>
            <Chip 
              icon={<RecyclingIcon />} 
              label="Eco-Friendly" 
              color="primary" 
              variant="outlined" 
            />
            <Chip 
              icon={<AttachMoneyIcon />} 
              label="Competitive Prices" 
              color="primary" 
              variant="outlined" 
            />
            <Chip 
              icon={<VerifiedUserIcon />} 
              label="Secure Process" 
              color="primary" 
              variant="outlined" 
            />
          </Box>
        </Box>
        
        {/* Content area */}
        <Card
          sx={{
            borderRadius: '16px',
            boxShadow: theme.shadows[isDark ? 8 : 1],
            backgroundColor: alpha(theme.palette.background.paper, 0.6),
            backdropFilter: 'blur(10px)',
            border: `1px solid ${theme.palette.divider}`,
            overflow: 'hidden',
          }}
        >
          <CardContent sx={{ p: 0 }}>
            <Stepper activeStep={activeStep} orientation="vertical" sx={{ p: 3 }}>
              {steps.map((step, index) => (
                <Step key={step.label}>
                  <StepLabel
                    StepIconProps={{
                      sx: { color: activeStep >= index ? 'primary.main' : 'text.disabled' }
                    }}
                  >
                    <Typography variant="subtitle1" fontWeight="medium">
                      {step.label}
                    </Typography>
                  </StepLabel>
                  <StepContent>
                    <Typography variant="body2" color="textSecondary" paragraph>
                      {step.description}
                    </Typography>
                    
                    {getStepContent(index)}
                    
                    <Box sx={{ display: 'flex', gap: 1, pt: 2 }}>
                      <Button
                        variant="contained"
                        onClick={index === steps.length - 1 ? handleSubmit : handleNext}
                        sx={{ mr: 1 }}
                      >
                        {index === steps.length - 1 ? 'Submit' : 'Continue'}
                      </Button>
                      <Button
                        disabled={index === 0}
                        onClick={handleBack}
                        variant="outlined"
                      >
                        Back
                      </Button>
                    </Box>
                  </StepContent>
                </Step>
              ))}
              {/* Completion Step */}
              {activeStep === 3 && (
                <Step>
                  <StepLabel>
                    <Typography variant="subtitle1" fontWeight="medium">
                      Submission Complete
                    </Typography>
                  </StepLabel>
                  <StepContent>
                    {getStepContent(3)}
                  </StepContent>
                </Step>
              )}
            </Stepper>
          </CardContent>
        </Card>

        {/* Additional Info */}
        <Grid container spacing={4} sx={{ mt: 4 }}>
          <Grid item xs={12} md={8}>
            <Card
              sx={{
                height: '100%',
                borderRadius: '16px',
                backgroundColor: alpha(theme.palette.background.paper, 0.4),
                backdropFilter: 'blur(8px)',
                border: `1px solid ${theme.palette.divider}`,
                p: 2,
              }}
            >
              <Box sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom fontWeight="bold">
                  Frequently Asked Questions
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  How long does the process take?
                </Typography>
                <Typography variant="body2" paragraph>
                  Once we receive your device, we'll evaluate it within 1-2 business days and send payment within 24 hours after approval.
                </Typography>
                
                <Typography variant="subtitle1" gutterBottom>
                  What payment methods do you offer?
                </Typography>
                <Typography variant="body2" paragraph>
                  We offer payment via PayPal, direct deposit, or store credit with a 10% bonus.
                </Typography>
                
                <Typography variant="subtitle1" gutterBottom>
                  Do I need to include accessories?
                </Typography>
                <Typography variant="body2">
                  It's not required, but including chargers, cables, and original packaging may increase your device's value.
                </Typography>
              </Box>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card
              sx={{
                height: '100%',
                borderRadius: '16px',
                backgroundColor: alpha(theme.palette.background.paper, 0.4),
                backdropFilter: 'blur(8px)',
                border: `1px solid ${theme.palette.divider}`,
                p: 2,
              }}
            >
              <Box sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom fontWeight="bold">
                  Accepted Devices
                </Typography>
                <Typography variant="body2" paragraph>
                  • Smartphones & Tablets
                </Typography>
                <Typography variant="body2" paragraph>
                  • Laptops & Computers
                </Typography>
                <Typography variant="body2" paragraph>
                  • Smartwatches & Wearables
                </Typography>
                <Typography variant="body2">
                  • Cameras & Other Electronics
                </Typography>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default SellItemPage;