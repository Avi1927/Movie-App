

import React from 'react';

const MovieDetails = ({ Movie }) => {
    // Display movie details here
    return (
        <div>
            <h2>{Movie.Title}</h2>
            <p>Year: {Movie.Year}</p>
            <p>Type: {Movie.Type}</p>
            <p>IMDb ID: {Movie.imdbID}</p>
            <p>Plot: {Movie.Plot}</p>
        </div>
    );
};

export default MovieDetails;

