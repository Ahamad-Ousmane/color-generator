import { useState } from 'react'
import { Box, Typography, TextField, Button, Grid, Paper, Alert } from '@mui/material'
import { styled } from '@mui/material/styles'
import chroma from 'chroma-js'

const AppWrapper = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  width: '100%',
  padding: theme.spacing(4),
  display: 'flex',
  flexDirection: 'column',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
  },
}))

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
}))

const HeroSection = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  color: '#fff',
  marginBottom: theme.spacing(6),
  [theme.breakpoints.down('sm')]: {
    marginBottom: theme.spacing(3),
  },
}))

const ColorBox = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: 'center',
  height: '100px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  transition: 'all 0.2s ease-in-out',
  position: 'relative',
  flex: '1 1 150px',
  maxWidth: '200px',
  borderRadius: '12px',
  boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 12px 20px rgba(0,0,0,0.15)',
  },
  [theme.breakpoints.down('sm')]: {
    height: '80px',
    flex: '1 1 120px',
    maxWidth: '150px',
  },
}))

const CopyAlert = styled(Alert)(({ theme }) => ({
  position: 'absolute',
  top: '-35px',
  left: '50%',
  transform: 'translateX(-50%)',
  zIndex: 1,
  minWidth: '80px',
  textAlign: 'center',
  padding: '4px 8px',
  fontSize: '0.875rem',
  borderRadius: '20px',
  boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  [theme.breakpoints.down('sm')]: {
    top: '-30px',
    minWidth: '60px',
    fontSize: '0.75rem',
  },
}))

const PaletteContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  gap: theme.spacing(2),
  justifyContent: 'center',
  padding: theme.spacing(2),
  background: 'rgba(255, 255, 255, 0.1)',
  borderRadius: '16px',
  backdropFilter: 'blur(10px)',
  [theme.breakpoints.down('sm')]: {
    gap: theme.spacing(1),
    padding: theme.spacing(1),
  },
}))

const StyledTextField = styled(TextField)(() => ({
  '& .MuiOutlinedInput-root': {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: '30px',
    transition: 'all 0.2s',
    '&:hover': {
      backgroundColor: '#fff',
    },
  },
}))

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
}))

export function SingleColorPage() {
  const [baseColor, setBaseColor] = useState('#845EC2')
  const [palettes, setPalettes] = useState<string[][]>([])
  const [copyMessage, setCopyMessage] = useState('')
  const [showCopyAlert, setShowCopyAlert] = useState(false)
  const [copiedColorIndex, setCopiedColorIndex] = useState<{ paletteIndex: number; colorIndex: number } | null>(null)

  const generatePalettes = () => {
    const color = chroma(baseColor)
    const hsl = color.hsl()
    
    const newPalettes = [
      // Monochromatic
      chroma.scale([color, color.darken(2)]).colors(5),
      // Complementary
      [color.hex(), chroma.hsl((hsl[0] + 180) % 360, hsl[1], hsl[2]).hex()],
      // Triadic
      [
        color.hex(),
        chroma.hsl((hsl[0] + 120) % 360, hsl[1], hsl[2]).hex(),
        chroma.hsl((hsl[0] + 240) % 360, hsl[1], hsl[2]).hex()
      ],
      // Analogous
      [
        color.hex(),
        chroma.hsl((hsl[0] + 30) % 360, hsl[1], hsl[2]).hex(),
        chroma.hsl((hsl[0] - 30 + 360) % 360, hsl[1], hsl[2]).hex()
      ],
    ]
    setPalettes(newPalettes)
  }

  const copyToClipboard = async (color: string, paletteIndex: number, colorIndex: number) => {
    try {
      await navigator.clipboard.writeText(color)
      setCopyMessage(`copiée!`)
      setShowCopyAlert(true)
      setCopiedColorIndex({ paletteIndex, colorIndex })
      setTimeout(() => {
        setShowCopyAlert(false)
        setCopiedColorIndex(null)
      }, 2000)
    } catch (err) {
      setCopyMessage('Erreur')
      setShowCopyAlert(true)
    }
  }

  return (
    <AppWrapper>
      <MainContent>
        <HeroSection>
          <Typography 
            variant="h2" 
            component="h1" 
            sx={{ 
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
              fontWeight: 'bold',
              mb: 2,
              textShadow: '2px 2px 4px rgba(0,0,0,0.2)'
            }}
          >
            Générerz une couleur !
          </Typography>
          <Typography 
            variant="h5" 
            sx={{ 
              fontSize: { xs: '1.2rem', sm: '1.5rem' },
              mb: 4,
              color: 'rgba(255,255,255,0.9)'
            }}
          >
            JUST ENTER A COLOR!
          </Typography>
          
          <Box sx={{ 
            display: 'flex', 
            gap: 2, 
            justifyContent: 'center',
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: 'center',
            maxWidth: '400px',
            margin: '0 auto'
          }}>
            <StyledTextField
              type="color"
              value={baseColor}
              onChange={(e) => setBaseColor(e.target.value)}
              sx={{ 
                width: { xs: '100%', sm: '120px' },
                maxWidth: { xs: '200px', sm: '120px' }
              }}
            />
            <GenerateButton 
              variant="contained" 
              onClick={generatePalettes}
              sx={{ width: { xs: '100%', sm: 'auto' }, maxWidth: { xs: '200px', sm: 'none' } }}
            >
              GENERATE
            </GenerateButton>
          </Box>
        </HeroSection>

        <Grid container spacing={2}>
          {palettes.map((palette: string[], paletteIndex: number) => (
            <div key={paletteIndex}>
              <PaletteContainer>
                {palette.map((color, colorIndex) => (
                  <ColorBox
                    key={colorIndex}
                    sx={{ 
                      backgroundColor: color, 
                      color: chroma(color).luminance() > 0.5 ? '#000' : '#fff',
                      fontFamily: 'monospace'
                    }}
                    onClick={() => copyToClipboard(color, paletteIndex, colorIndex)}
                  >
                    {color}
                    {showCopyAlert && 
                     copiedColorIndex?.paletteIndex === paletteIndex && 
                     copiedColorIndex?.colorIndex === colorIndex && (
                      <CopyAlert severity="success">
                        {copyMessage}
                      </CopyAlert>
                    )}
                  </ColorBox>
                ))}
              </PaletteContainer>
            </div>
          ))}
        </Grid>
      </MainContent>
    </AppWrapper>
  )
}
