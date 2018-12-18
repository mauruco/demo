import Config from '../../../Config';
import Axios from 'axios';

export function addCourse(data) {
    
    return (dispatch) => dispatch({

        
        type: 'ADD_COURSE',
        payload: new Promise((resolve, reject) => {

            Axios({
                url: `${Config.apiUrl}/course`,
                method: 'post',
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
     
export function reloadCards(id) {

    return (dispatch) => dispatch({

        type: 'RELOAD_COURSES_FULFILLED',
        payload: true
    });
}