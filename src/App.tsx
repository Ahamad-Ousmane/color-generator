import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Box } from '@mui/material'
import { styled } from '@mui/material/styles'

// Import des composants
import { Navigation } from './components/Navigation'
import { SingleColorPage } from './pages/SingleColor'
import { GradientPage } from './pages/Gradient'

const AppContainer = styled(Box)(() => ({
  minHeight: '100vh',
  width: '100%',
  background: 'linear-gradient(135deg, #1a3a8f 0%, #21a3a3 100%)',
  backgroundAttachment: 'fixed',
}))

function App() {
  return (
    <BrowserRouter>
      <AppContainer>
        <Navigation />
        <Routes>
          <Route path="/" element={<SingleColorPage />} />
          <Route path="/gradient" element={<GradientPage />} />
        </Routes>
      </AppContainer>
    </BrowserRouter>
  )
}

export default App 