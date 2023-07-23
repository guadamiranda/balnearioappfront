import axios from 'axios';

const employeeServices = {
    getEmployee: async() => {
        try {
            const response = await axios.get('http://localhost:3001/balneario/api/user');
            return response.data
            
          } catch (error) {
            console.error(error);
        } 
    },

    postEmployee: async(body) => {
        try {
            await axios.post('http://localhost:3001/balneario/api/user', body);

          } catch (error) {
            console.error(error);
        } 
    },

    deleteEmployee: async(idEmployee) => {
        try {
            await axios.delete(`http://localhost:3001/balneario/api/user/${idEmployee}`);

          } catch (error) {
            console.error(error);
        } 
    },

    editEmployee: async(idEmployee, body) => {
        try {
            await axios.put(`http://localhost:3001/balneario/api/user/${idEmployee}`, body);

          } catch (error) {
            console.error(error);
        } 
    }
}

export default employeeServices;