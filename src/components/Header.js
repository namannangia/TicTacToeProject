import React from "react";

function Header({ record, tries }) {
  return (
    <h1
      style={{
        fontWeight: "400",
        fontVariant: "small-caps",
        marginBottom: "70px",
        textAlign: "center",
      }}
    >
      Live
      <br /> tic-tac-toe
      <br />
      {/* {record
        .substring(0, 3)
        .concat(
          "-",
          record.substring(3, 6),
          "-",
          record.substring(6),
          " :",
          tries.toString()
        )} */}
    </h1>
  );
}

export default Header;
