const express = require("express");
const movieRouter = express.Router();
const { auth } = require("../middleware/authMiddleware");
const { access } = require("../middleware/accessMiddleware");
const {
  getAllMovieList,
  getSingleMovie,
  getMovieDistributorMovie,
  updateSingleMovie,
  createMovie,
  deleteMovie,
} = require("../controllers/movieController.js");
const errorHandler = require("../middleware/errorHandler.js");

movieRouter.get("/",handleQueryParams, getAllMovieList);

movieRouter.get("/mymovies", auth, access("movie-distributor"), getMovieDistributorMovie);

movieRouter.get("/:id", getSingleMovie);

movieRouter.patch("/:id", auth, access("movie-distributor", "admin"), updateSingleMovie);

movieRouter.post("/:id", auth, access("movie-distributor"), createMovie);

movieRouter.delete("/:id", auth, access("movie-distributor"), deleteMovie);

movieRouter.use(errorHandler);

module.exports = {
  movieRouter,
};
