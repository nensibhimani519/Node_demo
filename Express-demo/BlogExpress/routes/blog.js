const express = require('express')
const path = require('path')
const blogs = require('../data/blog')

const router = express.Router()

router.get('/', (req, res) => {
    // res.sendFile(path.join(__dirname, '../templates/index.html'))
    res.render('home')
})


router.get('/blog', (req, res) => {
    // blogs.forEach(e => {
    //     console.log(e.title,' title ');
    // });
    // res.sendFile(path.join(__dirname, '../templates/blogHome.html'))
    res.render('blogHome',{
        blogs : blogs
    })
})

router.get('/blogpost/:slug', (req, res) => {
    myblog = blogs.filter((e) => {
       return e.slug == req.params.slug
    })

    res.render('blogPage',{
        title : myblog[0].title,
        content : myblog[0].content,
    })
    // console.log(myblog,'myblog-----------');
    // res.sendFile(path.join(__dirname, '../templates/blogPage.html'))
})

module.exports = router