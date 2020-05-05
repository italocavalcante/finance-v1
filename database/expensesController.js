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
    console.log("ADD EXPENSE: "+expenseDateTime)
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

router.get("/expense/edit/:id",(req,res) => {
    if (!req.session.user){
        res.redirect("/")
        return false
    }
    dateExpense = new Date(parseInt(req.query["dateExpense"]))
    expenseDateForm = new Date(req.query["dateExpense"])
    day = dateExpense.getDate()
    day = day.toString()
    day.length == 1 ? day = 0+day : null
    month = (dateExpense.getMonth()+1)
    month = month.toString() 
    month.length == 1 ? month = 0+month : null
    year = dateExpense.getFullYear()
    hours = dateExpense.getHours()
    hours = hours.toString()
    hours.length == 1 ? hours = 0+hours : null
    minutes = dateExpense.getMinutes()
    minutes = minutes.toString()
    minutes.length == 1 ? minutes = 0+minutes : null

    expenseDate = day+"/"+month+"/"+year
    expenseTime = hours+":"+minutes

    expenseData = {
        id: req.params.id,
        title: req.query["title"],
        value: req.query["value"],
        expenseDate: expenseDate,
        expenseTime: expenseTime,
        description: req.query["description"]
    }
    res.render("expenses/editexpense",{
        expenseData: expenseData
    })
})

router.post("/expense/edit/:id",(req,res) => {
    if (!req.session.user){
        res.redirect("/")
        return false
    }
    id = req.params.id
    title = req.body.title
    value = req.body.value
    description = req.body.description
    expensedate = new Date(req.body.expensedatetime)
    console.log("Date of expense:"+expensedate)
    console.log(typeof(expensedate))
    Expenses.update({
        title: title,
        value: value,
        description: description,
        dateExpense: expensedate},{
        where: {
            userId: req.session.user.id,
            id: id
        }
    }).then((result)=>{
        console.log("RESULT => "+result)
        res.json({
            status: 200,
            url: "/expenses/page/1"
        })
    })
})

router.get("/expenses/page/:number",(req, res) => {
    if (!req.session.user){
        res.redirect("/")
        return false
    }
    next = true
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
    if (!req.session.user){
        res.redirect("/")
        return false
    }
    title = req.body.title
    value = req.body.value
    description = req.body.description
    expensedate = req.body.expensedatetime
    console.log()
        Expenses.create({
            title: title,
            value: value,
            description: description,
            dateExpense: expensedate,
            userId: req.session.user.id
        })
})

router.get("/expense/delete/:id",(req, res) => {
    if (!req.session.user){
        res.redirect("/")
        return false
    }

    var id = req.params.id

    Expenses.destroy({
        where: {
            id: id
        }
    })

    res.redirect("/expenses/page/1")
})

module.exports = router