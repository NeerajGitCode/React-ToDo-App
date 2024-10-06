import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Modal from "./components/Modal";
import { v4 as uuidv4 } from "uuid";
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { TbFlag3 } from "react-icons/tb";
import Slider from "./components/Slider";
import { IoIosList } from "react-icons/io";
function App() {
  const [Todo, setTodo] = useState("");
  const [Todos, setTodos] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");
  const [showCompleted, setShowCompleted] = useState(false); // State for filtering completed todos
  const [isSliderOpen, setIsSliderOpen] = useState(false);
  const [sliderContent, setSliderContent] = useState("");
  const [sliderId, setSliderId] = useState("");
  useEffect(() => {
    window.history.pushState(null, "", window.location.href);
  }, []);
  // Prevent default back behavior
  useEffect(() => {
    const handlePopState = () => {
      if (isSliderOpen) {
        setIsSliderOpen(false); // Close the slider when back button is pressed
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState); // Cleanup listener on unmount
    };
  }, [isSliderOpen]);

  const openSlider = (text, id) => {
    setSliderContent(text);
    setSliderId(id);
    setIsSliderOpen(true);
    window.history.pushState(null, "", window.location.href);
  };
  const handleSaveSlider = (id, newContent) => {
    setTodos(
      Todos.map((todo) =>
        todo.id === id ? { ...todo, text: newContent } : todo
      )
    ); // Close the slider after saving
  };

  const handleEdit = (id, text) => {
    setEditingId(id);
    setEditText(text);
  };

  const saveEdit = () => {
    setTodos(
      Todos.map((todo) =>
        todo.id === editingId ? { ...todo, text: editText } : todo
      )
    );
    setEditingId(null);
    setEditText("");
  };

  const handleDelete = (id) => {
    setDeleteId(id);
    setIsModalOpen(true);
  };
  const handleDelete2 = (id) => {
    setDeleteId(id);
  };
  const confirmDelete = () => {
    const updatedTodos = Todos.filter((todo) => todo.id !== deleteId);
    setTodos(updatedTodos); // Update the Todos state
    localStorage.setItem("todos", JSON.stringify(updatedTodos)); // Update localStorage
    setIsModalOpen(false);
    setDeleteId(null);
  };
  const onConfirm2 = () => {
    const updatedTodos = Todos.filter((todo) => todo.id !== deleteId);
    setTodos(updatedTodos); // Update the Todos state
    localStorage.setItem("todos", JSON.stringify(updatedTodos)); // Update localStorage
    setDeleteId(null);
  };
  const clearSliderContent = () => {
    setSliderContent("");
  };

  const handleAdd = () => {
    if (Todo.trim()) {
      const currentDate = new Date().toLocaleString(); // Get the current date
      setTodos([
        ...Todos,
        { id: uuidv4(), text: Todo, isCompleted: false, date: currentDate }, // Add date to the todo
      ]);
      setTodo("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleAdd();
    }
  };

  const handleKeyDown2 = (e) => {
    if (e.key === "Enter") {
      saveEdit();
    }
  };

  const handleInputChange = (e) => {
    setTodo(e.target.value);
  };

  const handleEditChange = (e) => {
    setEditText(e.target.value);
  };

  const handleChange = (e) => {
    const id = e.target.name;
    setTodos(
      Todos.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      )
    );
  };

  // useEffect to save Todos to localStorage whenever they change
  useEffect(() => {
    if (Todos.length > 0) {
      localStorage.setItem("todos", JSON.stringify(Todos));
    }
  }, [Todos]);

  // Load todos from localStorage when the component mounts
  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem("todos"));
    if (savedTodos) {
      setTodos(savedTodos);
    }
  }, []);

  const displayedTodos = showCompleted
    ? Todos
    : Todos.filter((todo) => !todo.isCompleted);
  return (
    <>
      <Navbar />
      <div className=" min-h-[94.7vh] xl:w-[1200px] m-auto py-10 max-lg:px-2 w-[100vw] ">
        <div className=" xl:w-[1200px] flex items-center justify-between max-md:flex-col">
          <input
            type="text"
            placeholder="Type Your Todo"
            value={Todo}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            className=" placeholder:italic placeholder:text-slate-400 border border-gray-800 focus:border-black px-2 w-[70%] max-md:w-full py-2 rounded-full shadow-lg transition duration-400 ease-in-out"
          />
          <button
            onClick={handleAdd}
            className="bg-pink-500 hover:bg-pink-600 text-white font-bold max-md:w-full max-md:my-2 max-md:rounded-full py-2 px-4 rounded-md shadow-md transition duration-300 ease-in-out transform hover:scale-105"
          >
            Add
          </button>
        </div>

        <div className="flex items-center my-4">
          <input
            type="checkbox"
            id="showCompleted"
            checked={showCompleted}
            onChange={() => setShowCompleted((prev) => !prev)}
            className="mr-2 placeholder:italic placeholder:text-slate-400"
          />
          <label htmlFor="showCompleted" className="font-semibold">
            Show Completed Todos
          </label>
        </div>

        <div className="todos flex flex-col gap-1">
          {displayedTodos.length === 0 ? (
            <div className="p-2">
              <span className="font-bold">No Todos To Display</span>
            </div>
          ) : (
            <div className="p-2">
              <span className="font-bold">Your Todos</span>
            </div>
          )}
          {displayedTodos.map((item) => (
            <div
              key={item.id}
              className="relative todo flex items-center justify-between px-3 py-1 my-1 bg-white rounded-lg max-h-[76px] min-h-[76px] w-[100%]"
            >
              <div className="flex items-center gap-5 font-semibold text-xl">
                <input
                  onChange={handleChange}
                  checked={item.isCompleted}
                  type="checkbox"
                  name={item.id}
                  id={item.id}
                  className="placeholder:italic placeholder:text-slate-400"
                />

                {editingId === item.id ? (
                  <input
                    type="text"
                    value={editText}
                    onChange={handleEditChange}
                    onKeyDown={handleKeyDown2}
                    className="border border-gray-800 px-2 rounded-md placeholder:italic placeholder:text-slate-400"
                  />
                ) : (
                  <span
                    onClick={(e) => {
                      e.stopPropagation();
                      openSlider(item.text, item.id);
                    }} // Prevent checkbox toggle
                    className={`${
                      item.isCompleted ? "line-through" : ""
                    } overflow-hidden text-ellipsis line-clamp-1 max-md:text-sm max-md:max-w-[75%] absolute  top-2 left-11 font-[650]`}
                  >
                    {item.text}
                  </span>
                )}
              </div>
              <div className="flex p-2 gap-3 ml-5 max-md:p-0">
                <TbFlag3 className="md:hidden max-md:block text-gray-500 text-xl" />
                {editingId === item.id ? (
                  <>
                    <button
                      onClick={saveEdit}
                      className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-md shadow-md transition duration-300 ease-in-out transform hover:scale-105 main-btn"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-md shadow-md transition duration-300 ease-in-out transform hover:scale-105 main-btn"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => handleEdit(item.id, item.text)}
                      className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded-md shadow-md transition duration-300 ease-in-out transform hover:scale-105 main-btn"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded-md shadow-md transition duration-300 ease-in-out transform hover:scale-105 main-btn"
                    >
                      <AiFillDelete />
                    </button>
                  </>
                )}
              </div>
              <div className="text-gray-500 text-[13px] font-bold absolute  bottom-1 left-11  w-[200px]">
                {item.date}
              </div>
            </div>
          ))}
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={confirmDelete}
        message="Are you sure you want to delete this todo?"
      />
      <Slider
        isOpen={isSliderOpen}
        onClose={() => setIsSliderOpen(false)} // Close the slider
        content={sliderContent}
        id={sliderId} // Pass the content to the slider
        onSave={handleSaveSlider} // Save function
        onDelete={handleDelete2} // Delete function
        onConfirm2={onConfirm2}
        onClearContent={clearSliderContent}
      />
    </>
  );
}

export default App;
