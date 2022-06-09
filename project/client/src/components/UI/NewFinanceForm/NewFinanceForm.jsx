import React, {useState} from 'react';
import classes from './NewFinanceForm.module.css'
import FinanceFormInput from "../FinanceFormInput/FinanceFormInput";

const NewFinanceForm = props => {
    const {onCloseClick, onAddClick, onChangeClick, values, id} = props
    const iDi = values.id
    const [form, setForm] = useState(values)

    const changeHandler = event => {
        if (event.target.name === "summary") {
            setForm({...form, summary: Number(event.target.value)})
        } else if (event.target.name === "reason") {
            setForm({...form, reason: event.target.value})
        } else if (event.target.name === "category") {
            setForm({...form, category: event.target.value})
        } else if (event.target.name === "date") {
            setForm({...form, date: event.target.value.toString()})
        } else if (event.target.name === "isIncoming") {
            setForm({...form, isIncoming: event.target.value})
        }
    }

    return (
        <div className={classes.background}>
            <FinanceFormInput name="summary" placeholder="Сумма" type="text" onChange={changeHandler} value={form.summary}/>
            <FinanceFormInput name="reason" placeholder="Описание" type="text" onChange={changeHandler} value={form.reason}/>
            <div className={classes.radio}>
                <br/>
                <br/>
                <div className={classes.radioHeader}>Категория</div>
                <br/>
                <div className={classes.radioChoice}>
                    <FinanceFormInput name="category" placeholder="Категория" type="radio" value="Одежда"
                                      onChange={changeHandler} checked={form.category === "Одежда"?true:null}/>
                    <FinanceFormInput name="category" placeholder="Категория" type="radio" value="Поездки"
                                      onChange={changeHandler} checked={form.category === "Поездки"?true:null}/>
                    <FinanceFormInput name="category" placeholder="Категория" type="radio" value="Еда"
                                      onChange={changeHandler} checked={form.category === "Еда"?true:null}/>
                    <FinanceFormInput name="category" placeholder="Категория" type="radio" value="Стипендия"
                                      onChange={changeHandler} checked={form.category === "Стипендия"?true:null}/>
                </div>
            </div>
            <FinanceFormInput name="date" placeholder="Дата" type="date" onChange={changeHandler} value={form.date}/>
            <div className={classes.secondRadio}>
                <FinanceFormInput name="isIncoming" placeholder="Доход" type="radio" value={true}
                                  onChange={changeHandler} checked={form.isIncoming?true:null}/>
                <FinanceFormInput name="isIncoming" placeholder="Расход" type="radio" value={false}
                                  onChange={changeHandler} checked={form.isIncoming?null:true}/>
            </div>

            <div className={classes.add} onClick={() => {
                if (iDi === null) {
                    console.log(form)
                    setForm({...form, id: id})
                    onAddClick(form)
                } else {
                    console.log(form)
                    onChangeClick(form)
                }
            }}>
                {iDi === null ?
                    <span>Добавить</span>
                    : <span>Изменить</span>
                }
            </div>
            <button className={classes.add} onClick={onCloseClick}>
                Закрыть
            </button>

        </div>
    );
};

export default NewFinanceForm;