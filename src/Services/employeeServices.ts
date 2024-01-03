import localStorageUtils from '../utils/localStorageUtils';
import axios from 'axios';

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
const BASE_PATH_EMPLOYEE = `${backendUrl}balneario/api/employee`
const employeeServices = {
    getEmployee: async(): Promise<IEmployee[]> => {
        try {
            const response = await axios.get(`${BASE_PATH_EMPLOYEE}/`, { headers: localStorageUtils.getDefaultHeaders() });
            return response.data
            
          } catch (error) {
            console.error(error);
            return []
        } 
    },

    postEmployee: async(body: any) => {
        try {
            await axios.post(BASE_PATH_EMPLOYEE, body, { headers: localStorageUtils.getDefaultHeaders() });

          } catch (error) {
            console.error(error);
        } 
    },

    deleteEmployee: async (body: any) => {
        try {
            console.log(body)
            await axios.delete(BASE_PATH_EMPLOYEE, { 
                data: body, 
                headers: {
                  ...localStorageUtils.getDefaultHeaders()
                }
            });

          } catch (error) {
            console.error(error);
        } 
    },

    editEmployee: async (body:any) => {
        try {
            await axios.put(BASE_PATH_EMPLOYEE, body, { headers: localStorageUtils.getDefaultHeaders() });

          } catch (error) {
            console.error(error);
        } 
    }
}

export default employeeServices;