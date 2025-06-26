const express = require("express");
const models = require("./models");
//멀터 임포트
const multer = require("multer");
const app = express();
const PORT = 3000;
app.use(express.json());
//멀터 formdata, multi part forma 데이터를 받기 위한 미들웨어 설정
app.use(express.urlencoded({ extended: true }));
const uploadDir = `public/uploads`;
app.use(`/downloads`, express.static(Path2D.join(__dirname, uploadDir)));
//http://localhost:3000/downloads/aa.png

//멀터 저장소 설정
const storage = multer.diskStorage({
  destination: `./${uploadDir}`, // 요
});
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
//comment 수정
app.put("/posts/:postId/comments/:id", async (req, res) => {
  const postId = req.params.postId;
  const commentId = req.params.id;
  const { content } = req.body;

  //1.게시물이 있는지 확인
  const post = await models.Post.findByPk(postId);
  if (!post) {
    return res.status(404).json({ message: "post not fonund" });
  }
  //2. 댓글을 가지고 오기
  const comment = await models.Comment.findOne({
    where: {
      id: commentId,
      postId: postId,
    },
  });
  if (!comment) {
    return res.status(404).json({ message: "comment not found" });
  }
  //3. 댓글 수정 및 저장
  if (content) comment.content = content;
  await comment.save();
  res.status(200).json({ message: "ok", data: comment });
});
//comment 삭제
app.delete("/posts/:postId/comments/:id", async (req, res) => {
  const postId = req.params.postId;
  const commentId = req.params.id;
  //1.게시물 존재확인
  if (!postId) {
    return res.status(404).json({ message: "post not found" });
  }
  //2. 댓글 삭제
  const result = await models.Comment.destroy({
    where: {
      id: commentId,
      postId: postId,
    },
  });
  if (result > 0) {
    res.status(204).send();
  } else {
    res.status(404).json({ message: "comment not found" });
  }
});
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
