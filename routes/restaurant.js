import express from 'express';
import ResDetails from '../models/restaurantDetails';
let router = express.Router();
//ADD NEW RESTAURANT
        //not required since no html form must be displayed
        //router.get('/new',(req,res)=>{
        // //    res.render('add');
        // })   
        
        //CREATE NEW RESTAURANTDATA
         router.post('/restaurants',(req,res)=>{
            var resDetails = {
                restaurantName : req.query.rname,
                phone : req.query.phone,
                address : req.query.address,
                email : req.query.email,
                menu : req.query.menu
            }
             //sample test data not required since post query is working
            // var resDetails = {
            //     restaurantName : 'TEAVILLA CAFE',
            //     phone : 28844324,
            //     address : 'THAKUR VILLGE KANDIVALI EAST',
            //     email : 'teavillacafe@gmail.com',
            // }       

            console.log(req.query,req.body,req.params,resDetails);
            ResDetails.create(resDetails,(err,rD)=>{
                if(!err)
                console.log(`created ${rD}`);
            });
                res.redirect('/restaurants');
        });

        //DISPLAY ALL RESTAURANT DATA
         router.get('/restaurants',(req,res)=>{
            ResDetails.find({}).populate('menu' ,'dishName -_id').exec((err,arD)=>{
                if(!err)
                { 
                    console.log(arD);
                    res.status(200).json(arD);
                }
            });
        })

        //DISPLAY SPECIFIC RESTAURANT DETAILS
         router.get('/restaurants/:id',(req,res)=>{
            ResDetails.findById(req.params.id).populate("menu").exec((err,rd)=>{
                if(!err)
                {
                    res.status(200).json(rd);
                }
            });
        });

        //not required since initally was used to display a form
        //EDIT DETAILS
        //router.get('/restaurants/:id/edit',(req,res)=>{
        //     ResDetails.findById(req.params.id,(err,detail)=>{
        //         if(!err){
        //             res.status(200).json(detail);
        //     }});
        // });  
        
        //UPDATE DETAILS
         router.put('/restaurants/:id/edit',(req,res)=>{
            var resDetails = {
                restaurantName : req.query.rname,
                phone : req.query.phone,
                address : req.query.address,
                email : req.query.email,
            }
            ResDetails.findByIdAndUpdate(req.params.id,resDetails,(err,uD)=>{
                console.log(`updated ${uD}`);
                res.redirect('/restaurants/'+req.params.id);
            });
        });

        //DELETE RESTAURANT
         router.delete('/restaurants/:id/delete',(req,res)=>{
            ResDetails.findByIdAndDelete(req.params.id,(err,delr)=>{
                console.log(`deleted ${delr}`);
                res.redirect('/');
            });
        });

        export default router;