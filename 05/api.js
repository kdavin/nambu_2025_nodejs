//외장 모듈 전부 여기서 볼것이다
const express = require("express"); //express 모듈 임포트
const moment = require("moment"); //날짜 모듈 임포트
const Database = require("better-sqlite3"); //Sqlite3 모듈 임포트
const path = require("path"); //경로 모듈 임포트

//DB setting 데이터
const db_name = path.join(__dirname, "post.db"); //sqlite 용 데이터베이스 파일
const db = new Database(db_name); //better - sqlite3의 데이터베이스를 생성(width 데이터베이스파일)

// express setting 웹서버 만들기
const app = express(); //app 이란 변수에 express 함수를 담습니다. app 변수를 이용해서 express 기능사용
const PORT = 3000; //포트 설정
app.use(express.json()); //json 포맷이 아니라고 받아들이면 에러를 발생시킴 //app.use 미들웨어를 설정하는거에요. 모든 요청과 응답에 json 포멧을 처리한다.

// 1. post.db 게시판 전용 테이블을 만들어야합니다.
const create_sql = `
    create table if not exists posts (
        id integer primary key autoincrement, 
        title varchar(255), 
        content text, 
        author varchar(100),
        createdAt datetime default current_timestamp,
        count integer default 0
    );
    
    create table if not exists comments (
      id integer primary key autoincrement,
      content text,
      author text, 
      createdAt datetime default current_timestamp, 
      postId integer, 
      foreign key(postId) references posts(id) on delete cascade 
    );
`;
db.exec(create_sql); //exec sql을 실행시킨다.
//app.post => POST 요청을 처리한다. http://my-url/posts PORT -> 두번째인자의 핸들러함수실행
app.post("/posts", (req, res) => {
  const { title, content, author } = req.body; //요청 본문에서 title, content, author : json 포멧
  let sql = `
        insert into posts(title, content, author)
        values ( ?,?,?);
    `;
  //insert 쿼리문을 만들어 준다.
  const stmt = db.prepare(sql); //문자열 sql 실제 쿼리문으로 파싱합니다. statement 객체로 만듬 //재활용성 극대화
  db.prepare(sql).run(title, content, author);
  const newPost = db
    .prepare(`select * from posts where id = ?`)
    .get(result.lastInsertRowid);
  stmt.run(title, content, author);
  // stmt.run : UPDATE, INSERT, DELETE
  // stmt.all : SELETE * FROM TABLE or SELECT * FROM TABLE WHERE --> [] 배열로 값을 반환
  // stmt.get : SELETE * FROM TABLE LIMIT 1 --> {} 객체로 값을 반환
  res.status(201).json({ message: "ok", data: newPost });
});
//게시글 목록 조회 http://localhost:3000/posts GET
app.get("/posts", (req, res) => {
  const page = req.query.page ? parseInt(req.query.page) : 1;
  const limit = 5;
  const offset = (page - 1) * limit;
  let sql = `
        select id, title, content, author, createdAt
        from posts order by createdAt desc limit ? offset ?
    `;
  const stmt = db.prepare(sql); //쿼리를 준비하세요
  const rows = stmt.all(limit, offset); //쿼리를 날려주세요 //쿼리를 실행하고 결과는 [] 배열로 반환해주세요
  console.log(rows);
  //전체 게시글 수 조회
  const totalCount = db
    .prepare(`select count(*) as count from posts`)
    .get().count;
  const totalPafes = Math.ceil(totalCount / limit);
  //res.status(200).json({ data: rows }); // JSON.stringify({data: rows}) 객체를 JSON 문자열
  res.status(200).json({
    data: rows,
    pagination: {
      currentPage: pageXOffset,
      totalPages: total,
    },
  });
});
//게시글 상세 정보 조회
//값 던져주기
app.get("/posts/:id", (req, res) => {
  const id = req.params.id;
  let sql = `
        select id, title, content, author, createdAt,count from posts where id = ?
    `;
  let ac_sql = `update posts set count = count + 1 where id = ?`;
  db.prepare(ac_sql).run(id);
  const stmt = db.prepare(sql); //select 쿼리문이 준비 완료
  const post = stmt.get(id); //실제 쿼리문이 실행
  res.status(200).json({ data: post });
});

//게시글 수정
//http://localhost:3000/posts
app.put("/posts/:id", (req, res) => {
  const id = req.params.id;
  const { title, content } = req.body;
  let sql = `
    update posts set title = ?, content = ?
    where id = ?
  `; //쿼리문 만들어서
  const stmt = db.prepare(sql);
  stmt.run(title, content, id); //실제 쿼리문 데이터베이스 실행 //?와 순서 같아야 함
  const updatedPost = db.prepare(`select * from posts where id = ?`).get(id);
  if (!updatedPost) {
    return res.status(404).json({ message: "게시물을 찾을 수 없습니다." });
  }
  res.status(200).json({ message: "ok", data: updatedPost });
  //res.redirect("/posts"); //Redirect의 의미 : Get http://localhost:3000/posts
  //res.json({ message: "ok" });//응답에 ok 만 표시
});
//delete
app.delete("/posts/:id", (req, res) => {
  const id = req.params.id;
  let sql = `delete from posts where id =?`;
  const stmt = db.prepare(sql);
  stmt.run(id);
  res.json({ message: "ok" });
});
// 답변 추가
app.post("/posts/:id/comments", (req, res) => {
  //게시글의 id
  const postId = req.params.id;
  const { content, author } = req.body;
  //1. 게시글이 있는지 확인
  const post = db.prepare(`select id from posts where id = ?`).get(postId); //엉뚱한 게시글 번호인지 확인
  if (!post) {
    return res.status(404).json({ message: "게시글을 찾을 수 없어용" });
  }
  // 2.답변 추가
  const sql = `insert into comments(postId, author, content) values(?,?,?)`;
  const result = db.prepare(sql).run(postId, author, content);
  //3. 신규 답변 조회 및 반환
  const newComment = db
    .prepare(`select * from comments where id = ?`)
    .get(result.lastOnsertRowid);
  res.status(201).json({ message: "ok", data: newComment });
});

//답변 목록 가져오기
app.get("/posts/:id/comments", (req, res) => {
  const postId = req.params.id;
  const post = db.prepare(`select id from posts where id = ?`).get(postId);
  if (!post) {
    return res.status(404).json({ message: "게시글을 찾을 수 없어요" });
  }
  const sql = `select id, author, content, createdAt from comments where postId = ? order by id desc`;

  const comments = db.prepare(sql).all(postId);
  res.status(200).json({
    data: comments,
    message: "ok",
  });
});

// server start
app.listen(PORT, () => {});
