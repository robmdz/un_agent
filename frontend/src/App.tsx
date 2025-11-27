import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './contexts/ThemeContext'
import Navbar from './components/navbar'
import Home from './pages/home'
import Information from './pages/information'
import Team from './pages/team'

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/information" element={<Information />} />
          <Route path="/team" element={<Team />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
