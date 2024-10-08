"use client";

type propsType = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  ModalTitle?: string;
};

import React, { ReactNode } from "react";

const Modal = ({ isOpen, onClose, children, ModalTitle }: propsType) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-40">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl mx-3 relative">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-3xl font-bold"> {ModalTitle}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
