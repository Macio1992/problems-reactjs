import React, { useState } from 'react';
import { Button, Modal, Form, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { dispatchAddProblem } from '../actions/problems-actions';

const ModalComponent = (props) => {
  const [show, setShow] = useState(false);
  const [validated, setValidated] = useState(false);
  const [problem, setProblem] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();

    setValidated(true);

    const problemToAdd = {
      ProblemContent: problem.problemContent,
      ProblemSolution: problem.problemAnswer,
      ProblemType: 'SINGLE',
      ProblemCategory: '5f81d4f455131d6791c8b27c',
      ProblemSubCategory: '5f6f3f6ae6c51744442023ad'
    };

    props.dispatch(dispatchAddProblem(problemToAdd));
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChange = (event) => {
    setProblem({
      ...problem,
      [event.target.name]: event.target.value
    });


  }

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Row>
              <Form.Group as={Col} xs="12" controlId="validationCustom01">
                <Form.Label>Problem Content</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Problem Content"
                  name="problemContent"
                  onChange={handleChange}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                  Please provide Problem Content
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} xs="12" controlId="validationCustom02">
                <Form.Label>Problem Answer</Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="problemAnswer"
                  placeholder="Problem Answer"
                  onChange={handleChange}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                  Please provide Problem Answer
                </Form.Control.Feedback>
              </Form.Group>
            </Form.Row>
            <Button type="submit">Submit form</Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

const mapStateToProps = state => {
  return {
    state
  }
}

export default connect(mapStateToProps)(ModalComponent);
