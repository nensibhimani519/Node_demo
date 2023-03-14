const express = require('express')
const path = require('path')
const app = express()
const port = 3000

// MiddleWare

// const nodeMiddleWare = (req,res,next)=>{
//     console.log(req);
//     next()
// }

app.use(express.static(path.join(__dirname,"*/")))
// app.use(nodeMiddleWare)
 
// dynamic route 
app.get('/hello/:name',(req,res)=>{
    res.send('Hello World!!' + req.params.name)
})

app.get('/about',(req,res)=>{
    // res.send('About')
    // res.sendFile(path.join(__dirname,'index.html'))
    // res.status(500)
    res.json({"nensi":22})
})

app.listen(port, () => {
    console.log(`Example app listing at http://localhost:${port}`);
})