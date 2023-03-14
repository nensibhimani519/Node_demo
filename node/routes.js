const fs = require('fs')

const requestHandler = ((req,res) => {
    const url = req.url;
    const method = req.method;

// sending request
if(url === '/'){
    res.write('<html>');
    res.write('<head><title>Enter Message</title></head>');
    res.write('<body><form action="/message" method="POST"><input type="text" name="message" /><button type="submit">Send</button></form><body>');
    res.write('</html>');
    return res.end();
}

// redirecting request 
if(url === '/message' && method === 'POST'){
    const body = [];
    req.on('data',(chunk)=>{
        // console.log(chunk,'chunk');
        // output : <Buffer 6d 65 73 73 61 67 65 3d 6e 65 6e 73 69> chunk
        body.push(chunk)
    })

    req.on('end',()=>{
        // parsing request bodies
        const parsedBody = Buffer.concat(body).toString();
        // console.log(parsedBody,'parsed body');
        const message = parsedBody.split("=") [1];
        fs.writeFile('Message.txt', message, err => {
            res.statusCode = 302;
            res.setHeader('Location','/');
            return res.end();
        });
    })
}
    
// sending response 
res.setHeader('Content-Type','text/html');
res.write('<html>');
res.write('<head><title>My first page</title></head>');
res.write('<body><h1>Hello my node.js Sever!!!!!</h1><body>');
res.write('</html>');
res.end();
})

// module export type 

module.exports = { 
    handler :requestHandler,
    someText: "Some hard coded text"
}

// module.exports = requestHandler
// module.exports.handler = requestHandler