import { useEffect, useReducer, useRef, useMemo, useCallback, useState } from 'react';
import { getPerson } from './getPerson';
import { Reset } from './Reset';

function teureFunktion() {
  console.log('Teuere Funktion läuft');
  let sum = 0;
  for (let i = 0; i < 1000; i++) {
    sum += i;
  }
  return sum;
}

function teureFunktion2(iterations: number, multiplier: number) {
  console.log('Teuere Funktion2 läuft');
  let sum = 0;
  for (let i = 0; i < iterations; i++) {
    sum += i * multiplier;
  }
  return sum;
}

type State = {
  name: string | undefined;
  score: number;
  loading: boolean;
};

type Action = { type: 'initialize'; name: string } | { type: 'increment' } | { type: 'decrement' } | { type: 'reset' };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'initialize':
      return {
        name: action.name,
        score: 0,
        loading: false,
      };
    case 'increment':
      return {
        ...state,
        score: state.score + 1,
      };
    case 'decrement':
      return {
        ...state,
        score: state.score - 1,
      };
    case 'reset':
      return {
        ...state,
        score: 0,
      };
    default:
      return state;
  }
}

export function PersonScore() {
  const [iterations, setIterations] = useState(10000);
  const [multiplier, setMultiplier] = useState(1);
  // const iterations = useMemo(() => 10000, []);
  // const multiplier = useMemo(() => 1, []);

  const [{ name, score, loading }, dispatch] = useReducer(reducer, {
    name: undefined,
    score: 0,
    loading: true,
  });
  const addButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    getPerson().then((person) => {
      dispatch({ type: 'initialize', name: person.name });
    });
  }, []);

  useEffect(() => {
    console.log('UseEffect: Button Focus');
    if (!loading) {
      // addButtonRef.current?.focus(); // funktioniert nicht
      if (addButtonRef.current) {
        addButtonRef.current.focus();
        // addButtonRef.current.style.backgroundColor = 'lightblue';
      }
      console.log('Button Focus');
    }
  }, [loading]);

  const teuereBerechnung = useMemo(() => teureFunktion(), []);
  // const teuereBerechnung = teureFunktion();

  const teuereBerechnung2 = useMemo(() => teureFunktion2(iterations, multiplier), [iterations, multiplier]);

  const handleReset = () => dispatch({ type: 'reset' });
  const handleResetMemo = useCallback(handleReset, []);

  if (loading) {
    return <div>loading ....</div>;
  }

  return (
    <div>
      <h3>
        {name}, {score}
      </h3>
      <p>{teuereBerechnung}</p>
      <p>{teuereBerechnung2}</p>
      <button ref={addButtonRef} onClick={() => dispatch({ type: 'increment' })}>
        +
      </button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
      {/* <button onClick={() => dispatch({ type: 'reset' })}>Reset</button> */}
      {/* <Reset onClick={() => dispatch({ type: 'reset' })} /> */}
      <Reset onClick={handleResetMemo} />
    </div>
  );
}
