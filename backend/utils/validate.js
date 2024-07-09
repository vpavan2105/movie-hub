

const Joi = require('joi');

exports.createUserSchema = Joi.object({
    username : Joi.string().required(),
    password : Joi.string().required(),
    email : Joi.string().required(),
    role : Joi.string().valid('user','admin','movie-distributor','theatre-distributor').required().default('user'),
    location : Joi.string().required()

})

exports.createTheatreSchema = Joi.object({
    name : Joi.string().required(),
    imgUrl : Joi.array().required(),
    location : Joi.string().required(),
    user_id : Joi.string().required(),
})