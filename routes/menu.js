import mongoose from 'mongoose';
import express from 'express';
import ResDetails from '../models/restaurantDetails';
import menuItems from '../models/menuItems';
import menuItemCategory from '../models/menuItemCategories';
let router = express.Router();
        
        //ADD NEW DISH
         router.post('/r/:id/menu/',(req,res)=>{
            var dishDetails = {                
                dishName : req.query.dname,
                price : req.query.price,
                isVegetarian : req.query.veg,
                isJainAvailable : req.query.jain,
                //category : req.query.c
                //category : ''
            }
             //sample test data not required since post query is working
            // var resDetails = {
            //     restaurantName : 'TEAVILLA CAFE',
            //     phone : 28844324,
            //     address : 'THAKUR VILLGE KANDIVALI EAST',
            //     email : 'teavillacafe@gmail.com',
            // }       

            console.log(req.query,req.body,req.params,dishDetails);
            menuItems.create(dishDetails,(err,rD)=>{
                if(!err)
                console.log(`created ${rD}`);
                else
                console.log(err);
            });
                res.redirect('/r/'+req.params.id+'/menu');
        });

        //DISPLAY ALL DISHES
         router.get('/r/:id/menu/',(req,res)=>{
             ResDetails.findById(req.params.id,(err,restaurant)=>{
                 if(!err)
                {
                    menuItems.find({},(err,menu)=>{
                        res.status(200).json(menu);
                    });
                }
             });            
        });

        //DISPLAY SPECIFIC DISH DETAILS
         router.get('/r/:rid/menu/:id',(req,res)=>{
            ResDetails.findById(req.params.rid,(err,rd)=>{
                if(!err)
                {
                    menuItems.findById(req.params.id,(err,smenu)=>{
                        res.status(200).json(smenu);
                    });
                }
            });
        });

        //not required since initally was used to display a form
        //EDIT DETAILS
        //router.get('/r/:id/edit',(req,res)=>{
        //     ResDetails.findById(req.params.id,(err,detail)=>{
        //         if(!err){
        //             res.status(200).json(detail);
        //     }});
        // });  
        
        //UPDATE DISH DETAILS
         router.put('/r/:rid/menu/:id/edit',(req,res)=>{
            var dishDetails = {                
                dishName : req.query.dname,
                price : req.query.price,
                isVegetarian : req.query.veg,
                isJainAvailable : req.query.jain,
                //category : req.query.c
                //category : ''
            }
            console.log(dishDetails);
            ResDetails.findById(req.params.rid,(err,restaurant)=>{
                if(!err)
                {
                menuItems.findByIdAndUpdate(req.params.id,dishDetails,(err,uD)=>
                {
                    console.log(`updated ${uD}`);
                    res.redirect('/r/'+req.params.rid+'/menu/'+req.params.id);
                });
                }
            });            
        });

        //DELETE DISH
         router.delete('/r/:rid/menu/:id/delete',(req,res)=>{             
            ResDetails.findById(req.params.rid,(err,restaurant)=>{
                if(!err)
                    {
                        menuItems.findByIdAndDelete(req.params.id,(err,delr)=>{
                        console.log(`deleted ${delr}`);
                        res.redirect('/r/'+req.params.rid+'/menu/');
                    });
                    }
             });
    });

        export default router;