const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const bcrypt = require('bcrypt');
const userModel = require('./models/userModel');
const { register } = require('module');
const { error } = require('console');
const app = express();
const port = 3000;
const host = 'localhost';

app.set('view engine','ejs');
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname,'public')));
app.use(express.urlencoded({extended:true}));


app.get('/',(req,res,next)=>{
    res.render('register',{err:''});
})

// name
// username
// email
// password
// age

app.post('/Create', async (req,res,next)=>{
    let {name,username,email,age,password} = req.body;
    let isUserExist = await userModel.findOne({email:email});
    if(isUserExist.length) return res.status(500).send('User Already exist');

    bcrypt.genSalt(10,salt,(error,salt)=>{
        console.log('salt '+salt);
        bcrypt.hash(password,salt, async (error,encryptedPassword)=>{
            console.log(encryptedPassword);
            let user = await userModel.create({name,username,email,age,encryptedPassword});
            if(user) {
                res.render('dashboard');
            } else {
                res.send(register,{error:'something went wrong'});
            }
        });
    })
});

app.listen(port,host);