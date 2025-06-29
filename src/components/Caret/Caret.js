import React, { useRef, useEffect, useState } from 'react';
// import './App.css'; // Or use inline styles

const FakeCaret = ({ editorRef }) => {
  const caretRef = useRef(null);
  const [caretPos, setCaretPos] = useState({ top: 0, left: 0 });

  const updateCaret = () => {
    const sel = window.getSelection();
    if (!sel.rangeCount) return;

    const range = sel.getRangeAt(0).cloneRange();
    range.collapse(true);
    const rects = range.getClientRects();
    if (!rects.length) return;

    const rect = rects[0];
    const editorRect = editorRef.current.getBoundingClientRect();

    setCaretPos({
      top: rect.top - editorRect.top + editorRef.current.scrollTop,
      left: rect.left - editorRect.left + editorRef.current.scrollLeft,
    });
  };

  useEffect(() => {
    const editor = editorRef.current;
    const handleEvents = () => updateCaret();

    editor.addEventListener('input', handleEvents);
    editor.addEventListener('click', handleEvents);
    editor.addEventListener('keyup', handleEvents);
    window.addEventListener('resize', handleEvents);

    return () => {
      editor.removeEventListener('input', handleEvents);
      editor.removeEventListener('click', handleEvents);
      editor.removeEventListener('keyup', handleEvents);
      window.removeEventListener('resize', handleEvents);
    };
  }, []);

  return (
    <>
      <div
        contentEditable={false}
        ref={caretRef}
        id="leos-fake-caret"
        style={{
          position: 'relative',
          display: 'inline-flex',
          width: '10px',
          height: '1.15em',
          backgroundColor: 'white',
          top: `${Number(caretPos.top) + 5}px`,
          left: `${caretPos.left}px`,
          animation: 'blink 1s step-end infinite',
          pointerEvents: 'none',
          zIndex: 100,
        }}
      />
    </>
  );
};

export default FakeCaret;
