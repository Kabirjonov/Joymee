import React from "react";

function Input(props) {
  const {
    label,
    type = "text",
    state,
    setState,
    name,
    options = [],
    placeholder,
    required = true,
    disabled,
    multiple=false,
    className = "",
    id,
  } = props;
  return type === "dropdown" ? (
    <select
      value={state}
      className="m-2 form-control text-capitalize"
      onChange={(e) => setState(e.target.value)}
      required={required}
      disabled={disabled}
    >
      <option value="" disabled={true}>
        Select {label}
      </option>
      {options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  ) : type === "textarea" ? (
    <textarea
      className="form-control m-2"
      value={state}
      onChange={(e) => setState(e.target.value)}
      placeholder={placeholder || label}
      required={required}
      disabled={disabled}
    />
  ) : type === "checkbox" ? (
    <input
      type="checkbox"
      checked={state}
      onChange={(e) => setState(e.target.checked)}
      className="form-check-input mx-2"
    />
  ) : type === "radio" ? (
    <div>
      {options.map((option, index) => (
        <label key={index} className="form-check-label">
          <input
            type="radio"
            name={name}
            value={option}
            checked={state === option}
            onChange={() => setState(option)}
            className="form-check-input"
          />
          {option}
        </label>
      ))}
    </div>
  ) : (
    <input
      type={type}
      value={state}
      onChange={(e) => setState(e.target.value)}
      className={`m-2 form-control capitalize ${className}`}
      placeholder={label}
      required={required}
      disabled={disabled}
      multiple={multiple}
      id={label|type}
    />
  );
}

export default Input;
