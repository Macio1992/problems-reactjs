import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchRootCategories } from './Actions/ActionsCategories';
import {
  dispatchReceiveProblemsBySubcategory,
  dispatchDeleteProblem,
  dispatchSetSelectedSubcategory
} from './Actions/ActionsProblems';
import { Container, Row, Col } from 'react-bootstrap';
import Categories from './Components/Categories';
import AddProblemModal from './Components/AddProblemModal';
import './App.scss';
import Problems from './Components/Problems';

class App extends Component {
  static propTypes = {
    rootCategories: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired,
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchRootCategories());
  }

  showProblems = (id) => {
    const { dispatch } = this.props;
    dispatch(dispatchSetSelectedSubcategory(id));
    dispatch(dispatchReceiveProblemsBySubcategory(id));
  }

  deleteProblem = id => {
    const { dispatch } = this.props;
    dispatch(dispatchDeleteProblem(id, this.state.subcategoryId));
  }

  render() {
    const { problems, rootCategories, selectedSubCategory } = this.props;

    return (
      <Container fluid>
        <Row>
          <Col xs={2}>
            <Categories showProblems={this.showProblems} rootCategories={rootCategories} />
          </Col>
          <Col xs={10} className="problems__side">
            <AddProblemModal />
            <Problems problems={problems} selectedSubCategory={selectedSubCategory} />
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  const { categoriesReducer, problemsReducer } = state;
  const { rootCategories = {} } = categoriesReducer;
  const { problems = {}, selectedSubCategory = '' } = problemsReducer;

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
    problems,
    selectedSubCategory
  }
}

export default connect(mapStateToProps)(App);
