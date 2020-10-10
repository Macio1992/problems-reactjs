import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchRootCategories } from './actions';
import { Container, Row, Col } from 'react-bootstrap';
import Categories from './components/Categories';

class App extends Component {
  static propTypes = {
    rootCategories: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired,
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchRootCategories());
  }

  render() {
    return (
      <Container fluid>
        <Row>
          <Col xs={3}>
            <Categories props={this.props} />
          </Col>
          <Col xs={9}>
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
    rootCategories: transformedRootCategories
  }
}

export default connect(mapStateToProps)(App);
