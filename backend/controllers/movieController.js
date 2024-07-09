const express = require("express");
const { MovieModel } = require("../models/movieModel.js");
const { statusCode } = require("../utils/constants.js");

const getAllMovieList = async (req, res,next) => {
  try {
    const { conditions, page, limit, sortField, sortOrder } = req.queryOptions;
    const skip = (page - 1) * limit;
   const movieList = await MovieModel.find(conditions).sort({[sortField]:sortOrder}).skip(skip).limit(limit);
   const total = await MovieModel.countDocuments(conditions);
    res.status(statusCode.Success).json({
        error : false,
        payload : movieList,page,limit,total
    })

} catch (error) {

    next(error)
  }
};

const getSingleMovie = async (req, res,next) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res
        .status(statusCode.NotFound)
        .json({ error: true, payload: "Id not found" });
    }
    const movie = await MovieModel.findById(id);

    res.status(statusCode.Success).json({ error: false, payload: movie });
  } catch (error) {

    next(error)

  }
};

const getMovieDistributorMovie = async (req, res,next) => {
  try {
    const id = req?.id;

    if (!id) {
      return res
        .status(statusCode.InternalError)
        .json({ error: true, payload: "Internal Server Error" });
    }

    const movies = await MovieModel.find({ users_id: id });

    res.status(statusCode.Success).json({ error: false, payload: movies });
  } catch (error) {

    next(error)

  }
};

const updateSingleMovie = async (req, res, next) => {
  try {
    const userId = req?.id;
    const movieId = req.params.id;
    const updateData = req.body;
    let actions = {};

    if (!userId) {
      return res
        .status(statusCode.InternalError)
        .json({ error: true, payload: "Internal Server Error" });
    }

    if (!movieId || !updateData) {
      return res
        .status(statusCode.BadRequest)
        .json({ error: true, payload: "Invalid movie ID or update data" });
    }

    if (req.role === "admin") {
      if (updateData.hasOwnProperty("ENABLED")) {
        actions.enabled = updateData.enabled;
      }
    }

    const finalUpdateData = { ...updateData, ...actions };

    const updatedMovie = await MovieModel.findOneAndUpdate(
      { _id: movieId, users_id: userId },
      finalUpdateData,
      { new: true }
    );

    if (!updatedMovie) {
      return res
        .status(statusCode.NotFound)
        .json({ error: true, payload: "Movie not found" });
    }

    res.status(statusCode.Success).json({ error: false, payload: updatedMovie });
  } catch (error) {

    next(error)

  }
};

const createMovie = async (req, res,next) => {
  try {
    const userId = req?.id;
    const movieData = req.body;

    if (!userId) {
      return res
        .status(statusCode.InternalError)
        .json({ error: true, payload: "Internal Server Error" });
    }

    if (!movieData || Object.keys(movieData).length === 0) {
      return res
        .status(statusCode.BadRequest)
        .json({ error: true, payload: "Invalid movie data" });
    }

    movieData.users_id = userId;

    const newMovie = new MovieModel(movieData);
    await newMovie.save();

    res.status(statusCode.Success).json({ error: false, payload: newMovie });
  } catch (error) {

    next(error)
    
  }
};

const deleteMovie = async (req, res,next) => {
  try {
    const userId = req?.id;
    const movieId = req.params.id;

    if (!userId) {
      return res
        .status(statusCode.InternalError)
        .json({ error: true, payload: "Internal Server Error" });
    }

    if (!movieId) {
      return res
        .status(statusCode.BadRequest)
        .json({ error: true, payload: "Invalid movie ID" });
    }

    const deletedMovie = await MovieModel.findOneAndDelete({
      _id: movieId,
      users_id: userId,
    });

    if (!deletedMovie) {
      return res
        .status(statusCode.NotFound)
        .json({ error: true, payload: "Movie not found" });
    }

    res
      .status(statusCode.Success)
      .json({ error: false, payload: "Movie deleted successfully" });
  } catch (error) {

    next(error)
  }
};



module.exports = {
  getAllMovieList,
  getSingleMovie,
  getMovieDistributorMovie,
  updateSingleMovie,
  createMovie,
  deleteMovie,
};
