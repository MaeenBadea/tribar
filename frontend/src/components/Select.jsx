import React from "react";

export default function Select(props) {
  return (
    <div>
      <div class="labels">
        <label for="dropdown">* {props.label}</label>
      </div>
      <div class="input-tab">
        <select id="dropdown" name={props.name} onChange={props.onChange}>
          <option disabled value selected>
            Select an option
          </option>
          {props.options.map((opt)=>(
            <option value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>
    </div>
  );
}
