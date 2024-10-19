const express = require('express');
const app = express();
const port = 3200;

app.use(function(req,res,next) {
    console.log('working');
    next();
});
app.get('/', (req,res,next)=>{
    res.send('working')
    next();
});

app.use(function(error,req,res,next){
    return res.status(500).send('error');
});
app.listen(port,'localhost',(error)=>{
    if(error) {
        console.log('error');
    }
    console.log('Sarver is runnign on port no'+port)
})