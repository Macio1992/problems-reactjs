import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchRootCategories } from './actions';

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
    const { rootCategories } = this.props;
    return (
      <div className="App">
        { rootCategories.map(item => (
          <li key={item._id}>
            <span><b>{item.CategoryName}</b></span>
          </li>
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { categoriesReducer } = state;
  const { rootCategories } = categoriesReducer;

  return {
    rootCategories
  }
}

export default connect(mapStateToProps)(App);
