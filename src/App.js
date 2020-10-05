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
          <div key={item.id}>
            <span><b>{item.id}</b></span>:::
            <span><span><b>{item.CategoryName}</b></span></span>
            <ul>
              {item.subcategories.map(subcategory => (
                <li key={subcategory._id}>{subcategory.CategoryName}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
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
