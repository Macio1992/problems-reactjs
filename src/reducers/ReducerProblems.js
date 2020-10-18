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
      const { problems: problemsBySubcategory, subcategoryId } = action.payload;
      problems = state.problems;

      problems[subcategoryId] = [...problemsBySubcategory];

      return {
        ...state,
        problems
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
    default:
      return state;
  }
}

export default problemsReducer;
