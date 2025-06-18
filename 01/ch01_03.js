let date = new Date()

if(date.getHours()<12){
    console.log("오전")
}else{
    console.log("오후")
}

const hour = date.getHours()
const timeOfDay = hour < 12 ? "오전" : "오후";
console.log(`현재는 ${timeOfDay} 입니다.`)

const temperature = 24
// 문제 1 30도가 넘어가면 "더운 날씨 입니다" 출력
//         20도가 넘어가면 "따뜻한 날씨 입니다" 출력
//         10도가 넘어가면 "선선한 날씨 입니다" 출력
//         나머지는 "추운 날씨입니다" 출력

if(temperature >30){
    console.log("더운 날씨 입니다");
}else if(temperature > 20){
    console.log("따뜻한 날씨 입니다");
}else if(temperature>10){
    console.log("선선한 날씨 입니다")
}else{
    console.log("추운 날씨입니다")
}

const day = date.getDay();
console.log(day)
//문제2 스위치 문으로 요일을 출력해주세요
//  day == 1이면 월요일, 2이면 화요일, 3이면 수요일, 4이면 목요일, 5면 금요일, 6이면 토요일, 0 일요일

switch(day){
    case 1:
        console.log("월요일");
        break;
    case 2:
        console.log("화요일");
        break;
    case 3:
        console.log("수요일");
        break;
    case 4:
        console.log("목요일");
        break;
    case 5:
        console.log("금요일");
        break;
    case 6:
        console.log("토요일");
        break;
    case 0:
        console.log("일요일");
        break;
    default:
        console.log("알 수 없는 요일");
}

//짧은 조건문
const name = ""//null , "", 0인 경우 해당
const displayName = name || "익명님"
console.log(`환영합니다 ${displayName}`);

//nullish 병합연산자
const userInput = null; //null 또는 undefined
const defaultValue = "기본값";
const result = userInput ?? defaultValue;
console.log(`결과 : ${result}`);

//조건부 실행
const isLoggedIn = true; //false
isLoggedIn && console.log("로그인 되었습니다.")