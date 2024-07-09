import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Card, Button, Modal, Form } from 'react-bootstrap';
import MovieListHeading from './components/MovieListHeading';
import SearchBox from './components/SearchBox';
import { BrowserRouter as Router } from 'react-router-dom';

const App = () => {
    const [movies, setMovies] = useState([]);
    const [favourites, setFavourites] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [MovieDetails, setMovieDetails] = useState(null);
    const [editMovie, setEditMovie] = useState(null);
    const [newTitle, setNewTitle] = useState('');

    useEffect(() => {
        const getMovies = async () => {
            const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=1714aa65`;

            try {
                const response = await fetch(url);
                const data = await response.json();

                if (data.Search) {
                    setMovies(data.Search);
                } else {
                    setMovies([]);
                }
            } catch (error) {
                console.error('Error fetching movies:', error);
            }
        };

        getMovies();
    }, [searchValue]);

    const fetchMovieDetails = async (imdbID) => {
        const url = `http://www.omdbapi.com/?i=${imdbID}&apikey=1714aa65`;

        try {
            const response = await fetch(url);
            const data = await response.json();
            setMovieDetails(data);
            setShowModal(true);
        } catch (error) {
            console.error('Error fetching movie details:', error);
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setMovieDetails(null);
    };

    const addFavouriteMovie = (movie) => {
        setFavourites([...favourites, movie]);
    };

    const removeFavouriteMovie = (movie) => {
        const newFavouriteList = favourites.filter(
            (favourite) => favourite.imdbID !== movie.imdbID
        );

        setFavourites(newFavouriteList);
    };

    const handleEditModalShow = (movie) => {
        setEditMovie(movie);
        setNewTitle(movie.Title);
        setShowEditModal(true);
    };

    const handleEditModalClose = () => {
        setShowEditModal(false);
        setEditMovie(null);
        setNewTitle('');
    };

    const handleEditMovie = () => {
        const updatedFavourites = favourites.map((favourite) => {
            if (favourite.imdbID === editMovie.imdbID) {
                return { ...favourite, Title: newTitle };
            }
            return favourite;
        });

        setFavourites(updatedFavourites);
        handleEditModalClose();
    };

    return (
        <Router>
            <div className='container-fluid movie-app'>
                <div className='row d-flex align-items-center mt-4 mb-4'>
                    <MovieListHeading heading='Movies' />
                    <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
                </div>
                <div className='row'>
                    {movies.map((movie) => (
                        <div key={movie.imdbID} className='col-md-3 mb-4'>
                            <Card className="h-100">
                                <Card.Img variant='top' src={movie.Poster} />
                                <div className="card-body">
                                    <Card.Title>{movie.Title}</Card.Title>
                                    <Card.Text>{movie.Year}</Card.Text>
                                    <div className="title-buttons">
                                        <Button onClick={() => fetchMovieDetails(movie.imdbID)} className="mt-3">View More</Button>
                                        <Button onClick={() => addFavouriteMovie(movie)} className="mt-3">Add to Favourites</Button>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    ))}
                </div>  
                <div className='row mt-4'>
                    <MovieListHeading heading='Favourites' />
                </div>
                <div className='row'>
                    {favourites.map((movie) => (
                        <div key={movie.imdbID} className='col-md-3 mb-4'>
                            <Card className="h-100">
                                <Card.Img variant='top' src={movie.Poster} />
                                <div className="card-body">
                                    <Card.Title>{movie.Title}</Card.Title>
                                    <Card.Text>{movie.Year}</Card.Text>
                                    <div className="title-buttons">
                                        <Button onClick={() => removeFavouriteMovie(movie)} className="mt-2">Remove</Button>
                                        <Button onClick={() => handleEditModalShow(movie)} className="mt-2">Edit</Button>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    ))}
                </div>  
                <Modal show={showModal && MovieDetails} onHide={handleCloseModal}>
                    {MovieDetails && (
                        <>
                            <Modal.Header closeButton>
                                <Modal.Title>{MovieDetails?.Title}</Modal.Title>
                            </Modal.Header>
                            <Modal.Body style={{ color: 'black' }}>
                                <p><strong>Title:</strong> {MovieDetails?.Title}</p>
                                <p><strong>Year:</strong> {MovieDetails?.Year}</p>
                                <p><strong>Released:</strong> {MovieDetails?.Released}</p>
                                <p><strong>Actors:</strong> {MovieDetails?.Actors}</p>
                                <p><strong>Awards:</strong> {MovieDetails?.Awards}</p>
                                <p><strong>Country:</strong> {MovieDetails?.Country}</p>
                                <p><strong>Genre:</strong> {MovieDetails?.Genre}</p>
                                <p><strong>Type:</strong> {MovieDetails?.Type}</p>
                                <p><strong>Language:</strong> {MovieDetails?.Language}</p>
                                <p><strong>Runtime:</strong> {MovieDetails?.Runtime}</p>
                                <p><strong>IMDB ID:</strong> {MovieDetails?.imdbID}</p>
                                <p><strong>IMDB Rating:</strong> {MovieDetails?.imdbRating}</p>
                                <p><strong>IMDB VOTES:</strong> {MovieDetails?.imdbVotes}</p>
                                <p><strong>Plot:</strong> {MovieDetails?.Plot}</p>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
                            </Modal.Footer>
                        </>
                    )}
                </Modal>
                <Modal show={showEditModal} onHide={handleEditModalClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Movie Title</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="formMovieTitle">
                                <Form.Label>Title</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={newTitle}
                                    onChange={(e) => setNewTitle(e.target.value)}
                                />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleEditModalClose}>Close</Button>
                        <Button variant="primary" onClick={handleEditMovie}>Save Changes</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </Router>
    );
};

export default App;
