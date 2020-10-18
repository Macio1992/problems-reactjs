import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchRootCategories } from './Actions/ActionsCategories';
import { dispatchReceiveProblemsBySubcategory, dispatchDeleteProblem } from './Actions/ActionsProblems';
import { Container, Row, Col } from 'react-bootstrap';
import Categories from './Components/Categories';
import AddProblemModal from './Components/AddProblemModal';
import './App.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

class App extends Component {
  state = {
    subcategoryId: ''
  }

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
    this.setState({ subcategoryId: id });
    dispatch(dispatchReceiveProblemsBySubcategory(id));
  }

  deleteProblem = id => {
    const { dispatch } = this.props;
    dispatch(dispatchDeleteProblem(id, this.state.subcategoryId));
  }

  render() {
    const { problems, rootCategories } = this.props;
    const { subcategoryId } = this.state;

    return (
      <Container fluid>
        <Row>
          <Col xs={2}>
            <Categories showProblems={this.showProblems} rootCategories={rootCategories} />
          </Col>
          <Col xs={10} className="problems__side">
            <AddProblemModal />
            <div className="d-flex flex-wrap">
              {
                (problems && subcategoryId && problems[subcategoryId]) &&
                problems[subcategoryId].map(problem => (
                  <div className="problem" key={problem._id || 'id'}>
                    <p><b>Problem Content:</b> {problem.ProblemContent}</p>
                    <p><b>Problem Answer:</b> {problem.ProblemSolution}</p>
                    <FontAwesomeIcon onClick={() => this.deleteProblem(problem._id)} className="problem__removeIcon" icon={faTrash} />
                  </div>
                ))
              }
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  const { categoriesReducer, problemsReducer } = state;
  const { rootCategories = {} } = categoriesReducer;
  const { problems = {} } = problemsReducer;

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
    problems
  }
}

export default connect(mapStateToProps)(App);
