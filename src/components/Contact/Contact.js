import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import Box from '@mui/material/Box';
import { contact, about } from '../../portfolio';
import './Contact.css';

function Contact() {
  if (!contact.email) return null;
  const { social } = about;

  return (
    <section className="section contact center" id="contact">
      <Box className="click-me">
        <p>Click Me!</p>
      </Box>
      <div className="center">
        {social && (
          <>
            {social.github && (
              <a
                href={social.github}
                aria-label="github"
                className="link link--icon contact_icons"
              >
                <GitHubIcon fontSize="large" />
              </a>
            )}
            {social.linkedin && (
              <a
                href={social.linkedin}
                aria-label="linkedin"
                className="link link--icon contact_icons"
              >
                <LinkedInIcon fontSize="large" />
              </a>
            )}
          </>
        )}
      </div>
    </section>
  );
}

export default Contact;
