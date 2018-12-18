import Config from '../../Config';
import Axios from 'axios';

export function getCourses() {

    return (dispatch) => dispatch({
        
        type: 'GET_COURSES',
        payload: new Promise((resolve, reject) => {

            Axios({
                url: `${Config.apiUrl}/course`,
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

export function deleteCourse(id) {

    return (dispatch) => dispatch({
        
        type: 'DELETE_COURSE',
        payload: new Promise((resolve, reject) => {

            Axios({
                url: `${Config.apiUrl}/course/${id}`,
                method: 'delete',
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

export function updateCourse(id) {

    return (dispatch) => dispatch({
        
        type: 'UPDATE_COURSE',
        payload: id
    });
}