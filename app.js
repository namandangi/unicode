        import express from 'express';
        import mongoose from 'mongoose';
        //import ResDetails from './models/restaurantDetails';
        import bodyParser from 'body-parser';
        import methodOverride from 'method-override';
        import menu from './routes/menu';
        import restaurant from './routes/restaurant'
        let app  = express();

        //app.use(bodyParser.urlencoded({ extended: true }));
        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));
        app.use(bodyParser.json());
        app.use(methodOverride('_method'))
        app.set("view engine","ejs");
        mongoose.connect('mongodb://localhost:27017/uni1', {useNewUrlParser: true});

        app.use(menu);
        app.use(restaurant);

        //DIRECT ALL ROUTES TO RESTAURANT LIST
        app.get('*',(req,res)=>{
            res.redirect('/r');
        })
    
        app.listen(process.env.PORT||3000,process.env.IP,()=>{
            console.log('listening on port 3000');
        });