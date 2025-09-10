import { Routes, Route } from "react-router-dom";
import Login from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Analytics from "./pages/Analytics";
import Collaboration from "./pages/Collaboration";
import Account from "./pages/Account";
import Help from "./pages/Help";

function App() {
  return (
    <Routes>
      {/* AUTH */}
      <Route path="/" element={<Login/>}/>
      <Route path="/sign-up" element={<SignUp/>}/>
      {/* HEADER NAVIGATION LINKS */}
      <Route path="/home" element={<Home/>}/>
      <Route path="/dashboard" element={<Dashboard/>}/>
      <Route path="/help" element={<Help/>}/>
      {/* SIDEBAR NAVIGATION LINKS */}
      <Route path="/analytics" element={<Home/>}/>
      <Route path="/case-trends" element={<Home/>}/>
      <Route path="/outbreak-alerts" element={<Home/>}/>
      <Route path="/collaboration" element={<Home/>}/>
      <Route path="/share-case" element={<Home/>}/>
      <Route path="/consult-colleagues" element={<Home/>}/>
      <Route path="/language" element={<Home/>}/>
    </Routes>
  );
}

export default App;