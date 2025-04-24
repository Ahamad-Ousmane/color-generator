import { AppBar, Toolbar, Button, Box } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

export const Navigation = () => {
  const location = useLocation();

  return (
    <AppBar position="static" sx={{ background: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(10px)' }}>
      <Toolbar>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            component={Link}
            to="/"
            variant={location.pathname === '/' ? 'contained' : 'text'}
            sx={{ color: 'white' }}
          >
            Couleur Unique
          </Button>
          <Button
            component={Link}
            to="/gradient"
            variant={location.pathname === '/gradient' ? 'contained' : 'text'}
            sx={{ color: 'white' }}
          >
            Dégradés
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};