"use client";
import React, { ReactNode, useState } from "react";
import IconButton from "./IconButton";
import dynamic from "next/dynamic";
const Modal = dynamic(() => import("./Modal"), {
  loading: () => <p>Loading...</p>,
});
type propsType = {
  modalContent: ReactNode;
  icon: ReactNode;
  customeStyle?: string;
  ModalTitle?: string;
};

const ModalButton = ({
  modalContent,
  icon,
  customeStyle,
  ModalTitle,
}: propsType) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <IconButton
        customeStyle={customeStyle}
        onClick={toggleModal}
        icon={icon}
      />
      <Modal ModalTitle={ModalTitle} isOpen={isOpen} onClose={toggleModal}>
        <div>{modalContent}</div>
      </Modal>
    </div>
  );
};

export default ModalButton;
