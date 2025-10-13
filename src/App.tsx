import { Routes, Route, Navigate } from "react-router-dom";

// AUTH
import Login from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";

// MAIN
import Home from "./pages/Home";
import MyProfile from "./pages/MyProfile";

// HEADER NAV LINKS
import Diagnosis from "./pages/Diagnosis";
import DiagnosisPatient from "./pages/patient/DiagnosisPatient";
import Analytics from "./pages/Analytics";
import Consultation from "./pages/Consultation";
import ConsultationPatient from "./pages/patient/ConsultationPatient";

// OTHERS
import About from "./pages/About";
import PrivacyPolicyTerms from "./pages/PrivacyPolicyTerms";
import HelpSupport from "./pages/HelpSupport";
import Settings from "./pages/Settings";

function App() {
  return (
    <Routes>
      {/* Default redirect */}
      <Route path="/" element={<Navigate to="/sign-in" replace />} />

      {/* AUTH */}
      <Route path="/sign-in" element={<Login/>}/>
      <Route path="/sign-up" element={<SignUp/>}/>

      {/* MAIN */}
      <Route path="/home" element={<Home/>}/>
      <Route path="/my-profile" element={<MyProfile/>}/>

      {/* HEADER NAV LINKS */}
      <Route path="/diagnosis" element={<Diagnosis/>}/>
      <Route path="/diagnosis-patient" element={<DiagnosisPatient/>}/>
      <Route path="/analytics" element={<Analytics/>}/>
      <Route path="/consultation" element={<Consultation/>}/>
      <Route path="/consultation-patient" element={<ConsultationPatient/>}/>

      {/* FOOTER */}
      <Route path="/about" element={<About/>}/>
      <Route path="/privacy-policy-and-terms" element={<PrivacyPolicyTerms/>}/>
      <Route path="/help-support" element={<HelpSupport/>}/>
      <Route path="/settings" element={<Settings/>}/>
    </Routes>
  );
}

export default App;