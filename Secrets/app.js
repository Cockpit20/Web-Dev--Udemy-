//jshint esversion:6
require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const { default: mongoose } = require("mongoose");

const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const findOrCreate = require('mongoose-findorcreate');

const app = express();

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    secret: "Our little secret.",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

mongoose.set(`strictQuery`, false);
mongoose.connect("mongodb://127.0.0.1:27017/userDB", { useNewUrlParser: true });

const usersSchema = new mongoose.Schema({
    email: String,
    password: String,
    googleId: String,
    secret: String
})

usersSchema.plugin(passportLocalMongoose);
usersSchema.plugin(findOrCreate);

const User = mongoose.model("user", usersSchema);

passport.use(User.createStrategy());

passport.serializeUser((user,done)=>{
    done(null,user.id);
});
passport.deserializeUser((id,done)=>{
    User.findById(id,(err,user)=>{
        done(err,user);
    });
});

passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/secrets",
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
}, (accessToken, refreshToken, profile, cb) => {
    User.findOrCreate({ googleId: profile.id }, (err, user) => {
        return cb(err, user);
    });
}
))

app.get("/", (req, res) => {
    res.render("home");
})

app.get('/auth/google',
    passport.authenticate('google', { scope: ["profile"] })
);

app.get("/auth/google/secrets",
    passport.authenticate('google', { failureRedirect: '/login' }), (req, res) => {
        res.redirect("/secrets");
    });


app.get("/register", (req, res) => {
    res.render("register");
})

app.get("/login", (req, res) => {
    res.render("login");
})

app.get("/secrets", (req, res) => {
    User.find({"secret":{$ne:null}},(err,foundUsers)=>{
        if(err){
            console.log(err);
        }else{
            if(foundUsers){
                res.render("secrets",{usersWithSecrets: foundUsers})
            }
        }
    })
})

app.get("/submit",(req,res)=>{
    if (req.isAuthenticated()) {
        res.render("submit");
    } else {
        res.redirect("/login");
    } 
})

app.post("/submit",(req,res)=>{
    const submittedSecret=req.body.secret;

    User.findById(req.user.id,(err,foundUser)=>{
        if(err){
            console.log(err);
        }else{
            if(foundUser){
                foundUser.secret=submittedSecret;
                foundUser.save(()=>{
                    res.redirect("/secrets")
                });
            }
        }
    });
});

app.get("/logout", (req, res) => {
    req.logout(req.user, err => {
        if (err) return next(err);
        res.redirect("/");
    });
});

app.post("/register", (req, res) => {
    User.register({ username: req.body.username }, req.body.password, (err, user) => {
        if (err) {
            console.log(err);
            res.redirect("/register");
        } else {
            passport.authenticate("local")(req, res, () => {
                res.redirect("/secrets");
            })
        }
    })
})

app.post("/login", (req, res) => {
    const user = new User({
        username: req.body.username,
        password: req.body.password
    })

    req.login(user, (err) => {
        if (err) {
            console.log(err);
        } else {
            passport.authenticate("local")(req, res, () => {
                res.redirect("/secrets");
            })
        }
    })
})

app.listen(3000, () => {
    console.log("Server started on port 3000");
})