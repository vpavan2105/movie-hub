

const Joi = require('joi');

exports.createUserSchema = Joi.object({
    username : Joi.string().required(),
    password : Joi.string().required(),
    email : Joi.email().required(),
    role : Joi.string().valid('user','admin','movie-distributor','theatre-distributor').required().default('user'),
    location : Joi.string().required()

})

