import React, { useState } from 'react';
import Controls from './Controls';
import './App.css';
import useKeyPress from './hooks/useKeyPress';


function App() {
  const [keyLog, setKeyLog] = useState<any[]>([]);
  const addToKeyLog = (entry: { keystate: any; timestamp: number; }) => {
    setKeyLog([...keyLog, entry]);
  }

  const [active, setActive] = useState({ up: '', left: '', down: '', right: '' });
  const handleKeyDown = (event: {
    [x: string]: any; keyCode: React.SetStateAction<number>; preventDefault: () => void;
}) => {
    if (event.keyCode >= 37 && event.keyCode <= 40) {
      event.preventDefault();
      if (event.repeat) return;

      let activeClone = Object.assign(Object.create(Object.getPrototypeOf(active)), active);
      switch (event.keyCode) {
        case 37: activeClone.left = 'active'; break;
        case 38: activeClone.up = 'active'; break;
        case 39: activeClone.right = 'active'; break;
        case 40: activeClone.down = 'active'; break;
      }
      ['up', 'left', 'down', 'right'].forEach((key) => {
        activeClone[key] = activeClone[key] === 'warm' ? '' : activeClone[key]
      });

      setActive(activeClone);

      const newEvent = {
        timestamp: Date.now(),
        keystate: activeClone
      }
      addToKeyLog(newEvent);
    }
  }

  useKeyPress("keydown", handleKeyDown);

  const handleKeyUp = (event: { keyCode: React.SetStateAction<number>; preventDefault: () => void; }) => {
    if (event.keyCode >= 37 && event.keyCode <= 40) {
      event.preventDefault();
      let activeClone = Object.assign(Object.create(Object.getPrototypeOf(active)), active);
      switch (event.keyCode) {
        case 37: activeClone.left = 'warm'; break;
        case 38: activeClone.up = 'warm'; break;
        case 39: activeClone.right = 'warm'; break;
        case 40: activeClone.down = 'warm'; break;
      }

      setActive(activeClone);
      const newEvent = {
        timestamp: Date.now(),
        keystate: activeClone
      }
      addToKeyLog(newEvent);
    }
  }

  useKeyPress("keyup", handleKeyUp);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Lander</h1>
      </header>
      <section className="columns">
        <div>
          <Controls active={active} />
        </div>
        <div className="logs">
          <p>Logs:</p>
          <ul>
            {keyLog.map((entry, index) => {
              return <li key={index}>{JSON.stringify(entry)}</li>
            })}
          </ul>
        </div>
      </section>
    </div>
  );
}

export default App;
