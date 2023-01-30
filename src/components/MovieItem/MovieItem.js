import React, { Component } from 'react';
import './MovieItem.css';
import { connect } from "react-redux";
import { addMovieToList } from '../../redux/action'

class MovieItem extends Component {
    onAddToList = (title, year, id) => {
        let film = this.props.movieId.find((item) => {
            return item.id === id
        })
        if (film !== undefined) {
            return
        }
        this.props.addMovieToList(title, year, id)
    }

    render() {
        const { Title, Year, Poster, imdbID } = this.props;
        return (
            <article className="movie-item">
                <img className="movie-item__poster" src={Poster} alt={Title} />
                <div className="movie-item__info">
                    <h3 className="movie-item__title">{Title}&nbsp;({Year})</h3>
                    <button onClick={() => this.onAddToList(Title, Year, imdbID)} type="button" className="movie-item__add-button">Добавить в список</button>
                </div>
            </article>

        )
    }
}

// export default MovieItem;
export default connect(
    (state) => ({ movieId: state.globalMoviesList }),
    (dispatchFromRedux) => ({
        addMovieToList: (title, year, id) => dispatchFromRedux(addMovieToList(title, year, id))
    })
)(MovieItem);