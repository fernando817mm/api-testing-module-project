require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const yup = require("yup");

const path = require("path");

const server = express();

server.use(express.json());
server.use(cors());
server.use(morgan("dev"));
server.use(express.static(path.join(__dirname, "client/build")));

const PORT = process.env.PORT || 5000;

const users = [
  {
    username: "Fernando",
    password: "Fernando",
    id: 1,
  },
  {
    username: "Aliyah",
    password: "Aliyah",
    id: 2,
  },
  {
    username: "Benito",
    password: "Benito",
    id: 3,
  },
];

server.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

server.get("/api/users", (req, res) => {
  res.json(users);
});

const newUserSchema = yup.object({
  username: yup.string().required(),
  password: yup.string().required(),
});

server.post("/api/register", (req, res, next) => {
  const newUser = req.body;
  newUserSchema
    .validate(newUser)
    .then((user) => {
      const newUser = { ...user, id: Date.now() };
      users.push(newUser);
      res.json(newUser);
    })
    .catch(() => {
      next({
        message: `username and password are required`,
        status: 402,
      });
    });
});

server.post("/api/login", (req, res, next) => {
  newUserSchema
    .validate(req.body)
    .then((user) => {
      console.log(user);
      res.json({
        message: `Welcome, ${user.username}!`,
      });
    })
    .catch(() => {
      next({
        message: `username and password are required`,
        status: 402,
      });
    });
});

server.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});

server.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack,
  });
});
