const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _=require("lodash");
const date = require(__dirname + "/date.js");

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.set(`strictQuery`, false);
mongoose.connect("mongodb://localhost:27017/todolistDB", { useNewUrlParser: true })

const itemsSchema = {
    name: String
};

const Item = mongoose.model("item", itemsSchema);

const item1 = new Item({
    name: "Welcome to your todolist!"
})

const item2 = new Item({
    name: "Hit the + button to add a new item"
})

const item3 = new Item({
    name: "<-- Hit this to delete an item"
})

const defaultItems = [item1, item2, item3];

const listSchema = {
    name: String,
    items: [itemsSchema]
}

const List = mongoose.model("list", listSchema);



app.get("/", (req, res) => {
    let day = date.getDay();
    Item.find({}, (err, items) => {
        if (items.length === 0) {
            Item.insertMany(defaultItems, (err) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log("Successfully added the documents!");
                }
            });
            res.redirect("/");
        } else {
            res.render("list", { listTitle: day, newListItems: items })
        }
    })
})

app.post("/", (req, res) => {
    let itemName = req.body.newItem;
    const listName=req.body.list;
    const item = new Item({
        name: itemName
    });

    if(listName===date.getDay()){
        item.save();
        res.redirect("/");
    }else{
        List.findOne({name: listName},(err,foundList)=>{
            foundList.items.push(item);
            foundList.save();
            res.redirect("/"+listName);
        })
    }
})

app.post("/delete", (req, res) => {
    const checkedItemId = req.body.checkbox;
    const listName=req.body.listName;

    if(listName===date.getDay()){
        Item.findByIdAndRemove(checkedItemId, (err) => {
            if (err) {
                console.log(err);
            } else {
                console.log("Successfully deleted the document!");
            }
        })
        res.redirect("/");
    }else{
        List.findOneAndUpdate({name: listName},{$pull: {items: {_id: checkedItemId}}},(err,foundList)=>{
            if(!err){
                res.redirect("/"+listName);
            }
        })
    }    
})

app.get("/:customListName", (req, res) => {
    const customListName = _.capitalize(req.params.customListName);
    List.findOne({ name: customListName }, (err, foundList) => {
        if (!err) {
            if (!foundList) {
                const list = new List({
                    name: customListName,
                    items: defaultItems
                })
                list.save();
                res.redirect("/" + customListName);
            } else {
                res.render("list", { listTitle: foundList.name, newListItems: foundList.items });
            }
        }
    })
})

app.get("/about", (req, res) => {
    res.render("about");
})

app.listen(3000, () => {
    console.log("Server running on port 3000...")
})