import React from "react";

function InputStyled({
  type = "text",
  placeholder,
  name,
  list,
  onChange,
  value,
  ...props
}) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className="bg-blue-800 rounded-full p-3 autofill:bg-blue-800 outline-none"
      onChange={onChange}
      list={list}
      name={name}
      value={value}
      {...props}
    />
  );
}

export default InputStyled;
