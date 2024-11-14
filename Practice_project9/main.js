const express = require('express');
const app = express();
const path = require('path');
const userModel = require('./models/user');
const { default: mongoose } = require('mongoose');
const { name } = require('ejs');
app.set('view engine','ejs');
app.use(express.json())
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'public')));

app.get('/home',(req,res,next)=>{
res.render('index');
});


app.get('/read',async (req,res,next)=>{
    // console.log('working')
    let allusers = await userModel.find();
    // console.log(allusers)
    res.render('read', {users: allusers});
});

app.post('/create', async (req,res,next)=>{
    // res.render('read');
    let {name,email,imageUrl} = req.body;
    let user = await userModel.create({
        name: name,
        email:email,
        imageUrl:imageUrl
    });
    console.log('working')
    if(user) {
        res.status(200).redirect('read')
    } else {
        res.status(500).send('error89');
    }
});

app.get('/delete/:id',async (req,res,next)=>{
    let id = req.params.id;
    console.log('working '+ id)
    let users = await userModel.findOneAndDelete({_id: id});
    console.log(users);
    res.redirect('/read');
});
app.get('/update/:id',async (req,res,next)=>{
    let id = req.params.id;
    console.log('working '+ id)
    let user = await userModel.findOne({_id: id});
    console.log('workinge '+ id)
    res.render('edit',{user:user})
});

app.post('/edit/:id',async (req,res,next)=>{
    let id = req.params.id;
    console.log('eidt work '+ id)
    let {name,email,imageUrl} = req.body;
    let user = await userModel.findOneAndUpdate({_id: id}, {name:name, email:email, imageUrl:imageUrl}  );
    console.log('workinge edit '+ user);
    res.redirect('/read');
});

    
app.listen(3000);