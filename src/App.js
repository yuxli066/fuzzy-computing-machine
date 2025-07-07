import Container from '@mui/material/Container';
// eslint-disable-next-line
import { Analytics } from "@vercel/analytics/react";
import Projects from './components/Projects/Projects';
import Footer from './components/Footer/Footer';
import './App.css';

function App() {
  return (
    <div id="top" className="app">
      <Container className="laptop">
        <Projects />
        <Footer />
      </Container>
      <Analytics />
    </div>
  );
}

export default App;
