import Box from '@mui/material/Box';
import Contact from '../Contact/Contact';
import './PostIt.scss';

function PostIt(props) {
  const { type } = props;
  return type === 'contact' ? (
    <Box className="post-it-styles">
      <p className="post-text-styles">Yuxuan (Leo) Li</p>
      {/* eslint-disable-next-line react/no-unescaped-entities */}
      <p className="post-text-styles2">
        A Full Stack Engineer with a passion for building apps
      </p>
      <Contact />
    </Box>
  ) : (
    <Box className="post-it-styles-commands">
      <p className="post-text-styles">Valid Commands:</p>
      <ul>
        <li>
          <p className="post-text-styles2">ls - list contents of directory</p>
        </li>
        <li>
          <p className="post-text-styles2">cat - displays contents of file</p>
        </li>
        <li>
          <p className="post-text-styles2">
            clear - clears contents of terminal
          </p>
        </li>
        <li>
          <p className="post-text-styles3">
            E.G.) cat about-me.txt, cat work-experiences.txt
          </p>
        </li>
      </ul>
    </Box>
  );
}

export default PostIt;
