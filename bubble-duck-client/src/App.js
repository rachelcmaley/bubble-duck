import './styles/main.css';
import React from 'react';
import ReactDOM from 'react-dom';
  import {PhotoUpload} from './components/common';


function App() {
  return (
    <div className="App">
      <header className="App-header">
      WELCOME TO BUBBLE DUCK!
        <p>
          <img className='Landing-page-duck' src='duck-landing-page.png' alt='Cute Duck Welcomes You'></img>
          <PhotoUpload />
        </p>
      </header>
    </div>
  );
}

export default App;
ReactDOM.render(<App />, document.getElementById('root'));

//command to start program
// npm start