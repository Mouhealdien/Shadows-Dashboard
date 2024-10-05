import React from "react";

type propsType = {
  inputProps: React.HTMLProps<HTMLInputElement>;
  label?: string;
};

const Input = ({ inputProps, label }: propsType) => {
  return (
    <div>
      <label className="block mb-2 text-sm font-medium text-secondary ">
        {label}
      </label>
      <input
        {...inputProps}
        className="bg-gray-50 border border-gray-300 text-black rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 placeholder-gray-400  "
      />
    </div>
  );
};

export default Input;
