import { useEffect, useState } from "react";;
import { useAuth } from "../context/AuthContext";
import MainLayout from "../layouts/MainLayout";
import api from "../services/api";

export default function DailyReports() {
  const { user } = useAuth();
const isAdmin = user.role === "Admin";
  const technicians = ["Ahmed", "Basher", "Redar", "Admin"];

  const getShift = () => {
    const hour = new Date().getHours();

    if (hour >= 0 && hour < 8) return "00:00 - 08:00";
    if (hour >= 8 && hour < 16) return "08:00 - 16:00";
    return "16:00 - 00:00";
  };

const [technician] = useState(user.fullname);
  const [report, setReport] = useState("");
  const [loading, setLoading] = useState(false);
  const [reports, setReports] = useState([]);

  const loadReports = async () => {

  try {
    const res = await api.get("/reports");

    if (isAdmin) {
      setReports(res.data);
    } else {
      setReports(
        res.data.filter(
          (r) => r.technician === user.fullname
        )
      );
    }

  } catch (err) {
    console.error(err);
  }
};
  useEffect(() => {
  loadReports();
}, []);
const deleteReport = async (id) => {

  if (!window.confirm("Delete this report?"))
    return;

  try {

    await api.delete(`/reports/${id}`);

    loadReports();

  } catch (err) {

    console.error(err);

    alert("Unable to delete report.");

  }

};
const submitReport = async () => {
    if (report.trim() === "") {
      alert("Please write your report.");
      return;
    }

    setLoading(true);

    try {
      await api.post("/reports", {
        technician,
        shift: getShift(),
        report,
      });

      alert("Report submitted successfully.");

      setReport("");
      loadReports();
    } catch (err) {
      alert("Cannot connect to server.");
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <MainLayout>

    <div className="container mt-4">

      <h1 className="mb-4">Daily Work Report</h1>

      <div className="card shadow p-4">

        <div className="mb-3">
  <label className="form-label">Technician</label>

  {isAdmin ? (
    <select
      className="form-select"
      value={technician}
      disabled
    >
      <option>{technician}</option>
    </select>
  ) : (
    <input
      className="form-control"
      value={technician}
      disabled
    />
  )}
</div>

        <div className="mb-3">
          <label className="form-label">Current Shift</label>

          <input
            className="form-control"
            value={getShift()}
            disabled
          />
        </div>

        <div className="mb-4">
          <label className="form-label">Today's Report</label>

          <textarea
            rows="12"
            className="form-control"
            placeholder="Write everything you did during this shift..."
            value={report}
            onChange={(e) => setReport(e.target.value)}
          />
        </div>

        <button
          className="btn btn-primary"
          onClick={submitReport}
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit Report"}
        </button>

      </div>

      <div className="card mt-4">
  <div className="card-body">

    <h4>
      {isAdmin ? "All Reports" : "My Reports"}
    </h4>

    <table className="table table-striped mt-3">

      <thead>
        <tr>
          <th>Date</th>
          <th>Technician</th>
          <th>Shift</th>
          <th>Report</th>
<th>Actions</th>
        </tr>
      </thead>

      <tbody>

        {reports.map((item) => (

          <tr key={item.id}>
            <td>{item.created_at}</td>
            <td>{item.technician}</td>
            <td>{item.shift}</td>
            <td>{item.report}</td>

<td>

  {isAdmin && (

    <button
      className="btn btn-danger btn-sm"
      onClick={() => deleteReport(item.id)}
    >
      Delete
    </button>

  )}

</td>
          </tr>

        ))}

      </tbody>

    </table>

  </div>
</div>

    </div>
</MainLayout>
);
}