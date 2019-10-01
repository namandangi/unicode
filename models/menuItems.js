//const mongoose        = require('mongoose');
import mongoose from 'mongoose';

var menuItemSchema = new mongoose.Schema({
    dishName : String,
    price : Number,
    isVegetarian : {type:Boolean , default :true},
    isJainAvailable : {type:Boolean ,default :false},
    category : {
        type : Schema.Types.ObjectId,
        ref : menuItemCategories
    }
});

export default mongoose.model('menuItem',menuItemSchema);