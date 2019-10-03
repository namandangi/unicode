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
                //restaurant : req.params.id           
            }             

            console.log(req.query,req.body,req.params,dishDetails);
            ResDetails.findById(req.params.id,(err,restaurant)=>{
                if(!err)
                {
                    menuItems.create(dishDetails,(err,mi)=>{
                        if(!err){
                            console.log(`created ${mi}`);
// The line below saves a menu item to a particular restaurant 
//without this line any item added to a particular restaurant;s menu will be added to all restuarant;s menu
                            mi.restaurantid = req.params.id; 
                            mi.save();
                            restaurant.menu.push(mi);
                            restaurant.save();
                        }
                        
                        else
                        console.log(err);
                    });
                }
            });
            
                res.redirect('/r/'+req.params.id+'/menu');
        });

        //DISPLAY ALL DISHES
         router.get('/r/:id/menu/',(req,res)=>{
             ResDetails.findById(req.params.id,(err,restaurant)=>{
                 if(!err)
                {
                    menuItems.find({restaurantid:req.params.id},(err,menu)=>{
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

        
        //UPDATE DISH DETAILS
         router.put('/r/:rid/menu/:id/edit',(req,res)=>{
            var dishDetails = {                
                dishName : req.query.dname,
                price : req.query.price,
                isVegetarian : req.query.veg,
                isJainAvailable : req.query.jain,             
                //restaurant : req.query.r    
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