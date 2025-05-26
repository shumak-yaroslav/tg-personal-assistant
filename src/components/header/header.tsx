import React, { useCallback, memo } from 'react';
import { AppBar, Toolbar, Button, Box } from '@mui/material';

type Section = 'tasks' | 'finance' | 'notes';

interface HeaderProps {
  active: Section;
  onChange: (section: Section) => void;
}

export const Header: React.FC<HeaderProps> = memo(({ active, onChange }) => {
  const handleTasksClick = useCallback(() => onChange('tasks'), [onChange]);
  const handleFinanceClick = useCallback(() => onChange('finance'), [onChange]);
  const handleNotesClick = useCallback(() => onChange('notes'), [onChange]);

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        backgroundColor: '#ffffff',
        color: '#2c2c2c',
        borderBottom: '1px solid #e0e0e0',
      }}
    >
      <Toolbar sx={{ minHeight: 56 }}>
        <Box display="flex" gap={1}>
          <Button
            variant={active === 'tasks' ? 'contained' : 'text'}
            color="primary"
            onClick={handleTasksClick}
            sx={{ textTransform: 'none', fontWeight: 500, borderRadius: '8px' }}
          >
            Tasks
          </Button>
          <Button
            variant={active === 'finance' ? 'contained' : 'text'}
            color="primary"
            onClick={handleFinanceClick}
            sx={{ textTransform: 'none', fontWeight: 500, borderRadius: '8px' }}
          >
            Finance
          </Button>
          <Button
            variant={active === 'notes' ? 'contained' : 'text'}
            color="primary"
            onClick={handleNotesClick}
            sx={{ textTransform: 'none', fontWeight: 500, borderRadius: '8px' }}
          >
            Notes
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
});
