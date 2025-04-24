import { useState } from 'react';
import { Box, Typography, TextField, Button, Grid, Paper, Alert } from '@mui/material';
import { styled } from '@mui/material/styles';
import chroma from 'chroma-js';

// Réutiliser les styles de votre composant actuel
const AppWrapper = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  width: '100%',
  padding: theme.spacing(4),
  display: 'flex',
  flexDirection: 'column',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
  },
}));

const MainContent = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: theme.spacing(4),
  maxWidth: '1200px',
  margin: '0 auto',
  [theme.breakpoints.down('sm')]: {
    gap: theme.spacing(2),
  },
}));

const StyledTextField = styled(TextField)(() => ({
  '& .MuiOutlinedInput-root': {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: '30px',
    transition: 'all 0.2s',
    '&:hover': {
      backgroundColor: '#fff',
    },
  },
}));

const GenerateButton = styled(Button)(() => ({
  borderRadius: '30px',
  padding: '12px 32px',
  fontSize: '1.1rem',
  textTransform: 'none',
  background: 'linear-gradient(45deg, #21a3a3 30%, #2196f3 90%)',
  boxShadow: '0 4px 12px rgba(33, 163, 163, 0.3)',
  '&:hover': {
    background: 'linear-gradient(45deg, #1a8383 30%, #1976d2 90%)',
    boxShadow: '0 6px 15px rgba(33, 163, 163, 0.4)',
  },
}));

export function GradientPage() {
  const [startColor, setStartColor] = useState('#845EC2');
  const [endColor, setEndColor] = useState('#2196F3');
  const [palettes, setPalettes] = useState<string[][]>([]);
  const [copyMessage, setCopyMessage] = useState('');
  const [showCopyAlert, setShowCopyAlert] = useState(false);

  const generateGradients = () => {
    const start = chroma(startColor);
    const end = chroma(endColor);
    
    const newPalettes = [
      // Dégradé linéaire (5 étapes)
      chroma.scale([start, end]).colors(5),
      // Dégradé avec point médian
      chroma.scale([start, chroma.mix(start, end), end]).colors(5),
      // Dégradé avec teinte intermédiaire
      chroma.scale([start, chroma.mix(start, end, 0.3), chroma.mix(start, end, 0.7), end]).colors(5),
      // Dégradé avec variation de luminosité
      chroma.scale([start.brighten(), end.darken()]).colors(5),
    ];
    
    setPalettes(newPalettes);
  };

  const copyToClipboard = async (colors: string[]) => {
    const gradientCSS = `background: linear-gradient(to right, ${colors.join(', ')});`;
    try {
      await navigator.clipboard.writeText(gradientCSS);
      setCopyMessage('CSS copié !');
      setShowCopyAlert(true);
      setTimeout(() => setShowCopyAlert(false), 2000);
    } catch (err) {
      setCopyMessage('Erreur de copie');
      setShowCopyAlert(true);
    }
  };

  return (
    <AppWrapper>
      <MainContent>
        <Box sx={{ textAlign: 'center', color: '#fff', mb: 6 }}>
          <Typography variant="h2" component="h1" sx={{ 
            fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
            fontWeight: 'bold',
            mb: 2,
            textShadow: '2px 2px 4px rgba(0,0,0,0.2)'
          }}>
            Générateur de Dégradés
          </Typography>
          <Typography variant="h5" sx={{ 
            fontSize: { xs: '1.2rem', sm: '1.5rem' },
            mb: 4,
            color: 'rgba(255,255,255,0.9)'
          }}>
            Choisissez deux couleurs pour créer des dégradés harmonieux !
          </Typography>
          
          <Box sx={{ 
            display: 'flex', 
            gap: 2, 
            justifyContent: 'center',
            flexWrap: 'wrap',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            <StyledTextField
              type="color"
              value={startColor}
              onChange={(e) => setStartColor(e.target.value)}
              label="Couleur de début"
              sx={{ width: '120px' }}
            />
            <StyledTextField
              type="color"
              value={endColor}
              onChange={(e) => setEndColor(e.target.value)}
              label="Couleur de fin"
              sx={{ width: '120px' }}
            />
            <GenerateButton 
              variant="contained" 
              onClick={generateGradients}
            >
              GÉNÉRER
            </GenerateButton>
          </Box>
        </Box>

        <Grid container spacing={3}>
          {palettes.map((palette: string[], index: number) => (
            <Grid item xs={12} key={index}>
              <Paper
                sx={{
                  p: 2,
                  borderRadius: 2,
                  cursor: 'pointer',
                  background: `linear-gradient(to right, ${palette.join(', ')})`,
                  height: '100px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  textShadow: '0 1px 2px rgba(0,0,0,0.3)',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
                  },
                }}
                onClick={() => copyToClipboard(palette)}
              >
                {showCopyAlert && <Alert 
                  severity="success" 
                  sx={{ 
                    position: 'absolute',
                    top: -40,
                    left: '50%',
                    transform: 'translateX(-50%)',
                  }}
                >
                  {copyMessage}
                </Alert>}
                Cliquez pour copier le CSS
              </Paper>
            </Grid>
          ))}
        </Grid>
      </MainContent>
    </AppWrapper>
  );
}