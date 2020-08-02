import React from "react";
import { FcApproval } from "react-icons/fc";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import ProgressBar from "react-bootstrap/ProgressBar";

export default function PollResult({ question, answer }) {
  const { optionOne, optionTwo } = question;
  const availableAnswers = ["optionOne", "optionTwo"];
  const numberOfVotes = optionOne.votes.length + optionTwo.votes.length;
  return (
    <React.Fragment>
      {[optionOne, optionTwo].map((option, index) => {
        const now = ((option.votes.length / numberOfVotes) * 100).toFixed(1);
        const voted = answer === availableAnswers[index];
        return (
          <Card border="success" className={voted ? "lightgreen" : "white"}>
            <Row>
              <Col>{option.text}</Col>
              {voted && (
                <Col sm="auto">
                  <FcApproval />
                </Col>
              )}
            </Row>
            <Row>
              <Col>
                <ProgressBar variant="success" now={now} label={`${now}%`} />
              </Col>
            </Row>
            <Row>
              <Col>
                Votes: {option.votes.length} out of {numberOfVotes}
              </Col>
            </Row>
          </Card>
        );
      })}
    </React.Fragment>
  );
}
