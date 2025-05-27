import React, { useCallback, memo } from 'react';
import { AppBar, Toolbar, Button, Box } from '@mui/material';
import type { TelegramWebAppUser } from '../../types/telegram.ts';

type Section = 'tasks' | 'finance' | 'notes';

interface HeaderProps {
  active: Section;
  onChange: (section: Section) => void;
  user: TelegramWebAppUser | null;
}

export const Header: React.FC<HeaderProps> = memo(({ active, onChange, user }) => {
  const handleTasksClick = useCallback(() => onChange('tasks'), [onChange]);
  const handleFinanceClick = useCallback(() => onChange('finance'), [onChange]);
  const handleNotesClick = useCallback(() => onChange('notes'), [onChange]);
  const title = user ? `Hello, ${user.username}` : 'Hello, Guest';

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
      <Toolbar sx={{ minHeight: 56, display: 'flex', justifyContent: 'space-between' }}>
        <Box sx={{ fontWeight: 500 }}>
          {title}
        </Box>
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
