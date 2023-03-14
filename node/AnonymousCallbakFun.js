// normal function 
function sum (a,b){
    return a + b 
}

console.log(sum(10,20));

// Anonymous function 
let add = function (a,b){
    return a + b 
}
console.log(add(30,20));    

// Anonymous & Callbak Function
function complexExp(add){
    console.log(add(200,300));
}
complexExp(add)

// import another component / file
let abc = require('./module')

console.log(abc(100,500),'abc');