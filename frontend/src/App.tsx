import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './contexts/ThemeContext'
import Navbar from './components/navbar'
import Home from './pages/home'
import Information from './pages/information'
import Team from './pages/team'
import VoiceAgent from './pages/voice_agent'
import Footer from './components/footer'

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Navbar />
        <main style={{ flex: 1, width: '100%' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/information" element={<Information />} />
            <Route path="/team" element={<Team />} />
            <Route path="/voice-agent" element={<VoiceAgent />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
