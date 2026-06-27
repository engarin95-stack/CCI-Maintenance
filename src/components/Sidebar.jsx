import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Sidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/");
  }

  const isAdmin = user?.role === "Admin";

  return (
    <div
      className="bg-dark text-white p-3"
      style={{ width: "250px", minHeight: "100vh" }}
    >
      <h3 className="text-center mb-2">CCI</h3>

      <p className="text-center text-secondary mb-4">
        {user?.fullname}
      </p>

      <div className="list-group">

        <Link
          to="/dashboard"
          className="list-group-item list-group-item-action"
        >
          🏠 Dashboard
        </Link>

        <Link
          to="/daily-reports"
          className="list-group-item list-group-item-action"
        >
          📝 Daily Reports
        </Link>

        <Link
          to="/tasks"
          className="list-group-item list-group-item-action"
        >
          ✅ My Tasks
        </Link>

        {isAdmin && (
          <>
            <Link
              to="/reports"
              className="list-group-item list-group-item-action"
            >
              📈 Reports
            </Link>

            <Link
              to="/inspection"
              className="list-group-item list-group-item-action"
            >
              🔍 Inspection
            </Link>

            <Link
              to="/warehouse"
              className="list-group-item list-group-item-action"
            >
              📦 Warehouse
            </Link>

            <Link
              to="/settings"
              className="list-group-item list-group-item-action"
            >
              ⚙️ Settings
            </Link>
          </>
        )}

        <button
          className="list-group-item list-group-item-action text-danger"
          onClick={handleLogout}
        >
          🚪 Logout
        </button>

      </div>
    </div>
  );
}