import React, {useState} from 'react';
import './AddEmployee.css';

const AddEmployee = (props) => {
    const [name, setName] = useState('');
    const [salary, setSalary] = useState('');
    const [age, setAge] = useState('');

    const generateId = () => {
        const string = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let id = '';
        const len = string.length;
        for (let i = 0; i < 6; i++ ) {
            id += string[Math.floor(Math.random() * len)];
        }
        return id;
    };

    const checkValue = (itemValue) => {
        if(itemValue!==null && itemValue!==undefined){
            if(itemValue.toString().trim().length>0){
                return true;
            }
        }
        return false;
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if(checkValue(name)){
            if(checkValue(salary)){
                if(checkValue(age)){
                    let employee = {
                        id: generateId(),
                        employee_name:name,
                        employee_salary: salary,
                        employee_age: age,
                        profile_image: ""
                    };
                    props.onSubmitData(employee);
                }else{
                    alert('Please insert Age.');
                }
            }else{
                alert('Please insert Salary.');
            }
        }else{
            alert('Please insert name.');
        }
    };

    return (
        <div className={'custom-ui'}>
            <div className={'addEmployeeHeader'}>Add Employee</div>
            <div className={'bottomLine'}/>
            <form onSubmit={(event) => {
                handleSubmit(event)
            }}>
                <label>
                    Name  : <input type="text" value={name} onChange={(text) => {
                    setName(text.target.value)
                }} style={{width: 200}}/>
                </label>
                <div style={{width: '100%',marginTop: 15}}>
                    <label>
                        Salary : <input type="number" value={salary} onChange={(text) => {
                        setSalary(text.target.value)
                    }} style={{width: 200}}/>
                    </label>
                </div>
                <div style={{width: '100%',marginTop: 15}}>
                    <label>
                        Age&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;
                        <input type="number" value={age} onChange={(text) => {
                            setAge(text.target.value)
                        }} style={{width: 200}} />
                    </label>
                </div>
                <div style={{width: '100%',marginTop: 15}}>
                    <input type="submit" value="Submit" style={{width: 150}}/>
                </div>
            </form>
        </div>
    )
};

export default AddEmployee;
