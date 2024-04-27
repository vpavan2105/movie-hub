
const mongoose = require('mongoose');
const User_Schema = new mongoose.Schema({
    username : {type : String ,unique:true, required: true},
    password : {type : String, required: true},
    email : {type : String, required: true},
    role : {type : String, required: true , enum :['user','admin'], default : 'user'},
    
})

const UserModel = mongoose.model('user',User_Schema);

module.exports = {
    UserModel
}