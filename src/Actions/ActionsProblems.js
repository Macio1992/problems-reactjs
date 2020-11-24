import axios from 'axios';

const SERVER_URL = `http://localhost:8080`;

export const RECEIVE_PROBLEMS_BY_SUBCATEGORY = 'RECEIVE_PROBLEMS_BY_SUBCATEGORY';
export const ADD_PROBLEM = 'ADD_PROBLEM';
export const DELETE_PROBLEM = 'DELETE_PROBLEM';
export const EDIT_PROBLEM = 'EDIT_PROBLEM';

export const receiveProblemsBySubcategory = (problems) => ({
  type: RECEIVE_PROBLEMS_BY_SUBCATEGORY,
  payload: {
    problems
  },
});

export const addProblem = (problem, subcategoryId) => ({
  type: ADD_PROBLEM,
  payload: {
    problem,
    subcategoryId
  },
});

export const deleteProblem = (idToRemove, subcategoryId) => ({
  type: DELETE_PROBLEM,
  payload: {
    idToRemove,
    subcategoryId
  }
});

export const editProblem = (idToEdit, problemToEdit) => ({
  type: EDIT_PROBLEM,
  payload: {
    idToEdit,
    problemToEdit
  }
});

export const dispatchAddProblem = (problem, subcategoryId) => async dispatch => {
  try {
    await axios.post(`${SERVER_URL}/api/problems`, problem);
    dispatch(addProblem(problem, subcategoryId));
  } catch (err) {
    console.error(err);
  }
}

export const dispatchReceiveProblemsBySubcategory = subcategoryId => async dispatch => {
  try {
    const problemsBySubcategory = await axios.get(`${SERVER_URL}/api/problems/subcategory/${subcategoryId}`);
    dispatch(receiveProblemsBySubcategory(problemsBySubcategory.data));
  } catch (err) {
    console.error(err);
  }
}

export const dispatchDeleteProblem = (id, subcategoryId) => async dispatch => {
  try {
    await axios.delete(`${SERVER_URL}/api/problems/${id}`);
    dispatch(deleteProblem(id, subcategoryId));
  } catch (err) {
    console.error(err);
  }
}

export const dispatchEditProblem = (id, problem) => async dispatch => {
  try {
    await axios.put(`${SERVER_URL}/api/problems/${id}`, problem);
    dispatch(editProblem(id, problem));
  } catch (err) {
    console.error(err);
  }
}
