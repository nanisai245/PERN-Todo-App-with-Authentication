const express = require("express");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");
const pool = require("./config/db");

const app = express();

//middleware
app.use(cors());
app.use(express.json());

//routes
//create todos
app.post("/todos", async (req, res) => {
  try {
    let { user_id, title, progress, date } = req.body;
    const id = uuidv4();
    title = title.trim();
    const sql =
      "INSERT INTO todos (id,user_id,title,progress,date) VALUES($1,$2,$3,$4,$5) RETURNING *";
    const newTodo = await pool.query(sql, [id, user_id, title, progress, date]);
    res.status(201).json({
      status: "success",
      message: "Todo created",
      data: { todo: newTodo.rows[0] },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to create todo",
      errorMessage: error.message,
      error,
    });
  }
});

//update todo
app.patch("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    let { user_id, title, progress, date } = req.body;
    title = title.trim();
    const updatedTodo = await pool.query(
      "UPDATE todos SET user_id=$1, title=$2,progress=$3,date=$4 WHERE id=$5",
      [user_id, title, progress, date, id]
    );
    res.status(200).json({
      status: "success",
      message: "Todo updated",
      data: { todo: updatedTodo.rows[0] },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to create todo",
      errorMessage: error.message,
      error,
    });
  }
});

//get all todos
app.get("/todos/", async (req, res) => {
  try {
    const todos = await pool.query("SELECT * FROM todos");
    res.status(200).json({
      staus: "success",
      result: todos.rowCount,
      data: { todos: todos.rows },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to get todos",
      errorMessage: error.message,
      error,
    });
  }
});

//get a todo
app.get("/todos/:id", async (req, res) => {
  try {
    let { id } = req.params;
    // id = parseInt(id);
    const todo = await pool.query("SELECT * FROM todos WHERE id=$1", [id]);
    if (todo.rowCount === 0) {
      return res.status(404).json({
        staus: "fail",
        message: `Todo with id ${id} not found`,
      });
    }
    res.status(200).json({
      staus: "success",
      data: { todo: todo.rows[0] },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to get a todo",
      errorMessage: error.message,
      error,
    });
  }
});

//get all user todos
app.get("/todos/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todos = await pool.query("SELECT * FROM todos WHERE user_id=$1", [
      id,
    ]);
    res.status(200).json({
      staus: "success",
      result: todos.rowCount,
      data: { todos: todos.rows },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to get todos",
      errorMessage: error.message,
      error,
    });
  }
});

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
