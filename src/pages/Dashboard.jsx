import MainLayout from "../layouts/MainLayout";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

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
                <h5>Total Reports</h5>
                <h1>25</h1>
              </div>
            </div>
          </div>

          <div className="col-md-3 mb-3">
            <div className="card shadow-sm">
              <div className="card-body">
                <h5>Open Tasks</h5>
                <h1>7</h1>
              </div>
            </div>
          </div>

          <div className="col-md-3 mb-3">
            <div className="card shadow-sm">
              <div className="card-body">
                <h5>Machines</h5>
                <h1>64</h1>
              </div>
            </div>
          </div>

          <div className="col-md-3 mb-3">
            <div className="card shadow-sm">
              <div className="card-body">
                <h5>Technicians</h5>
                <h1>4</h1>
              </div>
            </div>
          </div>

        </div>

      </div>
    </MainLayout>
  );
}