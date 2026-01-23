import React, { useState } from 'react';
import { 
  Paper, 
  TextField, 
  Button, 
  Typography, 
  Stack, 
  Box,
  Alert,
  CircularProgress
} from '@mui/material';
import { useTelegramData } from '../../hooks/use-telegram-data.hook';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { user } = useTelegramData();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      console.log('Login attempt:', { email, password });
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (email && password) {
        console.log('Login successful');
      } else {
        setError('Please fill in all fields');
      }
    } catch {
      setError('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto' }}>
      <Paper sx={{ p: { xs: 2, sm: 3 }, borderRadius: 2 }}>
        <Typography variant="h6" fontWeight={500} mb={3} textAlign="center">
          Login
        </Typography>
        
        {user && (
          <Alert severity="info" sx={{ mb: 2 }}>
            Telegram user: {user.first_name} {user.last_name || ''}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField
              fullWidth
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              size="small"
              required
            />
            
            <TextField
              fullWidth
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              size="small"
              required
            />

            {error && (
              <Alert severity="error">
                {error}
              </Alert>
            )}

            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={isLoading}
              sx={{ mt: 2 }}
            >
              {isLoading ? (
                <CircularProgress size={20} color="inherit" />
              ) : (
                'Login'
              )}
            </Button>
          </Stack>
        </form>

        <Typography variant="body2" color="text.secondary" textAlign="center" mt={2}>
          Use your Telegram account or create a new one
        </Typography>
      </Paper>
    </Box>
  );
};
