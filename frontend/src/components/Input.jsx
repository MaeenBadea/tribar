import React from "react";

export default function Input(props) {
  return (
    <div>
      <div class="labels">
        <label id="name-label">
          * {props.label}
        </label>
      </div>
      <div class="input-tab">
        <input
          class="input-field"
          type={props.type || "text"}
          name={props.name}
          value={props.value}
          placeholder={props.placeholder}
          onChange={props.onChange}
          required
          autofocus
          max={1000}
        />
      </div>
    </div>
  );
}
