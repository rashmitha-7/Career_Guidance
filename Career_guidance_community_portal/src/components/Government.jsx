import React from "react";
import { Container, Card, ListGroup } from "react-bootstrap";

const Government = () => (
  <Container className="mt-5 d-flex justify-content-center">
    <Card style={{ width: '50rem' }} className="shadow-lg p-4">
      <Card.Body>
        <Card.Title className="text-center fw-bold text-primary">Government Careers</Card.Title>
        <Card.Text className="text-muted">
          Government jobs offer roles in public administration, law enforcement, politics, and policy-making.
        </Card.Text>
        <h4 className="mt-4">Popular Careers in Government:</h4>
        <ListGroup variant="flush">
          <ListGroup.Item>⚖️ Lawyer</ListGroup.Item>
          <ListGroup.Item>🏛️ Politician</ListGroup.Item>
          <ListGroup.Item>👮 Police Officer</ListGroup.Item>
          <ListGroup.Item>📜 Civil Servant</ListGroup.Item>
          <ListGroup.Item>🌍 Diplomat</ListGroup.Item>
        </ListGroup>
      </Card.Body>
    </Card>
  </Container>
);

export default Government;
