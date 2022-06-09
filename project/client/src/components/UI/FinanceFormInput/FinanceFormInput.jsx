import React from 'react';
import classes from './FinanceFormInput.module.css'

const FinanceFormInput = props => {
    const {placeholder, type, name, value, onChange, checked} = props

    return (
        <>
            <input placeholder={placeholder}
                   type={type}
                   className={type==="radio"?classes.FinanceInputRadio:classes.FinanceInput}
                   name={name}
                   onChange={onChange}
                   value={value}
                   checked={checked}
            /> <span style={{position: "relative", top: "4px", marginBlockEnd: "5px"}}>{value === true?"Доход":null}
            {value === false?"Расход":null}
            {type === "radio"?value:null}</span>
        </>
    );
};

export default FinanceFormInput;