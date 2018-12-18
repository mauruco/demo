import React from 'react';
import Config from '../../Config';

const initialState = {

    applicationInProgress: false,
    message: '',
    redirect: false
};

const loginReducer = (state = initialState, action) => {

    switch(action.type) {

        case 'DO_LOGIN_FULFILLED':

            let data = {...action.payload.data};
            data.api_token = `Bearer ${data.api_token}`;

            if(process && process.env && process.env.NODE_ENV == 'development')
                console.log(data.api_token);

            Config.setItem('login', data);
            state = {
                ...state,
                applicationInProgress: false,
                redirect: '/course'
            }
            break;
            
            case 'DO_LOGIN_REJECTED':

            state = {
                applicationInProgress: false,
                message: <span>Sua senha ou e-mail da conta está incorreto.</span>
            }
        break;

        default:
    }

    return state;
};

export default loginReducer;