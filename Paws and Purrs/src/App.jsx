import "./App.css";
import AdminDash from "./pages/AdminDash";
import { Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";
import Donate from "./pages/Donate.jsx";
import AOTM from "./pages/AOTM.jsx";
import AuthPage from "./pages/AuthPage";
import Adoption from "./pages/Adoption.jsx";
import ShelterDonations from "./pages/ShelterDonations.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<AuthPage />} />

      <Route element={<DashboardLayout />}>
        <Route path="/dashboard" element={<AdminDash />} />
        <Route path="/donate" element={<Donate title="Donate" />} />
        <Route
          path="/animal-of-the-month"
          element={<AOTM title="Animal Of The Month" />}
        />
        <Route path="/adoption" element={<Adoption title="Adoption" />} />
        <Route
          path="/shelter-donations"
          element={<ShelterDonations title="Shelter Donations" />}
        />
      </Route>

      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}

export default App;
