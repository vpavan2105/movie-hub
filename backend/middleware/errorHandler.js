
const errorHandler = (err, req, res, next) => {
    console.error(`${err.stack.split('\n').slice(0, 2).join('\n')}`);
    res.status(500).json({
        error: true,
        message: 'Internal Server Error',
    });
};

module.exports = errorHandler;
