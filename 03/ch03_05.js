//.env 파일을 프로그램상에 로드 합니다.
require("dotenv").config();
console.log(`서버 포트 : ${process.env.PORT}`);
//문제 1
//DB_NAME
//DB_USER
//DB_PASSWORD
//API_KEY
//NODE_ENV

console.log(`DB 이름 : ${process.env.DB_NAME}`);
console.log(`DB 유저 : ${process.env.DB_USER}`);
console.log(`DB 패스워드 : ${process.env.DB_PASSWORD}`);
console.log(`API KEY : ${process.env.API_KEY}`);
console.log(`NODE ENV : ${process.env.NODE_ENV}`);

console.log(`디비 포트 : ${process.env.DB_PORT || 5432}`);

if (!process.env.OPENAI_API_KEY) {
  console.error(`오픈 ai의 키가 필요합니다.`);
}

const isDevelopment = process.env.NODE_ENV === "development";
if (isDevelopment) {
  console.log(`개발환경에서의 로직 처리`);
} else {
  console.log(`운영환경에서의 로직 처리`);
}
