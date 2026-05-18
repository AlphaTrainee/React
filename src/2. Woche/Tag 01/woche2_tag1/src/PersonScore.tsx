import { useEffect, useReducer, useRef, useMemo, useCallback } from 'react'
import { getPerson } from './getPerson'
import { Reset } from './Reset';

function teuereFunktion() {
    console.log('Teure Funktion läuft ...')
    let sum = 0
    for (let i = 0; i < 10000; i++) {
        sum += i
    }
    return sum
}

// function teuereFunktion2(iterations: number, multiplier: number) {
//     console.log('Teure Funktion2 läuft ...')
//     let sum = 0
//     for (let i = 0; i < iterations; i++) {
//         sum += i * multiplier
//     }
//     return sum
// }

type State = {
    name: string | undefined
    score: number
    loading: boolean
}

type Action =
    | { type: 'initialze'; name: string }
    | {
          type: 'increment'
      }
    | {
          type: 'decrement'
      }
    | {
          type: 'reset'
      }

function reducer(state: State, action: Action): State {
    switch (action.type) {
        case 'initialze':
            return {
                name: action.name,
                score: 0,
                loading: false,
            }
        case 'increment':
            // return {
            //     name: state.name,
            //     score: state.score + 1,
            //     loading: state.loading
            // }
            return {
                ...state,
                score: state.score + 1,
            }
        case 'decrement':
            return {
                ...state,
                score: state.score - 1,
            }
        case 'reset':
            return {
                ...state,
                score: 0,
            }
        default:
            return state
    }
}

export function PersonScore() {
    // const [iterations, setIterations] = useState(100000)
    // const [multiplier, setMultiplier] = useState(1)

    // const teuere_berechnung2 = useMemo(
    //     () => teuereFunktion2(iterations, multiplier),
    //     [iterations, multiplier]
    // )

    const [{ name, score, loading }, dispatch] = useReducer(reducer, {
        name: undefined,
        score: 0,
        loading: true,
    })
    const addButtonRef = useRef<HTMLButtonElement>(null)

    useEffect(() => {
        getPerson().then((person) => {
            dispatch({ type: 'initialze', name: person.name })
        })
    }, [])

    useEffect(() => {
        console.log('2. useeffect')
        if (!loading) {
            addButtonRef.current?.focus()
            console.log('Button wird fokusiert')
        }
    }, [loading])

    const teuere_berechnung = useMemo(() => teuereFunktion(), [])
    // const teuere_berechnung = teuereFunktion()

    const handleResetMemoized = useCallback(() => dispatch({ type: 'reset'}), [])

    if (loading) {
        return <div>Loading ....</div>
    }
    return (
        <div>
            <h3>
                {name}, {score}
            </h3>
            <p>{teuere_berechnung}</p>
            {/* <p>{teuere_berechnung2}</p> */}
            <button ref={addButtonRef} onClick={() => dispatch({ type: 'increment' })}>
                +
            </button>
            <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
            <Reset onClick={handleResetMemoized} />
        </div>
    )
}
