//var mongoose        = require('mongoose');
import mongoose from 'mongoose';  
import menuItems from './menuItems';
import restaurantDetails from './restaurantDetails';


//starters , maincourse , desserts , beverages

var menuSchema = new mongoose.Schema({
categoryName : String,
menuItem : {
    type : mongoose.Schema.Types.ObjectId,
    ref : 'menuItems'
}
});

export default  mongoose.model('Menu',menuSchema);