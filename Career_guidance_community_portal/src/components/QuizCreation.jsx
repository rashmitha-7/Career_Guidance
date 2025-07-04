import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const QuizCreation = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [questions, setQuestions] = useState([
        { question: '', options: ['', '', '', ''], correctAnswer: null, explanation: '' }
    ]);
    const [timeLimit, setTimeLimit] = useState(30);
    const [passingScore, setPassingScore] = useState(60);
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { user } = useAuth();

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/categories');
                setCategories(res.data.data);
            } catch (err) {
                console.error('Error fetching categories:', err);
                setError('Failed to load categories.');
            }
        };
        fetchCategories();
    }, []);

    const handleQuestionChange = (index, field, value) => {
        const newQuestions = [...questions];
        if (field === 'options') {
            newQuestions[index].options[value.optionIndex] = value.value;
        } else {
            newQuestions[index][field] = value;
        }
        setQuestions(newQuestions);
    };

    const handleAddQuestion = () => {
        setQuestions([...questions, { question: '', options: ['', '', '', ''], correctAnswer: null, explanation: '' }]);
    };

    const handleRemoveQuestion = (index) => {
        const newQuestions = questions.filter((_, i) => i !== index);
        setQuestions(newQuestions);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(null);

        // Basic validation
        if (!title || !description || !category || questions.some(q => !q.question || q.options.some(opt => !opt) || q.correctAnswer === null || q.explanation === '')) {
            setError('Please fill all required fields for the quiz and all questions.');
            setLoading(false);
            return;
        }

        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            };

            const quizData = {
                title,
                description,
                category,
                questions,
                timeLimit,
                passingScore
            };

            const res = await axios.post('http://localhost:5000/api/quizzes', quizData, config);
            setSuccess('Quiz created successfully!');
            setTitle('');
            setDescription('');
            setCategory('');
            setQuestions([
                { question: '', options: ['', '', '', ''], correctAnswer: null, explanation: '' }
            ]);
            setTimeLimit(30);
            setPassingScore(60);
            // Optionally navigate to a different page or show a success message
            // navigate('/quizzes');
        } catch (err) {
            console.error('Error creating quiz:', err.response ? err.response.data : err.message);
            if (err.response && err.response.status === 403) {
                setError('You are not authorized to create quizzes. Only mentors and admins can.');
            } else {
                setError(err.response?.data?.message || 'Failed to create quiz. Please check your input and try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    if (!user || (user.role !== 'mentor' && user.role !== 'admin')) {
        return (
            <div className="container mt-5">
                <div className="alert alert-danger">
                    You are not authorized to create quizzes.
                </div>
            </div>
        );
    }

    return (
        <div className="container mt-5">
            <div className="card p-4 shadow-lg">
                <h2 className="mb-4 text-primary text-center">Create New Quiz</h2>
                {error && <div className="alert alert-danger">{error}</div>}
                {success && <div className="alert alert-success">{success}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Quiz Title</label>
                        <input
                            type="text"
                            className="form-control"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <textarea
                            className="form-control"
                            id="description"
                            rows="3"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        ></textarea>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="category" className="form-label">Category</label>
                        <select
                            className="form-select"
                            id="category"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            required
                        >
                            <option value="">Select Category</option>
                            {categories.map((cat) => (
                                <option key={cat._id} value={cat._id}>
                                    {cat.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="timeLimit" className="form-label">Time Limit (minutes)</label>
                        <input
                            type="number"
                            className="form-control"
                            id="timeLimit"
                            value={timeLimit}
                            onChange={(e) => setTimeLimit(parseInt(e.target.value))}
                            min="1"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="passingScore" className="form-label">Passing Score (%)</label>
                        <input
                            type="number"
                            className="form-control"
                            id="passingScore"
                            value={passingScore}
                            onChange={(e) => setPassingScore(parseInt(e.target.value))}
                            min="0"
                            max="100"
                            required
                        />
                    </div>

                    <h4 className="mt-5 mb-3">Questions</h4>
                    {questions.map((q, qIndex) => (
                        <div key={qIndex} className="card mb-4 p-3 border">
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <h5 className="card-title">Question {qIndex + 1}</h5>
                                {questions.length > 1 && (
                                    <button
                                        type="button"
                                        className="btn btn-outline-danger btn-sm"
                                        onClick={() => handleRemoveQuestion(qIndex)}
                                    >
                                        Remove
                                    </button>
                                )}
                            </div>
                            <div className="mb-3">
                                <label htmlFor={`question-${qIndex}`} className="form-label">Question Text</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id={`question-${qIndex}`}
                                    value={q.question}
                                    onChange={(e) => handleQuestionChange(qIndex, 'question', e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Options</label>
                                {q.options.map((option, optIndex) => (
                                    <div key={optIndex} className="input-group mb-2">
                                        <span className="input-group-text">{String.fromCharCode(65 + optIndex)}</span>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder={`Option ${optIndex + 1}`}
                                            value={option}
                                            onChange={(e) => handleQuestionChange(qIndex, 'options', { optionIndex: optIndex, value: e.target.value })}
                                            required
                                        />
                                    </div>
                                ))}
                            </div>
                            <div className="mb-3">
                                <label htmlFor={`correctAnswer-${qIndex}`} className="form-label">Correct Answer</label>
                                <select
                                    className="form-select"
                                    id={`correctAnswer-${qIndex}`}
                                    value={q.correctAnswer !== null ? q.correctAnswer : ''}
                                    onChange={(e) => handleQuestionChange(qIndex, 'correctAnswer', parseInt(e.target.value))}
                                    required
                                >
                                    <option value="">Select Correct Option</option>
                                    {q.options.map((option, optIndex) => (
                                        option && <option key={optIndex} value={optIndex}>{String.fromCharCode(65 + optIndex)}. {option}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-3">
                                <label htmlFor={`explanation-${qIndex}`} className="form-label">Explanation</label>
                                <textarea
                                    className="form-control"
                                    id={`explanation-${qIndex}`}
                                    rows="2"
                                    value={q.explanation}
                                    onChange={(e) => handleQuestionChange(qIndex, 'explanation', e.target.value)}
                                    required
                                ></textarea>
                            </div>
                        </div>
                    ))}

                    <button type="button" className="btn btn-secondary mb-4" onClick={handleAddQuestion}>
                        Add Another Question
                    </button>

                    <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                        {loading ? 'Creating Quiz...' : 'Create Quiz'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default QuizCreation; 