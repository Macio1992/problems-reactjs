import { combineReducers } from 'redux';
import problemsReducer from './ReducerProblems';
import categoriesReducer from './ReducerCategories';

const rootReducer = combineReducers({
    categoriesReducer,
    problemsReducer
});

export default rootReducer;
