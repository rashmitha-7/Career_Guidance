import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import './Quiz.css'; // Assuming you have a CSS file for styling

const Quiz = () => {
  const { user } = useAuth();
  const [quizzes, setQuizzes] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [quizResult, setQuizResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/quizzes');
        setQuizzes(response.data);
      } catch (err) {
        setError('Failed to fetch quizzes. Please try again later.');
        console.error('Error fetching quizzes:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, []);

  const handleSelectQuiz = (quiz) => {
    setSelectedQuiz(quiz);
    setCurrentQuestionIndex(0);
    setUserAnswers(new Array(quiz.questions.length).fill(null));
    setSelectedOption(null);
    setShowResult(false);
    setQuizResult(null);
  };

  const handleOptionChange = (questionIndex, optionIndex) => {
    setSelectedOption(optionIndex);
    const newAnswers = [...userAnswers];
    newAnswers[questionIndex] = optionIndex;
    setUserAnswers(newAnswers);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < selectedQuiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(userAnswers[currentQuestionIndex + 1]); // Pre-select if already answered
    } else {
      handleSubmitQuiz();
    }
  };

  const handleSubmitQuiz = async () => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      };
      const submissionData = {
        answers: userAnswers
      };
      const response = await axios.post(
        `http://localhost:5000/api/quizzes/${selectedQuiz._id}/submit`,
        submissionData,
        config
      );
      setQuizResult(response.data);
      setShowResult(true);

      // Update quiz count after successful submission
      try {
        await axios.put('http://localhost:5000/api/auth/update-quiz-count', {}, config);
        // Optionally, update user context here if you want to reflect the new count immediately
      } catch (err) {
        // Silently fail, or show a message if you want
        console.error('Failed to update quiz count:', err);
      }

    } catch (err) {
      setError('Failed to submit quiz. Please try again later.');
      console.error('Error submitting quiz:', err.response ? err.response.data : err.message);
    }
  };

  const startOver = () => {
    setSelectedQuiz(null);
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
    setSelectedOption(null);
    setShowResult(false);
    setQuizResult(null);
    setError(null);
  };

  if (loading) {
    return <div className="container mt-5 text-center">Loading quizzes...</div>;
  }

  if (error) {
    return <div className="container mt-5 alert alert-danger">{error}</div>;
  }

  if (!user) {
    return (
      <div className="container mt-5">
        <div className="alert alert-warning">
          Please log in to take a quiz.
        </div>
      </div>
    );
  }

  if (!selectedQuiz) {
    return (
      <div className="container mt-5 fade-in">
        <div className="quiz-container p-4 rounded shadow-lg bg-white">
          <h2 className="mb-4 text-center text-primary">Available Quizzes</h2>
          {quizzes.length === 0 ? (
            <p className="text-center">No quizzes available yet. Please check back later!</p>
          ) : (
            <div className="list-group">
              {quizzes.map((quiz) => (
                <button
                  key={quiz._id}
                  className="list-group-item list-group-item-action mb-2 rounded"
                  onClick={() => handleSelectQuiz(quiz)}
                >
                  <h5 className="mb-1">{quiz.title}</h5>
                  <p className="mb-1 text-muted">{quiz.description}</p>
                  <small className="text-muted">Questions: {quiz.questions.length} | Time Limit: {quiz.timeLimit} mins</small>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  const currentQuestion = selectedQuiz.questions[currentQuestionIndex];
  const progressPercentage = ((currentQuestionIndex / selectedQuiz.questions.length) * 100).toFixed(0);

  return (
    <div className="container mt-5 fade-in">
      <div className="quiz-container p-4 rounded shadow-lg bg-white">
        {showResult ? (
          <div className="result-section text-center">
            <div className="mb-4 mt-2">
              <span className="badge bg-success p-2 fs-6">Quiz Completed!</span>
            </div>
            <h2 className="mb-4">{selectedQuiz.title}</h2>
            <div className="card border-primary mb-4">
              <div className="card-body text-center">
                <p className="lead">Your Score: <span className="fw-bold text-primary">{quizResult.score.toFixed(2)}%</span></p>
                <p className={`lead ${quizResult.passed ? 'text-success' : 'text-danger'}`}>
                  {quizResult.passed ? 'Congratulations! You passed.' : 'Keep learning! You did not pass.'}
                </p>
                <p className="text-muted">Correct Answers: {quizResult.correctAnswers} / {quizResult.totalQuestions}</p>
              </div>
            </div>

            <h4 className="mb-3">Detailed Results</h4>
            <div className="results-list text-start">
              {quizResult.results.map((res, index) => (
                <div key={index} className="card mb-3 p-3">
                  <p className="fw-bold">{index + 1}. {res.question}</p>
                  <p className={res.isCorrect ? 'text-success' : 'text-danger'}>
                    Your Answer: {selectedQuiz.questions[index].options[res.userAnswer]}{res.isCorrect ? ' (Correct)' : ' (Incorrect)'}
                  </p>
                  {!res.isCorrect && (
                    <p className="text-success">Correct Answer: {selectedQuiz.questions[index].options[res.correctAnswer]}</p>
                  )}
                  <p className="text-muted small">Explanation: {res.explanation}</p>
                </div>
              ))}
            </div>

            <div className="mt-5">
              <button className="btn btn-primary me-3" onClick={startOver}>
                Take Another Quiz
              </button>
              <Link to="/dashboard" className="btn btn-outline-secondary">
                Go to Dashboard
              </Link>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-4">
              <div className="d-flex justify-content-between align-items-center">
                <span className="badge bg-primary p-2">Question {currentQuestionIndex + 1} of {selectedQuiz.questions.length}</span>
                <span className="text-muted">Progress: {progressPercentage}%</span>
              </div>
              <div className="progress mt-2">
                <div
                  className="progress-bar"
                  role="progressbar"
                  style={{ width: `${progressPercentage}%` }}
                  aria-valuenow={progressPercentage}
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
            </div>

            <h3 className="mb-4">{currentQuestion.question}</h3>
            <div className="options-list">
              {currentQuestion.options.map((option, optionIndex) => (
                <div key={optionIndex} className="form-check mb-3">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="quizOption"
                    id={`option${optionIndex}`}
                    value={optionIndex}
                    checked={selectedOption === optionIndex}
                    onChange={() => handleOptionChange(currentQuestionIndex, optionIndex)}
                  />
                  <label className="form-check-label" htmlFor={`option${optionIndex}`}>
                    {option}
                  </label>
                </div>
              ))}
            </div>

            <button
              className="btn btn-primary mt-4"
              onClick={handleNextQuestion}
              disabled={selectedOption === null}
            >
              {currentQuestionIndex === selectedQuiz.questions.length - 1 ? 'Submit Quiz' : 'Next Question'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Quiz;
