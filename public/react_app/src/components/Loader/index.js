import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import './style.css';

const Loader = props => {

    if(!props.show) return '';

    return (
        <div className="loader">
            <div className="background"></div>
            <CircularProgress color="secondary" size={50} thickness={7} />
        </div>
    );
};

export default Loader;