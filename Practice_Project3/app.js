const express = require('express');
const app = express();
const userModle = require('./userModel');
const { default: mongoose } = require('mongoose');
app.get('',(req,res,next)=>{
res.send('hello');
});

app.get('/create', async (req,res,next)=>{
    let caretedUser = await userModle.create({
        name: 'Vishal',
        username: 'VIshald',
        email:'Vishal@g.com'
    });

    res.send(caretedUser);
});

app.get('/Update',async (req,res,next)=>{
    
    let updatedUser = await userModle.findOneAndUpdate({username:'Piyushd'},{name:'Piyush Dhakad'},{new:true});
    console.log('working',updatedUser)
    if(updatedUser) {
        res.send(updatedUser);
    } else{
        res.status(404).send('User not found') 
    }
});

app.get('/read', async (req,res,next)=>{
    let users = await userModle.find();
    res.send(users);
});

      
app.get('/read/:username', async (req,res,next)=>{
    let user = await userModle.findOne({username:req.params.username});
    console.log(user)
    res.send(user);
});


app.get('/delete/:username', async (req,res,next)=>{
    console.log(req.params.username)
    let deletedUser = await userModle.findOneAndDelete({username:req.params.username});
    if(deletedUser) {
        res.send(deletedUser);
    } else{
        res.status(404).send('User not found') 
    }
});



// odm and orm
// Object document mapping
// Object Relation mapping
app.listen(3000);