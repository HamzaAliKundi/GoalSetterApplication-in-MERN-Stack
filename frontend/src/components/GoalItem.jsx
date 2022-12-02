import { FaTrash, FaEdit } from "react-icons/fa";

const GoalItem = ({ goal, deleteGoal, updateUserGoal }) => {
  return (
    <div className="goal">
      <div className="time">
        {new Date(goal.createdAt).toLocaleString("en-US")}
      </div>
      <h2>{goal.text}</h2>
      <hr style={{ width: "100%", margin: "10px 0px" }} />
      <div style={{ display: "flex", justifyContent: "space-evenly" }}>
        <div
          style={{ margin: "0px 10px ", cursor: "pointer", color: "red" }}
          title="Delete an item ?"
          onClick={() => deleteGoal(goal._id)}
        >
          <FaTrash />
        </div>
        <div
          style={{ cursor: "pointer", color: "blue" }}
          title="Update an item ?"
          onClick={() => updateUserGoal(goal._id)}
        >
          <FaEdit />
        </div>
      </div>
    </div>
  );
};

export default GoalItem;
