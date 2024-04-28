
const mongoose = require('mongoose');

const Theatre_Schema = new mongoose.Schema({
    name : { type : String, require : true},
    imgUrl : {type: [String], required : true},
    location : { type : String, require : true},
    isWorking : { type : Boolean, require : true},
    user_id :  { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
})

const ThreatreModel = mongoose.model('threatre', Theatre_Schema)

module.exports = {
    ThreatreModel
}