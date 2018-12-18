import Config from '../Config';

const isPromise = value => value !== null && typeof value === 'object' && typeof value.then === 'function';

const promiseCatch = (store) => (next) => (action) => {

    if (!isPromise(action.payload))
       return next(action);

    if (!action.meta || !action.meta.localError) {
        return next(action).catch(error => {

            console.log(`${action.type} unhandled rejection caught at middleware with reason: ${JSON.stringify(error.message)}.`);
            if(error.message.match(/401/g)){
                
                if(process && process.env && process.env.NODE_ENV == 'development')
                    return;

                    window.location.href = `${Config.appUrl}#unauthorized`;
                return;
            }
            return error;
        });
    }
};

export default promiseCatch;