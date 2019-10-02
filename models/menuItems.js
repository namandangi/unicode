import mongoose from 'mongoose';

var menuItemSchema = new mongoose.Schema({
    dishName : String,
    price : Number,
    isVegetarian : {type:Boolean , default :true},
    isJainAvailable : {type:Boolean ,default :false},
    restaurant : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'restaurantDetail'
    }
});

export default mongoose.model('menuItem',menuItemSchema);