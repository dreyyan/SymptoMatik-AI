import { Routes, Route } from "react-router-dom";
import Login from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import Home from "./pages/Home";
import Diagnosis from "./pages/Diagnosis";
import Help from "./pages/Help";
import Analytics from "./pages/Analytics";
import Account from "./pages/Account";

function App() {
  return (
    <Routes>
      {/* AUTH */}
      <Route path="/" element={<Login/>}/>
      <Route path="/sign-up" element={<SignUp/>}/>
      {/* HEADER NAVIGATION LINKS */}
      <Route path="/home" element={<Home/>}/>
      <Route path="/diagnosis" element={<Diagnosis/>}/>
      <Route path="/help" element={<Help/>}/>
      <Route path="/analytics" element={<Analytics/>}/>
      <Route path="/account" element={<Account/>}/>
      
    </Routes>
  );
}

export default App;