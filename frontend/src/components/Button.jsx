import React from "react";

export default function Button({title,addToInput}) {
  return (
    <button role="button" className="button-input" onClick={()=>addToInput(title)}>
      {`${title}`}
    </button>
  );
}
