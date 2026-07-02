const Movie = require("../models/movieModel");

const getMovies = async (req, res) => {
    try {
        const movies = await Movie.findAll();
        res.status(200).json({
            success: true,
            data: movies
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

const getMovie = async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        if (!movie) {
            return res.status(404).json({
                success: false,
                message: "Movie not found"
            });
        }
        res.status(200).json({
            success: true,
            data: movie
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

const createMovie = async (req, res) => {
    try {
        const result = await Movie.create(req.body);
        res.status(201).json({
            success: true,
            message: "Movie created successfully",
            insertId: result.insertId
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });

    }
};

const updateMovie = async (req, res) => {
    try {
        const result = await Movie.update(req.params.id, req.body);
        res.status(200).json({
            success: true,
            message: "Movie updated successfully",
            affectedRows: result.affectedRows
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }
};

const deleteMovie = async (req, res) => {
    try {
        const result = await Movie.delete(req.params.id);
        res.status(200).json({
            success: true,
            message: "Movie deleted successfully",
            affectedRows: result.affectedRows
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }
};

module.exports = {
    getMovies,
    getMovie,
    createMovie,
    updateMovie,
    deleteMovie
};