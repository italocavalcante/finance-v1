const express = require('express')
const router = express.Router()
const Expenses = require('./expenses')
const bodyParser = require('body-parser')
router.use(bodyParser.urlencoded({extended: true}))
router.use(bodyParser.json())

router.get("/expenses",(req, res) => {
    //res.render("expenses/expense")
    Expenses.findAndCountAll({

    }).then((users)=>{
        res.json(users)
    })
})

router.get("/expenses/addexpense",(req, res)=>{
    if (!req.session.user){
        res.redirect("/")
        return false
    }
    res.render("expenses/addexpense.ejs")
})

router.post("/expenses/addexpense",(req, res)=>{
    if (!req.session.user){
        res.redirect("/")
        return false
    }
    title = req.body.title
    value = req.body.value
    description = req.body.description
    expenseDateTime = new Date(req.body.expensedate)
    Expenses.create({
        title: title,
        value: value,
        description: description,
        dateExpense: expenseDateTime,
        userId: req.session.user.id
    }).then(() => {
        res.redirect("/expenses/page/1")
    }).catch((error) => {
        res.json(error)
    })
})

router.get("/expenses/page/:number",(req, res) => {
    next = true
    if (!req.session.user){
        res.redirect("/")
        return false
    }
    pageNumber = parseInt(req.params.number)

    if(pageNumber == 1 || pageNumber < 1 || isNaN(pageNumber)){
        offset = 0
    }else{
        offset = (pageNumber - 1) * 10
    }
    
    Expenses.findAndCountAll({
        limit: 10,
        offset: offset,
        where: {
            userId: req.session.user.id
        },
        order: [
            ["dateExpense","desc"]
        ]
    }).then((expenses)=>{

        if((offset + 10 ) >= expenses.rows){
            console.log("Next page: false")
            next = false
        }else{
            next = true
        }
        res.render("expenses/expenseslist",{
            next: next,
            page: pageNumber,
            expenses: expenses.rows
        })
    })
})

router.get("/expenses/:id",(req, res) => {
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