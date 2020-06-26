import React from "react";

export const CheckBox = (props) => {
  return (
    <li>
      <input
        key={props.id}
        onChange={props.handleCheckElement}
        type="checkbox"
        checked={props.isChecked}
        value={props.name}
      />{" "}
      {props.name}
    </li>
  );
};

export default CheckBox;
