import './App.css';
import Header from './components/header';
import Main from './components/main';
import { useRef } from 'react';

function App() {
  const windowSize = useRef([window.innterWidth, window.innerHeight]);

    function handleResize(e) {
        console.log(windowSize[0]);
    }
  return (
    <div className='app' onResize={(e) => handleResize(e)}>
      <Header />
      <Main />
    </div>
  );
}

export default App;
