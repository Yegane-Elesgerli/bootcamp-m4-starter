const initialState = {
   globalMovies: [],
   globalMoviesList: [],
   globalListName: '',
   globalSearch: false,
};

export default function reducer(state = initialState, action) {
   switch (action.type) {
      case 'GET_MOVIES':
         return {
            ...state,
            globalMovies: action.payload.globalMovies,
         }
      case 'CLICK_MOVIE':
         return {
            ...state,
            globalMoviesList: [...state.globalMoviesList, action.payload],
         }
      case 'CHANGE_NAME':
         return {
            ...state,
            globalListName: action.payload.globalListName,
         }
      case 'ERROR_SEARCH':
         return {
            ...state,
            globalSearch: action.payload,
         }
      case 'DELETE_MOVIE':
         return {
            ...state,
            globalMoviesList: [...state.globalMoviesList.filter((item) => item.id !== action.payload)]
         }
      default: return state;
   }
}
