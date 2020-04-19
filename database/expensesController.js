const express = require('express')
const router = express.Router()
const Expenses = require('./expenses')
const bodyParser = require('body-parser')
router.use(bodyParser.urlencoded({extended: false}))
router.use(bodyParser.json())

router.get("/expenses",(req, res) => {
    //res.render("expenses/expense")
    Expenses.findAndCountAll({

    }).then((users)=>{
        res.json(users)
    })
})

router.get("/expenses/page/:number",(req, res) => {
    pageNumber = req.params.number
    console.log(pageNumber)

    if(pageNumber == 1 || pageNumber < 1 || isNaN(pageNumber)){
        offset = 0
    }else{
        offset = (pageNumber - 1) * 10
    }

    Expenses.findAndCountAll({
        limit: 10,
        offset: offset
    }).then((expenses)=>{
        //res.json(expenses.rows)
        //console.log(expenses[0])
        res.render("expenses/expenseslist",{
            expenses: expenses.rows
        })
    })
})

router.get("/expenses/:id",(req, res) => {
    //res.render("expenses/expense")
    Expenses.findAndCountAll({
        attributes: ['id','title','description'],
        where: {
            id: req.params.id
        }
    }).then((users)=>{
        res.json(users)
    })
})

router.post("/expenses/insert",(req, res) => {
    title = req.body["title"]
    value = req.body["value"]
    description = req.body["description"]
        Expenses.create({
            title: title,
            value: value,
            description: description
        })
})

module.exports = router