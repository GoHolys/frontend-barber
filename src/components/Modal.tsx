"use client";

import React, { forwardRef } from "react";

interface ModalProps {
  title: string;
  children: React.ReactNode;
}

type ModalRef = HTMLDialogElement;

const Modal = forwardRef<ModalRef, ModalProps>(({ title, children }, ref) => {
  return (
    <dialog
      ref={ref}
      className="p-0 m-0 max-w-lg w-full bg-white rounded-lg shadow-xl"
    >
      <div className="flex flex-col">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
          <button
            onClick={() =>
              (ref as React.RefObject<HTMLDialogElement>).current?.close()
            }
            className="text-gray-400 hover:text-gray-500 focus:outline-none focus:text-gray-500 transition ease-in-out duration-150"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </dialog>
  );
});

Modal.displayName = "Modal";

export default Modal;
