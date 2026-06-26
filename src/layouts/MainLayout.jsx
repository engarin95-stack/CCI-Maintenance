import Sidebar from "../components/Sidebar";

export default function MainLayout({ children }) {
  return (
    <div className="d-flex">

      <Sidebar />

      <div
        className="flex-grow-1"
        style={{
          background: "#eef2f7",
          minHeight: "100vh",
          padding: "25px",
        }}
      >
        {children}
      </div>

    </div>
  );
}