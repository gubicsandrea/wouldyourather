import React from "react";
import { FcApproval } from "react-icons/fc";

export default function PollResult({ question, answer }) {
  const { optionOne, optionTwo } = question;
  const availableAnswers = ["optionOne", "optionTwo"];
  const numberOfVotes = optionOne.votes.length + optionTwo.votes.length;
  return (
    <div>
      {[optionOne, optionTwo].map((option, index) => (
        <div>
          {option.text}
          Votes: {option.votes.length} out of {numberOfVotes}
          Ratio: {((option.votes.length / numberOfVotes) * 100).toFixed(1)} %
          {answer === availableAnswers[index] && <FcApproval />}
        </div>
      ))}
    </div>
  );
}
