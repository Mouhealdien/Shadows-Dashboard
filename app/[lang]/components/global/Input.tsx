import React from "react";

type propsType = {
  inputProps: React.HTMLProps<HTMLInputElement>;
  label?: string;
  labelStyle?: string;
};

const Input = ({ inputProps, label, labelStyle }: propsType) => {
  return (
    <div className="w-full">
      <label
        className={`block mb-2 text-sm font-medium ${
          labelStyle ? labelStyle : "text-secondary"
        }  `}
      >
        {label}
      </label>
      <input
        {...inputProps}
        className="bg-gray-50 border   border-gray-300 text-black rounded-lg focus:outline-primary  focus:ring-primary focus:border-primary block w-full p-2.5 placeholder-gray-400  "
      />
    </div>
  );
};

export default Input;
