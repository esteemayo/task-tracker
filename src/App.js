import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

import { getTasks, createTask, deleteTask } from "./services/taskService";
import AddTask from "./components/AddTask";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Tasks from "./components/Tasks";
import About from "./components/About";

import "react-toastify/dist/ReactToastify.css";

axios.defaults.baseURL = "http://localhost:5000/";

function App() {
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    (async function fetchTasks() {
      const { data } = await getTasks();
      setTasks(data);
    })();
  }, []);

  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`);
    const data = await res.json();
    return data;
  };

  const addTask = async (task) => {
    const { data } = await createTask(task);
    const newTask = [...tasks, data];
    setTasks(newTask);

    // const id = Math.floor(Math.random() * 10000) + 1;
    // const newTask = { id, ...task };
    // setTasks([ ...tasks, newTask]);
  };

  const handleDeleteTask = async (id) => {
    const originalTasks = tasks;
    const newTasks = originalTasks.filter((t) => t.id !== id);
    setTasks(newTasks);

    try {
      await deleteTask(id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error("This task has already been deleted.");
      setTasks(originalTasks);
    }
  };

  const handleToggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id);
    const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder };

    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(updTask),
    });

    const data = await res.json();

    const reminder = tasks.map((task) =>
      task.id === id ? { ...task, reminder: data.reminder } : task
    );

    setTasks(reminder);
  };

  return (
    <Router>
      <div className="container">
        <ToastContainer />
        <Header
          onAdd={() => setShowAddTask(!showAddTask)}
          showAdd={showAddTask}
        />
        <Switch>
          <Route
            path="/"
            exact
            render={(props) => (
              <>
                {showAddTask && <AddTask onAdd={addTask} {...props} />}
                {tasks.length > 0 ? (
                  <Tasks
                    tasks={tasks}
                    onDelete={handleDeleteTask}
                    onToggle={handleToggleReminder}
                    {...props}
                  />
                ) : (
                  "No Tasks To Show"
                )}
              </>
            )}
          />
          <Route path="/about" exact component={About} />
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
