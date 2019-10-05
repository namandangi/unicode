        import express from 'express';
        import mongoose from 'mongoose';
        //import ResDetails from './models/restaurantDetails';
        import bodyParser from 'body-parser';
        import methodOverride from 'method-override';
        import menu from './routes/menu';
        import restaurant from './routes/restaurant';
        import passport from 'passport';
        import User from './routes/user';
        var JwtStrategy = require('passport-jwt').Strategy,
            ExtractJwt = require('passport-jwt').ExtractJwt;
            var cookieParser = require('cookie-parser');
        let app  = express();

        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));
        app.use(bodyParser.json());
        app.use(methodOverride('_method'));
        app.use(cookieParser());
        app.use(passport.initialize());
        app.set("view engine","ejs");
        mongoose.connect('mongodb://localhost:27017/uni1', {useNewUrlParser: true});

        

        app.use(menu);
        app.use(restaurant);
        app.use(User);
        

        //DIRECT ALL ROUTES TO RESTAURANT LIST
        app.get('*',(req,res)=>{
            res.redirect('/r');
        })
    
        app.listen(process.env.PORT||3000,process.env.IP,()=>{
            console.log('listening on port 3000');
        });