import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './style.css';
import store from './store';
import { Provider } from 'react-redux';
import Login from './containers/Login';
import Course from './containers/Course';
import registerServiceWorker from './registerServiceWorker';
import 'typeface-roboto';
import Config from './Config';

ReactDOM.render(
    <Provider store={store}>
        <Router basename={Config.router}>
            <div className="wrapper">
                <Route exact path="/" component={Login}/>
                <Route path="/course" component={Course}/>
            </div>
        </Router>
    </Provider>
    , document.getElementById('root'));
registerServiceWorker();



