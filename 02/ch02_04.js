const users = [
  { id: 1, name: "김민수", age: 25, score: 85 },
  { id: 2, name: "이수진", age: 22, score: 92 },
  { id: 3, name: "박지훈", age: 28, score: 76 },
  { id: 4, name: "최유리", age: 24, score: 85 },
  { id: 5, name: "정현우", age: 27, score: 90 },
  { id: 6, name: "한지민", age: 23, score: 81 },
  { id: 7, name: "오세훈", age: 26, score: 79 },
  { id: 8, name: "윤아름", age: 21, score: 95 },
];
// 조건에 맞는 요소만 필터링 조건에 맞는다는 의미는 return 에 있는 식이 참일 경우
const youngs = users.filter((user) => {
  //console.log(user);
  return user.age < 25; // 필터링 조건
});
console.log(youngs); // return 조건에 있는 애들만 반환 해서 새 배열 생성
//select * from users where age < 25;
//문제 1 점수가 80점 미만인 친구들만 골라내세요
const scores = users.filter((user) => {
  return user.score < 80;
});
console.log(scores);

const userNames = users.map((user) => {
  return user.name;
});
console.log(userNames);

//문제 2 : 아이디와 이름만 반환하는 배열을 만들어보세요

const userInfos = users.map((user) => {
  return { id: user.id, name: user.name };
});
console.log(userInfos);

//문제 3 : 성적이 80점 이상인 친구들의 아이디, 이름, 성적을 뽑아보세요
const scoreUsers = users
  .filter((user) => user.score >= 80)
  .map((user) => {
    return { id: user.id, name: user.name, score: user.score };
  });
console.log(scoreUsers);

//foreach
users.forEach((user) => {
  console.log(`${user.name}님의 점수는 ${user.score} 입니다.`);
});

//reduce 함수 : 배열을 단일 값을 축소 sum : 누적변수
const totalScore = users.reduce((sum, user) => {
  return sum + user.score;
}, 0);
console.log(totalScore);

// 문제 4 : 나이가 25 이상인 사람들의 토탈 점수를 구해보세요
const totalScores = users
  .filter((user) => user.age > 25)
  .reduce((sum, user) => {
    return sum + user.score;
  }, 0);
console.log(totalScores);

//sort
const sortedByAge = [...users].sort((a, b) => {
  return a.age - b.age;
  //a.age - b.age 가 음수 이면 a 가 b 앞에 있고
  //a.age - b.age 가 양수 이면 a 가 b 뒤로 가고
  //a.age - b.age 0 이면 아무것도 안합니다.
}); // 나이 오름차순 정렬
console.log(sortedByAge);
