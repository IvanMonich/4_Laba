import React from 'react';
import classes from './OpenButton.module.css'

const OpenButton = props => {
    return (
        <div className={classes.open} onClick={props.onClick} >
            {props.name}
        </div>
    );
};

export default OpenButton;