const mongoose = require("mongoose");

const schema = new mongoose.Schema({
_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
},
role: {
    type: String,
    enum: ['teacher', 'Admin'], 
    default: 'teacher' 
},
fullName:{
    type: String,
    required: true

},
password: {
    type: String,
    required: true
},
email: {
    type: String,
    required: true
},
image: {
    type: String,
    default: null
}
})

module.exports = mongoose.model("teacher", schema);
