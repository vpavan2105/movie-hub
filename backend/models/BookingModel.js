const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    movie : { type: mongoose.Schema.Types.ObjectId, ref: 'movie', required: true },
    user : { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    theatre : { type: mongoose.Schema.Types.ObjectId, ref: 'theatre', required: true },
    totalPrice : { type: Number, required: true }
});

const BookingModel = mongoose.model('booking',bookingSchema)

module.exports = {
    BookingModel
}