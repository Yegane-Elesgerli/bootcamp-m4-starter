import React, { Component } from 'react';
import './Favorites.css';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { changeNameList, onClickDelete } from '../../redux/action';

class Favorites extends Component {
    state = {
        list: null,
    }
    onClickSave = () => {
        this.setState({ list: false })
        this.saveList()
    }
    onDelete = (id) => {
        if (this.state.list) {
            return
        }
        this.props.onClickDelete(id)
    }
    saveList = () => {
        let moviesId = this.props.favoritesList.map((item) => item.id);
        let listForSend = {
            title: this.props.listName,
            movies: moviesId
        }
        fetch(`https://acb-api.algoritmika.org/api/movies/list`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(listForSend),
        })
            .then((res) => res.json())
            .then((data) => this.setState({ list: data.id }))

    }

    render() {
        return (
            <div className="favorites">
                <input disabled={this.state.list} value={this.props.listName} onChange={(e) => this.props.changeNameList(e.target.value)} className="favorites__name" />
                <ul className="favorites__list">
                    {this.props.favoritesList.map((item) => {
                        return <li key={item.id}>{item.title} ({item.year}) <button onClick={() => this.onDelete(item.id)}>X</button></li>;
                    })}
                </ul>
                {
                    !this.state.list
                        ? <button disabled={!this.props.favoritesList.length || !this.props.listName} onClick={this.onClickSave} type="button" className="favorites__save">Сохранить список</button>
                        : <Link to={`/list/${this.state.list}`}>Перейти к списку</Link>
                }
            </div>
        );
    }
}

export default connect(
    (state) => ({ favoritesList: state.globalMoviesList, listName: state.globalListName }),
    (dispatchFromRedux) => ({
        changeNameList: (globalListName) => dispatchFromRedux(changeNameList(globalListName)),
        onClickDelete: (movieId) => dispatchFromRedux(onClickDelete(movieId))
    })
)(Favorites);

