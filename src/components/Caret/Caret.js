import React from 'react';
import './Caret.css'; // Or use inline styles

const FakeCaret = ({ caretRef }) => (
  <span
    contentEditable={false}
    ref={caretRef}
    id="leos-fake-caret"
    style={{
      position: 'relative',
      display: 'inline-flex',
      alignSelf: 'center',
      width: '8px',
      height: '21px',
      top: '5px',
      backgroundColor: 'white',
      animation: 'blink 0.35s step-end infinite',
      pointerEvents: 'none',
      userSelect: 'none',
      zIndex: 100,
    }}
  />
);

export default FakeCaret;
