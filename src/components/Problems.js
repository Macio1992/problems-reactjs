import React, { Component } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

class Problems extends Component {

  render() {
    const { problems, selectedSubCategory } = this.props;
    return (
      <div className="d-flex flex-wrap">
        {
          (problems && selectedSubCategory && problems[selectedSubCategory]) &&
          problems[selectedSubCategory].map(problem => (
            <div className="problem" key={problem._id || 'id'}>
              <p><b>Problem Content:</b> {problem.ProblemContent}</p>
              <p><b>Problem Answer:</b> {problem.ProblemSolution}</p>
              <FontAwesomeIcon onClick={() => this.deleteProblem(problem._id)} className="problem__removeIcon" icon={faTrash} />
            </div>
          ))
        }
      </div>
    )
  }
}

export default Problems;
