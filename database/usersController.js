const express = require('express')
const router = express.Router()
const user = require('./users')

router.get('/admin/users/delete',(req,res) => {
    user.destroy({
        where: {
            id: 1
        }
    })
})

router.get("/admin/users",(req, res) => {
    res.send("Listagem de Usuários")
})

router.get("/admin/users/create",(req, res) => {
    res.render('user/createUser')
    //res.sendFile("html/createUser.html")
})

module.exports = router