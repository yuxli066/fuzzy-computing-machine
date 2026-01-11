// eslint-disable-next-line
import { Analytics } from "@vercel/analytics/react";
import Desktop from './components/Desktop/Desktop';
import './App.css';

// OLD TERMINAL/LINUX VERSION - Commented out for future env flag toggle
// import Container from '@mui/material/Container';
// import Projects from './components/Projects/Projects';
// import Footer from './components/Footer/Footer';

function App() {
  return (
    <div className="app">
      <Desktop />
      <Analytics />

      {/* OLD TERMINAL/LINUX VERSION - Commented out for future env flag toggle
      <Container className="laptop">
        <Projects />
        <Footer />
      </Container>
      */}
    </div>
  );
}

export default App;
