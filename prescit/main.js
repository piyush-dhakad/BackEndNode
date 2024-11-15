const express = require('express');
const cookieparser = require('cookie-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const app = express();
const port = 3000;
let EncriptedPassword = '';
app.use(cookieparser());
//----------------------
// yha hum cookies ko kese set krte he brouser pr and usko kese get krte he brouser se 
// sikh rhe he
app.get('/',(req,res,next)=>{
res.cookie('name','DhakadUjjain');
res.send('working');
});

app.get('/read',(req,res,next)=>{
    console.log(req.cookies)
    res.send('working');
});
    
//----------------------
// yha hum password ko kese encript and decript krte he dekh rhe he
app.get('/login',(req,res,next)=>{
    console.log(req.cookies);
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(req.cookies.name, salt, function(err, hash) {
            EncriptedPassword = hash;
        });
    });
    console.log(EncriptedPassword);
    res.send(EncriptedPassword+' working')
});


app.get('/logout',(req,res,next)=>{
    console.log(req.cookies.name);
    bcrypt.compare(req.cookies.name, EncriptedPassword, function(err, result) {
        if(result) {
            res.send('working-good');
        } else {
            res.send('not working-good');
        }
    });
});

//----------------------
// yha hum auth token kese bnate he or Token se data kese get krege vo dekh rhe he

app.get('/authCreateToken',(req,res,next)=>{
    console.log(req.cookies.name);
    let token = jwt.sign({email:'Piyush@gmail.com'},'mysecratkey');
    res.cookie('token',token);
    res.send('working tokein '+token);
});
app.get('/authGetToken',(req,res,next)=>{
    console.log(req.cookies.token);
    let data = jwt.verify(req.cookies.token,'mysecratkey');
    res.send('get tokein data '+data.email);
});
app.listen(port, 'localhost', (error)=>{
    if(error) {
        console.log('error ayi');
    }
    console.log(`Server is running on port no ${port} http://localhost:${port}`);
});