import { useState } from "react";
import "./formInput.css";

const FormInput = (props) => {
  const [focused, setFocused] = useState(false);
  const { label, errorMessage, onChange, id, ...inputProps } = props;

  const handleFocus = (e) => {
    setFocused(true);
  };

  return (
    <div className="formInput">
      <label className="block mb-2 text-sm font-medium text-white dark:text-white">{label}</label>
      <input
        {...inputProps}
        className="form-control bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        onChange={onChange}
        onBlur={handleFocus}
        onFocus={() =>
          inputProps.name === "passwordConfirm" && setFocused(true)
        }
        focused={focused.toString()}
      />
      <span className="err-span">{errorMessage}</span>
    </div>
  );
};

export default FormInput;

