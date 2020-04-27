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

/*function date_format(a){
    if(a instanceof Date == false){
        return false
    }

    day = a.getDate()
    month = String(a.getMonth())
    year = a.getFullYear()
    
    if(month.length == 1){
        month = "0"+month
    }
    
    if(day.length == 1){
        day = "0"+month
    }

    newDate = day+"/"+month+"/"+year

    return newDate

}*/

function date_format(a){
    if(a instanceof Date == false){
        return false
    }

    day = a.getDate()
    month = String(a.getMonth())
    year = a.getFullYear()
    
    hours = String(a.getHours())
    minutes = String(a.getMinutes())
    seconds = String(a.getSeconds())
    
    if(month.length == 1){
        month = "0"+month
    }
    
    if(day.length == 1){
        day = "0"+month
    }

    if(hours.length == 1){
        hours = "0"+hours
    }

    if(minutes.length == 1){
        minutes = "0"+minutes
    }

    if(seconds.length == 1){
        seconds = "0"+seconds
    }

    newDate = year+"/"+month+"/"+day
    newTime = hours+":"+minutes

    return newDateFormat = {
        date: newDate,
        time: newTime
    }

}

router.get("/expense/edit/:id",(req,res) => {
    if (!req.session.user){
        res.redirect("/")
        return false
    }
    console.log(typeof(req.query["dateExpense"]))
    dateExpense = new Date(parseInt(req.query["dateExpense"]))
    expenseDateForm = new Date(req.query["dateExpense"])
    console.log(dateExpense.getFullYear()+"/"+(dateExpense.getMonth())+"/"+dateExpense.getDate())
    expenseDate = dateExpense.getFullYear()+"-"+(dateExpense.getMonth()+1)+"-"+dateExpense.getDate()
    expenseTime = dateExpense.getHours()+":"+dateExpense.getMinutes()+":"+dateExpense.getSeconds()
    console.log(typeof(expenseDate))
    expenseData = {
        id: req.params.id,
        title: req.query["title"],
        value: req.query["value"],
        expenseDate: expenseDate,
        expenseTime: expenseTime,
        description: req.query["description"]
    }
    console.log(expenseData)
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
    expenseDate = new Date(req.body.expensedate)
    console.log(expenseDate)
    console.log("Id of expense: "+id)
    console.log("Id of User: "+req.session.user.id)
    Expenses.update({
        title: title,
        value: value,
        description: description,
        dateExpense: expenseDate},{
        where: {
            userId: req.session.user.id,
            id: id
        }
    })
    res.redirect("/expenses/page/1")
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