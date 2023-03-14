// let a = 10;
// let b = 20;
// console.log(a + b);

// function Test  () {
//     console.warn('Hello Test');
// }
// Test()

// fs = fire system 
// const fs = require('fs');

// fs.writeFileSync('hello.txt','Hello from node.js')

// http server protocol
// let http = require('http');
// http.createServer(function(request,response){
//     response.write('Hello From Node.js Server');
//     response.end()
// }).listen(5000)


let http = require('http');
// let data =[

//     {name:"Nensi", age:22, email:"nensibhimani@gmail.com"},
//     {name:"Rinkal", age:24, email:"rinkuu@gmail.com"},
// ]

let page = ` 
<h1>Hello Node js </h1>
<input type='text' /> <br />
<input type='text' /> <br />
<input type='text' /> 
`
http.createServer(function(request,response){
    response.writeHead(200,{'Content-Type':"text/html"});
    // response.writeHead(200,{'Content-Type':'application\json'});
    response.write(JSON.stringify(page))
    response.end()
}).listen(5000)