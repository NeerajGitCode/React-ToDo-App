/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { useState } from "react";
import Modal from "./Modal";

const Slider = ({
  isOpen,
  onClose,
  content,
  id,
  onSave,
  onEdit,
  onDelete,
  onCancel,
  onConfirm2,
  onClearContent,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!Slider) {
    return null;
  }
  return (
    <div
      className={`fixed top-0 left-0 h-full w-[100vw] bg-gray-100 shadow-lg transform transition-transform duration-500 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex justify-between items-center p-4 bg-pink-500 text-white">
        <h2 className="text-lg font-bold">Todo Details</h2>
        <button onClick={onClose} className="text-lg font-bold">
          X
        </button>
      </div>
      <div className="p-4">
        <p>{content}</p>
      </div>
      <div className="slider-buttons flex gap-3 p-2 justify-between">
        <button
          onClick={onSave}
          className="slider-button  bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-2 rounded-md shadow-md transition duration-300 ease-in-out transform hover:scale-105"
        >
          Save
        </button>
        <button
          onClick={onEdit}
          className="slider-button  bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-2 rounded-md shadow-md transition duration-300 ease-in-out transform hover:scale-105"
        >
          Edit
        </button>
        <button
          onClick={() => {
            onDelete(id);
            setIsModalOpen(true);
          }}
          className="slider-button  bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-2 rounded-md shadow-md transition duration-300 ease-in-out transform hover:scale-105"
        >
          Delete
        </button>
        <button
          onClick={onCancel}
          className="slider-button bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-2 rounded-md shadow-md transition duration-300 ease-in-out transform hover:scale-105"
        >
          Cancel
        </button>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={() => {
          onConfirm2(id);
          onClearContent();
          setIsModalOpen(false);
        }}
        message="Are you sure you want to delete this todo?"
      />
    </div>
  );
};

export default Slider;
