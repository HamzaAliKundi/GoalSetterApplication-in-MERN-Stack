import { useState } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import GoalItem from "./GoalItem";

const GoalForm = () => {
  const [text, setText] = useState({ value: "", _id: "" });
  const [goals, setGoals] = useState([]);

  const onChangeValue = (e) => {
    setText((prevState) => ({
      ...prevState,
      value: e.target.value,
    }));
  };

  // ====================================================================== Post User Goal
  const onSubmit = async (e) => {
    e.preventDefault();

    if (!text._id) {
      try {
        const apiUrl = "http://localhost:5000/api/goals";
        const token = localStorage.getItem("token");
        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };

        const textObj = {
          text: text.value,
        };

        await axios.post(apiUrl, textObj, config);
        setText("");
        window.location = "/";
        toast.success("Goal posted successfully");
      } catch (error) {
        toast.error("Error while posting a Goal");
      }
    } else {
      try {
        debugger;
        const apiUrl = `http://localhost:5000/api/goals/${text._id}`;
        const token = localStorage.getItem("token");
        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };

        const textObj = {
          text: text.value,
          _id: text._id,
        };

        await axios.put(apiUrl, textObj, config);
        setText("");
        window.location = "/";
        toast.success("Goal Updated successfully");
      } catch (error) {
        toast.error("Error while posting a Goal");
      }
    }
  };

  // ====================================================================== Get User Goals
  useEffect(() => {
    const fetchGoalsData = async () => {
      const apiUrl = "http://localhost:5000/api/goals";
      const bearerToken = localStorage.getItem("token");
      if (bearerToken)
        await axios
          .get(apiUrl, { headers: { Authorization: `Bearer ${bearerToken}` } })
          .then((res) => {
            setGoals(res.data);
          });
    };

    fetchGoalsData();
  }, []);

  // ====================================================================== Get Single Goal for Updating
  const updateUserGoal = async (goalId) => {
    try {
      const apiUrl = `http://localhost:5000/api/goals/${goalId}`;
      const bearerToken = localStorage.getItem("token");

      await axios
        .get(apiUrl, {
          headers: { Authorization: `Bearer ${bearerToken}` },
        })
        .then((res) => {
          setText({ _id: res.data._id, value: res.data.text });
        });
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        toast.error("Goal not found");
      }
      if (ex.response && ex.response.status === 401) {
        toast.error("You are not authorized");
      }
    }
  };

  // ====================================================================== Delete User Goal
  const deleteUserGoal = async (goalId) => {
    try {
      const apiUrl = `http://localhost:5000/api/goals/${goalId}`;
      const bearerToken = localStorage.getItem("token");

      await axios.delete(apiUrl, {
        headers: { Authorization: `Bearer ${bearerToken}` },
      });

      toast.success("Your goal has been successfully deleted from database");
    } catch (ex) {
      if (
        (ex.response && ex.response.status === 404) ||
        (ex.response && ex.response.status === 400)
      ) {
        toast.error("Goal not found from the database");
      }
    }

    const deletedGoal = goals.filter((goal) => goalId !== goal._id);
    setGoals(deletedGoal);
  };

  return (
    <>
      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="text">Goal</label>
            <input
              type="text"
              name="text"
              id="text"
              className="form-control"
              required={true}
              value={text.value}
              onChange={onChangeValue}
            />
          </div>
          <div className="form-group">
            {text._id ? (
              <button className="btn btn-block" type="submit">
                Update Goal
              </button>
            ) : (
              <button className="btn btn-block" type="submit">
                Set Goal
              </button>
            )}
          </div>
        </form>
      </section>
      <section className="content">
        {goals.length > 0 ? (
          <div className="goals">
            {goals.map((goal) => (
              <GoalItem
                key={goal._id}
                goal={goal}
                deleteGoal={deleteUserGoal}
                updateUserGoal={updateUserGoal}
              />
            ))}
          </div>
        ) : (
          "You have not set eny goal"
        )}
      </section>
    </>
  );
};

export default GoalForm;
