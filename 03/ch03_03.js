const moment = require("moment");
const nowDate = moment(); //현재시각을 가져옵니다.
console.log(nowDate.format("YYYY-MM-DD HH:mm:ss"));
console.log(nowDate.format("YYYY년 MM월 DD일"));
console.log(nowDate.format("YYYY년 MM월 DD일 HH시 mm분 ss초"));

//문제 1 현재 날짜 + 시각을 2025/06/18 형태로 출력해보세요
console.log(nowDate.format("YYYY/MM/DD"));

//날짜 포멧팅 : 특정 날짜의 문자열을 모멘트 객체 형태로 바꿀 수 있습니다.
const dateMoment = moment("2024-03-30");
console.log(dateMoment);

//시간 추가 및 빼기
const nextDays = nowDate.add(7, "weeks");
console.log(nextDays);

//시간 차이 계산
const startDate = moment();
const endDate = moment("2025-08-20");
const diffDay = endDate.diff(startDate, "days");
console.log("과정 종료까지 남은 날수", diffDay);

//문제 2
//오늘부터 100일 후의 날짜를 YYYY년 MM월 DD 일로 출력해보세요
const today = moment();
const addDay = today.add(100, "days");
console.log(
  `${moment().format("YYYY년 MM월 DD일")}에서 100일 후의 날짜는 ${addDay.format(
    "YYYY년 MM월 DD일"
  )}`
);
//문제 3 2024-03-15 부터 2025-09-20일까지 몇 개월이 지났는지 계산해보세요
const sDate = moment("2024-03-15");
const eDate = moment("2025-09-20");
const diffDay2 = eDate.diff(sDate, "months");
console.log(diffDay2);
//문제 4 크리스마스까지 남은 일수를 계산해보세요
const today2 = moment();
const christmas = moment("2025-12-25");
const diffDay3 = christmas.diff(today2, "days");
console.log(diffDay3);
