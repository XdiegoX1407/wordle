import React from "react";
import Box from "./Box";

const RowCompleted = ({ word, solution }) => {
  const checkLetter = (letter, pos) => {
    if (solution.includes(letter)) {
      if (solution[pos] === letter) {
        return "correct";
      } else {
        return "present";
      }
    } else {
      return "absent";
    }
  };
  return (
    <div className="row">
      {Array.from(Array(5)).map((_, i) => (
        <Box key={i} value={word[i]} status={checkLetter(word[i], i)} />
      ))}
    </div>
  );
};

export default RowCompleted;
