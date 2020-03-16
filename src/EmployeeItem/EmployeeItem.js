import React from 'react';
import './EmployeeItem.css';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import UpdateEmployee from "../UpdateEmployee/UpdateEmployee";

const EmployeeItem = (props) => {

    const onDeleteClick = () => {
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <div className='custom-ui'>
                        <h1>Are you sure?</h1>
                        <p>You want to delete this employee?</p>
                        <button onClick={onClose}>No</button>
                        <button
                            onClick={() => {
                                props.appState.onEmployeeDelete(props.employee.id);
                                onClose();
                            }}
                        >
                            Yes, Delete it!
                        </button>
                    </div>
                );
            }
        });
    };

    const onSubmit = (employee,onClose) => {
        props.appState.onEmployeeUpdate(employee);
        onClose();
    };

    const updateClick = () => {
        let employeeSelected = {
            id: props.employee.id,
            employee_name: props.employee.employee_name,
            employee_salary: props.employee.employee_salary,
            employee_age: props.employee.employee_age,
            profile_image: props.employee.profile_image,
        };

        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                   <UpdateEmployee employee={employeeSelected} onSubmitData={(employee)=>{onSubmit(employee,onClose)}}/>
                );
            }
        });
    };

    return(
        <div className='container' ref={(ref)=>{props.setRef(ref)}}>
            <div key={props.employee.id} className="card">
                <div style={{width: '100%'}}> <b>Id :</b> {props.employee.id}</div>
                <div style={{width: '100%'}}> <b>Name :</b> {props.employee.employee_name}</div>
                <div style={{width: '100%'}}> <b>Salary :</b> {props.employee.employee_salary}</div>
                <div style={{width: '100%'}}> <b>Age :</b> {props.employee.employee_age}</div>
                <div className={'divStyle'}>
                    <div className={'buttonDiv'}>
                        <button className={'updateButton'}  onClick={()=>{updateClick()}}>
                            Update
                        </button>
                    </div>
                    <div style={{flex: 1,marginLeft: 5}}>
                        <button className={'deleteButton'}
                                onClick={()=>{onDeleteClick()}}>
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmployeeItem;
