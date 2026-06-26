import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function Tasks() {
  const { user } = useAuth();

  const [tasks, setTasks] = useState([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [assignmentType, setAssignmentType] = useState("Technician");
  const [assignedTo, setAssignedTo] = useState("Ahmed");
  const [machine, setMachine] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [dueDate, setDueDate] = useState("");

  async function loadTasks() {
    try {
      const res = await api.get("/tasks");
      setTasks(res.data);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    loadTasks();
  }, []);

  async function createTask(e) {
    e.preventDefault();

    try {
      await api.post("/tasks", {
        title,
        description,
        assignment_type: assignmentType,
        assigned_to: assignedTo,
        machine,
        priority,
        due_date: dueDate,
        created_by: user.fullname,
      });

      alert("Task Created Successfully");

      setTitle("");
      setDescription("");
      setMachine("");
      setDueDate("");

      loadTasks();
    } catch (err) {
      console.error(err);
      alert("Unable to create task.");
    }
  }

  return (
    <MainLayout>

      <h2 className="mb-4">Task Management</h2>

      <div className="card mb-4">
        <div className="card-body">

          <form onSubmit={createTask}>

            <div className="mb-3">
              <label>Task Title</label>

              <input
                className="form-control"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label>Description</label>

              <textarea
                className="form-control"
                rows="3"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="row">

              <div className="col-md-3">
                <label>Assignment Type</label>

                <select
                  className="form-control"
                  value={assignmentType}
                  onChange={(e) => setAssignmentType(e.target.value)}
                >
                  <option>Technician</option>
                  <option>Shift</option>
                  <option>All</option>
                </select>
              </div>

              <div className="col-md-3">
                <label>Assigned To</label>

                <select
                  className="form-control"
                  value={assignedTo}
                  onChange={(e) => setAssignedTo(e.target.value)}
                >
                  <option>Ahmed</option>
                  <option>Basher</option>
                  <option>Redar</option>
                  <option>08:00 - 16:00</option>
                  <option>16:00 - 00:00</option>
                  <option>00:00 - 08:00</option>
                  <option>All Technicians</option>
                </select>
              </div>

              <div className="col-md-3">
                <label>Priority</label>

                <select
                  className="form-control"
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                >
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                </select>
              </div>

              <div className="col-md-3">
                <label>Due Date</label>

                <input
                  type="date"
                  className="form-control"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                />
              </div>

            </div>

            <div className="mt-3">
              <label>Machine (Optional)</label>

              <input
                className="form-control"
                value={machine}
                onChange={(e) => setMachine(e.target.value)}
              />
            </div>

            <button
              className="btn btn-success mt-4"
              type="submit"
            >
              Create Task
            </button>

          </form>

        </div>
      </div>

      <div className="card">
        <div className="card-body">

          <h4>All Tasks</h4>

          <table className="table table-striped mt-3">

            <thead>

              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Assigned To</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Due Date</th>
              </tr>

            </thead>

            <tbody>

              {tasks.map((task) => (

                <tr key={task.id}>
                  <td>{task.id}</td>
                  <td>{task.title}</td>
                  <td>{task.assigned_to}</td>
                  <td>{task.priority}</td>
                  <td>{task.status}</td>
                  <td>{task.due_date}</td>
                </tr>

              ))}

            </tbody>

          </table>

        </div>
      </div>

    </MainLayout>
  );
}