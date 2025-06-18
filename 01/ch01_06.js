//예를 들어 이지훈 이라는 객체를 표현
const name = "이지훈"
const age = 40
const job= "developer"

const name1 = "홍길동"


const person1 = {
    name : '이지훈',
    age : 50,
    job : 'sw engineer'
}

console.log(person1.name, person1['name'])// 객체 꺼내는 방법 2가지

person1.hobby = ["cook","fishing"]
console.log(person1)
console.log(Object.keys(person1));
console.log(Object.values(person1));

person1.addAge = function(){//객체에 함수도 넣을 수 있다.
    this.age = this.age +1;
}
person1.addAge();
console.log(person1)

//클래스
class PersonInfo{
    constructor(name, age, address){
        this.name = name;
        this.age = age;
        this.address = address;
    }

    addAge(age){
        this.age = this.age + age;
    }

    getAge(){
        return this.age
    }
}

let p1 = new PersonInfo("이지훈", 50, "신정동")
console.log(p1);
p1.addAge(50)
console.log(p1.getAge())

class Employee extends PersonInfo{
    constructor(name, age, address, salary){
        super(name, age, address)
        this.salary = salary;
    }
}

let e1 = new Employee("홍길동",60, "인천 부평", 1000000)
console.log(e1);

try{
    //데이터벵스 커넥션 얻어와서
    //데이터베이스에 데이터 질의
    const arr = new Array(-1)
}catch(e){
    //데이터 질의 하다가 예외 발생했을 때 처리
    console.log("예외 발생",e)
}finally{
    //데이터베이스 커넥션 닫아주기
    console.log("예외가 발생해도 이작업은 반드시 필요")
}

//커스텀 에러
try{
    const err = new Error("나만의 에러")
    err.name = "나만의 에러"
    err.message = "나만의 에러가 완성되었어요"
    throw err
}catch(e){
    console.log(e.name, e.message)
}

// 문제1
class CarInfo{
    constructor(brand, color, model){
        this.brand = brand;
        this.color = color;
        this.model = model;
        }
        drive(){
            console.log(`모델 ${this.model}가 달리는 중`)
        }
        stop(){
            console.log(`모델 ${this.model}가 멈췄습니다.`)
        }
    
}
let car=new CarInfo("현대","Red","xxx")
let car2=new CarInfo("현대","노랑","xxx")
car.drive()
car2.stop()

class ElectricCarInfo extends CarInfo{
    constructor(brand,color,model, battery){
        super(brand,color,model)
        this.battery = battery;
        }
        
        charge(){
            console.log(`모델 ${this.model}가 충전 중`)
        }
    
}

let ec1 =new ElectricCarInfo("테슬라","쥐색","모델y",40000)
ec1.charge()
ec1.stop()