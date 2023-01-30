import React, { Component } from 'react';
import './SearchBox.css';
import { connect } from "react-redux";
import { addMovies } from '../../redux/action';
import { getError } from '../../redux/action';
class SearchBox extends Component {
    state = {
        searchLine: '',
    }
    searchLineChangeHandler = (e) => {
        this.setState({ searchLine: e.target.value });
    }
    searchBoxSubmitHandler = (e) => {
        e.preventDefault();
    }
    searchButtonClick = () => {
        this.getMovieApi()
    }

    getMovieApi = (query) => {
        if (this.state.searchLine.length < 3) return

        fetch(`http://www.omdbapi.com/?s=${this.state.searchLine}&apikey=3b0fba05`)
            .then((response) => response.json())
            .then((data) => {
                if (data.Search) {
                    this.props.addMovies(data.Search ?? [])
                    this.props.getError(false)
                    return
                }
                this.props.getError(true)
            })

    }

    render() {
        const { searchLine } = this.state;
        return (
            <div className="search-box">
                <form className="search-box__form" onSubmit={this.searchBoxSubmitHandler}>
                    <label className="search-box__form-label">
                        Искать фильм по названию:
                        <input
                            value={searchLine}
                            type="text"
                            className="search-box__form-input"
                            placeholder="Например, Shawshank Redemption"
                            onChange={this.searchLineChangeHandler}
                        />
                    </label>
                    <button
                        type="submit"
                        className="search-box__form-submit"
                        disabled={!searchLine}
                        onClick={this.searchButtonClick}
                    >
                        Искать
                    </button>
                </form>
            </div>
        );
    }
}

export default connect(
    (state) => ({ isError: state.globalSearch }),
    (dispatchFromRedux) => ({
        addMovies: (globalMovies) => dispatchFromRedux(addMovies(globalMovies)),
        getError: (globalSearch) => dispatchFromRedux(getError(globalSearch))
    })
)(SearchBox);