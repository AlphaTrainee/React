import { useState } from 'react';
import { Alert } from './Alert';

function App() {
  /* children ist immer der Wert im Tag */
  return (
    <Alert heading=" Alles ist gut" closable={true} onClose={() => console.log('closed')}>
      Hello World
    </Alert>
  );
}

export default App;
