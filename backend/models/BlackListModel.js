const mongoose = require('mongoose');

const BlackList_Schema = new mongoose.Schema({
    token : String,
    user_id :  { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
})

const BlackListModel = mongoose.model('blacklist',BlackList_Schema)

module.exports = {
    BlackListModel
}


