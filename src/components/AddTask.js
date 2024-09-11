import { useState } from "react";

export default function AddTask({ onAddTask }) {
  let now = new Date();
  let year = now.getFullYear();
  let month = ("0" + (now.getMonth() + 1)).slice(-2);
  let day = ("0" + now.getDate()).slice(-2);
  let hours = "23";
  let minutes = "59";
  let formattedDate = `${year}-${month}-${day}T${hours}:${minutes}`;

  const newBorder = "2px solid rgba(255, 54, 54, 0.879)";
  const oldBorder = "2px solid rgba(176, 176, 176, 0.804)";

  const [task, setTask] = useState({
    text: "",
    priority: "",
    deadline: formattedDate,
    state: "pending",
  });
  const [errors, setErrors] = useState({
    textError: false,
    priorityError: false,
  });

  function handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    setTask((prevTask) => ({ ...prevTask, [name]: value }));
  }

  function handleClick() {
    const newErrors = { textError: false, priorityError: false };
    // Validate task text
    if (task.text.trim() === "") {
      newErrors.textError = true;
    }
    // Validate priority
    if (task.priority.trim() === "") {
      newErrors.priorityError = true;
    }
    setErrors(newErrors);

    if (newErrors.textError === false && newErrors.priorityError === false) {
      onAddTask(task);
      setTask({
        text: "",
        priority: "",
        deadline: formattedDate,
        state: "pending",
      });
    }
  }

  return (
    <div className="row">
      <div className="col-sm-8 col-lg-5 col-xl-6 mb-3">
        <input
          type="text"
          name="text"
          value={task.text}
          onChange={handleChange}
          placeholder="Add a new task..."
          style={{ border: errors.textError ? newBorder : oldBorder }}
        />
        {errors.textError && <span className="error">Is required</span>}
      </div>

      <div className="col-sm-4 col-lg mb-3">
        <select
          name="priority"
          value={task.priority}
          onChange={handleChange}
          style={{ border: errors.priorityError ? newBorder : oldBorder }}
        >
          <option value="">Priority --</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        {errors.priorityError && <span className="error">Is required</span>}
      </div>

      <div className="col-sm-8 col-lg mb-3">
        <input
          type="datetime-local"
          name="deadline"
          min={formattedDate}
          value={task.deadline}
          onChange={handleChange}
        />
      </div>

      <div className="col-sm-4 col-lg mb-4">
        <button type="button" className="btn btn-success" onClick={handleClick}>
          Add Task
        </button>
      </div>
    </div>
  );
}
