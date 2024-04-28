const express = require('express');
const movieRouter = express.Router();
const { auth } = require('../middleware/authMiddleware');
const { access } = require('../middleware/accessMiddleware');
movieRouter.get('/', (req, res)=>{
    try{

    }catch(err){

    }
})

movieRouter.get('/:id', (req, res) => {
    try{

    }catch(err){

    }
})

movieRouter.get('/mymovies', auth, access('movie-distributor'), (req, res)=>{
    try{

    }catch(err){

    }
})


movieRouter.patch('/:id', auth, access('movie-distributor'), (req, res) => {
    try{

    }catch(err){

    }
})

movieRouter.post('/:id', auth, access('movie-distributor'), (req, res) => {
    try{

    }catch(err){

    }
})

movieRouter.delete('/:id', auth, access('movie-distributor','admin'), (req, res) => {
    try{

    }catch(err){

    }

})

module.exports = {
    movieRouter
}