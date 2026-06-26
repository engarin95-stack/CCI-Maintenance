import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Sidebar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <div
      className="bg-dark text-white p-3"
      style={{ width: "250px", minHeight: "100vh" }}
    >
      <h3 className="text-center mb-4">CCI</h3>

      <div className="list-group">

        <Link
          to="/dashboard"
          className="list-group-item list-group-item-action text-decoration-none"
        >
          📊 Dashboard
        </Link>

        <Link
          to="/daily-reports"
          className="list-group-item list-group-item-action text-decoration-none"
        >
          📝 Daily Reports
        </Link>

        <Link
          to="/reports"
          className="list-group-item list-group-item-action text-decoration-none"
        >
          📈 Reports
        </Link>

        <Link
          to="/tasks"
          className="list-group-item list-group-item-action text-decoration-none"
        >
          ✅ Tasks
        </Link>

        <Link
          to="/machines"
          className="list-group-item list-group-item-action text-decoration-none"
        >
          🏭 Machines
        </Link>

        <Link
          to="/warehouse"
          className="list-group-item list-group-item-action text-decoration-none"
        >
          📦 Warehouse
        </Link>

        <Link
          to="/inspection"
          className="list-group-item list-group-item-action text-decoration-none"
        >
          🔍 Inspection
        </Link>

        <Link
          to="/settings"
          className="list-group-item list-group-item-action text-decoration-none"
        >
          ⚙️ Settings
        </Link>

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