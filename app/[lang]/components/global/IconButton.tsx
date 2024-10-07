import React, { ReactNode } from "react";
import { IconType } from "react-icons";

type propsType = {
  icon: ReactNode;
  onClick: () => void;
};

const IconButton = ({ icon, onClick }: propsType) => {
  const handelButton = () => {
    onClick();
  };
  return (
    <button
      onClick={handelButton}
      className=" text-2xl p-2 bg-primary text-white rounded-xl transition  duration-300 hover:border hover:border-primary hover:bg-transparent hover:text-primary"
    >
      {icon}
    </button>
  );
};

export default IconButton;
