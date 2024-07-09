
const { ShowtimeModel } = require("../models/showTimeMode");
const { TheatreModel } = require("../models/theatreModel")
const { statusCode } = require("../utils/constants");
const { createTheatreSchema } = require("../utils/validate");


const theatreList = async (req, res) => {
    try {
        const conditions = {};
        if(req.role === "theatre-distributor") {
            conditions[user_id] = req.id;
        }
        const threatreList = await TheatreModel.find(conditions);
        res.status(statusCode.Success).json({
            error : false,
            payload : threatreList
        })

        
    } catch (error) {
        res.status(statusCode.InternalError).json({
            error : true,
            payload : 'Internal Server Error'
        })
    }
}

const theatreDashBoard = async (req, res) => {
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
        res.status(statusCode.InternalError).json({
            error : true,
            payload : 'Internal Server Error'
        })
    }
}

const theatreSingle = async (req, res) => {
    try {
        const {id} = req.params;
        const theatre = await TheatreModel.findById(id);
        res.status(statusCode.Success).json({
            error : false,
            payload : theatre
        })
    } catch (error) {
        res.status(statusCode.InternalError).json({
            error : true,
            payload : 'Internal Server Error'
        })
    }
}

const theatreCreate = (req, res) => {
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
        res.status(statusCode.InternalError).json({
            error : true,
            payload : 'Internal Server Error'
        })
    }
}

const theatreUpdate = async (req, res) => {
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
        res.status(statusCode.InternalError).json({
            error : true,
            payload : 'Internal Server Error'
        })
    }
}


const theatreDelete = async (req, res) => {
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
        res.status(statusCode.InternalError).json({
            error : true,
            payload : 'Internal Server Error'
      })
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