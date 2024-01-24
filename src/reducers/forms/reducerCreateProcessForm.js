import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

export const createProcessFormSlice = createSlice({
    name: 'createProcessFormSlice',
    initialState: {
        dataForm: {},
        listQuestions: [],
        listAnswers: [],
        selectedQuestion: {
            id: 0,
            name: "",
            answer: "",
            documents_auto_id: 0,
            type: "QUESTION_CLOSED",
            first_question: true,
            finish: false,
        },
        selectedAnswer: {
            id: 0,
            name: "",
            answer: "",
            questions_documents_id: 0,
            finish: false,
        },
        checkCodes: true,
        generatedProcess: {
            id: 0,
            data_form: [],
            actors: [],
            answers: [],
        },
        selectedGenerateAnswer: {},
        invalidFields: [],
        listActors: [],
        selectedActor: {
            id: 0,
            actor_form_id: 0,
            data: {},
            required_fields: 0,
        },
        optionsZapsign: {
            require_selfie_photo: false,
            require_document_photo: false,
            automatic_mailing: false,
            automatic_whatsapp: false,
        },
        listProcess: [],
        listFilteredProcess: [],
    },
    reducers: {
        setListQuestions: (state, action) => {
            state.listQuestions = action.payload.value;
        },
        addListAnswers: (state, action) => {
            const answer = action.payload.value;
            if (!state.listAnswers.some(item => item.code_questions.id === answer.code_questions.id)) {
                state.listAnswers.push(answer);
            }
        },
        deleteListAnswers: (state, action) => {
            state.listAnswers = state.listAnswers.filter(item => item.code_questions.id !== action.payload.value);
        },
        setSelectedGenerateAnswer: (state, action) => {
            state.selectedGenerateAnswer = action.payload.value;
        },
        setDataForm: (state, action) => {
            state.dataForm[action.payload.key] = { ...state.dataForm[action.payload.key], ...action.payload.value };
        },
        setInvalidFields: (state, action) => {
            state.invalidFields.push(action.payload.value);
        },
        reducerFormSelectedActor: (state, action) => {
            state.selectedActor.data[action.payload.key] = action.payload.value;
            // Updates actor in list too
            state.listActors = state.listActors.map(actor => {
                if (actor.id === state.selectedActor.id) {
                    return state.selectedActor;
                }
                return actor;
            });
        },
        reducerFormZapsignOptions: (state, action) => {
            state.optionsZapsign[action.payload.key] = action.payload.value;

            state.listActors = state.listActors.map(actor => ({ ...actor, ...state.optionsZapsign }));
            state.selectedActor = { ...state.selectedActor, ...state.optionsZapsign };
        },
        changeZapsignOptionActors: (state, action) => {
            const listConfigurations = action.payload.value;

            state.optionsZapsign.require_selfie_photo = listConfigurations[0].active;
            state.optionsZapsign.require_document_photo = listConfigurations[1].active;
            state.optionsZapsign.automatic_whatsapp = listConfigurations[2].active;
            state.optionsZapsign.automatic_mailing = listConfigurations[3].active;


            state.listActors = state.listActors.map(actor => ({ ...actor, ...state.optionsZapsign }));
            state.selectedActor = { ...state.selectedActor, ...state.optionsZapsign };
        },
        reducerSelectedGenerateAnswer: (state, action) => {
            state.selectedGenerateAnswer[action.payload.key] = action.payload.value;
        },
        addActor: (state, action) => {
            const actor = {
                id: uuidv4(),
                ...state.optionsZapsign,
                actor_form_id: 0,
                data: {},
                required_fields: 0,
            };

            state.listActors.push(actor);
            state.selectedActor = actor;
        },
        deleteActor: (state, action) => {
            state.listActors = state.listActors.filter(actor => actor.id !== action.payload.value);
            if (state.selectedActor.id === action.payload.value) {
                state.selectedActor = {
                    id: 0,
                    actor_form_id: 0,
                    data: {},
                    required_fields: 0,
                };
            }
        },
        setActorType: (state, action) => {
            const { id, type, required_fields } = action.payload.value;

            state.listActors = state.listActors.map(actor => {
                if (actor.id === id) {
                    return {
                        ...actor,
                        actor_form_id: type,
                        data: {},
                        required_fields,
                    };
                }
                return actor;
            });

            if (state.selectedActor.id === id) {
                state.selectedActor.actor_form_id = type;
                state.selectedActor.data = {};
                state.selectedActor.required_fields = required_fields;
            }
        },
        setSelectedActor: (state, action) => {
            state.selectedActor = action.payload.value;
        },
        setInvalidFields: (state, action) => {
            state.invalidFields.push(action.payload.value);
        },
        setCleanFields: (state) => {
            state.invalidFields = [];
        },
        setGeneratedProcess: (state, action) => {
            state.generatedProcess = action.payload.value !== undefined ? action.payload.value : {
                id: 0,
                data_form: [],
                actors: [],
                answers: [],
            };
        },
        updateGenerateAnswer: (state, action) => {
            const answer = action.payload.value;
            state.listAnswers = state.listAnswers.map(item => {
                if (item.code_questions.id === answer.code_questions.id) return answer;
                return item;
            });
        },
        setCheckCodes: (state, action) => {
            state.checkCodes = action.payload.value;
        },
        setListProcess: (state, action) => {
            state.listProcess = action.payload.value;
            state.listFilteredProcess = action.payload.value;
        },
        cleanAll: (state, action) => {
            state.dataForm = {};
            state.listAnswers = [];
            state.checkCodes = true;
            state.listActors = [];
            state.selectedActor = {
                id: 0,
                actor_form_id: 0,
                data: {},
                required_fields: 0,
            };
            state.optionsZapsign = {
                require_selfie_photo: false,
                require_document_photo: false,
                automatic_mailing: false,
                automatic_whatsapp: false,
            };
            state.generatedProcess = {
                id: 0,
                data_form: [],
                actors: [],
                answers: [],
            };
        },
    },
});

export const {
    setListQuestions,
    addListAnswers,
    deleteListAnswers,
    setSelectedGenerateAnswer,
    setDataForm,
    reducerFormSelectedActor,
    reducerFormZapsignOptions,
    reducerSelectedGenerateAnswer,
    addActor,
    deleteActor,
    setActorType,
    setSelectedActor,
    setInvalidFields,
    setCleanFields,
    setGeneratedProcess,
    updateGenerateAnswer,
    setCheckCodes,
    setListProcess,
    cleanAll,
    changeZapsignOptionActors,
} = createProcessFormSlice.actions;

export default createProcessFormSlice.reducer;