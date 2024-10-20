const express = require('express');
const app = express();
const port = 3000;
const host = 'localhost';
const path = require('path');
// setting up form parser
// its like a middle ware all request will go through with this middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// setting up ejs as view engine
app.set('view engine','ejs');

// setting up public static files and folder
app.use(express.static(path.join(__dirname,'public')));

// setting up our middle ware
app.use(function(req,res,next){
console.log('Middleware works');
//res.send('middleware works');
next();
});
// home route
app.get('/',function(req,res,next){
    res.status(200).render('index');
next();
});
// Setting up dynamic route for user profile
app.get('/profile/:username/:age',function(req,res,next){
    let name = req.params.username;
    res.send(`<h3>Welcome ${name}, your age ${req.params.age} </h3>`);
    // res.status(200).send('Profile route works');
});
// setting up end middle ware
app.use(function(req,res,next){
    console.log('End Middleware works');
    // res.send('end middleware works');
    next();
});

app.use(function(err,req,res,next){
    res.status(500).send(`Error ${err}`);
});

// Setting up listner
app.listen(port,host,(error)=>{
    if(error){
        console.log(`Something went wrong ${error}`);
        return;
    }
    http://localhost:1337/. 
    console.log(`Server is running on port no. ${port}`);
    console.log(`http://${host}:${port}/`);
})