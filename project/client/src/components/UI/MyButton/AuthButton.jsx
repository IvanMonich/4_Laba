import React from 'react';
import classes from './AuthButton.module.css'

const AuthButton = (props) => {
    return (
        <button className={classes.myButton} onClick={ props.onClick } disabled={props.disabled}>
            { props.name }
        </button>
    );
};

export default AuthButton;