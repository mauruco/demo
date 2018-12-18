import React from 'react';

const initialState = {

    applicationInProgress: false,
    message: '',
    courses: null,
    reload: false,
    toDeleteId: 0
};

const courseReducer = (state = initialState, action) => {

    switch(action.type) {

        case 'RELOAD_COURSES_FULFILLED':

            state = {
                ...state,
                reload: true
            }
        break;

        case 'GET_COURSES_FULFILLED':

            state = {
                ...state,
                applicationInProgress: false,
                courses: action.payload.data,
                reload: false
        }
        break;
        
        case 'GET_COURSES_REJECTED':
        
            state = {
                applicationInProgress: false,
                message: <span>Falha ao obter dados.</span>,
                reload: false
            }
        break;

        case 'DELETE_COURSE_FULFILLED':

            state = {
                ...state,
                applicationInProgress: false,
                reload: true
            }
        break;
        
        case 'DELETE_COURSE_REJECTED':
        
            state = {
                applicationInProgress: false,
                message: <span>Falha ao deletar curso.</span>,
                reload: false
            }
        break;

        default:
    }

    return state;
};

export default courseReducer;