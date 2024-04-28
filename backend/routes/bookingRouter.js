const express = require('express');
const { auth } = require('../middleware/authMiddleware');
const { access } = require('../middleware/accessMiddleware');

const bookingRouter = express.Router();

bookingRouter.get('/', auth, access('admin'), (req,res) => {
    try{

    }catch(err){

    }
})

bookingRouter.get('/mybooking', auth, (req,res) => {
    try{

    }catch(err){
        
    }
})

module.exports ={
    bookingRouter
}