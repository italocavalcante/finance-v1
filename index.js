// Import of express to configure routes.
const express = require('express')
const app = express();

// Import of body-parser to read form-data
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())


app.get("/", (req,res) =>{
    res.sendFile(__dirname + "/html/login.html")
})

app.post("/post/user/login",(req,res) => {
    console.log(req.body["username"])
    console.log(req.body["password"])
    console.log(req.query["action"])
})

app.listen(8080,(req, res) => {
    console.log("Server started")
})