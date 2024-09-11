import { useState } from "react";
import TaskItem from "./TaskItem";
import ModalComponent from "./ModalComponent";

export default function TaskList({
  tasks,
  filterValue,
  onDeleteTask,
  onDeleteAllTasks,
  onChangeTask,
}) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  function handleConfirmDeleteAll() {
    onDeleteAllTasks();
    setShowDeleteModal(false);
  }

  if (tasks.length === 0) {
    return (
      <p className="initial-para mt-4 mb-3 text-danger">
        {filterValue === "any"
          ? "You haven't added any task yet."
          : `There are no tasks with '${filterValue}' status.`}
      </p>
    );
  }

  return (
    <div className="mt-4 mb-4">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onDelete={onDeleteTask}
          onChange={onChangeTask}
        />
      ))}

      <div className="delete-all d-flex justify-content-center justify-content-lg-end">
        <button
          type="button"
          className="btn btn-outline-dark"
          onClick={() => setShowDeleteModal(true)}
        >
          Delete All Tasks
        </button>
      </div>

      <ModalComponent
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        title="Confirm Delete"
        body="Are you sure you want to delete all tasks?"
        onConfirm={handleConfirmDeleteAll}
        confirmText=" Delete"
        variant="danger"
      />
    </div>
  );
}
