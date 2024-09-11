import logo from "../assets/check-list.png";

function Header() {
  return (
    <header>
      <div>
        <img src={logo} alt="" />
        <h1>To-Do List</h1>
      </div>

      <p>
        Welcome to our to do list app. This checklist to do task lists app is
        designed to streamline your task management.
      </p>
      <p>
        A simple to do list app to manage your personal tasks, family projects,
        and team's work.
      </p>
    </header>
  );
}

export default Header;
