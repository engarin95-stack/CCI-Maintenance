export default function Dashboard() {
  return (
    <div className="container-fluid p-4">

      <h2>Dashboard</h2>

      <div className="row mt-4">

        <div className="col-md-3">

          <div className="card shadow">

            <div className="card-body">

              <h5>Total Reports</h5>

              <h1>25</h1>

            </div>

          </div>

        </div>

        <div className="col-md-3">

          <div className="card shadow">

            <div className="card-body">

              <h5>Open Tasks</h5>

              <h1>7</h1>

            </div>

          </div>

        </div>

        <div className="col-md-3">

          <div className="card shadow">

            <div className="card-body">

              <h5>Machines</h5>

              <h1>64</h1>

            </div>

          </div>

        </div>

        <div className="col-md-3">

          <div className="card shadow">

            <div className="card-body">

              <h5>Technicians</h5>

              <h1>4</h1>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}