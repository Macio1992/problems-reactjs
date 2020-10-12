import { combineReducers } from 'redux';

const initialState = {
    rootCategories: {},
    problems: []
}

const categoriesReducer = (state = initialState, action) => {
    let rootCategoriesObject;

    switch (action.type) {
        case 'REQUEST_ROOT_CATEGORIES':
            return {
                ...state,
            }
        case 'RECEIVE_ROOT_CATEGORIES':
            const { rootCategories } = action;

            rootCategoriesObject = {};
            rootCategories.forEach(category => {
                const { _id: id, CategoryName } = category;
                rootCategoriesObject[id] = {
                    ...rootCategoriesObject[id],
                    CategoryName
                };
            });

            return {
                ...state,
                rootCategories: rootCategoriesObject,
            }
        case 'RECEIVE_SUBCATEGORIES':
            const { subcategories, id } = action.payload;

            rootCategoriesObject = state.rootCategories;
            rootCategoriesObject[id] = {
                ...rootCategoriesObject[id],
                subcategories,
            }

            return {
                ...state,
                rootCategories: rootCategoriesObject,
            }
        default:
            return state;
    }
}

const problemsReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_PROBLEM':
            const { payload: problem } = action;
            const { problems } = state;
            problems.push(problem);

            return {
                ...state,
                problems
            }
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    categoriesReducer,
    problemsReducer
});

export default rootReducer;
