import { useState } from 'react';

/* 
props destructuring
*/
export function Alert({ type = 'information', heading, children, closable, onClose }) {
  /* 
  console.log(name);
  console.log(email);
  */
  /*   
  const [state, setState] = useState('initialState');
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);
  */

  const [visible, setVisible] = useState(true);
  if (!visible) return null;

  function handleCloseClick() {
    setVisible(false);
    onClose();
  }

  return (
    <div>
      <div>
        <span role="img" arial-label={type === 'warning' ? 'Warning' : 'Information'}>
          {type === 'warning' ? '!' : 'Info'}
        </span>
        <span>{heading}</span>
      </div>
      {closable && (
        /* 
        <button onClick={() => setVisible(false)} arial-label="Close">
          <span role="img" aria-label="Close">
            X
          </span>
        </button>
         */
        <button onClick={handleCloseClick} arial-label="Close">
          <span role="img" aria-label="Close">
            X
          </span>
        </button>
      )}
      <div>{children}</div>
    </div>
  );
}
