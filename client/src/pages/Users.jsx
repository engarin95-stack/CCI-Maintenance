import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import api from "../services/api";
console.log("THIS IS THE NEW USERS PAGE");
export default function Users() {

  const [users, setUsers] = useState([]);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullname] = useState("");
  const [role, setRole] = useState("Technician");

  async function loadUsers() {
    try {
      const res = await api.get("/users");
      setUsers(res.data);
    } catch (err) {

  console.error(err);

  if (err.response) {
    console.log("Status:", err.response.status);
    console.log("Error:", err.response.data);
    alert(JSON.stringify(err.response.data));
  } else {
    alert(err.message);
  }

}
  }

  useEffect(() => {
    loadUsers();
  }, []);

  async function createUser(e) {
    e.preventDefault();

    try {

      await api.post("/users", {
        username,
        password,
        fullname,
        role,
      });

      alert("User created successfully.");

      setUsername("");
      setPassword("");
      setFullname("");
      setRole("Technician");

      loadUsers();

    } catch (err) {

      console.error(err);

      alert("Unable to create user.");

    }
  }

  return (
    <MainLayout>

      <h2 className="mb-4">Users Management</h2>

      <div className="card mb-4">

        <div className="card-body">

          <form onSubmit={createUser}>

            <div className="row">

              <div className="col-md-3">

                <label>Username</label>

                <input
                  className="form-control"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />

              </div>

              <div className="col-md-3">

                <label>Password</label>

                <input
                  type="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />

              </div>

              <div className="col-md-3">

                <label>Full Name</label>

                <input
                  className="form-control"
                  value={fullname}
                  onChange={(e) => setFullname(e.target.value)}
                  required
                />

              </div>

              <div className="col-md-3">

                <label>Role</label>

                <select
                  className="form-control"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option>Technician</option>
                  <option>Admin</option>
                </select>

              </div>

            </div>

            <button
              className="btn btn-success mt-4"
              type="submit"
            >
              Add User
            </button>

          </form>

        </div>

      </div>

      <div className="card">

        <div className="card-body">

          <h4>Users</h4>

          <table className="table table-striped mt-3">

            <thead>

              <tr>
                <th>ID</th>
                <th>Username</th>
                <th>Full Name</th>
                <th>Role</th>
                <th>Created</th>
              </tr>

            </thead>

            <tbody>

              {users.map((user) => (

                <tr key={user.id}>

                  <td>{user.id}</td>
                  <td>{user.username}</td>
                  <td>{user.fullname}</td>
                  <td>{user.role}</td>
                  <td>{user.created_at}</td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </MainLayout>
  );
}