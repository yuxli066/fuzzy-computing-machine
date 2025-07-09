import Box from '@mui/material/Box';
// eslint-disable-next-line
import { Analytics } from "@vercel/analytics/react";
import Projects from './components/Projects/Projects';
import Footer from './components/Footer/Footer';
import MechKeyboard from './components/keyboard/mechKeyboard';
import './App.css';
import CableCanvas from './components/ComputerCable/ComputerCable';
import bg from './images/retro_normal.png';

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
        <Box
          style={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Box
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'relative',
              width: '100%',
              aspectRatio: '16 / 9',
            }}
          >
            {/* Background Image */}
            <Box
              component="img"
              src={bg}
              alt="background"
              sx={{
                width: '85%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
                marginBottom: '-8em',
                marginTop: '-10em',
              }}
            />
            <Projects />
            <Footer />
            <Box
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'relative',
              }}
            >
              <MechKeyboard />
              <CableCanvas />
            </Box>
          </Box>
        </Box>
      </Box>
      <Analytics />
    </>
  );
}

export default App;
