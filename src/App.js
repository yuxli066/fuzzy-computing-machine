import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
// eslint-disable-next-line
import { Analytics } from "@vercel/analytics/react";
import Projects from './components/Projects/Projects';
import Footer from './components/Footer/Footer';
import MechKeyboard from './components/keyboard/mechKeyboard';
import './App.css';
import CableCanvas from './components/ComputerCable/ComputerCable';

function App() {
  return (
    <div id="top" className="app">
      <Box
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          minWidth: '1300px',
        }}
      >
        <CableCanvas />
        <Box>
          <Container className="laptop">
            <Projects />
            <Footer />
          </Container>
          <MechKeyboard />
        </Box>
      </Box>
      <Analytics />
    </div>
  );
}

export default App;
