import { useReducer } from 'react';

const maxSize = 5;

type State = {
  count: number;
  history: string[]; // Das Logbuch
};

type Action = { type: 'INC' } | { type: 'DEC' } | { type: 'RESET' };

const initialState: State = {
  count: 0,
  history: [],
};

function reducer(state: State, action: Action): State {
  // Wir erstellen einen neuen History-Eintrag basierend auf der Aktion
  const timestamp = new Date().toLocaleTimeString();

  switch (action.type) {
    case 'INC':
      return {
        ...state,
        count: state.count + 1,
        history: [`${timestamp}: +1 [count: ${state.count + 1}]`, ...state.history].slice(
          0,
          maxSize
        ),
      };
    case 'DEC':
      return {
        ...state,
        count: state.count - 1,
        history: [`${timestamp}: -1 [count: ${state.count - 1}]`, ...state.history].slice(
          0,
          maxSize
        ),
      };
    case 'RESET':
      return {
        ...state,
        count: 0,
        history: [`${timestamp}: RESET [count: 0]`, ...state.history].slice(0, maxSize),
      };
    default:
      return state;
  }
}

export default function MyReducer() {
  // Den Reducer im "Betrieb" anmelden
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Counter: {state.count}</h2>

      {/* Buttons, die Signale (Actions) an den Reducer senden */}
      <button onClick={() => dispatch({ type: 'INC' })}>+ 1</button>
      <button onClick={() => dispatch({ type: 'DEC' })}>- 1</button>
      <button onClick={() => dispatch({ type: 'RESET' })}>Reset</button>

      <h3>Verlauf:</h3>
      <ul>
        {state.history.map((eintrag, index) => (
          <li key={index}>{eintrag}</li>
        ))}
      </ul>
    </div>
  );
}
