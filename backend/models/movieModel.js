const mongoose = require('mongoose');


const movieSchema = new mongoose.Schema({
    movieName: { type: String, required: true },
    imgUrl: { type: [String], required: true },
    runtime: { type: String, required: true },
    cast: [String],
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    budget: Number,
    isRunning: { type: Boolean, required: true },
    genre: String,
    price: Number
});


const MovieModel = mongoose.model('movie', movieSchema)

module.exports = {
   MovieModel
}