import React, { Component } from 'react';
import MovieItem from '../MovieItem/MovieItem';
import './Movies.css';
import { connect } from "react-redux";


class Movies extends Component {

    
    render() { 
        if(this.props.isError){
            return 'Фильмы не найдены'
        }
        return ( 
            <ul className="movies">
                {this.props.movies.map((movie) => (
                    <li className="movies__item" key={movie.imdbID}>
                        <MovieItem {...movie} />
                    </li>
                ))}
            </ul>
        );
    }
}

export default connect(
    (state) => ({movies: state.globalMovies, isError: state.globalSearch}),
)(Movies);