import {
  User,
  Shield,
  Bell,
  LogOut,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";

import "./Settings.css";

function Settings() {

  const {
    user,
    logout,
  } = useAuth();


  return (
    <div className="settings-page">

      <div className="settings-header">

        <h1>Settings</h1>

        <p>
          Manage your account and application
          preferences.
        </p>

      </div>


      <div className="settings-content">

        <section className="settings-section">

          <div className="settings-section-title">

            <User size={19} />

            <div>
              <h2>Profile</h2>

              <p>
                Your account information
              </p>
            </div>

          </div>


          <div className="profile-card">

            <div className="profile-avatar">
              {user?.name
                ? user.name.charAt(0).toUpperCase()
                : "U"}
            </div>

            <div>

              <h3>
                {user?.name || "User"}
              </h3>

              <p>
                {user?.email ||
                  "user@example.com"}
              </p>

            </div>

          </div>

        </section>


        <section className="settings-section">

          <div className="settings-section-title">

            <Shield size={19} />

            <div>

              <h2>Security</h2>

              <p>
                Account security settings
              </p>

            </div>

          </div>


          <div className="settings-row">

            <div>
              <h3>Password</h3>

              <p>
                Change your account password
              </p>
            </div>

            <button type="button">
              Change
            </button>

          </div>

        </section>


        <section className="settings-section">

          <div className="settings-section-title">

            <Bell size={19} />

            <div>

              <h2>Notifications</h2>

              <p>
                Manage application notifications
              </p>

            </div>

          </div>


          <div className="settings-row">

            <div>

              <h3>
                Processing notifications
              </h3>

              <p>
                Notify me when documents finish
                processing
              </p>

            </div>

            <input
              type="checkbox"
              defaultChecked
            />

          </div>

        </section>


        <button
          type="button"
          className="settings-logout"
          onClick={logout}
        >
          <LogOut size={18} />
          Logout
        </button>

      </div>

    </div>
  );
}

export default Settings;