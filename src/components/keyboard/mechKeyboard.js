import Box from '@mui/material/Box';
import './mechKeyboard.css';

const getKeys = (rowNumber) => {
  switch (rowNumber) {
    case 1:
      return [
        {
          key: 'esc',
          class: 'keyboard__key keyboard__key--modifier keyboard__key--escape',
        },
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        '0',
        '-',
        '=',
        {
          key: 'backspace',
          class: 'keyboard__key keyboard__key--2u keyboard__key--modifier',
        },
      ];
    case 2:
      return [
        {
          key: 'tab',
          class: 'keyboard__key keyboard__key--1-5u keyboard__key--modifier',
        },
        'q',
        'w',
        'e',
        'r',
        't',
        'y',
        'u',
        'i',
        'o',
        'p',
        '[',
        ']',
        {
          key: '\\',
          class: 'keyboard__key keyboard__key--1-5u keyboard__key--modifier',
        },
      ];
    case 3:
      return [
        {
          key: 'caps lock',
          class: 'keyboard__key keyboard__key--1-75u keyboard__key--modifier',
        },
        'a',
        's',
        'd',
        'f',
        'g',
        'h',
        'j',
        'k',
        'l',
        ';',
        "'",
        {
          key: 'enter',
          class:
            'keyboard__key keyboard__key--2-25u keyboard__key--modifier keyboard__key--enter',
        },
      ];
    case 4:
      return [
        {
          key: 'shift',
          class: 'keyboard__key keyboard__key--2-25u keyboard__key--modifier',
        },
        'z',
        'x',
        'c',
        'v',
        'b',
        'n',
        'm',
        ',',
        '.',
        '/',
        {
          key: 'shift',
          class: 'keyboard__key keyboard__key--2-75u keyboard__key--modifier',
        },
      ];
    case 5:
      return [
        {
          key: 'ctrl',
          class: 'keyboard__key keyboard__key--1-25u keyboard__key--modifier',
        },
        {
          key: 'alt',
          class: 'keyboard__key keyboard__key--1-25u keyboard__key--modifier',
        },
        {
          key: 'cmd',
          class: 'keyboard__key keyboard__key--1-25u keyboard__key--modifier',
        },
        {
          key: 'space',
          class: 'keyboard__key keyboard__key--6-25u keyboard__key--modifier',
        },
        {
          key: 'cmd',
          class: 'keyboard__key keyboard__key--1-25u keyboard__key--modifier',
        },
        {
          key: 'alt',
          class: 'keyboard__key keyboard__key--1-25u keyboard__key--modifier',
        },
        {
          key: 'menu',
          class: 'keyboard__key keyboard__key--1-25u keyboard__key--modifier',
        },
        {
          key: 'ctrl',
          class: 'keyboard__key keyboard__key--1-25u keyboard__key--modifier',
        },
      ];
    default:
      return [];
  }
};

function MechKeyboard() {
  return (
    <Box className="keyboard_container">
      <div className="keyboard-stack">
        <div className="layer layer-8" />
        <div className="layer layer-7" />
        <div className="layer layer-6" />
        <div className="layer layer-5" />
        <div className="layer layer-4" />
        <div className="layer layer-3" />
        <div className="layer layer-2" />
        <div className="layer layer-1" />
        <div className="keyboard">
          {new Array(5).fill(0).reduce(
            (prev, curr, i) => {
              const currentRow = getKeys(i + 1).map((key, index) => {
                const customIndex = `${index}-${index}`;
                if (typeof key === 'object') {
                  return (
                    <div
                      key={`${key.key}_${customIndex}`}
                      className={key.class}
                      data-key-text={key.key}
                    />
                  );
                }
                return (
                  <div
                    key={`${key}_${customIndex}`}
                    className="keyboard__key"
                    data-key-text={key}
                  />
                );
              });
              return (
                <>
                  {prev}
                  {currentRow}
                </>
              );
            },
            <></>,
          )}
        </div>
      </div>
    </Box>
  );
}

export default MechKeyboard;
