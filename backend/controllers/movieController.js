const express = require("express");
const { MovieModel } = require("../models/movieModel.js");
const { statusCode } = require("../utils/constants.js");

const getAllMovieList = async (req, res) => {
  try {
    const condition = {}
    if(req.query){ 
      Object.keys(req.query).forEach(value => {
        condition[value] = req.query[value]
      })
  }
    console.log(condition);
    const movieList = await MovieModel.find();

    if (!movieList.length) {
      return res.status(statusCode.NotFound).json({
        error: true,
        payload: "No movie found",
      });
    }

    res.status(statusCode.Success).json({ error: false, payload: movieList });
  } catch (error) {
    console.log(error,'Error while loading movie');
    res.status(statusCode.InternalError).json({
      error: true,
      payload: "Internal Server Error",
    });
  }
};

const getSingleMovie = async (req, res) => {
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
    console.error("Error fetching movie list:", error);
    res.status(statusCode.InternalError).json({
      error: true,
      payload: "Internal Server Error",
    });
  }
};

const getMovieDistributorMovie = async (req, res) => {
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
    console.error("Error fetching movie distributor list:", error);
    res
      .status(statusCode.InternalError)
      .json({ error: true, payload: "Internal Server Error" });
  }
};

const updateSingleMovie = async (req, res) => {
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
    console.error("Error updating movie:", error);
    res
      .status(statusCode.InternalError)
      .json({ error: true, payload: "Internal Server Error" });
  }
};

const createMovie = async (req, res) => {
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
    console.error("Error creating movie:", error);
    res
      .status(statusCode.InternalError)
      .json({ error: true, payload: "Internal Server Error" });
  }
};

const deleteMovie = async (req, res) => {
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
    console.error("Error deleting movie:", error);
    res
      .status(statusCode.InternalError)
      .json({ error: true, payload: "Internal Server Error" });
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
