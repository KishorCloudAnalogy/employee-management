import React, {useEffect, useState} from 'react';
import { findDOMNode } from 'react-dom';
import './EmployeeList.css';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import EmployeeItem from "../EmployeeItem/EmployeeItem";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import AddEmployee from "../AddEmployee/AddEmployee";

const EmployeeList = (props) => {
    const [searchText,setSearchText] = useState('');
    const [searchId,setSearchId] = useState('');
    useEffect(()=>{
        props.appState.retrieveEmployees();
    },[]);

    let refs = props.appState.employees.reduce((acc, value) => {
        acc[value.id] = React.createRef();
        return acc;
    }, {});

    const onSearch = (text) => {
        setSearchText(text);
        props.appState.onEmployeeSearch(text);
    };

    const onClear = () => {
        setSearchText('');
        setSearchId('');
        props.appState.onEmployeeSearch(null);
    };

    const onSubmitNewEmployee = (employee,onClose) => {
        props.appState.addEmployee(employee);
        onClose();
        window.scrollTo(0,document.body.scrollHeight);
    };

    const addEmployee = () => {
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <AddEmployee onSubmitData={(employee)=>{onSubmitNewEmployee(employee,onClose)}}/>
                );
            }
        });
    };


    const handleScroll = () => {
        const filterEmployee = props.appState.employees.filter((item)=>{
            return item.id === searchId;
        });
        if(filterEmployee.length>0){
            const yPos = findDOMNode(refs[filterEmployee[0].id]).offsetTop;
            window.scrollTo(0,yPos);
        }else{
            window.scrollTo(0,document.body.scrollHeight);
        }
    };

    return (
        <div className="App">
            <header className="App-header">
                <b>Employee Management</b>
            </header>
            <div className="cards-list">
                <ReactCSSTransitionGroup
                    transitionName="fade"
                    transitionEnterTimeout={300}
                    transitionLeaveTimeout={300}
                >
                    <input className="inputStyle"  placeholder={'Search Employee'} value={searchText} onChange={(text)=>{onSearch(text.target.value)}}/>
                    <div style={{display: 'flex'}}>
                        <button className="clearButton" onClick={()=>{onClear()}}>Clear</button>
                        <button className="addButton" onClick={()=>{addEmployee()}}>Add Employee</button>
                    </div>
                    <input className="inputStyle"  placeholder={'Search Employee By Id'} value={searchId} onChange={(text)=>{setSearchId(text.target.value)}}/>
                    <div style={{display: 'flex'}}>
                        <button className="searchId" onClick={()=>{handleScroll()}}>Search By Id</button>
                    </div>
                    {props.appState.employees.map(employee =>
                        <EmployeeItem key={employee.id} employee={employee} appState={props.appState} setRef={(ref)=>{refs[employee.id]=ref}}/>
                    )}
                </ReactCSSTransitionGroup>
            </div>
        </div>
    );
};

export default EmployeeList;

