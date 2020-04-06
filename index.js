// Import of express to configure routes.
const express = require('express')
const session = require('express-session')
const app = express();
const db = require('./database/database.js')

app.use(session({
    secret: "ramdom",
    cookie: {
        maxAge: 600000
    }
}))
app.set('view engine', 'ejs')

const usersController = require("./database/usersController.js")
app.use("/",usersController)

const expensesController = require("./database/expensesController.js")
app.use("/",expensesController)

const User = require('./database/users')

// Import of body-parser to read form-data
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

//Setting to use EJS
//app.use('view engine', 'ejs')

app.get("/", (req,res) =>{
    res.render("login")
})

app.post("/post/user/login",(req,res) => {
    User.findOne({where: {
        email: req.body["username"]
    }}).then(console.log("User "+ " "+req.body["username"]+" "+"found."))
    .catch((erro) => {
        console.log("User "+req.body["username"]+"not found")
    })
})

app.listen(8080,(req, res) => {
    console.log("Server started")
})