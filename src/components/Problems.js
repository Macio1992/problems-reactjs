import React, { Component } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import ModalFunction from './ModalFunction';
import { connect } from "react-redux";

class Problems extends Component {
  render() {
    const { problems } = this.props;

    return (
      <div className="d-flex flex-wrap">
        {
          problems.map(problem => (
            <div className="problem" key={problem._id || 'id'}>
              <p><b>Problem Content:</b> {problem.ProblemContent}</p>
              <p><b>Problem Answer:</b> {problem.ProblemSolution}</p>
              <FontAwesomeIcon onClick={() => this.deleteProblem(problem._id)} className="problem__removeIcon" icon={faTrash} />
              <ModalFunction problem={problem} openModalElement={<FontAwesomeIcon className="problem__editIcon" icon={faEdit} />} />
            </div>
          ))
        }
      </div>
    )
  }
}

const mapStateToProps = state => {
  const { problemsReducer } = state;
  const { problems, selectedSubCategory = '' } = problemsReducer;

  return {
    problems,
    selectedSubCategory
  }
}

export default connect(mapStateToProps)(Problems);
