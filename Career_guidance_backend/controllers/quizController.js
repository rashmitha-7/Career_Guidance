const Quiz = require('../models/Quiz');
const asyncHandler = require('express-async-handler');

// @desc    Create a new quiz
// @route   POST /api/quizzes
// @access  Private (Admin/Mentor)
const createQuiz = asyncHandler(async (req, res) => {
    const { title, description, category, questions, timeLimit, passingScore } = req.body;

    const quiz = await Quiz.create({
        title,
        description,
        category,
        questions,
        timeLimit,
        passingScore,
        createdBy: req.user._id
    });

    res.status(201).json(quiz);
});

// @desc    Get all quizzes
// @route   GET /api/quizzes
// @access  Public
const getQuizzes = asyncHandler(async (req, res) => {
    const { category, search } = req.query;
    const query = { isActive: true };

    if (category) {
        query.category = category;
    }

    if (search) {
        query.$text = { $search: search };
    }

    const quizzes = await Quiz.find(query)
        .populate('category', 'name')
        .select('-questions.correctAnswer -questions.explanation');

    res.json(quizzes);
});

// @desc    Get single quiz
// @route   GET /api/quizzes/:id
// @access  Public
const getQuiz = asyncHandler(async (req, res) => {
    const quiz = await Quiz.findById(req.params.id)
        .populate('category', 'name')
        .select('-questions.correctAnswer -questions.explanation');

    if (!quiz) {
        res.status(404);
        throw new Error('Quiz not found');
    }

    res.json(quiz);
});

// @desc    Update quiz
// @route   PUT /api/quizzes/:id
// @access  Private (Admin/Mentor)
const updateQuiz = asyncHandler(async (req, res) => {
    const quiz = await Quiz.findById(req.params.id);

    if (!quiz) {
        res.status(404);
        throw new Error('Quiz not found');
    }

    // Check if user is the creator or admin
    if (quiz.createdBy.toString() !== req.user._id.toString() && !req.user.isAdmin) {
        res.status(403);
        throw new Error('Not authorized to update this quiz');
    }

    const updatedQuiz = await Quiz.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
    );

    res.json(updatedQuiz);
});

// @desc    Delete quiz
// @route   DELETE /api/quizzes/:id
// @access  Private (Admin/Mentor)
const deleteQuiz = asyncHandler(async (req, res) => {
    const quiz = await Quiz.findById(req.params.id);

    if (!quiz) {
        res.status(404);
        throw new Error('Quiz not found');
    }

    // Check if user is the creator or admin
    if (quiz.createdBy.toString() !== req.user._id.toString() && !req.user.isAdmin) {
        res.status(403);
        throw new Error('Not authorized to delete this quiz');
    }

    await Quiz.findByIdAndDelete(req.params.id);
    res.json({ message: 'Quiz removed' });
});

// @desc    Submit quiz answers
// @route   POST /api/quizzes/:id/submit
// @access  Private
const submitQuiz = asyncHandler(async (req, res) => {
    const { answers } = req.body;
    const quiz = await Quiz.findById(req.params.id);

    if (!quiz) {
        res.status(404);
        throw new Error('Quiz not found');
    }

    let score = 0;
    const results = quiz.questions.map((question, index) => {
        const isCorrect = answers[index] === question.correctAnswer;
        if (isCorrect) score++;
        return {
            question: question.question,
            userAnswer: answers[index],
            correctAnswer: question.correctAnswer,
            isCorrect,
            explanation: question.explanation
        };
    });

    const percentageScore = (score / quiz.questions.length) * 100;
    const passed = percentageScore >= quiz.passingScore;

    res.json({
        score: percentageScore,
        passed,
        results,
        totalQuestions: quiz.questions.length,
        correctAnswers: score
    });
});

module.exports = {
    createQuiz,
    getQuizzes,
    getQuiz,
    updateQuiz,
    deleteQuiz,
    submitQuiz
}; 