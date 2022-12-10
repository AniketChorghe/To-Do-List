const express = require("express");
const bodyParser = require("body-parser");
const res = require("express/lib/response");
const date = require(__dirname + "/logic.js")

const app = express()
app.use(bodyParser.urlencoded({extended:true}))
app.set("view engine", "ejs")
app.use(express.static("public"))

const items = ["Eat", "Sleep", "Repeat"];
const workItems = [];
app.get("/", (req, res)=>{
    let day = date.getDate()
    res.render("list",{itemList : day, newListItems: items})
})

app.post("/", (req, res)=>{
    console.log(req.body)
    let item = req.body.newItem;
    if (req.body.list === "Work"){
        workItems.push(item)
        res.redirect("/work")
    } else{
    items.push(item)
    res.redirect("/")
    }
})

app.get("/work", (req, res)=>{
    res.render("list",{itemList: "Work List", newListItems : workItems} )
})
app.listen(3000, ()=>{
    console.log("Server is running on Port 3000.")
})
