const http = require("http");

//req : HTTP 요청, res : HTTP 응답
const server = http.createServer((req, res) => {
  //요청이 올때마다 실행되는 콜백 함수
  //헤더 정보 : 브라우저에게 응답은 200 성공이고, 컨텐트 타입은 그냥 텍스트고, 캐릭터 셋은 utf-8 이야
  res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
  //본문에 "안녕하세요~" 클라이언트에게 보내준다.
  res.end("안녕하세요! 이지훈의 첫번째 웹서버에 오셨어용");
  //나만의 웹서버
});

const PORT = 3000; //포트 번호
server.listen(PORT, () => {
  //서버가 3000번 포트로 요청을 기다리고 있습니다.
  console.log(`나만의 웹서버가 http://localhost:${PORT}에서 실행 중 입니다.`);
});
