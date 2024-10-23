const express = require('express');
const app = express();
const port = 3000;
const path = require('path')
const host = 'localhost';
const fs = require('fs');
const basePath = './public';

// settingup ejs as view engine
app.set('view engine','ejs');

// setting up form parser
app.use(express.json());
app.use(express.urlencoded({urlencoded:true}));

// setting up public static files and folder
app.use(express.static(path.join(__dirname,'public')));

app.use(function(req,res,next){
    console.log('middle ware working');
    next();
});

app.get('/',function(req,res,next){
    console.log('working')

    fs.readdir('./public/files/',(err,files)=>{
        console.log(files)
        res.render('index',{files:files });
        next();
    })
});
app.get('/edit/:filename',function(req,res,next){
    res.render('edit',{prev:req.params.filename});
});
app.get('/delete/:filename',function(req,res,next){
    fs.unlink('./public/files/'+req.params.filename,(err)=>{
        console.log('delete chala')
        res.redirect('/')
    });
});
app.post('/update',function(req,res,next){
    let newfilename = req.body.newtitle.split(' ').join('');
    console.log('new name '+newfilename)
    fs.rename('./public/files/'+req.body.prevtitle, './public/files/'+newfilename+'.text',(err) =>{
        console.log('yha tk chala'+err);
        res.redirect('/');
    });
    
});
app.get('/getDetail/:filename',function(req,res,next){
    console.log('working2')
    let filename = req.params.filename;
    console.log(filename)
    fs.readFile('./public/files/'+filename,'utf-8',(error,data)=>{
        console.log()
        let date = new Date(data.toString().split("=")[2]);
        const day = date.getDate();
        const month = date.getMonth() + 1; // The month index starts from 0
        const year = date.getFullYear();

        let currentDate = `${day}/${month}/${year}`;
        // date = date.getDate()+'/'+date.getUTCDay()+'/'+date.getFullYear()+' Time '+date.getHours() + ':'+date.getMinutes() +':'+date.getSeconds();
        let filedata = {
            title:data.toString().split("=")[0],
            desc: data.toString().split("=")[1],
            date: currentDate
        }
        res.render("details",{file:filedata})
    })
})
app.post('/create',function(req,res,next){
        console.log(req.body);
        let path = basePath+'/files/';
        let time = new Date();
        let filename = time.getTime();
        let data = req.body.title+'='+req.body.description+'='+time;
        fs.appendFile(path+filename+'.text',data,(err)=>{
            if(err) {
                console.log(err+'error');   
                return next();
            }
            return res.status(200).redirect('/');
        })

});

app.listen(port,host,(error)=>{
    if(error) {
        console.log(`someting went wrong ${error}`);
    }
    console.log(`Server is running on port ${port}, http://${host}:${port}`);
});