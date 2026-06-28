import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import api from "../services/api";import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
const [stats, setStats] = useState({
  openTasks: 0,
  completedTasks: 0,
  reportsToday: 0,
  inspections: 0,
});

async function loadDashboard() {
  try {
    const res = await api.get("/dashboard");
    setStats(res.data);
  } catch (err) {
    console.error(err);
  }
}

useEffect(() => {
  loadDashboard();
}, []);
  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <MainLayout>
      <div className="container-fluid">

        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h2>Dashboard</h2>

            <h5 className="text-secondary">
              Welcome, {user?.fullname}
            </h5>

            <small className="text-muted">
              Role: {user?.role}
            </small>
          </div>

          <button
            className="btn btn-danger"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>

        <div className="row">

          <div className="col-md-3 mb-3">
            <div className="card shadow-sm">
              <div className="card-body">
                <h5>Reports Today</h5>
<h1>{stats.reportsToday}</h1>
              </div>
            </div>
          </div>

          <div className="col-md-3 mb-3">
            <div className="card shadow-sm">
              <div className="card-body">
                <h5>Open Tasks</h5>
<h1>{stats.openTasks}</h1>
              </div>
            </div>
          </div>

          <div className="col-md-3 mb-3">
            <div className="card shadow-sm">
              <div className="card-body">
                <h5>Completed Tasks</h5>
<h1>{stats.completedTasks}</h1>
              </div>
            </div>
          </div>

          <div className="col-md-3 mb-3">
            <div className="card shadow-sm">
              <div className="card-body">
                <h5>Inspections</h5>
<h1>{stats.inspections}</h1>
              </div>
            </div>
          </div>

        </div>

      </div>
    </MainLayout>
  );
}