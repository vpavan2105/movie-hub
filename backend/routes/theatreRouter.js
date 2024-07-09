const express = require('express');
const theatreRouter = express.Router();
const { auth } = require('../middleware/authMiddleware');
const { access } = require('../middleware/accessMiddleware');
const { theatreDelete, theatreUpdate, theatreCreate, theatreList, theatreSingle, theatreDashBoard } = require('../controllers/theatreController');
const errorHandler = require('../middleware/errorHandler');
const handleQueryParams = require('../middleware/queryUtillsMiddleware');

theatreRouter.get('/',handleQueryParams,theatreList)

theatreRouter.get('/dashboard',auth,access('theatre-distributor'),theatreDashBoard)

theatreRouter.get('/:id', theatreSingle)

theatreRouter.patch('/:id', auth, access('theatre-distributor','admin'), theatreUpdate)

theatreRouter.post('/:id', auth, access('theatre-distributor'), theatreCreate)

theatreRouter.delete('/:id', auth, access('theatre-distributor'), theatreDelete)

theatreRouter.use(errorHandler)

module.exports = {
    theatreRouter
}