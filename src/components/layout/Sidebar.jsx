import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="sidebar">
      <h2>RAG Assistant</h2>

      <nav>
        <NavLink to="/dashboard">Dashboard</NavLink>
        <NavLink to="/chat">Chat</NavLink>
        <NavLink to="/upload">Documents</NavLink>
        <NavLink to="/history">History</NavLink>
        <NavLink to="/settings">Settings</NavLink>
      </nav>
    </aside>
  );
}

export default Sidebar;