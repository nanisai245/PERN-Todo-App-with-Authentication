const express = require("express");
const cors = require("cors");

const todoRoutes = require("./routes/todo.routes");
const authRoutes = require("./routes/auth.routes");
const app = express();

//middleware
app.use(cors());
app.use(express.json());

//routes
app.use("/auth", authRoutes);
app.use("/todos", todoRoutes);

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
