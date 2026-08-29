import "./Sidebar.css";
import {
  LayoutDashboard,
  MessageSquare,
  FileText,
  History,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react";

import {
  NavLink,
  useNavigate,
} from "react-router-dom";

import { useState } from "react";

import { useAuth } from "../../context/AuthContext";

import "./Sidebar.css";

function Sidebar() {
  const navigate = useNavigate();

  const { logout, user } = useAuth();

  const [isOpen, setIsOpen] = useState(false);

  const navigation = [
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

  const handleLogout = () => {
    logout();

    navigate("/", {
      replace: true,
    });
  };

  const closeMobileMenu = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Mobile top bar */}

      <div className="mobile-topbar">

        <button
          type="button"
          className="mobile-menu-button"
          onClick={() =>
            setIsOpen(true)
          }
        >
          <Menu size={22} />
        </button>

        <span>
          RAG Assistant
        </span>

      </div>


      {/* Mobile overlay */}

      {isOpen && (
        <div
          className="sidebar-overlay"
          onClick={closeMobileMenu}
        />
      )}


      {/* Sidebar */}

      <aside
        className={
          isOpen
            ? "sidebar sidebar-open"
            : "sidebar"
        }
      >

        {/* Logo */}

        <div className="sidebar-logo">

          <div className="sidebar-logo-mark">
            R
          </div>

          <span>
            RAG Assistant
          </span>

          <button
            type="button"
            className="sidebar-close"
            onClick={closeMobileMenu}
          >
            <X size={20} />
          </button>

        </div>


        {/* Navigation */}

        <nav className="sidebar-navigation">

          <p className="sidebar-label">
            Workspace
          </p>

          {navigation.map((item) => {

            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={closeMobileMenu}
                className={({ isActive }) =>
                  isActive
                    ? "sidebar-link active"
                    : "sidebar-link"
                }
              >
                <Icon size={19} />

                <span>
                  {item.name}
                </span>
              </NavLink>
            );

          })}

        </nav>


        {/* Bottom */}

        <div className="sidebar-bottom">

          <div className="sidebar-user">

            <div className="sidebar-avatar">

              {user?.name
                ? user.name
                    .charAt(0)
                    .toUpperCase()
                : "U"}

            </div>

            <div className="sidebar-user-info">

              <strong>
                {user?.name || "User"}
              </strong>

              <span>
                {user?.email ||
                  "user@example.com"}
              </span>

            </div>

          </div>


          <button
            type="button"
            className="logout-button"
            onClick={handleLogout}
          >
            <LogOut size={19} />

            <span>
              Logout
            </span>
          </button>

        </div>

      </aside>
    </>
  );
}

export default Sidebar;