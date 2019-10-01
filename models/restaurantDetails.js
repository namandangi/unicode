//const mongoose        = require('mongoose');
import mongoose from 'mongoose';

var restaurantDetailSchema = new mongoose.Schema({
    restaurantName : String,
    phone : Number,
    address : String,
    email : String
});

export default mongoose.model('restaurantDetail',restaurantDetailSchema);