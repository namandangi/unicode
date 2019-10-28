import express from 'express';
import user from '../models/users';
var jwt = require('jsonwebtoken');
var passport = require("passport");
var cookieParser = require('cookie-parser');
var passportJWT = require("passport-jwt");

var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
let router = express.Router();

var opts = {}
        opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
        opts.secretOrKey = 'El Psy Congroo';
        passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
            //User.findOne()
            user.findOne({id: jwt_payload.sub}, function(err, user) {
            if (err) {
                return done(err, false);
            }
            if (user) {
                return done(null, user);
            }
            console.log(jwt_payload);
        });
    }));        

//SIGNUP LOGIC
router.post('/user/signup',(req,res)=>{
    //  var username : req.query.uname;
    //  var password : req.query.pass;    
    var nuser  = {
        username : req.query.uname, 
        password : req.query.pass,
    }
    console.log(req.query.uname,req.query.pass,nuser);
    user.create(nuser,(err,user)=>{
        console.log(user);
    });
    //return res.send('henlo frands');
});

//LOGIN LOGIC ~STORES TOKENS IN COOKIES
router.post('/user/login',(req,res)=>{
    user.findOne({username:req.query.uname,password:req.query.pass},(err,user)=>{
        if(!err){
            var payload = {id: user.id};
            var token = jwt.sign(payload, opts.secretOrKey);    //GENERATING TOKEN
            res.cookie('auth',token);//STORING TOKEN IN COOKIE
            console.log({message: "ok", token: token});
          //  res.json({message: "ok", token: token});
            res.redirect('/user/'+user.id);                        
        }
        else
        return res.send(err);
    });
});

//DEFAULT MIDDLEWARE ACCESS , MANUAL TOKEN INPUT REQUIRED
// router.get('/u', passport.authenticate('jwt', { session: false }),(req,res)=>{
//     res.json('Konbanwa');        
// })

//CUSTOM MIDDLEWARE TO VERIFY A USER WITH A TOKEN STORED IN COOKIES
//USER PROFILE PAGE
router.get('/user/:id',(request,response,next)=>
{
    var token = request.cookies.auth;

  // decode token
  if (token) {

    jwt.verify(token,opts.secretOrKey , (err, token_data)=> {  //VERIFYING TOKEN
      if (err) {
         return response.status(403).send('Error');
      } else {
        request.user_data = token_data;
        next();
      }
    });

  } else {
    return response.status(403).send('No token');
  }
},(req,res)=>
{
    user.findById(req.params.id,(er,user)=>{
        res.send(`Access allowed only for ${user.username}`);
    });
        
});

export default router;