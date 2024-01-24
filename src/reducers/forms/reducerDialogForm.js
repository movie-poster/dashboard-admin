import { createSlice } from '@reduxjs/toolkit';
import { extractQuestionCodes } from '../../modules/FormParameterization/utils/functions';

export const dialogsFormSlice = createSlice({
    name: 'dialogsFormSlice',
    initialState: {
        listQuestions: [],
        codesQuestions: [],
        selectedQuestion: {
            id: 0,
            name: "",
            answer: "",
            form_id: 0,
            type: "QUESTION_CLOSED",
            first_question: true,
            finish: false,
        },
        selectedAnswer: {
            id: 0,
            name: "",
            answer: "",
            questions_form_id: 0,
            finish: false,
        },
        refreshQuestions: true,
        selectedGenerateAnswer: {},
        listAnswers: [],
    },
    reducers: {
        setListQuestions: (state, action) => {
            state.listQuestions = action.payload.value;

            let questions = [];
            action.payload.value.forEach(element => {
                questions = [...questions, ...extractQuestionCodes(element)];
            });

            state.codesQuestions = questions;
        },
        reducerFormQuestion: (state, action) => {
            state.selectedQuestion[action.payload.key] = action.payload.value;
        },
        reducerFormAnswer: (state, action) => {
            state.selectedAnswer[action.payload.key] = action.payload.value;
        },
        setSelectedQuestion: (state, action) => {
            state.selectedQuestion = action.payload.value ? action.payload.value : {
                id: 0,
                name: "",
                answer: "",
                form_id: 0,
                type: "QUESTION_CLOSED",
                first_question: true,
                finish: false,
            };
        },
        setSelectedAnswer: (state, action) => {
            state.selectedAnswer = action.payload.value ? action.payload.value : {
                id: 0,
                name: "",
                answer: "",
                questions_documents_id: 0,
                finish: 0
            };
        },
        cleanQuestion: (state, action) => {
            state.selectedQuestion = {
                id: 0,
                name: "",
                answer: "",
                form_id: 0,
                type: "QUESTION_CLOSED",
                first_question: true,
                finish: false,
            };
        },
        cleanAnswer: (state, action) => {
            state.selectedAnswer = {
                id: 0,
                name: "",
                answer: "",
                questions_form_id: 0,
                finish: false,
            };
        },
        setRefresQuestions: (state, action) => {
            state.refreshQuestions = !state.refreshQuestions;
        },
        setListAnswers: (state, action) => {
            state.listAnswers = action.payload.value;
            localStorage.setItem("answers", JSON.stringify(state.listAnswers));
        },
        addListAnswers: (state, action) => {
            const answer = action.payload.value;
            if (!state.listAnswers.some(item => item.code_questions.id === answer.code_questions.id)) {
                state.listAnswers.push(answer);
            }
            localStorage.setItem("answers", JSON.stringify(state.listAnswers));
        },
        deleteListAnswers: (state, action) => {
            state.listAnswers = state.listAnswers.filter(item => item.code_questions.id !== action.payload.value);
            localStorage.setItem("answers", JSON.stringify(state.listAnswers));
        },
        setSelectedGenerateAnswer: (state, action) => {
            state.selectedGenerateAnswer = action.payload.value;
        },
        updateGenerateAnswer: (state, action) => {
            const answer = action.payload.value;
            state.listAnswers = state.listAnswers.map(item => {
                if (item.code_questions.id === answer.code_questions.id) return answer;
                return item;
            });
        },
        reducerSelectedGenerateAnswer: (state, action) => {
            state.selectedGenerateAnswer[action.payload.key] = action.payload.value;
        },
    },
});

export const {
    setListQuestions,
    reducerFormQuestion,
    reducerFormAnswer,
    setSelectedQuestion,
    setSelectedAnswer,
    cleanQuestion,
    cleanAnswer,
    setRefresQuestions,
    setListAnswers,
    addListAnswers,
    deleteListAnswers,
    setSelectedGenerateAnswer,
    updateGenerateAnswer,
    reducerSelectedGenerateAnswer
} = dialogsFormSlice.actions;

export default dialogsFormSlice.reducer;