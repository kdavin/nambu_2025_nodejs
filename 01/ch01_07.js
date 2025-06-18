const fetchData = (callback) => {
  //callback <-handleData
  setTimeout(() => {
    //서버에서 데이터를 받는 부분
    const data = "서버에서 받은 데이터";
    callback(data);
  }, 1000);
};

const handleData = (data) => {
  //서버에서 받은 데이터를 처리하는 내용, 데이터 파싱 등등
  console.log("콜백에서 받은 데이터", data);
};

//fetchData(handleData)
//promise
const fetchDataPromise = () => {
  return new Promise((reslove, reject) => {
    //resolve 함수, reject 함수
    setTimeout(() => {
      const success = true; //작업 성공여부
      //외부에서나 db에서 데이터를 가지고 오는 로직 있는 자리
      if (success) {
        reslove(); //성공했을 때 호출 되는 함수, 외부에서 데이터를 가져오는데 성공
      } else {
        reject(); //실패 했을 때 호출 되는 함수, 외부에서 데이터를 가져오는데 실패
      }
    }, 1000);
  });
};

fetchDataPromise() //외부라이브러리들이 이런 형태로 함수를 제공
  .then((data) => {
    //resolve -> 데이터 패치가 성공했을 때 실행
    console.log("프로미스에서 받은 데이터", data);
  })
  .catch((error) => {
    // reject -> 데이터 패치가 실패했을 때 실행
    console.log("에러", error);
  });

//async await
const getData = async () => {
  try {
    const data = await fetchDataPromise();
    console.log("async/await data", data); //resolve 데이터패치가 성공했을 때 처리로직
  } catch (e) {
    console.log("에러", error); // reject -> 데이터패치가 실패 했을 때
  }
};

//문제1 2초 후에 "안녕하세요!" 라는 메시지를 출력하는 Promise 만들고 실행해보세요
const greet = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("안녕하세요!");
    }, 2000);
  });
  //여기의 로직을 구현해보세요 , 프로미스 안에는 함수 하나
};

greet().then((message) => {
  //resolve
  console.log(message);
});

//async, await 써서 greet를 사용해보세요 "안녕하세요!" 메시지 출력
const sayHi = async () => {
  try {
    const data = await greet();
    console.log(data);
  } catch (e) {
    console.log("에러", error);
  }
};
