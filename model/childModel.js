const mongoose = require('mongoose');
const autoIncr=require('mongoose-sequence')(mongoose)

const addressSchema = new mongoose.Schema({
    city: {
        type: String,
        required: true
    },
    street: {
        type: String,
        required: true
    },
    building: {
        type: String,
        required: true
    }
    
},{_id:false});


const childSchema = new mongoose.Schema({
    _id: {
        type: Number,
       
        unique: true
    },
    fullName: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true,
        min: 0 
    },
    image: {
        type: String,
        default: null
    },
    level: {
        type: String,
        enum: ['PreKG', 'KG1', 'KG2'],
        required: true
    },
    address: addressSchema
});


childSchema.plugin(autoIncr, {
    id: 'class_model_id_counter',
    inc_field: "_id"
});
module.exports = mongoose.model('children', childSchema);


