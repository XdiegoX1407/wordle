import React from "react";

const Box = ({ value, status }) => {
  return <div className={`box ${status}`}>{value}</div>;
};

export default Box;
