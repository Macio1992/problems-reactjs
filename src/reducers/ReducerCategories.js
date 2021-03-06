import initialState from './State';

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

export default categoriesReducer;
