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
};

const ModalButton = ({ modalContent, icon }: propsType) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <IconButton onClick={toggleModal} icon={icon} />
      <Modal isOpen={isOpen} onClose={toggleModal}>
        <div>{modalContent}</div>
      </Modal>
    </div>
  );
};

export default ModalButton;
