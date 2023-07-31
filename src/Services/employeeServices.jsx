import axios from 'axios';
const getDefaultsHeaders = () => {
    const userData = JSON.parse(localStorage.getItem('userData'))
    return {'x-role-id': userData.roleId}
}

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
const employeeServices = {
    getEmployee: async() => {
        try {
            const response = await axios.get(`${backendUrl}balneario/api/user`, { headers: getDefaultsHeaders()});
            return response.data
            
          } catch (error) {
            console.error(error);
        } 
    },

    postEmployee: async(body) => {
        try {
            await axios.post(`${backendUrl}balneario/api/user`, body, { headers: getDefaultsHeaders()});

          } catch (error) {
            console.error(error);
        } 
    },

    deleteEmployee: async(idEmployee) => {
        try {
            await axios.delete(`${backendUrl}balneario/api/user/${idEmployee}`, { headers: getDefaultsHeaders()});

          } catch (error) {
            console.error(error);
        } 
    },

    editEmployee: async(idEmployee, body) => {
        try {
            await axios.put(`${backendUrl}balneario/api/user/${idEmployee}`, body, { headers: getDefaultsHeaders()});

          } catch (error) {
            console.error(error);
        } 
    }
}

export default employeeServices;