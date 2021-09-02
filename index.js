require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const server = express();

server.use(express.json());
server.use(cors());
server.use(morgan("dev"));

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

server.get("/api/users", (req, res) => {
  res.json({
    users: [
      {
        name: "Fernando",
        email: "fernando@something.com",
        id: 1,
      },
      {
        name: "Aliyah",
        email: "aliyah@something.com",
        id: 2,
      },
      {
        name: "Benito",
        email: "benito@something.com",
        id: 3,
      },
    ],
  });
});

server.get("/api/users/:id", (req, res) => {
  const { id } = req.params;
  res.json({
    message: `Current id parameter is ${id}`,
  });
});

server.get("*", (req, res) => {
  res.send(`
    <h1>Fernando Martinez</h1>
  `);
});
