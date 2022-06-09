import React from 'react';
import classes from './AuthInput.module.css'

const AuthInput = (props) => {
    return (
        <input name={props.name} className={classes.authInput} placeholder={props.placeholder}
        type={props.type} onChange={props.onChange}>

        </input>
    );
};

export default AuthInput;