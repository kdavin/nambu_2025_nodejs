const express = require("express");
const path = require("path");
const moment = require("moment");
const Database = require("better-sqlite3");
//데이터베이스 설정
const db_name = path.join(__dirname, "todo.db");
const db = new Database(db_name);

//익스프레스 설정
const app = express();
const PORT = 3000;
app.use(express.json()); //요청과 응답에 json 파싱

//테이블 만들기
const create_sql = `
    create table if not exists todos (
    id integer primary key autoincrement,
    task varchar(255),
    description text,
    completed boolean default 0,
    createdAt datetime default current_timestamp,
    priority integer default 1
    );
    `;
db.exec(create_sql);
//1. 할일 쓰기 POST http://localhost:3000/todos
app.post("/todos", (req, res) => {
  const { task, description } = req.body;
  let sql = `
        insert into todos(task, description)
        values(?,?);
    `;
  const stmt = db.prepare(sql);
  db.prepare(sql).run(task, description);
  res.status(201).json({ message: "ok" });
});
//2. 할일 목록 조회 GET http://localhost:3000/todos
app.get("/todos", (req, res) => {
  let sql = `
        select id, task, description, completed, createdAt from todos order by createdAt desc
    `;

  const stmt = db.prepare(sql);
  const rows = stmt.all();
  console.log(rows);
  res.status(200).json({ data: rows });
});
//3. 할일 1건 조회 GET http://localhost:3000/todos/1
app.get("/todos/:id", (req, res) => {
  const id = req.params.id;
  let sql = `
        select id,task,description, completed, createdAt,priority from todos where id =?
    `;
  const stmt = db.prepare(sql);
  const post = stmt.get(id);
  res.status(200).json({ data: post });
});

//4. 할일 수정 PUT http://localhost:3000/todos/1
app.put("/todos/:id", (req, res) => {
  const id = req.params.id;
  const { task, description } = req.body;
  let sql = `
        update todos set task=?,description = ?
        where id = ?
    `;
  const stmt = db.prepare(sql);
  stmt.run(task, description, id);
  res.redirect("/todos");
});
//5. 할일 삭제 DELETE http://localhost:3000/todos/1
app.delete("/todos/:id", (req, res) => {
  const id = req.params.id;
  let sql = `delete from todos where id = ?`;
  const stmt = db.prepare(sql);
  stmt.run(id);
  res.json({ message: "ok" });
});
//서버 시작
//npx nodemon todo.js
app.listen(PORT, () => {});
