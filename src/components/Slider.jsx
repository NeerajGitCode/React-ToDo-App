/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect, useRef } from "react";
import Modal from "./Modal";
import { AiFillDelete } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
const Slider = ({
  isOpen,
  onClose,
  content,
  id,
  onSave,
  onDelete,
  onConfirm2,
  onClearContent,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false); // Track if in edit mode
  const [editText, setEditText] = useState(content);
  const [isDeleted, setIsDeleted] = useState(false);
  const textareaRef = useRef(null);
  useEffect(() => {
    if (isOpen) {
      setIsDeleted(false);
      setEditText(content);
      setIsEditing(true);
      // Add event listener for back button
    }
  }, [isOpen, content]);

  useEffect(() => {
    adjustTextareaHeight();
  }, [editText]);

  useEffect(() => {
    if (isEditing) {
      adjustTextareaHeight();
    }
  }, [isEditing]);
  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"; // Reset height to auto
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // Set height based on scrollHeight
    }
  };
  const handleEditSave = () => {
    if (editText.trim() === "") {
      alert("Content cannot be empty."); // Alert user if empty
      return; // Prevent saving
    }
    onSave(id, editText); // Call onSave with the new content and ID (parent function)
    setIsEditing(false); // Exit edit mode after saving
  };

  if (!isOpen) {
    return null;
  }
  const handleConfirmDelete = async () => {
    await onConfirm2(id); // Confirm delete action from the parent
    // Mark the item as deleted
    await onClearContent(); // Clear content (if needed)
    setIsModalOpen(false); // Close modal after deletion
    onDelete(id); // Call onDelete from parent immediately after confirming
    setIsDeleted(true);
  };
  const handleInputChange = (e) => {
    setEditText(e.target.value);
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleEditSave();
    }
  };

  return (
    <div
      className={`fixed top-0 left-0 h-full w-[100vw] bg-[#d2e8ff] shadow-lg transform transition-transform duration-500 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex justify-between items-center p-4 bg-white text-black">
        <h2 className="text-lg font-bold">Todo Details</h2>
        <button onClick={onClose} className="text-lg font-bold">
          <IoCloseSharp />
        </button>
      </div>

      <div className="p-2">
        {isEditing ? (
          <textarea
            ref={textareaRef}
            value={editText}
            onChange={handleInputChange}
            className="w-full p-1 border border-gray-300 rounded-sm placeholder:italic placeholder:text-slate-400  resize-none" // Prevent manual resizing
            rows={1} // Initial row count
            style={{ overflow: "hidden", minHeight: "40px" }} // Set a minimum height
            onKeyDown={handleKeyDown}
          />
        ) : (
          <div className="bg-white p-1 rounded-sm min-h-8">
            {isDeleted ? (
              <span className="text-red-700 font-bold">Tasks Deleted...</span>
            ) : (
              <span>{editText}</span>
            )}
          </div>
        )}
      </div>

      <div className="slider-buttons flex gap-12 p-2 justify-center px-3 fixed bottom-8">
        {isDeleted ? null : isEditing ? (
          <button
            onClick={handleEditSave} // Save the changes
            className="slider-button bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-[20px] rounded-md shadow-md transition duration-300 ease-in-out transform hover:scale-105"
          >
            Save
          </button>
        ) : (
          <button
            onClick={() => setIsEditing(true)} // Switch to edit mode
            className="slider-button bg-[#1996cb] hover:bg-gray-600 text-white font-bold py-2 px-6 rounded-md shadow-md transition duration-300 ease-in-out transform hover:scale-105"
          >
            <FaEdit />
          </button>
        )}
        {isDeleted ? null : (
          <button
            onClick={() => {
              onDelete(id);
              setIsModalOpen(true);
            }} // Open the modal for deletion confirmation
            className="slider-button bg-red-600 hover:bg-gray-600 text-white font-bold py-2 px-6 rounded-md shadow-md transition duration-300 ease-in-out transform hover:scale-105"
          >
            <AiFillDelete />
          </button>
        )}
        {isDeleted ? null : (
          <button
            onClick={() => {
              setIsEditing(false); // Exit edit mode without saving
              setEditText(content); // Reset to the original content if canceled
            }}
            className="slider-button bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-2 rounded-md shadow-md transition duration-300 ease-in-out transform hover:scale-105"
          >
            Cancel
          </button>
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmDelete}
        message="Are you sure you want to delete this todo?"
      />
    </div>
  );
};

export default Slider;
