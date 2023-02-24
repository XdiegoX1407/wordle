import React, { useState } from "react";
import Box from "./Box";

const Instructions = ({ changeVisibility }) => {
  return (
    <div className="modal-view-container">
      <article className="instructions-container">
        <button onClick={changeVisibility}>X</button>
        <h2>How To Play</h2>
        <p className="subtitle">Guess the Wordle in 6 tries</p>
        <ul>
          <li>Each guess must be a valid 5-letter word.</li>
          <li>
            The color of the tiles will change to show how close your guess was
            to the word.
          </li>
        </ul>
        <h3>Examples</h3>
        <div className="row">
          <Box status={"correct"} value={"W"} />
          <Box value={"E"} />
          <Box value={"A"} />
          <Box value={"R"} />
          <Box value={"Y"} />
        </div>
        <p>W is in the word and in the correct spot.</p>
        <div className="row">
          <Box value={"P"} />
          <Box status={"present"} value={"I"} />
          <Box value={"L"} />
          <Box value={"L"} />
          <Box value={"S"} />
        </div>
        <p>I is in the word but in the wrong spot.</p>
        <div className="row">
          <Box value={"V"} />
          <Box value={"A"} />
          <Box value={"G"} />
          <Box status={"absent"} value={"U"} />
          <Box value={"E"} />
        </div>
        <p>U is not in the word in any spot.</p>
        <p className="new-puzzle">
          A new puzzle is released daily at midnight. I hope you enjoy.
        </p>
      </article>
    </div>
  );
};

export default Instructions;
