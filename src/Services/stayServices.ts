import localStorageUtils from '../utils/localStorageUtils';
import axios from 'axios';

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
const BASE_PATH_STAY = `${backendUrl}balneario/api/stay`
const reserveServices = {
    getSpecificStayByDni: async(dni: string) => {
        try {
            const response = await axios.get(`${BASE_PATH_STAY}/visitor/${dni}`, { headers: localStorageUtils.getDefaultHeaders()});
            return response
            
          } catch (error: any) {
            console.error(error);
            return error.response
        }
    },

    getActiveReserves: async () => {
        try {
            const response = await axios.get(`${BASE_PATH_STAY}/active`, { headers: localStorageUtils.getDefaultHeaders()});
            return response.data
            
          } catch (error) {
            console.error(error)
            return []
        } 
    },

    postReserve: async(body: any) => {
        try {
            const response = await axios.post(`${BASE_PATH_STAY}/`, body, { headers: localStorageUtils.getDefaultHeaders()});
            return response

          } catch (error: any) {
            console.error(error);
            return error.response
        } 
    },

    deleteReserve: async(idReserve: string) => {
        try {
            await axios.delete(
                `${BASE_PATH_STAY}/`,
                {
                    headers: localStorageUtils.getDefaultHeaders(),
                    data: { ids: [idReserve] }
                }
            );

          } catch (error) {
            console.error(error);
        } 
    }
}

export default reserveServices;