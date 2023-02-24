import React from "react";

const Modal = ({ type, completedWords, solution }) => {
  const Square = ({ word, solution }) => {
    function chackLetter(letter, pos) {
      if (solution.includes(letter)) {
        if (solution[pos] === letter) {
          return "🟩";
        } else {
          return "🟨";
        }
      } else {
        return "⬛";
      }
    }
    return (
      <div className="puzzle-word">
        {word.split("").map((letter, i) => (
          <div key={i}>{chackLetter(letter, i)}</div>
        ))}
      </div>
    );
  };
  return (
    <div className="modal-view-container">
      <div className="modal-container">
        <h2 className="title">You {type === "won" ? "won!" : "lost"}</h2>
        <div className="puzzle">
          {completedWords.map((word, i) => (
            <Square key={i} word={word} solution={solution} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Modal;
