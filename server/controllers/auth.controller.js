const pool = require("../config/db");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
exports.signup = async (req, res) => {
  try {
    let { username, password } = req.body;
    username = username.trim();
    const isUsernameExist = await pool.query(
      "SELECT * FROM users WHERE username=$1",
      [username]
    );
    if (isUsernameExist.rowCount !== 0)
      return res.status(400).json({
        staus: "fail",
        message: "Username is already taken",
      });
    const id = uuidv4();
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    await pool.query(
      "INSERT INTO users(id,username,password) VALUES($1,$2,$3)",
      [id, username, hashedPassword]
    );
    const token = jwt.sign({ id }, "secretkey", { expiresIn: "1h" });
    res.status(200).json({
      staus: "success",
      message: "account created",
      token,
      user: { id, username },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to create account",
      errorMessage: error.message,
      error,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await pool.query("SELECT * FROM users WHERE username=$1", [
      username,
    ]);

    if (user.rowCount === 0)
      return res.status(404).json({
        staus: "fail",
        message: "Invalid username or password",
      });

    const checkPassword = bcrypt.compareSync(password, user.rows[0].password);
    if (!checkPassword)
      return res.status(404).json({
        staus: "fail",
        message: "Invalid username or password",
      });
    const id = user.rows[0].id;
    const token = jwt.sign({ id }, "secretkey", { expiresIn: "1h" });
    res.status(200).json({
      staus: "success",
      message: "login success",
      token,
      user: { id, username: user.rows[0].username },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      message: "Failed to log in user",
      errorMessage: error.message,
      error,
    });
  }
};
