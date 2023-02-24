import React from "react";
import Box from "./Box";

const RowEmpty = () => {
  return (
    <div className="row">
      {Array.from(Array(5)).map((_, i) => (
        <Box key={i} value="" status="empty" />
      ))}
    </div>
  );
};

export default RowEmpty;
