const express = require('express');
const showTimeRouter = express.Router();
const { auth } = require('../middleware/authMiddleware');
const { access } = require('../middleware/accessMiddleware');
const handleQueryParams = require('../middleware/queryUtillsMiddleware');
const errorHandler = require('../middleware/errorHandler');
const { showTimesList } = require('../controllers/showTimeController');

showTimeRouter.get('/', handleQueryParams,showTimesList)
showTimeRouter.get('/myshows', auth, access('threatre-distributor','movie-distributor'), )

showTimeRouter.post('/', auth, access('threatre-distributor'),)

showTimeRouter.patch('/', auth, access('threatre-distributor'), )

showTimeRouter.delete('/', auth, access('threatre-distributor'),)

showTimeRouter.use(errorHandler)

module.exports = {
    showTimeRouter
}