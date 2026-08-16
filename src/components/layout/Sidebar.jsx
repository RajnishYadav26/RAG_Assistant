import {
  LayoutDashboard,
  MessageSquare,
  FileText,
  History,
  Settings,
  LogOut,
} from "lucide-react";

import {
  NavLink,
  useNavigate,
} from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

import "./Sidebar.css";


function Sidebar() {

  const navigate = useNavigate();

  const { logout } = useAuth();


  const handleLogout = () => {

    // Remove the logged-in user
    logout();

    // Redirect to Login page
    navigate("/", {
      replace: true,
    });

  };


  const navigationItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Chat",
      path: "/chat",
      icon: MessageSquare,
    },
    {
      name: "Documents",
      path: "/upload",
      icon: FileText,
    },
    {
      name: "History",
      path: "/history",
      icon: History,
    },
    {
      name: "Settings",
      path: "/settings",
      icon: Settings,
    },
  ];


  return (
    <aside className="sidebar">

      {/* Logo / Application Name */}

      <div className="sidebar-header">

        <div className="logo">
          R
        </div>

        <div>

          <h2>
            RAG Assistant
          </h2>

          <span>
            Enterprise AI
          </span>

        </div>

      </div>


      {/* Navigation */}

      <nav className="sidebar-navigation">

        {navigationItems.map((item) => {

          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                isActive
                  ? "nav-item active"
                  : "nav-item"
              }
            >

              <Icon size={20} />

              <span>
                {item.name}
              </span>

            </NavLink>
          );

        })}

      </nav>


      {/* Sidebar Footer */}

      <div className="sidebar-footer">

        <button
          type="button"
          className="logout-button"
          onClick={handleLogout}
        >

          <LogOut size={20} />

          <span>
            Logout
          </span>

        </button>

      </div>

    </aside>
  );
}


export default Sidebar;