import React from "react";
import portrait from "./images/leo-cartoon.png";

export default function Portrait() {
  return (
    <figure className="simple-portrait">
      <div className="portrait-frame">
        <img
          src={portrait}
          alt="Cartoon portrait of Leo Li wearing glasses and a navy blazer"
          width="1024"
          height="1024"
        />
      </div>
    </figure>
  );
}
