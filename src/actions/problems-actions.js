import axios from 'axios';

const SERVER_URL = `http://localhost:8080`;

export const ADD_PROBLEM = 'ADD_PROBLEM';

export const addProblem = (problem) => ({
  type: ADD_PROBLEM,
  payload: problem
});

export const dispatchAddProblem = (problem) => async dispatch => {
  try {
    await axios.post(`${SERVER_URL}/api/problems`, problem);
    dispatch(addProblem(problem));
  } catch (err) {
    console.error(err);
  }
}
