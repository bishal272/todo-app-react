import { useEffect, useState } from "react";

import "./App.css";
import Task from "./components/Task";
import TodoForm from "./components/TodoForm";

function App() {
  const [tasks, setTasks] = useState([]);
  const [firstRender, setFirstRender] = useState(true);

  // * stores the tasks array at every render to local storage
  useEffect(() => {
    if (tasks.length === 0 && !firstRender) {
      localStorage.removeItem("tasks");
      return;
    }
    if (tasks.length === 0 && firstRender) {
      setFirstRender(false);
      return;
    }
    // * stops it from running at start
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks, firstRender]);

  // * get tasks if there is any in the local storage ie, runs at the start only as there is no dependency

  useEffect(() => {
    const tasks = JSON.parse(localStorage.getItem("tasks"));
    if (tasks) {
      setTasks(tasks);
    }
  }, []);
  const addTask = (name) => {
    setTasks((prev) => {
      return [...prev, { name: name, done: false }];
    });
  };
  const updateTaskDone = (newDone, index) => {
    setTasks((prev) => {
      const newTasks = [...prev];
      newTasks[index].done = newDone;
      return newTasks;
    });
  };
  const deleteTask = (index) => {
    setTasks((prev) => {
      return prev.filter((taskPrev, idx) => idx !== index);
    });
  };
  const renameTask = (index, newName) => {
    setTasks((prev) => {
      const newTasks = [...prev];
      newTasks[index].name = newName;
      return newTasks;
    });
  };
  const numberOfTask = tasks.filter((task) => task.done).length;
  const taskTotal = tasks.length;
  const getMessage = () => {
    const percentage = (numberOfTask / taskTotal) * 100;
    if (percentage === 0) {
      return "try to do atleast one! 🙏🏼";
    }
    if (percentage === 100) {
      return "Nice Job for today! 🏝️";
    }
    return "keep it going 💪🏼";
  };

  return (
    <div>
      <main>
        <h1>
          {numberOfTask}/{taskTotal} Tasks Complete
        </h1>
        <h2>{getMessage()}</h2>
        <TodoForm onAdd={addTask} />
        {tasks.map((task, index) => (
          <Task
            key={index}
            {...task}
            onRename={(newName) => renameTask(index, newName)}
            onTrash={() => deleteTask(index)}
            onToggle={(done) => updateTaskDone(done, index)}
          />
        ))}
      </main>
      <footer>Made with ❤️ by Bishal</footer>
    </div>
  );
}

export default App;
