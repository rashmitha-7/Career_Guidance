
import React from "react";
import { Container, Card, ListGroup } from "react-bootstrap";

const Food = () => (
  <Container className="mt-5 d-flex justify-content-center">
    <Card style={{ width: '50rem' }} className="shadow-lg p-4">
      <Card.Body>
        <Card.Title className="text-center fw-bold text-danger">Food Industry Careers</Card.Title>
        <Card.Text className="text-muted">
          The food industry provides careers in culinary arts, nutrition, food science, and restaurant management.
        </Card.Text>
        <h4 className="mt-4">Popular Careers in Food Industry:</h4>
        <ListGroup variant="flush">
          <ListGroup.Item>👨‍🍳 Chef</ListGroup.Item>
          <ListGroup.Item>🥗 Nutritionist</ListGroup.Item>
          <ListGroup.Item>🍷 Food Critic</ListGroup.Item>
          <ListGroup.Item>🥼 Food Scientist</ListGroup.Item>
          <ListGroup.Item>🏨 Restaurant Manager</ListGroup.Item>
        </ListGroup>
      </Card.Body>
    </Card>
  </Container>
);

export default Food;

