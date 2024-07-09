

const showTimesList = async (req, res, next) => {
    try {
        const { conditions, page, limit, sortField, sortOrder } = req.queryOptions;
        const skip = (page - 1) * limit;
        const showTimeList = await TheatreModel.find(conditions).sort({[sortField]:sortOrder}).skip(skip).limit(limit);
        const total = await TheatreModel.countDocuments(conditions);
        res.status(statusCode.Success).json({
            error : false,
            payload : showTimeList,page,limit,total
        })

    }  catch (error) {

        next(error)
    }
}


module.exports = {
    showTimesList
}