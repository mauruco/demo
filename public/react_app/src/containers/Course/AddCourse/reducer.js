import React from 'react';

const initialState = {
    applicationInProgress: false,
    message: '',
    callBack: false,
    cats: [{id: 1, category: 'À distância', check: false},{id: 2, category: 'Técnico', check: false},{id: 3, category: 'Especialização', check: false}]
};

const addCourseReducer = (state = initialState, action) => {

    switch(action.type) {

        case 'ADD_COURSE_FULFILLED':
            state = {
                ...state,
                open: false,
                applicationInProgress: false,
                callBack: true
            }
        break;
        
        case 'ADD_COURSE_REJECTED':
            state = {
                applicationInProgress: false,
                message: <span>Adicionar curso falhou.</span>
            }
        break;
        default:
    }

    return state;
};

export default addCourseReducer;