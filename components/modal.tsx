import React from "react";
import { Button } from "./button";

interface ModalProps {
  children?: React.ReactNode;
  className?: string;
  close: () => void;
  save: () => void;
  isSaveAllowed?: boolean;
}

const Modal: React.FC<ModalProps> = ({
  children,
  className,
  isSaveAllowed,
  close,
  save,
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-10">
      <div className="fixed inset-0 bg-black opacity-25" />
      <div
        className={`fixed flex flex-col w-3/4 max-h-[30%] p-4 bg-m-base-end border rounded
         ${className ? className : ""}`}
      >
        <div className="flex-1">{children}</div>
        <div className="flex gap-1 justify-center">
          <Button value="Save" onClick={save} disabled={!isSaveAllowed} />
          <Button value="Cancel" onClick={close} />
        </div>
      </div>
    </div>
  );
};

export default Modal;
