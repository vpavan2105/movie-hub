const express = require('express');
const userRouter = express.Router();
const { auth } = require('../middleware/authMiddleware');
const { access } = require('../middleware/accessMiddleware');

userRouter.post('/login',  (req, res) => {
    try{

    }catch(err){

    }
})

userRouter.post('/register', (req, res) => {
    try{

    }catch(err){

    }
})
userRouter.patch('/:id', auth, access("user"), (req, res)=>{
    try{

    }catch(err){
        
    }

})

userRouter.post('/logout', auth, (req, res)=>{
    try{

    }catch(err){

    }
})

userRouter.get('/', auth, access("admin"), (req, res) => {
    try{

    }catch(err){

    }

})

userRouter.get('/:id', auth, access("admin"), (req, res) => {
    try{

    }catch(err){

    }

})

userRouter.delete('/:id', auth, access("admin","user"), (req, res) => {
    try{

    }catch(err){

    }
})


module.exports = {
    userRouter
}