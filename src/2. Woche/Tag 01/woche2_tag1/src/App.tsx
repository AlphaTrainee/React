import { Alert } from './Alert'
import './App.css'
// import { PersonScore } from './PersonScore';

function App() {
    return (
        <>
            <div className="container">
                <Alert
                    type="warning"
                    heading="Success"
                    closable
                    onClose={() => console.log('Callback aus Elternkomponente')}
                >
                    Alles ist Gut
                </Alert>
            </div>
            {/* <PersonScore /> */}
        </>
    )
}

export default App
