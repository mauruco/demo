import Config from '../../../Config';
import Axios from 'axios';

export function editCourse(data) {
    
    return (dispatch) => dispatch({
        
        type: 'EDIT_COURSE',
        payload: new Promise((resolve, reject) => {
            
            Axios({
                url: `${Config.apiUrl}/course/${data.id}`,
                method: 'put',
                headers: {
                    'content-type': 'application/json',
                    Authorization: Config.getItem('login').api_token
                },
                data: data
            })
            .then(
                (success)=>{
                    
                    resolve(success.data);
                }, (error)=>{
                    
                    reject(error);
                });
                
            })
    });
}
        
export function getCourse(id) {

    return (dispatch) => dispatch({

        type: 'GET_COURSE',
        payload: new Promise((resolve, reject) => {

            Axios({
                url: `${Config.apiUrl}/course/${id}`,
                method: 'get',
                headers: {
                    'content-type': 'application/json',
                    Authorization: Config.getItem('login').api_token
                }
            })
            .then(
            (success)=>{

                resolve(success.data);
            }, (error)=>{
                
                reject(error);
            });

        })
    });
}
        
export function reloadCards(id) {

    return (dispatch) => dispatch({

        type: 'RELOAD_COURSES_FULFILLED',
        payload: true
    });
}