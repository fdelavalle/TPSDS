import './App.css';
import { useEffect } from 'react';
import axios from 'axios';

function App() {
  useEffect(() => {
    axios
      .get('http://localhost:8080/api/test')
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className='App'>
      <header className='App-header'>
        <p>Test</p>
      </header>
    </div>
  );
}

export default App;
