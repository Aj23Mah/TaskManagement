import { useState } from "react";
import "./App.css";

const App = () => {
  const [toggleModal, setToggleModal] = useState(false);

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

  const [editTaskId, setEditTaskId] = useState<string | null>(null);

  const inputHandler = (e: any) => {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    // e.preventDefault();

    if (editTaskId) {
      // If we are editing, update the existing task
      setTodoList(
        todoList.map((task) =>
          task.id === editTaskId
            ? { ...task, title: inputData.title, des: inputData.description }
            : task
        )
      );
    } else {
      // If not editing, create a new task
      const newTask = {
        id: Date.now().toString(), // new id create
        title: inputData.title,
        des: inputData.description,
      };
      setTodoList([...todoList, newTask]);
    }

    setInputData({ ...initialData }); // Reset input fields
    setEditTaskId(null); // Reset edit mode
    setToggleModal(false); 
  };

  const handleEdit = (id: string) => {
    const taskToEdit = todoList.find((task) => task.id === id);
    if (taskToEdit) {
      setInputData({ title: taskToEdit.title, description: taskToEdit.des }); 
      setEditTaskId(id); // Set the current task being edited
      setToggleModal(!toggleModal);
    }
  };

  const handleDelete = (id: string) => {
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
              onClick={() => {
                setInputData({ ...initialData });
                setEditTaskId(null);
                setToggleModal(!toggleModal);
              }}
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
                    onClick={() => handleEdit(item.id)}
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
                <h2>{editTaskId ? "Edit Task" : "Add Task"}</h2>
                <div>
                  <input
                    type="text"
                    placeholder="task..."
                    name="title"
                    value={inputData.title}
                    onChange={inputHandler}
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="description..."
                    name="description"
                    value={inputData.description}
                    onChange={inputHandler}
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
        </div>
      </div>
    </div>
  );
};

export default App;
