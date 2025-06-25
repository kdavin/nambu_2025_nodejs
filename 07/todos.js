//express + sequelize crud 를 제공하는 서버가 이 파일에 코딩될꺼에요
//todos restful api 서버가 코딩 될꺼에요
//관련된 모듈 임포트 먼저
const express = require("express");
const models = require("./models");
const app = express();
const PORT = 3000;

app.use(express.json());
app.post("/todos", async (req, res) => {
  const { task, description } = req.body;
  const todo = await models.Todo.create({
    task: task,
    description: description,
  });
  res.status(201).json({ message: "ok", data: todo });
});

app.get("/todos", (req, res) => {});

app.get("/todos/:id", (req, res) => {});

app.put("/todos/:id", (req, res) => {});

app.delete("/todos/:id", (req, res) => {});

app.listen(PORT, () => {
  console.log(`Todo 서버가 http://localhost:${PORT}에서 실행중`);
  models.sequelize
    .sync({ force: false })
    .then(() => {
      console.log("db connected");
    })
    .catch(() => {
      console.log("db error");
      process.exit();
    });
});
