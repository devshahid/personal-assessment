import React from "react";
import "./style.css";
const TagModal = ({ show, onClose, children }) => {
  if (!show) return null;

  return (
    <div className="modal-popup">
      <div className="modal-backdrop" onClick={onClose}></div>
      {children}
    </div>
  );
};

export default TagModal;
