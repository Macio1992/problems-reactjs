import React, { Component } from 'react';
import { Button, Modal, Form, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { dispatchAddProblem } from '../Actions/ActionsProblems';
import './AddProblemModal.scss';

class AddProblemModal extends Component {
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
      ProblemCategory: this.state.problem.problemRootCategory,
      ProblemSubCategory: this.state.problem.problemSubCategory
    };

    this.props.dispatch(dispatchAddProblem(problemToAdd, this.state.problem.problemSubCategory));
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

  handleChange = event => {
    this.setState({
      problem: {
        ...this.state.problem,
        [event.target.name]: event.target.value
      }
    });
  }

  getSubcategories() {
    const { rootCategories } = this.props;
    const category = rootCategories.find(cat => cat.id === this.state.problem.problemRootCategory) || {};
    const { subcategories = [] } = category;

    return subcategories;
  }

  renderSubcategories() {
    const subcategories = this.getSubcategories();

    if (this.state.problem.problemRootCategory) {
      return (
        <Form.Group controlId="validationCustom04">
          <Form.Label>Choose subcategory</Form.Label>
          <Form.Control as="select" custom name="problemSubCategory" onChange={this.handleChange}>
            <option></option>
            {subcategories.map(category => (
              <option value={category._id} key={category._id}>{category.CategoryName}</option>
            ))};
          </Form.Control>
        </Form.Group>
      )
    }
  }

  render() {
    return (
      <>
        <Button variant="primary" onClick={this.handleShow}>
          Add problem
        </Button>

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add new problem</Modal.Title>
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
                <Form.Group controlId="validationCustom03">
                  <Form.Label>Choose root category</Form.Label>
                  <Form.Control as="select" custom name="problemRootCategory" onChange={this.handleChange}>
                    <option></option>
                    {this.props.rootCategories.map(category => (
                      <option value={category.id} key={category.id}>{category.CategoryName}</option>
                    ))};
                  </Form.Control>
                </Form.Group>
                {this.renderSubcategories()}
              </Form.Row>
              <Button type="submit">Submit form</Button>
            </Form>
          </Modal.Body>
        </Modal>
      </>
    );
  }
}

const mapStateToProps = state => {
  const { categoriesReducer } = state;
  const { rootCategories } = categoriesReducer;

  const entries = Object.entries(rootCategories);
  const transformedRootCategories = entries.map(entry => {
    const [id, properties] = entry;
    const { CategoryName, subcategories = [] } = properties;

    return {
      id,
      CategoryName,
      subcategories,
    }
  });

  return {
    rootCategories: transformedRootCategories
  }
};
export default connect(mapStateToProps)(AddProblemModal);
