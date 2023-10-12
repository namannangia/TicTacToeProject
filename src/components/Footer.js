import React from "react";

function Footer({ chance }) {
  return (
    <div style={{ flex: 1, marginBottom: "40px" }}>
      <h1
        style={{
          margin: "50px 0px 0px 0px",
          fontWeight: "400",
          fontVariant: "small-caps",
        }}
      >
        {chance ? "Player 1 ( X )" : "Player 2 ( O )"}
      </h1>
      <h3
        style={{
          margin: "0px",
          fontWeight: "400",
          fontVariant: "small-caps",
        }}
      >
        should move now!
      </h3>
    </div>
  );
}

export default Footer;
