import React from "react";

type propsType = {
  textAreaProps: React.HTMLProps<HTMLTextAreaElement>;
  label?: string;
  labelStyle?: string;
};

const TextArea = ({ textAreaProps, label, labelStyle }: propsType) => {
  return (
    <div className="w-full">
      <label
        className={`block mb-2 text-sm font-medium ${
          labelStyle ? labelStyle : "text-secondary"
        }  `}
      >
        {label}
      </label>
      <textarea
        {...textAreaProps}
        className="bg-gray-50 border resize-y   border-gray-300 text-black rounded-lg focus:outline-primary focus:ring-primary focus:border-primary block w-full p-2.5 placeholder-gray-400  "
      />
    </div>
  );
};

export default TextArea;
