import React from "react";

const Keyboard = ({ keys, onKeyPressed }) => {
  function handleInput(event) {
    onKeyPressed(event.target.textContent);
  }
  function handleEnter() {
    onKeyPressed("ENTER");
  }
  function handleDelete() {
    onKeyPressed("BACKSPACE");
  }
  return (
    <div className="keyboard-container">
      {Array.from(Array(10)).map((_, i) => (
        <button key={i} className="key keyboard" onClick={handleInput}>
          {keys[i]}
        </button>
      ))}
      <div className="empty-key" />
      {Array.from(Array(9)).map((_, i) => (
        <button key={i + 10} className="key keyboard" onClick={handleInput}>
          {keys[i + 10]}
        </button>
      ))}
      <button className="enter-key" onClick={handleEnter}>ENTER</button>
      {Array.from(Array(7)).map((_, i) => (
        <button key={i + 19} className="key keyboard" onClick={handleInput}>
          {keys[i + 19]}
        </button>
      ))}
      <button className="delete-key" onClick={handleDelete}>DELETE</button>
    </div>
  );
};

export default Keyboard;
