export default function Sidebar() {
  return (
    <div
      className="bg-dark text-white p-3"
      style={{ width: "250px", minHeight: "100vh" }}
    >
      <h3 className="text-center mb-4">CCI</h3>

      <div className="list-group">

        <button className="list-group-item list-group-item-action">
          📊 Dashboard
        </button>

        <button className="list-group-item list-group-item-action">
          📝 Daily Reports
        </button>

        <button className="list-group-item list-group-item-action">
          ✅ Tasks
        </button>

        <button className="list-group-item list-group-item-action">
          🏭 Machines
        </button>

        <button className="list-group-item list-group-item-action">
          🔍 Inspection
        </button>

        <button className="list-group-item list-group-item-action">
          📦 Warehouse
        </button>

        <button className="list-group-item list-group-item-action">
          📈 Reports
        </button>

        <button className="list-group-item list-group-item-action">
          ⚙ Settings
        </button>

      </div>
    </div>
  );
}