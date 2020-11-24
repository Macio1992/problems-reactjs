import React, { Component } from 'react';
import { Accordion, Card } from 'react-bootstrap';

class Categories extends Component {
  showProblems(id) {
    this.props.showProblems(id);
  }

  render() {
    const { rootCategories } = this.props;

    return (
      <div className="App">
        <Accordion className="d-flex flex-column">
          {rootCategories.map(category => (
            <Card key={category.id}>
              <Card.Header>
                <Accordion.Toggle variant="link" eventKey={`acc-${category.id}`}>
                  <span>{category.CategoryName}</span>
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey={`acc-${category.id}`}>
                <Card.Body>
                  <ul className="subcategories__list">
                    {category.subcategories.map(subcategory => (
                      <li className="subcategories__item"
                        key={subcategory._id}
                        onClick={() => this.showProblems(subcategory._id)}>
                        {subcategory.CategoryName}</li>
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
