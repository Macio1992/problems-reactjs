import React, { useState } from 'react';
import { Modal, Button, Form, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { dispatchAddProblem, dispatchEditProblem } from '../Actions/ActionsProblems';

const ModalFunction = props => {
  const [show, setShow] = useState(false);
  const [validated, setValidated] = useState(false);
  const problemToEdit = props.problem || {};
  const [problem, setProblem] = useState(problemToEdit);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();

    const form = event.currentTarget;
    setValidated(true);

    if (!form.checkValidity()) {
      return;
    }

    const problemToAdd = {
      ProblemContent: problem.ProblemContent,
      ProblemSolution: problem.ProblemSolution,
      ProblemType: 'SINGLE',
      ProblemCategory: problem.ProblemCategory,
      ProblemSubCategory: problem.ProblemSubCategory
    };

    handleClose();
    switch (props.mode) {
      case 'EDIT':
        props.dispatch(dispatchEditProblem(
          problem._id,
          problemToAdd,
          problemToEdit.ProblemCategory,
          problemToEdit.ProblemSubCategory));
        break;
      case 'ADD':
        props.dispatch(dispatchAddProblem(problemToAdd, problem.ProblemSubCategory));
        break;
      default:
        break;
    }
  };

  const handleChange = event => {
    setProblem({
      ...problem,
      [event.target.name]: event.target.value
    });
  }

  const getSubcategories = () => {
    const { rootCategories } = props;
    const category = rootCategories.find(cat => cat.id === problem.ProblemCategory) || {};
    const { subcategories = [] } = category;

    return subcategories;
  }

  const renderSubcategories = () => {
    const subcategories = getSubcategories();

    if (problem.ProblemCategory || problem.ProblemSubCategory) {
      return (
        <Form.Group controlId="validationCustom04">
          <Form.Label>Choose subcategory</Form.Label>
          <Form.Control required as="select" custom name="ProblemSubCategory" onChange={handleChange} defaultValue={problem.ProblemSubCategory || ''}>
            <option></option>
            {subcategories.map(category => (
              <option value={category._id} key={category._id}>{category.CategoryName}</option>
            ))};
          </Form.Control>
        </Form.Group>
      )
    }
  }

  return (
    <div>
      <div onClick={handleShow}>
      {props.openModalElement}
      </div>
      <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          Modal heading
        </Modal.Title>
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
                  name="ProblemContent"
                  onChange={handleChange}
                  defaultValue={problem.ProblemContent || ''}
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
                  name="ProblemSolution"
                  placeholder="Problem Answer"
                  onChange={handleChange}
                  defaultValue={problem.ProblemSolution || ''}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                  Please provide Problem Answer
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="validationCustom03">
                <Form.Label>Choose root category</Form.Label>
                <Form.Control required as="select" custom name="ProblemCategory" onChange={handleChange} defaultValue={problem.ProblemCategory || ''}>
                  <option></option>
                  {props.rootCategories.map(category => (
                    <option value={category.id} key={category.id}>{category.CategoryName}</option>
                  ))};
                  </Form.Control>
              </Form.Group>
              {renderSubcategories()}
            </Form.Row>
            <Button type="submit">Submit form</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

const mapStateToProps = (state, ownProps) => {
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
    rootCategories: transformedRootCategories,
    problem: ownProps.problem || {},
    mode: ownProps.mode || 'ADD'
  }
};

export default connect(mapStateToProps)(ModalFunction);
