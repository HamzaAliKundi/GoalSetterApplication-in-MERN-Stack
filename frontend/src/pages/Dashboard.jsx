import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import GoalForm from "../components/GoalForm";

const Dashboard = () => {
  const [currentUser, setCurrentUser] = useState({});

  const navigate = useNavigate();

  const user = localStorage.getItem("token");
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  useEffect(() => {
    try {
      const jwt = localStorage.getItem("token");
      const user = jwtDecode(jwt);
      setCurrentUser(user);
    } catch (ex) {}
  }, []);

  return (
    <React.Fragment>
      <section className="heading">
        <h1>Welcome, {currentUser.name}</h1>
        <p>Goals Dashboard</p>
      </section>
      <GoalForm />
    </React.Fragment>
  );
};

export default Dashboard;
