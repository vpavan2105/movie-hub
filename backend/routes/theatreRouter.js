const express = require('express');
const theatreRouter = express.Router();
const { auth } = require('../middleware/authMiddleware');
const { access } = require('../middleware/accessMiddleware');

theatreRouter.get('/', (req, res)=>{
    try{

    }catch(err){

    }
})

theatreRouter.get('/:id', (req, res) => {
    try{

    }catch(err){

    }
})

theatreRouter.get('/mytheatres', auth, access('theatre-distributor'), (req, res)=>{
    try{

    }catch(err){

    }
})


theatreRouter.patch('/:id', auth, access('theatre-distributor'), (req, res) => {
    try{

    }catch(err){

    }
})

theatreRouter.post('/:id', auth, access('theatre-distributor'), (req, res) => {
    try{

    }catch(err){

    }
})

theatreRouter.delete('/:id', auth, access('theatre-distributor','admin'), (req, res) => {
    try{

    }catch(err){

    }

})

module.exports = {
    theatreRouter
}