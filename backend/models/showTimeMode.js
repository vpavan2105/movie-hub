const mongoose = require('mongoose');

const showtimeSchema = new mongoose.Schema({
    movie: { type: mongoose.Schema.Types.ObjectId, ref: 'movie', required: true },
    theatre: { type: mongoose.Schema.Types.ObjectId, ref: 'theatre', required: true },
    price: { type: Number, required: true },
    seatsAvailable: { type: Number, required: true },
    seats: [
        {
            seatId: { type: Number, required: true },
            name: String,
            isBooked: Boolean
        }
    ],
    date : {type:String, required: true},
    status: { type: String, enum: ["pending", "upcoming", "running"] ,default:"pending"}
});

const showtimeModel = mongoose.model('showtime', showtimeSchema);

module.exports = {
    showtimeModel
}


