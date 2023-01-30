import React, { Component } from 'react';
import './ListPage.css';

class ListPage extends Component {
    state = {
        title: '',
        movies: [],
    }
    componentDidMount() {
        const { id } = this.props.match.params;
        fetch(`https://acb-api.algoritmika.org/api/movies/list/${id}`
        )
            .then((res) => res.json())
            .then((data) => {
                this.setState({ title: data.title })
                data.movies.map((item) => {
                    fetch(`http://www.omdbapi.com/?i=${item}&apikey=3b0fba05`)
                        .then((res) => res.json())
                        .then((data) => {
                            this.setState({ movies: [...this.state.movies, data] })
                        }
                        )
                })

            }
            )
    }
    render() {
        return (
            <div className="list-page">
                <h1 className="list-page__title">{this.state.title}</h1>
                <ul>
                    {this.state.movies.map((item) => {
                        return (
                            <li key={item.imdbID}>
                                <a href={`https://www.imdb.com/title/${item.imdbID}/`} target="_blank">{item.Title} ({item.Year})</a>
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    }
}

export default ListPage;