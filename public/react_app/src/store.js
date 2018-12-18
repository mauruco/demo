import { createStore, combineReducers, applyMiddleware } from 'redux';
import promiseCatch from './middlewares/promiseCatch';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import loginReducer from './containers/Login/reducer';
import courseReducer from './containers/Course/reducer';
import addCourseReducer from './containers/Course/AddCourse/reducer';
import editCourseReducer from './containers/Course/EditCourse/reducer';

const store =  createStore(combineReducers({loginReducer, courseReducer, addCourseReducer, editCourseReducer}), {}, applyMiddleware(promiseCatch, logger, thunk, promise()));

export default store;