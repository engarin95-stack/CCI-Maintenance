import { useState } from "react";
import axios from "axios";

export default function DailyReports() {
  const [technician] = useState("Ahmed");
  const [shift] = useState("08:00 - 16:00");
  const [report, setReport] = useState("");

  async function submitReport() {
    if (report.trim() === "") {
      alert("Please write your report.");
      return;
    }

    try {
      await axios.post("http://localhost:5000/reports", {
        technician,
        shift,
        report,
      });

      alert("Report submitted successfully!");

      setReport("");

    } catch (error) {
      console.error(error);
      alert("Cannot connect to the server.");
    }
  }

  return (
    <div className="container-fluid p-4">

      <h1 className="mb-4">Daily Work Report</h1>

      <div className="card shadow p-4">

        <div className="row mb-4">

          <div className="col-md-6">
            <label className="form-label">
              Technician
            </label>

            <input
              className="form-control"
              value={technician}
              disabled
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">
              Shift
            </label>

            <input
              className="form-control"
              value={shift}
              disabled
            />
          </div>

        </div>

        <div className="mb-4">

          <label className="form-label">
            Daily Report
          </label>

          <textarea
            className="form-control"
            rows="12"
            placeholder="Write everything you did during your shift..."
            value={report}
            onChange={(e) => setReport(e.target.value)}
          />

        </div>

        <button
          className="btn btn-primary"
          onClick={submitReport}
        >
          Submit Report
        </button>

      </div>

    </div>
  );
}