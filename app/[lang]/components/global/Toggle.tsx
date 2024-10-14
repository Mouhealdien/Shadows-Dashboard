import React, { useEffect, useState } from "react";
type propsType = {
  onClick?: () => void;
  state: boolean;
};
const Toggle = ({ onClick, state }: propsType) => {
  // const [checked, setChecked] = useState(state);

  console.log(state);
  // //console.log(checked);

  const handelCheck = () => {
    onClick ? onClick() : "";
  };

  // useEffect(() => {
  //   setChecked(state);
  // }, [state]);
  return (
    <label className="inline-flex items-center cursor-pointer h-fit">
      <input
        onChange={() => {
          handelCheck();
        }}
        type="checkbox"
        checked={state}
        className="sr-only peer"
      />
      <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none    rounded-full peer  peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-green-600"></div>
    </label>
  );
};

export default Toggle;
