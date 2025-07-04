const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Quiz title is required'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Quiz description is required'],
        trim: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: [true, 'Category is required']
    },
    questions: [{
        question: {
            type: String,
            required: [true, 'Question text is required']
        },
        options: [{
            type: String,
            required: [true, 'Options are required']
        }],
        correctAnswer: {
            type: Number,
            required: [true, 'Correct answer index is required']
        },
        explanation: {
            type: String,
            required: [true, 'Explanation for the correct answer is required']
        }
    }],
    timeLimit: {
        type: Number,  // in minutes
        default: 30
    },
    passingScore: {
        type: Number,
        default: 60  // percentage
    },
    isActive: {
        type: Boolean,
        default: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
});

// Add indexes for better query performance
quizSchema.index({ category: 1, isActive: 1 });
quizSchema.index({ title: 'text', description: 'text' });

const Quiz = mongoose.model('Quiz', quizSchema);

module.exports = Quiz; 