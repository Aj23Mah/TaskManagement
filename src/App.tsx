import { useState } from "react";
import "./App.css";

const App = () => {
  const [toggleModal, setToggleModal] = useState(false);
  const [toggleEditModal, setToggleEditModal] = useState(false);
  const initialData = {
    title: "",
    description: "",
  };

  const [todoList, setTodoList] = useState([
    { id: "1", title: "Task 1", des: "this is description of task 1" },
    { id: "2", title: "Task 2", des: "this is description of task 2" },
    { id: "3", title: "Task 3", des: "this is description of task 3" },
    { id: "4", title: "Task 4", des: "this is description of task 3" },
    { id: "5", title: "Task 5", des: "this is description of task 3" },
  ]);

  const [inputData, setInputData] = useState({
    ...initialData,
  });

  const inputHandler = (e: any) => {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: any) => {
    // e.preventDefault();
    setTodoList([...todoList, setInputData]);
    setInputData("");
    console.log(inputData);
  };

  const handleEdit = (id: any) => {
    console.log("edit id no.", id);
    
  };

  const handleDelete = (id: any) => {
    console.log(id);
    setTodoList(todoList.filter((item) => item.id !== id));
    console.log(todoList);
  };

  return (
    <div className="flex justify-center relative">
      <div className="w-[500px] h-screen bg-slate-200 text-black py-7">
        <div className="text-2xl text-center">TODO List</div>
        <div>
          <div className="text-xl font-semibold gap-4 text-center pb-4">
            Add New Tasks
            <button
              className="bttn bg-blue-400"
              onClick={() => setToggleModal(!toggleModal)}
            >
              Add
            </button>
          </div>

          <div>
            {todoList.map((item, key) => (
              <div key={key} className="p-4">
                <div className="text-xl font-medium">{item.title}</div>
                <div className="text-lg">{item.des}</div>
                <div className="mt-2">
                  <button
                    className="bttn bg-blue-400"
                    // onClick={() => handleEdit(item.id)}
                    onClick={() => [setToggleModal(!toggleModal), handleEdit(item.id)]}
                  >
                    Edit
                  </button>
                  <button
                    className="bttn bg-red-400"
                    onClick={() => handleDelete(item.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          {toggleModal && (
            <div className="absolute top-0 left-0 h-screen w-full flex justify-center items-center">
              <div
                className="bg-gray-400 opacity-55 h-screen w-full"
                onClick={() => setToggleModal(!toggleModal)}
              ></div>
              <div className="absolute border bg-white w-[50%] flex flex-col items-center py-6 rounded-lg">
                <h2>Add Tasks</h2>
                <div>
                  
                  <input
                    type="text"
                    placeholder="task..."
                    name="title"
                    value={inputData.title}
                    onChange={() => {
                      inputHandler;
                    }}
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="description..."
                    name="description"
                    value={inputData.description}
                    onChange={() => {
                      inputHandler;
                    }}
                  />
                </div>
                <div>
                  <button className="bttn bg-blue-400" onClick={handleSubmit}>
                    Save
                  </button>
                  <button
                    className="bttn bg-red-400"
                    onClick={() => setToggleModal(!toggleModal)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {toggleEditModal && (
            <div className="absolute top-0 left-0 h-screen w-full flex justify-center items-center">
              <div
                className="bg-gray-400 opacity-55 h-screen w-full"
                onClick={() => setToggleEditModal(!toggleEditModal)}
              ></div>
              <div className="absolute border bg-white w-[50%] flex flex-col items-center py-6 rounded-lg">
                <h2>Edit Tasks</h2>
                <div>
                  <input
                    type="text"
                    placeholder="edit title..."
                    name="title"
                    value={inputData.title}
                    onChange={() => {
                      inputHandler;
                    }}
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="edit description..."
                    name="description"
                    value={inputData.description}
                    onChange={() => {
                      inputHandler;
                    }}
                  />
                </div>
                <div>
                  <button className="bttn bg-blue-400" onClick={handleEdit}>
                    Save
                  </button>
                  <button
                    className="bttn bg-red-400"
                    onClick={() => setToggleEditModal(!toggleEditModal)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
