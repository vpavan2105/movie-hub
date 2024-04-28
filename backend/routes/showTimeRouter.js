const express = require('express');
const showTimeRouter = express.Router();
const { auth } = require('../middleware/authMiddleware');
const { access } = require('../middleware/accessMiddleware');

showTimeRouter.get('/', auth, (req, res) => {
    try{

    }catch(err){

    }
})
showTimeRouter.get('/myshows', auth, access('threatre-distributor','movie-distributor'), (req, res) => {
    try{

    }catch(err){

    }
})

showTimeRouter.post('/', auth, access('threatre-distributor'), (req, res) => {
    try{

    }catch(err){

    }
})

showTimeRouter.patch('/', auth, access('threatre-distributor'), (req, res) => {
    try{

    }catch(err){

    }

})

showTimeRouter.delete('/', auth, access('threatre-distributor'), (req, res) =>{

})

module.exports = {
    showTimeRouter
}