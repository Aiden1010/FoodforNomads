const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cookieSession = require('cookie-session');
const Passport = require('passport');
const app = express();

const User = require('./model/user');
const FoodMessage = require('./model/foodMessage');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,'public')));


app.set('views',path.join(__dirname,'views'));
app.set('view engine',"ejs");
app.use( express.static( "public" ) );

app.get('/',(req,res)=>{
    res.render('index');
});

app.get('/login',(req,res)=>{
    res.render('login');
});

app.get('/register',(req,res)=>{
    res.render('register');
});

app.post('/dataAdded',(req,res)=>{

    User.findOne({phoneNumber:req.body.phoneNumber})
    .then((userExists)=>{
        if(userExists){

        }else{
            var newuser = new User({
            name: req.body.userName,
            password: req.body.password,
            address: req.body.address,
            phoneNumber: req.body.phoneNumber,
            location: req.body.location
        });
            newuser.save();

        }
    })
    
    res.redirect('/login');
});

app.post('/loggedin',(req,res)=>{
    if(req.body.phoneNumber==0000){
        res.redirect('/admin');
    }else{
        User.find({
            phoneNumber:req.body.phoneNumber,
            password:req.body.password
        })
        .then((users)=>{
            console.log(users);
            if(users.length>0){
                res.redirect('/home');
            }else{
                res.render('error');
            }
        })
    }
    
});

app.get('/home',(req,res)=>{
    res.render('homePage');
});

app.get('/newMessage',(req,res)=>{
    res.render('newMessageForm');
});

app.post('/messageAdded',(req,res)=>{
    var newMessage = new FoodMessage({
        from: req.body.from,
        type: req.body.type,
        description: req.body.description,
        quantity: req.body.quantity
    });
    newMessage.save();
    res.redirect('/home');
});

app.get('/admin',(req,res)=>{
    FoodMessage.find()
    .then((message)=>{
        res.render('admin',{message:message});
    })
})
app.listen(3000);