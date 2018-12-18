import Config from '../../Config';
import Axios from 'axios';

export function doLogin(data) {

    return (dispatch) => dispatch({
        
        type: 'DO_LOGIN',
        payload: new Promise((resolve, reject) => {

            Axios({
                url: `${Config.apiUrl}/login`,
                method: 'post',
                headers: {
                    'content-type': 'application/json',
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