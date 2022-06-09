import React, {useContext, useEffect, useState} from 'react';
import classes from './FininsPage.module.css';
import {useNavigate} from 'react-router-dom';
import {AuthContext} from "../../context/AuthContext";
import Finance from "../../components/UI/Finance/Finance";
import NewFinanceForm from "../../components/UI/NewFinanceForm/NewFinanceForm";
import {useHttp} from "../../hooks/http.hook";
import OpenButton from "../../components/UI/OpenButton/OpenButton";
import FinanceFormInput from "../../components/UI/FinanceFormInput/FinanceFormInput";
import FinanceChart from "../../components/UI/financeChart/FinanceChart";

const FinancePage = userID => {
    const auth = useContext(AuthContext)
    const history = useNavigate()
    const [data, setData] = useState([])

    const [values, setValues] = useState({
        id: null,
        summary: null,
        reason: "",
        category: "",
        date: "",
        isIncoming: null
    })

    const [sortingState, setSortingState] = useState("")
    const [filterState, setFilterState] = useState({category: "", date: ""})

    const logoutHandler = event => {
        event.preventDefault()
        auth.logout()
        history("/")
    }

    const [chart, setChart] = useState({
        plus: {clothes: 0, trips: 0, food: 0, scholarship: 0},
        minus: {clothes: 0, trips: 0, food: 0, scholarship: 0}
    })

    const [activeData, setActiveData] = useState(data)

    const {loading, error, request} = useHttp()

    const [showForm, setShowForm] = useState(false)

    const userFIO = "Монич Иван Антонович"

    const onCloseClick = () => {
        setShowForm(false)
    }

    useEffect(() => {
        getFinance()
    }, [])

    const getFinance = async () => {
        try {
            const finances = await request('api/finance/get_finance', 'POST', {userID})
            setData(finances.finances.expenses)
            console.log(finances.finances.expenses)
        } catch (e) {
        }
    }

    const addFinance = (finance) => {
        setData([...data, finance])
    }

    useEffect(() => {
        setActiveData(data)
        getFinanceCount()
        if (data.length !== 0) {
            updateFinances()
        }
    }, [data])

    const updateFinances = async () => {
        try {
            const reqData = await request('api/finance/add_finance', 'POST', {userID: userID.userID, expenses: data})
        } catch (e) {
        }
    }

    const changeHandler = event => {
        if (event.target.name === 'category') {
            setFilterState({...filterState, category: event.target.value})
        } else if (event.target.name === 'date') {
            setFilterState({...filterState, date: event.target.value})
        } else if (event.target.name === 'sorting') {
            setSortingState(event.target.value)
        }
    }

    const filter = () => {
        const result = []

        if (filterState.category === '') {
            for (let i = 0; i < data.length; i++) {
                result.push(data[i])
            }
        } else {
            for (let i = 0; i < data.length; i++) {
                if (data[i].category === filterState.category) {
                    result.push(data[i])
                }
            }
        }

        const len = result.length
        if (filterState.date !== '') {
            const currentDate = new Date()
            for (let i = 0; i < len; i++) {
                console.log(i)
                const dataDate = new Date(result[i - len + result.length].date)
                const different = new Date(currentDate - dataDate)
                // console.log(different.getDate() - 1, different.getMonth(), different.getFullYear() || "idk")
                if (filterState.date === "день" &&
                    different.getDate() - 1 === 0 &&
                    different.getMonth() === 0 &&
                    different.getFullYear() === 1970) {
                } else if (filterState.date === "неделя" &&
                    (different.getDate() - 1 <= 7 &&
                        different.getMonth() === 0 &&
                        different.getFullYear() === 1970)) {
                } else if (filterState.date === "месяц" &&
                    ((different.getDate() - 1 <= 31 &&
                        different.getMonth() === 0 &&
                        different.getFullYear() === 1970) || (
                        different.getDate() - 1 === 0 &&
                        different.getMonth() === 1 &&
                        different.getFullYear() === 1970
                    ))) {
                } else if (filterState.date === "год" &&
                    ((different.getMonth() < 12 &&
                        different.getFullYear() === 1970) || (
                        different.getDate() - 1 === 0 &&
                        different.getMonth() === 0 &&
                        different.getFullYear() === 1971
                    ))) {
                } else {
                    result.splice(i - len + result.length, 1)
                }
            }
        }
        setActiveData(result)
    }

    const setFilterToNull = () => {
        setActiveData(data)
        setFilterState({category: '', date: ''})
        setSortingState('')
    }

    const sorting = () => {
        const result = []
        const param = []

        console.log(sortingState)

        if (sortingState === 'сначала старые') {
            for (let i = 0; i < activeData.length; i++) {
                result.push(activeData[i])
            }
            result.sort(function (a, b) {
                return new Date(b.date) - new Date(a.date);
            });
            result.reverse()

        } else if (sortingState === 'сначала новые') {
            for (let i = 0; i < activeData.length; i++) {
                result.push(activeData[i])
            }
            result.sort(function (a, b) {
                return new Date(b.date) - new Date(a.date);
            });

        } else if (sortingState === 'по названию') {
            for (let i = 0; i < activeData.length; i++) {
                param.push(activeData[i].reason)
            }
            param.sort()

            for (let i = 0; i < activeData.length; i++) {
                for (let j = 0; j < activeData.length; j++) {
                    if (param[i] === activeData[j].reason) {
                        result.push(activeData[j])
                        break
                    }
                }
            }
        }
        console.log(result)
        setActiveData(result)
    }

    // useEffect(() => {
    //     console.log(values)
    //     if (values.id !== null) {
    //         setShowForm(true)
    //     } else {
    //         setShowForm(false)
    //     }
    // },[values])

    const getFinanceCount = () => {
        let temp = Object.assign({}, chart)

        for (let i = 0; i < data.length; i++) {
            if (data[i].isIncoming === true) {
                if (data[i].category === 'Одежда') {
                    temp.plus.clothes += data[i].summary
                } else if (data[i].category === 'Поездки') {
                    temp.plus.trips += data[i].summary
                } else if (data[i].category === 'Еда') {
                    temp.plus.food += data[i].summary
                } else if (data[i].category === 'Стипендия') {
                    temp.plus.scholarship += data[i].summary
                }
            } else if (data[i].isIncoming === false) {
                if (data[i].category === 'Одежда') {
                    temp.minus.clothes += data[i].summary
                } else if (data[i].category === 'Поездки') {
                    temp.minus.trips += data[i].summary
                } else if (data[i].category === 'Еда') {
                    temp.minus.food += data[i].summary
                } else if (data[i].category === 'Стипендия') {
                    temp.minus.scholarship += data[i].summary
                }
            }
        }
        console.log(temp)
        setChart(temp)
    }

    const onChangeClick = (form) => {
        let temp = Object.assign([], data)
        for (let i = 0; i < data.length; i++) {
            if (form.id === data[i].id) {
                temp[i] = form
                console.log(temp)
                break
            }
        }

        setData(temp)
    }

    return (
        <div className="background">
            {data.length !== 0 ?
                <>
                    <div className={classes.header}>
                        <span>{userFIO}</span>
                        <OpenButton name="add" onClick={() => {
                            setShowForm(!showForm)
                            setValues({id: null, summary: null, reason: "", category: "", date: "", isIncoming: null})
                        }}/>
                        {/*<OpenButton name="delete" onClick={() => setShowForm(!showForm)}/>*/}
                    </div>
                    <div className={classes.middle}>
                        {
                            activeData.map(finance =>
                                <Finance typeOfFinance={finance.isIncoming}
                                         summary={finance.summary}
                                         reason={finance.reason}
                                         category={finance.category}
                                         date={finance.date}
                                         setValues={() => {
                                             setValues({
                                                 id: finance.id,
                                                 summary: finance.summary,
                                                 reason: finance.reason,
                                                 category: finance.category,
                                                 date: finance.date,
                                                 isIncoming: finance.isIncoming
                                             })
                                             setShowForm(!showForm)
                                         }
                                         }
                                         setShow={() => setShowForm(!showForm)}
                                         key={finance.id}
                                />
                            )
                        }
                    </div>
                    <div className={classes.filterFolder}>
                        <div className={classes.filterHeader}>ФИЛЬТРАЦИЯ</div>
                        <div className={classes.filterCategory}>
                            КАТЕГОРИЯ
                            <div className={classes.radioChoice}>
                                <FinanceFormInput name="category" placeholder="Категория" type="radio" value="Одежда"
                                                  onChange={changeHandler}/>
                                <FinanceFormInput name="category" placeholder="Категория" type="radio" value="Поездки"
                                                  onChange={changeHandler}/>
                                <FinanceFormInput name="category" placeholder="Категория" type="radio" value="Еда"
                                                  onChange={changeHandler}/>
                                <FinanceFormInput name="category" placeholder="Категория" type="radio" value="Стипендия"
                                                  onChange={changeHandler}/>
                            </div>
                        </div>
                        <div className={classes.filterDate}>
                            ДАТА
                            <div className={classes.radioChoice2}>
                                <FinanceFormInput name="date" placeholder="Дата" type="radio" value="день"
                                                  onChange={changeHandler}/>
                                <FinanceFormInput name="date" placeholder="Дата" type="radio" value="неделя"
                                                  onChange={changeHandler}/>
                                <FinanceFormInput name="date" placeholder="Дата" type="radio" value="месяц"
                                                  onChange={changeHandler}/>
                                <FinanceFormInput name="date" placeholder="Дата" type="radio" value="год"
                                                  onChange={changeHandler}/>
                            </div>
                            <div className={classes.filterButton} onClick={filter}>
                                Фильтровать
                            </div>
                            <div className={classes.filterButton} onClick={setFilterToNull}>
                                Сбросить
                            </div>
                        </div>
                    </div>
                    <div className={classes.sortingFolder}>
                        <div className={classes.filterHeader}>СОРТИРОВКА</div>
                        <div className={classes.radioSorting}>
                            <FinanceFormInput name="sorting" placeholder="сортировка" type="radio"
                                              value="сначала старые"
                                              onChange={changeHandler}/>
                            <br/>
                            <FinanceFormInput name="sorting" placeholder="сортировка" type="radio" value="сначала новые"
                                              onChange={changeHandler}/>
                            <br/>
                            <FinanceFormInput name="sorting" placeholder="сортировка" type="radio" value="по названию"
                                              onChange={changeHandler}/>
                        </div>
                        <hr/>
                        <div className={classes.filterButton} onClick={sorting}>
                            Сортировать
                        </div>
                        <div className={classes.filterButton} onClick={setFilterToNull}>
                            Сбросить
                        </div>
                    </div>
                    {showForm ?
                        <NewFinanceForm values={values} onChangeClick={onChangeClick} onCloseClick={onCloseClick}
                                        onAddClick={addFinance} id={data[data.length - 1].id + 1}/>
                        : false
                    }
                    <div className={classes.firstChart}>
                        <FinanceChart data={chart} typeOfChart={true}/>
                    </div>
                    <div className={classes.secondChart}>
                        <FinanceChart data={chart} typeOfChart={false}/>
                    </div>
                </> : null}
        </div>
    );
};

export default FinancePage;