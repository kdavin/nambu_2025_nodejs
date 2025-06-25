const express = require("express");
const models = require("./models");
const app = express();
const PORT = 3000;

app.use(express.json());
app.post("/notes", async (req, res) => {
  const { title, content, tag } = req.body;
  const note = await models.Note.create({
    title: title,
    content: content,
    tag: tag,
  });
  res.status(201).json({ message: "ok", data: note });
});

app.get("/notes", async (req, res) => {
  const notes = await models.Note.findAll();
  res.status(200).json({ message: "ok", data: notes });
});
app.get("/notes/:tag", async (req, res) => {
  const tag = req.params.tag;
  const notes = await models.Note.findAll({
    where: {
      tag: tag,
    },
  });

  if (notes) {
    res.status(200).json({ message: "ok", data: notes });
  } else {
    res.status(404).json({ message: `노트를 찾을 수 없어요.` });
  }
});
app.put("/notes/:id", async (req, res) => {
  const id = req.params.id;
  const { title, content, tag } = req.body; //클라이언트가 보낸 수정할 새 데이터
  const note = await models.Note.findByPk(id); //데이터 베이스에서 해당 id를 가진
  console.log("=====", note);
  if (note) {
    if (title) note.title = title; // 만약 title 이 있으면 모델 Note에
    if (content) note.content = content;
    if (tag) note.tag = tag;
    await note.save(); //변경 정보를 저장
    res.status(200).json({ message: "ok", data: note });
  } else {
    res.status(404).json({ message: "노트가 없어" });
  }
});
app.delete("/notes/:id", async (req, res) => {
  const id = req.params.id;
  const result = await models.Note.destroy({
    where: { id: id },
  });
  console.log(result);
  if (result > 0) {
    res.status(204).send();
  } else {
    res.status(404).json({ message: "노트가 없어용" });
  }
});
app.listen(PORT, () => {
  console.log(`Note 서버가 http://localhost:${PORT}에서 실행중`);
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
