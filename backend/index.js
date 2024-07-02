const express = require('express');
const app = express();
const cors = require('cors');
const { connectionToDB } = require('./config/dbconfig');
const { userRouter } = require('./routes/userRouter');
const { movieRouter } = require('./routes/movieRouter');
const { theatreRouter } = require('./routes/theatreRouter');
const { showTimeRouter } = require('./routes/showTimeRouter');
const { bookingRouter } = require('./routes/bookingRouter');

const port = 3000;

app.use(express.json());
app.use(cors())
app.use('/users', userRouter);
app.use('/movies', movieRouter);
app.use('/theatres', theatreRouter);
app.use('/showTimes', showTimeRouter);
app.use('/bookings', bookingRouter)

app.listen(port, async ()=> {
    await connectionToDB()
})