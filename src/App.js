import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import AddTask from "./components/AddTask";
import Footer from "./components/Footer";
import Header from "./components/Header";
import TaskList from "./components/TaskList";
import TaskFilter from "./components/TaskFilter";
import styled from "styled-components";

const Main = styled.main`
  margin: 80px auto;
  padding: 35px 30px 20px;
  border-radius: 10px;
  background-color: white;

  @media (min-width: 576px) {
    width: 540px;
  }

  @media (min-width: 768px) {
    width: 750px;
  }

  @media (min-width: 992px) {
    width: 970px;
  }

  @media (min-width: 1200px) {
    width: 1150px;
  }

  @media (min-width: 1400px) {
    width: 1350px;
  }
`;

function updateTaskStates(tasks) {
  const now = new Date();

  const updatedTasks = tasks.map((task) => {
    if (new Date(task.deadline) < now && task.state === "pending") {
      return { ...task, state: "not completed" };
    }
    return task;
  });

  localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  return updatedTasks;
}

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [filterValue, setFilterValue] = useState("any");

  const filteredTasks = tasks.filter((task) => {
    if (filterValue === "completed") return task.state === "completed";
    if (filterValue === "pending") return task.state === "pending";
    if (filterValue === "not completed") return task.state === "not completed";
    return true;
  });

  useEffect(() => {
    // Load tasks from localStorage when the component mounts
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(savedTasks);

    // Update task states periodically
    const interval = setInterval(() => {
      setTasks((prevTasks) => updateTaskStates(prevTasks));
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  function handleAddTask(task) {
    const newTask = {
      id: uuidv4(),
      ...task,
    };
    const updatedTasks = [...tasks, newTask];
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    setTasks(updatedTasks);
  }

  function handleDeleteTask(taskId) {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    setTasks(updatedTasks);
  }

  function handleDeleteAllTasks() {
    const updatedTasks = tasks.filter((task) => {
      if (filterValue === "completed") return task.state !== "completed";
      if (filterValue === "pending") return task.state !== "pending";
      if (filterValue === "not completed")
        return task.state !== "not completed";
      return false;
    });
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    setTasks(updatedTasks);
  }

  function handleChangeTask(nextTask) {
    const updatedTasks = tasks.map((task) =>
      task.id === nextTask.id ? nextTask : task
    );
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    setTasks(updatedTasks);
  }

  function handleFilterChange(selectedFilter) {
    setFilterValue(selectedFilter);
  }

  return (
    <>
      <Header />
      <Main>
        <AddTask onAddTask={handleAddTask} />
        <TaskFilter
          filterValue={filterValue}
          onFilterChange={handleFilterChange}
        />
        <TaskList
          tasks={filteredTasks}
          filterValue={filterValue}
          onDeleteTask={handleDeleteTask}
          onDeleteAllTasks={handleDeleteAllTasks}
          onChangeTask={handleChangeTask}
        />
      </Main>
      <Footer />
    </>
  );
}
