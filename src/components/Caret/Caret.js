import React, { useRef, useState, useEffect } from 'react';
import './Caret.css'; // Or use inline styles

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
        left: `${caretPos.left}px`,
        animation: 'blink 1s step-end infinite',
        pointerEvents: 'none',
        userSelect: 'none',
        zIndex: 100,
      }}
    />
  );
};

export default FakeCaret;
