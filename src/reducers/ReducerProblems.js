import initialState from './State';

const problemsReducer = (state = initialState, action) => {
  let problems;
  switch (action.type) {
    case 'ADD_PROBLEM':
      const { problem, subcategoryId: id } = action.payload;
      problems = state.problems;

      if (!problems[id]) {
        problems[id] = [];
      }

      problems[id].push(problem);

      return {
        ...state,
        problems
      }
    case 'RECEIVE_PROBLEMS_BY_SUBCATEGORY':
      const { problems: problemsBySubcategory } = action.payload;

      return {
        ...state,
        problems: problemsBySubcategory
      }

    case 'DELETE_PROBLEM':
      const { idToRemove, subcategoryId: subcategoryIdToRemove } = action.payload;
      problems = state.problems;

      const filteredProblems = problems[subcategoryIdToRemove].filter(problem => problem._id !== idToRemove);
      problems[subcategoryIdToRemove] = filteredProblems;

      return {
        ...state,
        problems
      }

    case 'SET_SELECTED_SUBCATEGORY':
      const { selectedCategoryId } = action.payload;

      return {
        ...state,
        selectedSubCategory: selectedCategoryId
      }
    default:
      return state;
  }
}

export default problemsReducer;
