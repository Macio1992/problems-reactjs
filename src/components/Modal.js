import React, { Component } from 'react';
import { Button, Modal, Form, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { dispatchAddProblem } from '../actions/problems-actions';

class ModalComponent extends Component {
  state = {
    show: false,
    validated: false,
    problem: {}
  }

  handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();

    const form = event.currentTarget;
    this.setState({
      validated: true
    });

    if (!form.checkValidity()) {
      return;
    }

    const problemToAdd = {
      ProblemContent: this.state.problem.problemContent,
      ProblemSolution: this.state.problem.problemAnswer,
      ProblemType: 'SINGLE',
      ProblemCategory: '5f81d4f455131d6791c8b27c',
      ProblemSubCategory: '5f6f3f6ae6c51744442023ad'
    };

    this.props.dispatch(dispatchAddProblem(problemToAdd));
    this.handleClose();
  };

  handleClose = () => {
    this.setState({
      show: false
    });
  };

  handleShow = () => {
    this.setState({
      show: true
    });
  }

  handleChange = (event) => {
    this.setState({
      ...this.state.problem,
      [event.target.name]: event.target.value
    });
  }

  render() {
    return (
      <>
        <Button variant="primary" onClick={this.handleShow}>
          Launch demo modal
      </Button>

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form noValidate validated={this.state.validated} onSubmit={this.handleSubmit}>
              <Form.Row>
                <Form.Group as={Col} xs="12" controlId="validationCustom01">
                  <Form.Label>Problem Content</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Problem Content"
                    name="problemContent"
                    onChange={this.handleChange}
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
                    onChange={this.handleChange}
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
        </Modal>
      </>
    );
  }
}

const mapStateToProps = state => state;
export default connect(mapStateToProps)(ModalComponent);
