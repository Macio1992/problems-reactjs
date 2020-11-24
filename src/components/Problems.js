import React, { Component } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import ModalFunction from './ModalFunction';
import { connect } from "react-redux";
import { dispatchDeleteProblem } from '../Actions/ActionsProblems';

class Problems extends Component {
  deleteProblem(id, subcategoryId) {
    this.props.dispatch(dispatchDeleteProblem(id, subcategoryId));
  }

  render() {
    const { problems } = this.props;

    return (
      <div className="d-flex flex-wrap">
        {
          problems.map(problem => (
            <div className="problem" key={problem._id || 'id'}>
              <p><b>Problem Id:</b> {problem._id}</p>
              <p><b>Problem Content:</b> {problem.ProblemContent}</p>
              <p><b>Problem Answer:</b> {problem.ProblemSolution}</p>
              <p><b>ProblemSubCategory:</b> {problem.ProblemSubCategory}</p>
              <p><b>ProblemCategory:</b> {problem.ProblemCategory}</p>
              <FontAwesomeIcon onClick={() => this.deleteProblem(problem._id, problem.ProblemSubCategory)} className="problem__removeIcon" icon={faTrash} />
              <ModalFunction
                problem={problem}
                openModalElement={<FontAwesomeIcon className="problem__editIcon" icon={faEdit} />}
                mode='EDIT'
              />
            </div>
          ))
        }
      </div>
    )
  }
}

const mapStateToProps = state => {
  const { problemsReducer } = state;
  const { problems } = problemsReducer;

  return {
    problems
  }
}

export default connect(mapStateToProps)(Problems);
