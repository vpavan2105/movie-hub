
const { ShowtimeModel } = require("../models/showTimeMode");
const { TheatreModel } = require("../models/theatreModel")
const { statusCode } = require("../utils/constants");
const { createTheatreSchema } = require("../utils/validate");


const theatreList = async (req, res, next) => {
    try {
        const { conditions, page, limit, sortField, sortOrder } = req.queryOptions;
        const skip = (page - 1) * limit;
       const threatreList = await TheatreModel.find(conditions).sort({[sortField]:sortOrder}).skip(skip).limit(limit);
       const total = await TheatreModel.countDocuments(conditions);
        res.status(statusCode.Success).json({
            error : false,
            payload : threatreList,page,limit,total
        })

    } catch (error) {

        next(error)
    }
}

const theatreDashBoard = async (req, res, next) => {
    try {
        const id = req.id;
        const theatres = await TheatreModel.find({user_id : id});
        const theatreIDs = theatres.map(theatre => theatre._id);
        const showTimes = await ShowtimeModel.find({theatre : {$in:theatreIDs }})
        res.status(statusCode.Success).json({
            error : false,
            payload : showTimes
        })
        
    } catch (error) {
        
        next(error)
    }
}

const theatreSingle = async (req, res, next) => {
    try {
        const {id} = req.params;
        const theatre = await TheatreModel.findById(id);
        res.status(statusCode.Success).json({
            error : false,
            payload : theatre
        })
    } catch (error) {

        next(error)
    }
}

const theatreCreate = (req, res, next) => {
    try {
        req.body[id] = req.id;
        const {value,error} = createTheatreSchema.validate(req.body)
        if(error) return res.status(statusCode.Failure).json({
            error : true,
            payload : error.message
        })
        const theatre = new TheatreModel(value)
        theatre.save();
        return res.status(statusCode.Success).json({
            error : false,
            payload : `${theatre.name} successfully created`
        })
    } catch (error) {

        next(error)
    }
}

const theatreUpdate = async (req, res, next ) => {
    try {
        const {id} = req.params
        const theatre = await findById(id);
        let updatedTheatre;
        if(theatre?.user_id !== req?.id || req.role !== 'admin') return res.status(statusCode.BadRequest).json({error : true, payload : ' Bad Request'})
        if(req.role === 'admin') {
             updatedTheatre = await TheatreModel.findByIdAndUpdate(id, {isWorking : !theatre.isWorking},{new : true})
        
        } else { 
            updatedTheatre = await findByIdAndUpdate(id,req.body, { new: true })
        }
        res.status(statusCode.Success).json({
            error : false,
            payload : updatedTheatre
        })

    } catch (error) {
        next(error)
    }
}


const theatreDelete = async (req, res, next) => {
    try {
        const {id} = req.params
        const theatre = await findById(id);
        if(!theatre || theatre.user_id !== req.id) return res.status(statusCode.BadRequest).json({error : true, payload : ' Bad Request'})
        
        const deleteTheatre = await findByIdAndDelete(id)
        res.status(statusCode.Success).json({
            error : false,
            payload : `${deleteTheatre.name} is deleted successfully`
        })
        
    } catch (error) {
        next(error)
    }
}


module.exports = {
    theatreCreate,
    theatreUpdate,
    theatreDelete,
    theatreSingle,
    theatreList,
    theatreDashBoard
}