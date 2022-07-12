import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import jwtDecode from "jwt-decode";
import Register from "./pages/Register";
import Logout from "./components/Logout";
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    try {
      const jwt = localStorage.getItem("token");
      const user = jwtDecode(jwt);
      setCurrentUser(user);
    } catch (ex) {}
  }, []);

  return (
    <>
      <Router>
        <div className="container">
          <Header user={currentUser.name} />
          <ToastContainer />
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Dashboard />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
