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
      console.log('idToRemove ', idToRemove, ', subcategoryIdToRemove ', subcategoryIdToRemove);
      problems = state.problems;

      const filteredProblems = problems.filter(problem => problem._id !== idToRemove);

      return {
        ...state,
        problems: filteredProblems
      }
    case 'EDIT_PROBLEM':
      const { idToEdit, problemToEdit } = action.payload;

      problems = state.problems;
      const newProblems = problems.map(problem => problem._id === idToEdit ? problemToEdit : problem);

      return {
        ...state,
        problems: newProblems
      }

    default:
      return state;
  }
}

export default problemsReducer;
