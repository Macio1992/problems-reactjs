import React, { Component } from 'react';
import { Accordion, Card } from 'react-bootstrap';
import AddProblemModal from '../components/AddProblemModal';

class Categories extends Component {
  render() {
    const { props } = this.props;
    const { rootCategories } = props;

    return (
      <div className="App">
        <AddProblemModal props={props} />
        <Accordion>
          {rootCategories.map(category => (
            <Card key={category.id}>
              <Card.Header>
                <Accordion.Toggle variant="link" eventKey={`acc-${category.id}`}>
                  <span><b>{category.CategoryName}</b></span>
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey={`acc-${category.id}`}>
                <Card.Body>
                  <ul>
                    {category.subcategories.map(subcategory => (
                      <li key={subcategory._id}>{subcategory.CategoryName}</li>
                    ))}
                  </ul>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          ))}
        </Accordion>
      </div>
    )
  }
}

export default Categories;
