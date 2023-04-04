import Box from '@mui/material/Box';
import './Footer.css';

function Copyright() {
  return (
    <p className="footer-text">
      Copyright ©
      Leo Li
      {' '}
      {new Date().getFullYear()}
    </p>
  );
}

function Footer() {
  return (
    <Box className="footer">
      <Copyright />
    </Box>
  );
}

export default Footer;
