// const   express         = require('express'),
//         mongoose        = require('mongoose'),
//         ResDetails      = require('./models/restaurantDetails'),
//         bodyParser      = require('body-parser'),
//         methodOverride  = require('method-override'),
//         app             = express();
        import express from  'express';
        import mongoose from 'mongoose';
        import ResDetails from      './models/restaurantDetails';
        import bodyParser  from     'body-parser';
        import methodOverride from  'method-override';
        let app  = express();

        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(express.json());
        app.use(express.urlencoded());
        app.use(methodOverride('_method'))
        app.set("view engine","ejs");
        mongoose.connect('mongodb://localhost:27017/uni1', {useNewUrlParser: true});

        //ADD NEW RESTAURANT
        // app.get('/new',(req,res)=>{
        // //    res.render('add');
        // })   //not required since no html form must be displayed
        
        //CREATE NEW RESTAURANTDATA
        app.post('/',(req,res)=>{
            var resDetails = {
                restaurantName : req.query.rname,
                phone : req.query.phone,
                address : req.query.address,
                email : req.query.email,
            }
            // var resDetails = {
            //     restaurantName : 'TEAVILLA CAFE',
            //     phone : 28844324,
            //     address : 'THAKUR VILLGE KANDIVALI EAST',
            //     email : 'teavillacafe@gmail.com',
            // }        //sample test data not required since post query is working

            console.log(req.query,req.body,req.params,resDetails);
            ResDetails.create(resDetails,(err,rD)=>{
                if(!err)
                console.log(`created ${rD}`);
            });
                res.redirect('/');
        });

        //DISPLAY ALL RESTAURANT DATA
        app.get('/',(req,res)=>{
            ResDetails.find({},(err,arD)=>{
                if(!err)
                { 
                    console.log(arD);
                    res.status(200).json(arD);
                }
            });
        })

        //DISPLAY SPECIFIC RESTAURANT DETAILS
        app.get('/r/:id',(req,res)=>{
            ResDetails.findById(req.params.id,(err,rd)=>{
                if(!err)
                {
                    res.status(200).json(rd);
                }
            });
        });

        //EDIT DETAILS
        // app.get('/r/:id/edit',(req,res)=>{
        //     ResDetails.findById(req.params.id,(err,detail)=>{
        //         if(!err){
        //             res.status(200).json(detail);
        //     }});
        // });  //not required since initally was used to display a form
        
        //UPDATE DETAILS
        app.put('/r/:id/edit',(req,res)=>{
            var resDetails = {
                restaurantName : req.query.rname,
                phone : req.query.phone,
                address : req.query.address,
                email : req.query.email,
            }
            ResDetails.findByIdAndUpdate(req.params.id,resDetails,(err,uD)=>{
                console.log(`updated ${uD}`);
                res.redirect('/r/'+req.params.id);
            });
        });

        //DELETE RESTAURANT
        app.delete('/r/:id/delete',(req,res)=>{
            ResDetails.findByIdAndDelete(req.params.id,(err,delr)=>{
                console.log(`deleted ${delr}`);
                res.redirect('/');
            });
        });

        app.listen(process.env.PORT||3000,process.env.IP,()=>{
            console.log('listening on port 3000');
        });