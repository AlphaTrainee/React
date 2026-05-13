import { Alert } from './Alert';
import { PersonScore } from './PersonScore';
import './App.css';

function App() {
  return (
    <>
      <Alert
        heading="Success"
        closable
        onClose={() => console.log('Callback aus Eltern Komponente')}
      >
        Alles ist Gut
      </Alert>
      <PersonScore />
    </>
  );
}

export default App;
