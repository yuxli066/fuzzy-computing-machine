import { useEffect, useRef } from 'react';
import Container from '@mui/material/Container';
// eslint-disable-next-line
import { Analytics } from "@vercel/analytics/react";
import Projects from './components/Projects/Projects';
import PostIt from './components/PostIt/PostIt';
import Footer from './components/Footer/Footer';
import './App.css';

function App() {
  const postitRef = useRef(null);
  const terminalRef1 = useRef(null);
  const terminalRef2 = useRef(null);
  useEffect(() => {
    const checkOverlap = () => {
      if (postitRef.current && terminalRef1.current && terminalRef2.current) {
        const postit = postitRef.current.getBoundingClientRect();
        const terminal1 = terminalRef1.current.getBoundingClientRect();
        const terminal2 = terminalRef2.current.getBoundingClientRect();
        const isOverlapping = !(
          postit.right < terminal1.left - 10
          && postit.right < terminal2.left - 10
        );
        if (isOverlapping) {
          console.log('Postit is overlapping!');
          postit.current.style.left = '-2.5em;'; // handle overlap
        } else {
          console.log('Postit is NOT overlapping!');
        }
      }
    };
    checkOverlap();
    window.addEventListener('scroll', checkOverlap);
    window.addEventListener('resize', checkOverlap);
    return () => {
      window.removeEventListener('scroll', checkOverlap);
      window.removeEventListener('resize', checkOverlap);
    };
  }, []);
  return (
    <div id="top" className="app">
      <Container className="laptop">
        <PostIt type="contact" postitRef={postitRef} />
        <PostIt type="commands" />
        <Projects terminalRef1={terminalRef1} terminalRef2={terminalRef2} />
        <Footer />
      </Container>
      <Analytics />
    </div>
  );
}

export default App;
