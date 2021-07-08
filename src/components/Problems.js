import React, { Component } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import ModalFunction from './ModalFunction';
import { connect } from "react-redux";
import { dispatchDeleteProblem } from '../Actions/ActionsProblems';
import { Row, Col, Container } from 'react-bootstrap';

class Problems extends Component {
  deleteProblem(id, subcategoryId) {
    this.props.dispatch(dispatchDeleteProblem(id, subcategoryId));
    this.handleClose();
  }

  render() {
    const { problems } = this.props;

    return (
      <Container fluid>
        <Row>
          {
            problems.map(problem => (
              <Col xs={12} className="problem" key={problem._id || 'id'}>
                <Row>
                  <Col xs={10} className="d-flex flex-column">
                    <span><b>Problem Id:</b> {problem._id}</span>
                    <span><b>Problem Content:</b> {problem.ProblemContent}</span>
                    <span><b>Problem Answer:</b> {problem.ProblemSolution}</span>
                    <span><b>ProblemSubCategory:</b> {problem.ProblemSubCategory}</span>
                    <span><b>ProblemCategory:</b> {problem.ProblemCategory}</span>
                  </Col>
                  <Col xs={2}>
                    <FontAwesomeIcon onClick={() => this.handleOpen()} className="problem__removeIcon" icon={faTrash} />
                    <ModalFunction
                      problem={problem}
                      openModalElement={<FontAwesomeIcon className="problem__editIcon" icon={faEdit} />}
                      mode='EDIT'
                      showModalElement={true}
                    />
                  </Col>
                </Row>
              </Col>
            ))
          }
        </Row>
      </Container>
    )
  }
}

const mapStateToProps = state => {
  const { problemsReducer } = state;
  const { problems } = problemsReducer;

  return {
    problems,
  }
}

export default connect(mapStateToProps)(Problems);
