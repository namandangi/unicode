import mongoose from 'mongoose';

var restaurantDetailSchema = new mongoose.Schema({
    restaurantName : String,
    phone : Number,
    address : String,
    email : String,
    menu : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'menuItem'
    }
//dishName : String
]
});


export default mongoose.model('restaurantDetail',restaurantDetailSchema);