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

// Configure of EJS to rederize HTML
app.set('view engine', 'ejs')

// Configure of MaterializeCss to do views
app.use(express.static(__dirname+'/public'))
const usersController = require("./database/usersController.js")
app.use("/",usersController)

const expensesController = require("./database/expensesController.js")
app.use("/",expensesController)

const User = require('./database/users')

// Import of body-parser to read form-data
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())



app.get("/", (req,res) =>{
    res.render("login")
})

app.post("/post/user/login",(req,res) => {
    email = req.body["username"]
    password = req.body["password"]
    
    User.findOne({where: {
        email: email
    }}).then((user) => {
        if(user.email == undefined){

        }else{
            console.log("User does not exist, please sign in to login.")
        }
    })
    .catch((erro) => {
        console.log("User "+req.body["username"]+" not found")
    })
})

app.listen(8080,(req, res) => {
    console.log("Server started")
})