const express = require('express');
const app = express();
const multer = require('multer');
const path = require('path');
const imageArray = [];

app.set('view engine','ejs');
app.use(express.static(path.join(__dirname,'/public')))

// Code to generate unique file name and upload file to static folder
// disk storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/images/upload/');
    },
    filename: function (req, file, cb) {
        // console.log(path.extname(file.originalname))
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname))
    }
  })
  
  // upload variable with disk storage
  const upload = multer({ storage: storage })

app.get('/',(req,res,next)=>{
    res.render('index',{image:''});
});

app.post('/upload',upload.single('image'), (req,res,next)=>{
    console.log(req.file)
    console.log(req.body)
    imageArray.push(req.file.filename);
    res.render('index',{image:imageArray});

});

app.listen(3000);