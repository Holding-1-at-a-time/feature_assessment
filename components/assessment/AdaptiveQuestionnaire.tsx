import { useState, useEffect } from 'react';
import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';

const AdaptiveQuestionnaire = ({ vehicleType, reportedIssues }) => {
  const [questions, setQuestions] = useState([]);
  const getQuestions = useQuery(api.assessments.getQuestions, { vehicleType, reportedIssues });

  useEffect(() => {
    if (getQuestions) {
      setQuestions(getQuestions);
    }
  }, [getQuestions]);

  const renderQuestion = (question) => {
    // Render question based on type
  };

  return (
    <div>
      {questions.map((question, index) => (
        <div key={index}>
          {renderQuestion(question)}
        </div>
      ))}
    </div>
  );
};

export default AdaptiveQuestionnaire;