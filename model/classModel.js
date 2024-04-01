const mongoose = require("mongoose");
const autoIncr=require('mongoose-sequence')(mongoose)

const classSchema = new mongoose.Schema({
    _id: {
        type: Number,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    supervisor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'teacher',
        required: true
    },
    children: [
        {
            type: Number, 
            ref: 'children' 
        }
    ]
})
classSchema.plugin(autoIncr, {
    _id: 'class_model_id_counter',
    inc_field: "_id"
});
module.exports = mongoose.model("class", classSchema);
