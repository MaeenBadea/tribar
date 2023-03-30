import React from "react";

export default function Button({title}) {
  return (
    <button role="button" className="button-input">
      {title}
    </button>
  );
}
