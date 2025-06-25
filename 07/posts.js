const express = require("express");
const models = require("./models");
const app = express();
const PORT = 3000;
app.use(express.json());
//route add
app.post("/posts", async (req, res) => {
  const { title, content } = req.body;
  //원래는 jwt 토큰에서 사용자 ID를 받아와서 넣어줘야 하지만
  //아직 안배워서 사용자를 생성하고 그 다음에 게시글을 넣겠습니다.
  let user = await models.User.findOne({
    where: { email: "a@example.com" },
  });
  if (!user) {
    user = await models.User.create({
      name: "이지훈",
      email: "a@example.com",
      password: "12345678",
    });
  }
  const post = await models.Post.create({
    title: title,
    content: content,
    authorId: user.id,
  });
  res.status(202).json({ message: "ok", data: post });
});
//게시글 전체 조회
app.get("/posts", async (req, res) => {
  const posts = await models.Post.findAll();
  res.status(200).json({ message: "ok", data: posts });
});
//게시글 조회
app.get("/posts/:id", async (req, res) => {
  const id = req.params.id;
  const post = await models.Post.findByPk(id);
  if (!post) {
    return res.status(404).json({ message: "post not found" });
  }
  res.status(200).json({ message: "ok", data: post });
});
//게시글 수정
app.put("/posts/:id", async (req, res) => {
  const id = req.params.id;
  const { title, content } = req.body;
  const post = await models.Post.findByPk(id);
  if (post) {
    if (title) post.title = title;
    if (content) post.content = content;
    await post.save();
    res.status(200).json({ message: "ok", data: post });
  } else {
    res.status(404).json({ message: "post not found" });
  }
});
//게시글 삭제
app.delete("/posts/:id", async (req, res) => {
  const id = req.params.id;
  const result = await models.Post.detroy({
    where: { id: id },
  });
  console.log(result);
  if (result > 0) {
    res.status(204).send();
  } else {
    res.status(404).json({ message: "Post not found" });
  }
});

//댓글 관련된 코드 추가
//댓글 추가
app.post("/posts/:postId/comments", async (req, res) => {
  const postId = req.params.postId;
  const { content } = req.body;
  //1. 게시물이 존재여부 체크
  const post = await models.Post.findByPk(postId);
  if (!post) {
    return res.status(404).json({ message: "post not found" });
  }
  //userId 로그인 뒤에 jwt 토큰에서 받아야하지만 지금 무조건 1
  //1.5. 사용자 추가
  let user = await models.User.findOne({
    where: { email: "b@example.com" },
  });
  if (!user) {
    user = await models.User.create({
      name: "뉴진스",
      email: "b@example.com",
      password: "12345678",
    });
  }
  //2.comment 추가
  const comments = await models.Comment.create({
    content: content,
    postId: postId,
    userId: user.id,
  });
  res.status(201).json({ message: "ok", data: comments });
});
//comment 조회
app.get("/posts/:postId/comments", async (req, res) => {
  const postId = req.params.postId;
  const comments = await models.Comment.findAll({
    where: { postId: postId },
    include: [
      { model: models.User, as: "author", attributes: ["id", "name", "email"] },
    ],
    order: [["createdAt", "DESC"]],
  });
  res.status(200).json({ message: "ok", data: comments });
});
//comment 삭제
// app.delete("/posts/:postId/comments/:commentId",(req,res)=>{
//     const postId = req.params.postId;
//     const
// })
app.listen(PORT, () => {
  console.log(`post 서버가 http://localhost:${PORT}에서 실행중`);
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
