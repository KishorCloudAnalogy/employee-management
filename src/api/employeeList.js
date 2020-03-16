import axios from 'axios';
axios.defaults.baseURL = 'http://dummy.restapiexample.com/api/v1';

export const getEmployeeList = () => {
    return axios.get('/employees');
};
