//1. Express 모듈 가져오기
const express = require("express");
//2. Express 애플리케이션 설정
const app = express();
//3.포트 설정

const PORT = 3000;
//4.라우팅 설정
app.get("/", (req, res) => {
  //req : HTTP 요청, res : HTTP 응답
  res.send("Hello World!");
});

//http://localhost:${3000}/hello GET
app.get("/hello", (req, res) => {
  res.send("안녕 /hello 주소에 접근하셨습니다.");
});
//문제 1 http://localhost:${3000}/world GET 요청할 경우
//응답을 "안녕 /world 주소에 접근하였습니다."
//라우터를 만들어보세요
app.get("/world", (req, res) => {
  res.send("안녕 /world 주소에 접근하였습니다.");
});

//5.서버 시작
app.listen(PORT, () => {
  console.log(`서버가 http://localhost:${PORT} 실행 중 입니다.`);
});
