import React from "react";
import Box from "./Box";

const RowCurrent = ({ word }) => {
  const wordArray = word.split("");
  return (
    <div className="row">
      {wordArray.map((letter, i) => (
        <Box key={i} value={letter} status="edit" />
      ))}
      {Array.from(Array(5 - wordArray.length)).map((_, i) => (
        <Box key={i} value={""} status="edit" />
      ))}
    </div>
  );
};

export default RowCurrent;
