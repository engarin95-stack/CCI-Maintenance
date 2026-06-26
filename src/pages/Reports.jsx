import { useEffect, useState } from "react";
import api from "../services/api";

export default function Reports() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  async function loadReports() {
    try {
      const response = await api.get("/reports");
      setReports(response.data);
    } catch (err) {
      console.error(err);
      alert("Unable to load reports.");
    }

    setLoading(false);
  }

  useEffect(() => {
    loadReports();
  }, []);

  return (
    <div className="container mt-4">

      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Reports</h2>

        <button
          className="btn btn-primary"
          onClick={loadReports}
        >
          Refresh
        </button>
      </div>

      {loading ? (
        <h4>Loading...</h4>
      ) : (
        <div className="table-responsive">

          <table className="table table-striped table-bordered">

            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Date</th>
                <th>Technician</th>
                <th>Shift</th>
                <th>Report</th>
              </tr>
            </thead>

            <tbody>

              {reports.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center">
                    No reports found.
                  </td>
                </tr>
              ) : (
                reports.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.created_at}</td>
                    <td>{item.technician}</td>
                    <td>{item.shift}</td>
                    <td>{item.report}</td>
                  </tr>
                ))
              )}

            </tbody>

          </table>

        </div>
      )}

    </div>
  );
}