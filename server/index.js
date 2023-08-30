const express = require("express");
const cors = require("cors");
const pool = require("./config/db");

const app = express();

//middleware
app.use(cors());
app.use(express.json());

//routes
app.post("/todos", async (req, res) => {
  try {
    const { description } = req.body;
    const sql = "INSERT INTO todo (description) VALUES($1) RETURNING *";
    const newTodo = await pool.query(sql, [description]);
    res.status(201).json({
      status: "success",
      message: "Todo created",
      data: { todo: newTodo.rows[0] },
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      status: "fail",
      message: "Failed to create Todo",
      errorMessage: error.message,
      error,
    });
  }
});

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
