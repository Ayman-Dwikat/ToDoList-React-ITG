export default function TaskSwitch({ task, checked, onChange }) {
  if (task.state === "pending") {
    return (
      <div className="form-check form-switch mt-4">
        <input
          className="form-check-input"
          type="checkbox"
          id={task.id}
          checked={checked}
          onChange={onChange}
        />
        <label className="form-check-label" htmlFor={task.id}>
          Mark as completed
        </label>
      </div>
    );
  } else if (task.state === "completed") {
    return (
      <div className="form-check form-switch mt-4">
        <input className="form-check-input" type="checkbox" checked disabled />
        <label className="form-check-label">Completed</label>
      </div>
    );
  } else if (task.state === "not completed") {
    return (
      <div className="form-check form-switch mt-4">
        <input
          className="form-check-input"
          style={{ backgroundColor: "rgba(255, 0, 0, 0.28)" }}
          type="checkbox"
          disabled
        />
        <label className="form-check-label text-danger">Not completed</label>
      </div>
    );
  }

  return null;
}
