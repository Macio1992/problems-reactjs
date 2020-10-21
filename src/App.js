import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchRootCategories } from './Actions/ActionsCategories';
import {
  dispatchReceiveProblemsBySubcategory,
  dispatchDeleteProblem
} from './Actions/ActionsProblems';
import { Container, Row, Col } from 'react-bootstrap';
import Categories from './Components/Categories';
import './App.scss';
import Problems from './Components/Problems';
import ModalFunction from './Components/ModalFunction';

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
    dispatch(dispatchReceiveProblemsBySubcategory(id));
  }

  deleteProblem = id => {
    const { dispatch } = this.props;
    dispatch(dispatchDeleteProblem(id, this.state.subcategoryId));
  }

  render() {
    const { rootCategories } = this.props;

    return (
      <Container fluid>
        <Row>
          <Col xs={2}>
            <Categories showProblems={this.showProblems} rootCategories={rootCategories} />
          </Col>
          <Col xs={10} className="problems__side">
            <ModalFunction openModalElement={<span>Add problem</span>} />
            <Problems />
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  const { categoriesReducer } = state;
  const { rootCategories = {} } = categoriesReducer;

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
  }
}

export default connect(mapStateToProps)(App);
