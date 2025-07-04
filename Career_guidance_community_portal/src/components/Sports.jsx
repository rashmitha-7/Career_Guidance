import React from "react";
import { Container, Card, ListGroup } from "react-bootstrap";

const Sports = () => (
  <Container className="mt-5 d-flex justify-content-center">
    <Card style={{ width: '50rem' }} className="shadow-lg p-4">
      <Card.Body>
        <Card.Title className="text-center fw-bold text-success">Sports Careers</Card.Title>
        <Card.Text className="text-muted">
          The sports industry offers careers in professional sports, coaching, sports management, and fitness.
        </Card.Text>
        <h4 className="mt-4">Popular Careers in Sports:</h4>
        <ListGroup variant="flush">
          <ListGroup.Item>⚽ Professional Athlete</ListGroup.Item>
          <ListGroup.Item>🏋️‍♂️ Fitness Trainer</ListGroup.Item>
          <ListGroup.Item>🏆 Sports Coach</ListGroup.Item>
          <ListGroup.Item>🎤 Sports Commentator</ListGroup.Item>
          <ListGroup.Item>📊 Sports Analyst</ListGroup.Item>
        </ListGroup>
      </Card.Body>
    </Card>
  </Container>
);

export default Sports;
