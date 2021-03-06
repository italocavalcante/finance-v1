// Import of express to configure routes.
const express = require('express')
const session = require('express-session')
const app = express();
const db = require('./database/database.js')
const nosqldb = require('./database/noSqlDatabase.js')
const MongoDBStore = require('connect-mongodb-session')(session)
const store = new MongoDBStore({ 
    uri: 'mongodb://finance:Finance3000@54.39.107.200:28018/finance',
    collection: 'sessions'
})

const hash = require('md5')
app.use(session({
    secret: "ramdom",
    cookie: {
        maxAge: 600000
    },
    store: store
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


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.get("/", (req,res) =>{
    if(!req.session.user){
        res.render("login",{
            errors:{
                user: false,
                password: false 
            }
        })
    }else{
        res.redirect("/expenses/page/1")
    }

})

app.post("/post/user/login",(req,res) => {
    email    = req.body.email
    password = hash(req.body.password)
    User.findOne({where: {
        email: email
    }}).then((user) => {
        if(user != undefined){
            if(password == user.password){
                req.session.user = {
                    id: user.id,
                    logintime: new Date().getTime(),
                    firstname: user.firstname,
                    lastname: user.lastname,
                    email: user.email
                }
                res.json({errors:{
                    user: false,
                    password: false,
                    url:"/expenses/page/1"}})
            }else{
                res.json({errors:{
                    user: false,
                    password: true 
        }})
        }
        }else{
            res.json({errors:{
                        user: true,
                        password: true 
            }})
        }
    })
    .catch((erro) => {
        console.log("User "+req.body["username"]+" not found "+ erro)
    })
})


app.get("/exit",(req,res) => {
    if (req.session.user){
        req.session.destroy()
        res.redirect("/")
    }
})

app.listen(8080,(req, res) => {
    console.log("Server started")
})