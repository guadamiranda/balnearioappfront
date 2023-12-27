import axios from 'axios';
const getDefaultsHeaders = () => {
    const userData = JSON.parse(localStorage.getItem('userData'))
    return {'x-role-id': userData.roleId}
}

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
const BASE_PATH_EMPLOYEE = `${backendUrl}balneario/api/employee`
const employeeServices = {
    getEmployee: async() => {
        try {
            const response = await axios.get(BASE_PATH_EMPLOYEE, { headers: getDefaultsHeaders() });
            return response.data
            
          } catch (error) {
            console.error(error);
        } 
    },

    postEmployee: async (body) => {
        try {
            await axios.post(BASE_PATH_EMPLOYEE, body, { headers: getDefaultsHeaders() });

          } catch (error) {
            console.error(error);
        } 
    },

    deleteEmployee: async (body) => {
        try {
            console.log(body)
            await axios.delete(BASE_PATH_EMPLOYEE, body, { headers: getDefaultsHeaders() });

          } catch (error) {
            console.error(error);
        } 
    },

    editEmployee: async (body) => {
        try {
            await axios.put(BASE_PATH_EMPLOYEE, body, { headers: getDefaultsHeaders() });

          } catch (error) {
            console.error(error);
        } 
    }
}

export default employeeServices;