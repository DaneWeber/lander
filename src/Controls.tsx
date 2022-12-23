import './Controls.css';
import useKeyPress from './hooks/useKeyPress';
import React, { useState } from 'react';

function Controls() {
  const [active, setActive] = useState(0);
  const handleKeyDown = (event: { keyCode: React.SetStateAction<number>; preventDefault: () => void; }) => {
    if (event.keyCode >= 37 && event.keyCode <= 40) {
      event.preventDefault();
      setActive(event.keyCode);
    }
  }

  useKeyPress("keydown", handleKeyDown);

  return (
    <div className="Controls">
      <div className={`up ${active === 38 ? "active" : ""}`}>&uArr;</div>
      <div className={`left ${active === 37 ? "active" : ""}`}>&lArr;</div>
      <div className={`down ${active === 40 ? "active" : ""}`}>&dArr;</div>
      <div className={`right ${active === 39 ? "active" : ""}`}>&rArr;</div>
    </div>
  );
}

export default Controls;