import React, { Component } from 'react';
import { Accordion, Card } from 'react-bootstrap';

class Categories extends Component {

  createIndex = (id) => {
    return `acc-${id}`;
  }

  render() {
    const { rootCategories } = this.props;

    return (
      <div className="App">
        <Accordion>
          {rootCategories.map((item, i) => (
            <Card key={item.id}>
              <Card.Header>
                <Accordion.Toggle variant="link" eventKey={this.createIndex(i)}>
                  <span><b>{item.CategoryName}</b></span>
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey={this.createIndex(i)}>
                <Card.Body>
                  <ul>
                    {item.subcategories.map(subcategory => (
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
