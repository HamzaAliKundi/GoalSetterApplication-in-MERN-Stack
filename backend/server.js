const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config();
const connectDB = require("./config/db");
const { errorHandler } = require("./middleware/errorMiddleware");
const port = process.env.PORT || 5000;
var cors = require("cors");

connectDB();
const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/goals", require("./routes/goalRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use(errorHandler);

app.listen(port, () => console.log(`Server Started On PORT ${port}`));
