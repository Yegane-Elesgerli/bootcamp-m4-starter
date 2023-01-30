
export function addMovies(mov) {
   return {
      type: 'GET_MOVIES',
      payload: { globalMovies: mov }
   }
}

export function addMovieToList(title, year, id) {
   return {
      type: 'CLICK_MOVIE',
      payload: { title, year, id }
   }
}

export function changeNameList(listName) {
   return {
      type: 'CHANGE_NAME',
      payload: { globalListName: listName }
   }
}

export function getError(isError) {
   return {
      type: 'ERROR_SEARCH',
      payload: isError
   }
}

export function onClickDelete(movieId) {
   return {
      type: 'DELETE_MOVIE',
      payload: movieId,
   }
}