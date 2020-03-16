import React from "react";
import {observable, configure, action} from "mobx";
import { observer } from "mobx-react";
import "./index.css";
import EmployeeList from "./EmployeeList/EmployeeList";
import {getEmployeeList} from "./api/employeeList";
configure({ enforceActions: true });

const appState = observable({
    employees: [],
    employeesMain: [],
    employeeFilterId: null,
    retrieveEmployees: action("Get Employee List",()=>{
        getEmployeeList().then(action((response) => {
            let status = response.data.status;
            if(status!==null && status!==undefined){
                if(status.toString() === 'success'){
                    let tempEmployees = response.data.data;
                    if(tempEmployees!==null && tempEmployees!==undefined){
                        appState.employees.replace(tempEmployees);
                        appState.employeesMain.replace(tempEmployees);
                    }else{
                        appState.employees.replace([]);
                        appState.employeesMain.replace([]);
                    }
                }else{
                    appState.employees.replace([]);
                    appState.employeesMain.replace([]);
                }
            }else{
                appState.employees.replace([]);
                appState.employeesMain.replace([]);
            }
        })).catch((error) => {
            alert('Something went gone wrong/Check internet connection.');
        });
    }),
    onEmployeeSearch: action('Search Employee',(text)=>{
        if(text!==null && text!==undefined && text!==""){
            let searchEmployee = appState.employeesMain.filter(item => {
                const itemData = `${item.employee_name.toString().toUpperCase()} ${item.employee_age.toString().toUpperCase()}`;
                const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1;
            });
            appState.employees.replace(searchEmployee);
        }else{
            appState.employees.replace(appState.employeesMain);
        }
    }),
    onEmployeeDelete: action('Delete Employee',(id)=>{
            let filterEmployees = appState.employeesMain.filter(item => {
                return item.id!==id;
            });
        appState.employees.replace(filterEmployees);
        appState.employeesMain.replace(filterEmployees);
    }),
    addEmployee: action('Add Employee',(employee)=>{
        appState.employees.push(employee);
        appState.employeesMain.push(employee);
    }),
    onEmployeeUpdate: action('Update Employee',(employee)=>{
        console.log('Update Employee===',employee);
        let employeeList = appState.employees;
        employeeList.filter(item => {
            return item.id===employee.id;
        }).map((itemMain)=>{
            itemMain.employee_name = employee.employee_name;
            itemMain.employee_salary = employee.employee_salary;
            itemMain.employee_age = employee.employee_age;
            itemMain.id = employee.id;
            itemMain.profile_image = employee.profile_image;
        });
        console.log('filterEmployees==',employeeList);
        appState.employees.replace(employeeList);
    })
});

const App = observer(props => (
    <section>
        {appState.employees}
        <EmployeeList appState={appState}/>
    </section>
));

export default App;
