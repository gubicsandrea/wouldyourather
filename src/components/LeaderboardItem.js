import React from "react";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";

export default function LeaderboardItem({ user }) {
  return (
    <Row className="justify-content-md-center">
      <Col md={8} lg={6}>
        <Card key={user.id}>
          <Card.Header>{user.name}</Card.Header>
          <Card.Body>
            <Row>
              <Col sm="auto">
                <Image src={user.avatarURL} alt={user.name} roundedCircle />
              </Col>
              <Col>
                <Row>
                  <Col sm={10}>Number of questions asked:</Col>
                  <Col sm={2}>{user.numberOfQuestions}</Col>
                </Row>
                <Row>
                  <Col sm={10}>Number of questions answered:</Col>
                  <Col sm={2}>{user.numberOfAnswers}</Col>
                </Row>
              </Col>
              <Col sm={2} className="total-result">
                {user.numberOfQuestions + user.numberOfAnswers}
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}
