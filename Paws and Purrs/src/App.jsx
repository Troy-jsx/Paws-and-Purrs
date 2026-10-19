import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import RequireRole from "./auth/RequireRole";
import AuthPage from "./pages/AuthPage";
import DonorDonate from "./pages/donor/DonorDonate";

//admin
import DashboardLayout from "./layouts/DashboardLayout";
import AdminDash from "./pages/AdminDash";
import Donate from "./pages/Donate.jsx";
import AOTM from "./pages/AOTM.jsx";
import Adoption from "./pages/Adoption.jsx";
import ShelterDonations from "./pages/ShelterDonations.jsx";
import DonorAdopt from "./pages/donor/DonorAdopt";

function App() {
  return (
    <Routes>
      <Route path="/" element={<AuthPage />} />

      {/*donor stuff */}
      <Route
        element={
          <RequireRole role="donor">
            <DashboardLayout />
          </RequireRole>
        }
      >
        <Route path="/home" element={<AdminDash />} />
        <Route path="/home" element={<AdminDash />} />
        <Route path="/donate" element={<DonorDonate />} />
        <Route path="/adopt" element={<DonorAdopt />} />
      </Route>

      {/*admin stuff */}
      <Route
        path="/admin"
        element={
          <RequireRole role="admin">
            <DashboardLayout />
          </RequireRole>
        }
      >
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<AdminDash />} />
        <Route path="donate" element={<Donate title="Donate" />} />
        <Route
          path="animal-of-the-month"
          element={<AOTM title="Animal Of The Month" />}
        />
        <Route path="adoption" element={<Adoption title="Adoption" />} />
        <Route
          path="shelter-donations"
          element={<ShelterDonations title="Shelter Donations" />}
        />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
