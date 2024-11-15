const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const userModle = require('./models/userModel');
const jwt = require('jsonwebtoken');
const secratKey = 'mykey'
const bcrypt = require('bcrypt');


app.set('view engine','ejs');
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname,'public')));

app.get('/', (req,res,next)=>{
    res.render('index');
})

app.get('/register', (req,res,next)=>{
    res.render('register');
})
app.get('/dashboard',(req,res,next)=>{
    res.render('dashboard');
})
app.get('/logOut',(req,res,next)=>{
    res.render('index');
})

app.post('/Create', (req,res,next)=>{
    let {username,email,password,age} = req.body;
    age = Number(age);
    console.log(username)
    console.log(email)
    console.log(password)
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(password, salt,async function(err, hash) {
            
            console.log(hash)
            password = hash;
            let newUser = await userModle.create({ username,email,password,age});
            if(newUser){
                let token = jwt.sign({Email:newUser.email},secratKey);
                res.cookie('token',token);
                res.redirect('/')
            }
        });
    });
})

app.post('/login',async (req,res,next)=>{
    let {username,email,password,age} = req.body;
    console.log(email)
    console.log(password)

    let user = await userModle.findOne({ email:email});
    console.log(user)
    if(user){
    bcrypt.compare(password,user.password).then(function(result) {
        console.log(result+'reustlt')
        if(result){
            let token = jwt.sign({Email:user.email},secratKey);
            res.cookie('token',token);
            res.render('dashboard');
        } else {
            res.render('index');
        }
        });
        } else {
            res.render('index');
        } 
        // result == true
});




app.listen(port);