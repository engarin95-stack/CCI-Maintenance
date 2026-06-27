import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";

export default function Inspection() {
  const { user } = useAuth();

  const isAdmin = user.role === "Admin";

  const [inspections, setInspections] = useState([]);

  const [title, setTitle] = useState("");
  const [frequency, setFrequency] = useState("Daily");
  const [assignedTo, setAssignedTo] = useState("Ahmed");

  async function loadInspections() {
    try {
      const res = await api.get("/inspections");

      if (isAdmin) {
        setInspections(res.data);
      } else {
        setInspections(
          res.data.filter(
            (i) =>
              i.assigned_to === user.fullname ||
              i.assigned_to === "All Technicians"
          )
        );
      }
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    loadInspections();
  }, []);

  async function createInspection(e) {
    e.preventDefault();

    try {
      await api.post("/inspections", {
        title,
        frequency,
        assigned_to: assignedTo,
        created_by: user.fullname,
      });

      alert("Inspection Created Successfully");

      setTitle("");
      setFrequency("Daily");
      setAssignedTo("Ahmed");

      loadInspections();

    } catch (err) {

      console.error(err);

      alert("Unable to create inspection.");

    }
  }

  return (
    <MainLayout>

      <h2 className="mb-4">
        Inspection Management
      </h2>

      {isAdmin && (

        <div className="card mb-4">

          <div className="card-body">

            <form onSubmit={createInspection}>

              <div className="mb-3">

                <label>Inspection Title</label>

                <input
                  className="form-control"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />

              </div>

              <div className="row">

                <div className="col-md-6">

                  <label>Frequency</label>

                  <select
                    className="form-control"
                    value={frequency}
                    onChange={(e) => setFrequency(e.target.value)}
                  >
                    <option>Daily</option>
                    <option>Weekly</option>
                    <option>Monthly</option>
                    <option>One Time</option>
                  </select>

                </div>

                <div className="col-md-6">

                  <label>Assign To</label>

                  <select
                    className="form-control"
                    value={assignedTo}
                    onChange={(e) => setAssignedTo(e.target.value)}
                  >
                    <option>Ahmed</option>
                    <option>Basher</option>
                    <option>Redar</option>
                    <option>All Technicians</option>
                  </select>

                </div>

              </div>

              <button
                className="btn btn-success mt-4"
                type="submit"
              >
                Create Inspection
              </button>

            </form>

          </div>

        </div>

      )}

      <div className="card">

        <div className="card-body">

          <h4>
            {isAdmin ? "All Inspections" : "My Inspections"}
          </h4>

          <table className="table table-striped mt-3">

            <thead>

              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Frequency</th>
                <th>Assigned To</th>
                <th>Created By</th>
              </tr>

            </thead>

            <tbody>

              {inspections.map((inspection) => (

                <tr key={inspection.id}>
                  <td>{inspection.id}</td>
                  <td>{inspection.title}</td>
                  <td>{inspection.frequency}</td>
                  <td>{inspection.assigned_to}</td>
                  <td>{inspection.created_by}</td>
                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </MainLayout>
  );
}