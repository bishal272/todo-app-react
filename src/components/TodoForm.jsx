import { useState } from "react";

const TodoForm = ({ onAdd }) => {
  const [taskName, setTaskName] = useState("");
  const handleSubmit = (ev) => {
    ev.preventDefault();
    onAdd(taskName);
    setTaskName("");
  };
  return (
    <form className={"taskfield"} onSubmit={handleSubmit}>
      <button>+</button>
      <input
        type="text"
        value={taskName}
        onChange={(ev) => setTaskName(ev.target.value)}
        placeholder="Your next task"
      />
    </form>
  );
};

export default TodoForm;
