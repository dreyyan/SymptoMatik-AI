import { Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";
import Dashboard from "./pages/Dashboard";
import Analytics from "./pages/Analytics";
import Collaboration from "./pages/Collaboration";
import Account from "./pages/Account";
import Help from "./pages/Help";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path="/SignUp" element={<SignUp/>}/>
      <Route path="/Dashboard" element={<Dashboard/>}/>
      <Route path="/Analytics" element={<Analytics/>}/>
      <Route path="/Collaboration" element={<Collaboration/>}/>
      <Route path="/Account" element={<Account/>}/>
      <Route path="/Help" element={<Help/>}/>
    </Routes>
  );
}

export default App;