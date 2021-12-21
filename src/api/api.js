import Axios from 'axios';

export const getTableData = async() => {
    return Axios.get('https://reqres.in/api/users?page=1')
    .then(res => {
        return res.data;
    })
}