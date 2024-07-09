const express = require('express');
const theatreRouter = express.Router();
const { auth } = require('../middleware/authMiddleware');
const { access } = require('../middleware/accessMiddleware');
const { theatreDelete, theatreUpdate, theatreCreate, theatreList, theatreSingle, theatreDashBoard } = require('../controllers/theatreController');

theatreRouter.get('/',theatreList)

theatreRouter.get('/dashboard',auth,access('theatre-distributor'),theatreDashBoard)

theatreRouter.get('/:id', theatreSingle)

theatreRouter.patch('/:id', auth, access('theatre-distributor','admin'), theatreUpdate)

theatreRouter.post('/:id', auth, access('theatre-distributor'), theatreCreate)

theatreRouter.delete('/:id', auth, access('theatre-distributor'), theatreDelete)


module.exports = {
    theatreRouter
}