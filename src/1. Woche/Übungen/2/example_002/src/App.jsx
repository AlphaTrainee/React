import { useState } from 'react';
import { Alert } from './Alert';

function App() {
  /* children ist immer der Wert im Tag */

  const [lastAction, setLastAction] = useState('keine');

  return (
    <div>
      <div>letzter Wert aus Kind: {lastAction}</div>

      <hr />

      <CounterCard
        title="Mein Zähler"
        initial={0}
        onChange={(newCount) => setLastAction(newCount)}
      />
    </div>
  );
  /*   return (
    <Alert heading=" Alles ist gut" closable={true} onClose={() => console.log('closed')}>
      Hello World
    </Alert>
  );
 */
}

/* 
1. Öffne `src/App.jsx`.
2. Erstelle in derselben Datei eine Komponente `CounterCard`.
3. `CounterCard` soll Props annehmen: `title` und `initial`.
4. `CounterCard` soll rendern:

   * eine Überschrift mit `title`
   * einen Text: `Startwert: {initial}`
*/

/* 
1. Importiere `useState` in `App.jsx`.
2. In `CounterCard`: Lege State `count` an, initialisiert mit `initial`.
3. Zeige `Aktueller Wert: {count}` an (statt nur Startwert).
*/

/* 
1. Füge zwei Buttons hinzu: `+1` und `-1`.
2. Beim Klick soll `count` jeweils erhöht bzw. verringert werden.
3. Nutze dabei die funktionale Form von `setCount`.
*/

/* 
1. In `App`: Lege State `lastAction` an (z. B. `"Keine"`).
2. Übergib an `CounterCard` eine Prop `onChange`.
3. `CounterCard` soll bei jeder Änderung `onChange(newCount)` aufrufen.
4. `App` zeigt an: `Letzter Wert aus Kind: {lastAction}`.
*/
export function CounterCard({ title, initial, onChange }) {
  const [count, setCount] = useState(initial);

  // Hilfsfunktion für die Änderung
  const updateCount = (newValue) => {
    setCount(newValue);
    // 3. Die Eltern-Komponente informieren, wenn onChange existiert
    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <div>
      <h1>{title}</h1>
      <div>
        <span>Aktueller Wert: {count}</span>
      </div>
      <div>
        <button onClick={() => updateCount(count - 1)} arial-label="-1">
          <span role="img" aria-label="-1">
            -1
          </span>
        </button>
        <button onClick={() => updateCount(count + 1)} arial-label="+1">
          <span role="img" aria-label="+1">
            +1
          </span>
        </button>
      </div>
    </div>
  );
}

export default App;
