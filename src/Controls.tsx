import './Controls.css';
import useKeyPress from './hooks/useKeyPress';
import React, { useState } from 'react';

function Controls() {
  const [active, setActive] = useState({up: '', left: '', down: '', right: ''});
  const handleKeyDown = (event: { keyCode: React.SetStateAction<number>; preventDefault: () => void; }) => {
    if (event.keyCode >= 37 && event.keyCode <= 40) {
      event.preventDefault();
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
    }
  }

  useKeyPress("keyup", handleKeyUp);

  return (
    <div className="Controls">
      <div className={`up ${active.up}`}>&uArr;</div>
      <div className={`left ${active.left}`}>&lArr;</div>
      <div className={`down ${active.down}`}>&dArr;</div>
      <div className={`right ${active.right}`}>&rArr;</div>
    </div>
  );
}

export default Controls;