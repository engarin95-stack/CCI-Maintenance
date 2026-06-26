import { useNavigate } from "react-router-dom";

export default function Login() {

  const navigate = useNavigate();

  function login() {
    navigate("/dashboard");
  }

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        height: "100vh",
        background: "#eef2f7"
      }}
    >

      <div
        className="card shadow p-4"
        style={{ width: "400px" }}
      >

        <h2 className="text-center mb-4">

          CCI Maintenance

        </h2>

        <input
          className="form-control mb-3"
          placeholder="Username"
        />

        <input
          className="form-control mb-4"
          type="password"
          placeholder="Password"
        />

        <button
          className="btn btn-primary w-100"
          onClick={login}
        >
          Login
        </button>

      </div>

    </div>
  );
}