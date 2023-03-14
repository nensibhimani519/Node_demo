const express = require('express')
const path = require('path')
const app = express()
const port = 3000
const { create } = require('express-handlebars')
const hbs = create({ /* config */ });

app.engine('handlebars', hbs.engine);
app.set('view engine','handlebars')
app.use(express.static(path.join(__dirname,"static")))
app.use('/',require(path.join(__dirname,"routes/blog.js")))


app.listen(port, () => {
    console.log(`Blog app listing at http://localhost:${port}`);
})  




// // https://www.youtube.com/watch?v=7H_QH9nipNs&t=868s
