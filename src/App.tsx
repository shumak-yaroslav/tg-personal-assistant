import React, { useState } from 'react';
import { ThemeProvider, createTheme, CssBaseline, Container, Box } from '@mui/material';
import { Header } from './components/header';
import { TaskList } from './components/task-list';
import { NotesBoard } from './components/notes-board';
import { FinanceTracker } from './components/finance-tracker';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#2a72e4',
    },
    background: {
      default: '#f9fafa',
      paper: '#ffffff',
    },
    text: {
      primary: '#2c2c2c',
      secondary: '#6e6e6e',
    },
  },
  typography: {
    fontFamily: 'Inter, Roboto, sans-serif',
    fontSize: 14,
    button: {
      textTransform: 'none',
    },
  },
  shape: {
    borderRadius: 10,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
  },
});

export const App: React.FC = () => {
  const [section, setSection] = useState<'tasks' | 'finance' | 'notes'>('tasks');
  const uuid = 'demo-user';

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="md" disableGutters>
        <Header active={section} onChange={setSection} />
        <Box mt={4} sx={{ paddingLeft: 2, paddingRight: 2 }}>
          {section === 'tasks' && <TaskList uuid={uuid} />}
          {section === 'finance' && <FinanceTracker uuid={uuid} />}
          {section === 'notes' && <NotesBoard uuid={uuid} />}
        </Box>
      </Container>
    </ThemeProvider>
  );
};
