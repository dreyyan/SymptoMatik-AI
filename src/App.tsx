import { Routes, Route } from "react-router-dom";

// AUTH
import Login from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";

// MAIN
import Home from "./pages/Home";
import Account from "./pages/Account";

// HEADER NAV LINKS
import Diagnosis from "./pages/Diagnosis";
import DiagnosisPatient from "./pages/patient/DiagnosisPatient";
import Analytics from "./pages/Analytics";
import Consultation from "./pages/Consultation";
import ConsultationPatient from "./pages/patient/ConsultationPatient";

// FOOTER
import About from "./pages/About";
import PrivacyPolicyTerms from "./pages/PrivacyPolicyTerms";
import HelpSupport from "./pages/HelpSupport";

function App() {
  return (
    <Routes>
      {/* AUTH */}
      <Route path="/" element={<Login/>}/>
      <Route path="/sign-up" element={<SignUp/>}/>

      {/* MAIN */}
      <Route path="/home" element={<Home/>}/>
      <Route path="/account" element={<Account/>}/>

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
    </Routes>
  );
}

export default App;