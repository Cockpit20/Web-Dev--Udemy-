//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static("public"));

//TODO
mongoose.set(`strictQuery`, false);
mongoose.connect("mongodb://localhost:27017/wikiDB", { useNewUrlParser: true });

const articlesSchema = {
    title: String,
    content: String
}

const Article = mongoose.model("article", articlesSchema);

app.route("/articles")
    .get((req, res) => {
        Article.find({}, (err, foundArticles) => {
            res.send(foundArticles);
        })
    })
    .post((req, res) => {
        const article = new Article({
            title: req.body.title,
            content: req.body.content
        })
        article.save((err) => {
            if (err) {
                console.log(err);
            } else {
                console.log("Successfully saved the article!");
            }
        })
    })
    .delete((req, res) => {
        Article.deleteMany({}, (err) => {
            if (err) {
                console.log(err);
            } else {
                console.log("Successfully deleted all the articles");
            }
        })
    });

app.route("/articles/:articleTitle")
    .get((req, res) => {
        const articleTitle = req.params.articleTitle;
        Article.findOne({ title: articleTitle }, (err, foundArticle) => {
            if (err) {
                console.log(err);
            } else {
                res.send(foundArticle);
            }
        })
    })
    .put((req, res) => {
        Article.findOneAndUpdate({ title: req.params.articleTitle }, { title: req.body.title, content: req.body.content }, { overwrite: true }, (err, foundArticle) => {
            if (err) {
                console.log(err);
            } else {
                console.log("Successfully updated the article.");
            }
        })
    })
    .patch((req, res) => {
        Article.findOneAndUpdate({ title: req.params.articleTitle }, {$set: {title: req.body.title} }, (err, foundArticle) => {
            if (err) {
                console.log(err);
            } else {
                console.log("Successfully updated the article.");
            }
        })
    })
    .delete((req,res)=>{
        Article.findOneAndDelete({title:req.body.title},(err)=>{
            if (err) {
                console.log(err);
            } else {
                console.log("Successfully deleted the article.");
            }
        })
    });


app.listen(3000, function () {
    console.log("Server started on port 3000");
});