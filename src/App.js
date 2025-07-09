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
    <>
      <Box
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
          width: '100%',
        }}
      >
        <CableCanvas />
        <Box
          style={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Container className="laptop">
            <Projects />
            <Footer />
          </Container>
          <MechKeyboard />
        </Box>
      </Box>
      <Analytics />
    </>
  );
}

export default App;
