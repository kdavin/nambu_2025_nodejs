let arr = [5, 23, "hello", true, "world", -9]
console.log(arr)
console.log(arr[1])

//for (초기조건; 종료조건; 증감조건)
for(let i=0;i<arr.length; i++){
    console.log(`${i} is ${arr[i]}`)
}

console.log('-------')
//for .. in . i<= index
for(i in arr){
    console.log(`${i} is ${arr[i]}`)
}

//for .. of index 없이 요소만
for(e of arr){
    console.log(e)
}

console.log('----break----')
for(i in arr){
    if(typeof arr[i] == "string"){
        break;
        //이걸 만나면 아예 loop 종료함
    }
    console.log(arr[i]);
}

console.log('----continue----')
for(i in arr){
    if(typeof arr[i] == "string"){
        continue;
        //이후 로직 수행안하고 다음 반복으로 바로 넘어감
    }
    console.log(arr[i]);
}
console.log('---문제1---')
//문제1
const array = [1,2,"멈춰", 3, 4, true,false]
for(value of array){
    console.log(value)
    if(typeof value =="string" ){
        break
    }
    
}

// 문제2
console.log('---문제2---')
const arr1=[5,10,15,20,25]
for(i in arr1){
    if(arr1[i]>=20){
        break
    }
    console.log(arr1[i]);
}

// 문제3
console.log('---문제3---')
const arr2 = [1,2,3,4,5,6,7,8,9,10];
for(i of arr2){
    if(i %2==1){
        continue
    }
    console.log(i)
}
// 문제4
console.log('---문제4---')
for(let i=1; i<=10; i++){
    if(i%3==0){
        continue
    }
    console.log(i);
}

//문제5
console.log('---문제5---')
const arr3=["사과",1,"바나나",2,"포도",false];
for(i in arr3){
    if(typeof arr3[i] == "string"){
        console.log(arr3[i])
    }
}