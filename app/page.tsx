"use client";
import { useState, useEffect } from "react";

type Task = {
  title: string;
  description: string;
};

export default function TaskManager() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let updatedTasks;
    if (isEditing && editIndex !== null) {
      updatedTasks = tasks.map((task, index) =>
        index === editIndex ? { title, description } : task,
      );
      setIsEditing(false);
      setEditIndex(null);
    } else {
      updatedTasks = [...tasks, { title, description }];
    }
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    setTitle("");
    setDescription("");
  };

  const deleteHandler = (index: number) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const editHandler = (index: number) => {
    const taskToEdit = tasks[index];
    setTitle(taskToEdit.title);
    setDescription(taskToEdit.description);
    setIsEditing(true);
    setEditIndex(index);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-10">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-xl p-8">
        {!isEditing ? (
          <>
            <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
              Task Manager
            </h1>
            <form onSubmit={submitHandler} className="mb-8">
              <input
                type="text"
                className="w-full text-xl border-gray-300 border-2 rounded-lg mb-4 px-4 py-3 focus:outline-none focus:border-blue-500"
                placeholder="Enter Task Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <input
                type="text"
                className="w-full text-xl border-gray-300 border-2 rounded-lg mb-4 px-4 py-3 focus:outline-none focus:border-blue-500"
                placeholder="Enter Task Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <button className="w-full bg-blue-600 text-white px-4 py-3 text-xl font-bold rounded-lg hover:bg-blue-700 transition duration-200">
                Add Task
              </button>
            </form>
            <div className="bg-gray-50 p-6 rounded-lg shadow-inner">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Task List
              </h2>
              {tasks.length === 0 ? (
                <p className="text-gray-500">
                  No tasks available. Add a new task to get started!
                </p>
              ) : (
                <ul className="space-y-4">
                  {tasks.map((task, index) => (
                    <li
                      className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm border border-gray-200"
                      key={index}
                    >
                      <div>
                        <h5 className="text-lg font-semibold text-gray-800">
                          {task.title}
                        </h5>
                        <p className="text-gray-600">{task.description}</p>
                      </div>
                      <div className="flex space-x-3">
                        <button
                          onClick={() => editHandler(index)}
                          className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 transition duration-200"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteHandler(index)}
                          className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition duration-200"
                        >
                          Delete
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </>
        ) : (
          <div>
            <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
              Edit Task
            </h1>
            <form onSubmit={submitHandler} className="mb-8">
              <input
                type="text"
                className="w-full text-xl border-gray-300 border-2 rounded-lg mb-4 px-4 py-3 focus:outline-none focus:border-blue-500"
                placeholder="Enter Task Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <input
                type="text"
                className="w-full text-xl border-gray-300 border-2 rounded-lg mb-4 px-4 py-3 focus:outline-none focus:border-blue-500"
                placeholder="Enter Task Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <button className="w-full bg-green-600 text-white px-4 py-3 text-xl font-bold rounded-lg hover:bg-green-700 transition duration-200">
                Save Changes
              </button>
              <button
                onClick={() => {
                  setIsEditing(false);
                  setTitle("");
                  setDescription("");
                  setEditIndex(null);
                }}
                className="w-full mt-4 bg-gray-500 text-white px-4 py-3 text-xl font-bold rounded-lg hover:bg-gray-600 transition duration-200"
              >
                Cancel
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
