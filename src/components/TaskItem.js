import { useState } from "react";
import TaskSwitch from "./TaskSwitch";
import ModalComponent from "./ModalComponent";

export default function TaskItem({ task, onDelete, onChange }) {
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [showCompleteModal, setShowCompleteModal] = useState(false);
  const [switchChecked, setSwitchChecked] = useState(false);
  const [editedTask, setEditedTask] = useState({
    text: task.text,
    priority: task.priority,
    deadline: task.deadline,
  });

  const formattedDeadline = task.deadline.replace("T", " ");

  function handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    setEditedTask((prevTask) => ({ ...prevTask, [name]: value }));
  }

  function handleConfirmSave() {
    onChange({
      ...task,
      text: editedTask.text,
      priority: editedTask.priority,
      deadline: editedTask.deadline,
    });
    setIsEditing(false);
    setShowSaveModal(false);
  }

  function handleConfirmDelete() {
    onDelete(task.id);
    setShowDeleteModal(false);
  }

  function handleConfirmCompleted() {
    onChange({
      ...task,
      state: "completed",
    });
    setShowCompleteModal(false);
    setSwitchChecked(false);
  }

  function handleSwitchChange() {
    setSwitchChecked(true);
    setShowCompleteModal(true);
  }

  function handleCompleteModalHide() {
    if (switchChecked) {
      setSwitchChecked(false);
    }
    setShowCompleteModal(false);
  }

  return (
    <div className="task" data-state={task.state}>
      <div className="row">
        <div className="col-12 col-lg-9 text-center text-lg-start">
          {isEditing ? (
            <div>
              <input
                type="text"
                name="text"
                value={editedTask.text}
                onChange={handleChange}
                className="form-control mb-2"
                placeholder="Task title"
              />
              <select
                name="priority"
                value={editedTask.priority}
                onChange={handleChange}
                className="form-select mb-2"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
              <input
                type="datetime-local"
                name="deadline"
                min={task.deadline}
                value={editedTask.deadline}
                onChange={handleChange}
                className="form-select mb-2"
              />
            </div>
          ) : (
            <>
              <p className="mb-2">{task.text}</p>
              Priority:{" "}
              <span className="me-2 text-danger">{task.priority},</span>
              Deadline:{" "}
              <span className="me-2 text-danger">{formattedDeadline},</span>
              State: <span className="text-danger">{task.state}</span>
            </>
          )}
        </div>
        <div className="col d-flex justify-content-center justify-content-lg-end align-items-center mt-lg-0 mt-4">
          {isEditing ? (
            <button
              type="button"
              className="btn btn-outline-primary me-3"
              onClick={() => setShowSaveModal(true)}
            >
              Save
            </button>
          ) : (
            <button
              type="button"
              className="btn btn-outline-primary me-3"
              onClick={() => setIsEditing(true)}
            >
              Edit
            </button>
          )}
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => setShowDeleteModal(true)}
          >
            Delete
          </button>
        </div>
      </div>
      <TaskSwitch
        task={task}
        checked={switchChecked}
        onChange={handleSwitchChange}
      />

      <ModalComponent
        show={showSaveModal}
        onHide={() => setShowSaveModal(false)}
        title="Confirm Save"
        body="Are you sure you want to save changes to this task?"
        onConfirm={handleConfirmSave}
        confirmText="Save Changes"
        variant="primary"
      />

      <ModalComponent
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        title="Confirm Delete"
        body="Are you sure you want to delete this task?"
        onConfirm={handleConfirmDelete}
        confirmText="Delete"
        variant="danger"
      />

      <ModalComponent
        show={showCompleteModal}
        onHide={handleCompleteModalHide}
        title="Confirm Completed"
        body="Are you sure you want to mark this task as completed?"
        onConfirm={handleConfirmCompleted}
        confirmText="Completed"
        variant="primary"
      />
    </div>
  );
}
