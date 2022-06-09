import React from 'react';
import classes from "./Finance.module.css";
import AuthButton from "../MyButton/AuthButton";
import OpenButton from "../OpenButton/OpenButton";

const Finance = props => {
    const { typeOfFinance, summary, reason, category, date, setValues } = props

    return (
        <div className={typeOfFinance?classes.backgroundTrue:classes.backgroundFalse}>
            <div>
                <span className={typeOfFinance?classes.count:classes.count2}>{summary}</span>
                <span className={classes.sum}>Рублей</span>
                <span className={classes.category}>Категория: {category}</span>
                <span className={classes.reason}>Описание: {reason}</span>
                <span className={classes.date}>{date}</span>
                <OpenButton name="Изменить" onClick={setValues}/>
            </div>
        </div>
    );
};

export default Finance;