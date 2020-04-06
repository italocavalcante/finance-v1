const express = require('express')
const router = express.Router()
const Expenses = require('./expenses')
const bodyParser = require('body-parser')
router.use(bodyParser.urlencoded({extended: false}))
router.use(bodyParser.json())

router.get("/expenses",(req, res) => {
    res.render("expenses/expense")
})

router.post("/expenses/insert",(req, res) => {
    console.log(req.body["title"])
    console.log(req.body["value"])
    console.log(req.body["description"])
})

module.exports = router