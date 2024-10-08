import React, { ReactNode } from "react";
import { IconType } from "react-icons";

type propsType = {
  icon: ReactNode;
  onClick: () => void;
  customeStyle?: string;
};

const IconButton = ({ icon, onClick, customeStyle }: propsType) => {
  const handelButton = () => {
    onClick();
  };
  return (
    <button
      onClick={handelButton}
      className={` text-2xl p-2  rounded-xl transition  duration-300 hover:border ${
        customeStyle
          ? customeStyle
          : "bg-primary text-white hover:border-primary hover:bg-transparent hover:text-primary"
      }`}
    >
      {icon}
    </button>
  );
};

export default IconButton;
