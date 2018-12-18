import React from 'react';

const initialState = {
    id: 0,
    applicationInProgress: false,
    message: '',
    course: '',
    open: false,
    callBack: false,
    cats: [{id: 1, category: 'À distância', check: false},{id: 2, category: 'Técnico', check: false},{id: 3, category: 'Especialização', check: false}],
};

initialState.initialState = {...initialState};

const editCourseReducer = (state = initialState, action) => {

    switch(action.type) {

        case 'UPDATE_COURSE':

        state = {
                ...state,
                id: action.payload
            }
        break;

        case 'EDIT_COURSE_FULFILLED':

            state = {
                open: false,
                applicationInProgress: false,
                callBack: true,
                id: 0
            }
        break;
        
        case 'EDIT_COURSE_REJECTED':

            state = {
                open: false,
                applicationInProgress: false,
                message: <span>Editar curso falhou.</span>
            }
        break;

        case 'GET_COURSE_FULFILLED':

            let newState = {...initialState.initialState};
            newState.open = true;
            newState.id = action.payload.id;
            newState.course = action.payload.course;
            newState.text = action.payload.text;
            newState.cats = [{id: 1, category: 'À distância', check: false},{id: 2, category: 'Técnico', check: false},{id: 3, category: 'Especialização', check: false}];

            for(let i = 0; i < action.payload.categories.length; i++){

                for(let y = 0; y < newState.cats.length; y++){

                    if(newState.cats[y].id != action.payload.categories[i].id)
                        continue;

                    newState.cats[y].check = true;
                }
            }

            state = {
                ...newState
            }
        break;
        
        case 'GET_COURSE_REJECTED':
            state = {
                applicationInProgress: false,
                message: <span>Editar curso falhou.</span>
            }
        break;
        default:
    }

    return state;
};

export default editCourseReducer;