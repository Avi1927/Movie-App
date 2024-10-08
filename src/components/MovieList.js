import React from 'react';

const MovieList = (props) => {
    console.log('Movies:', props.movies); // Add this line to log the value of movies
    const FavouriteComponent = props.favouriteComponent;

    return (
        <>
            {props.movies.map((movie, index) => (
                <div className='image-container d-flex justify-content-start m-3' key={index}>
                    <img src={movie.Poster} alt='movie' />
                    <div
                        onClick={() => props.handleFavouritesClick(movie)}
                        className='overlay d-flex align-items-center justify-content-center'
                    >
                        <FavouriteComponent />
                    </div>
                </div>
            ))}
        </>
    );
};

export default MovieList;
