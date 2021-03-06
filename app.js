        import express from 'express';
        import mongoose from 'mongoose';
        //import ResDetails from './models/restaurantDetails';
        import bodyParser from 'body-parser';
        import methodOverride from 'method-override';
        import menu from './routes/menu';
        import restaurant from './routes/restaurant';
        import passport from 'passport';
        import User from './routes/user';
        import Chat from './routes/chat';
        //const io = require("socket.io")(http);
        var JwtStrategy = require('passport-jwt').Strategy,
            ExtractJwt = require('passport-jwt').ExtractJwt;
            var cookieParser = require('cookie-parser');
            var datetime = new Date();
            var dateTime = require('node-datetime');        
        let app  = express();    
        const http = require("http").Server(app);
        const io = require("socket.io")(http);

        app.set("view engine","ejs");
        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));
        app.use(bodyParser.json());
        app.use(express.static('public'));
        app.use(methodOverride('_method'));
        app.use(cookieParser());
        app.use(passport.initialize());
        mongoose.connect('mongodb://localhost:27017/uni1', {useNewUrlParser: true});                    


       //Socket.io Setup 
        io.on("connection", function(socket) {

        socket.on("user_join", function(data) {
            this.username = data;
            socket.broadcast.emit("user_join", data);
            //console.log(Date.now());
            console.log(datetime.toISOString().slice(0,10));
            var dt = dateTime.create();
            var formatted = dt.format('D-m-Y H:M:S');
            console.log(this.username+" connected at : "+formatted);
        });

        socket.on("chat_message", function(data) {
            data.username = this.username;
            socket.broadcast.emit("chat_message", data);
        });

        socket.on("disconnect", function(data) {
            socket.broadcast.emit("user_leave", this.username);
            //console.log(Date.now());
            console.log(datetime.toISOString().slice(0,10));
            var dt = dateTime.create();
            var formatted = dt.format('D-m-Y H:M:S');
            console.log(this.username+" left at : "+formatted);
        });
    });

        app.use(menu);
        app.use(restaurant);
        app.use(User);        
        app.use(Chat);

       //DIRECT ALL ROUTES TO RESTAURANT LIST
        // app.get('*',(req,res)=>{
        //     res.redirect('/r');
        // })

        let server = http.listen(process.env.PORT||3000,process.env.IP,()=>{
            console.log('listening on port 3000');
        });
      