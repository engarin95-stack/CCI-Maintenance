import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Tasks from "./pages/Tasks";
import Machines from "./pages/Machines";
import Inspection from "./pages/Inspection";
import Warehouse from "./pages/Warehouse";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import DailyReports from "./pages/DailyReports";

import MainLayout from "./layouts/MainLayout";

function App() {
  return (
    <Routes>

      <Route path="/" element={<Navigate to="/login" />} />

      <Route path="/login" element={<Login />} />

      <Route
        path="/dashboard"
        element={
          <MainLayout>
            <Dashboard />
          </MainLayout>
        }
      />

      <Route
        path="/tasks"
        element={
          <MainLayout>
            <Tasks />
          </MainLayout>
        }
      />

      <Route
        path="/machines"
        element={
          <MainLayout>
            <Machines />
          </MainLayout>
        }
      />

      <Route
        path="/inspection"
        element={
          <MainLayout>
            <Inspection />
          </MainLayout>
        }
      />

      <Route
        path="/warehouse"
        element={
          <MainLayout>
            <Warehouse />
          </MainLayout>
        }
      />

      <Route
        path="/reports"
        element={
          <MainLayout>
            <Reports />
          </MainLayout>
        }
      />

      <Route
        path="/settings"
        element={
          <MainLayout>
            <Settings />
          </MainLayout>
        }
      />
      <Route
    path="/dailyreports"
    element={
        <MainLayout>
            <DailyReports />
        </MainLayout>
    }
/>

    </Routes>
  );
}

export default App;