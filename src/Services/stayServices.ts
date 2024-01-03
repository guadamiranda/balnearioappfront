import localStorageUtils from '../utils/localStorageUtils';
import axios from 'axios';

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
const BASE_PATH_STAY = `${backendUrl}balneario/api/stay`
const reserveServices = {
    //Esta no esta aun en el back
    getSpecificReserve: async(dni: string, carPlate:string, memberNumber: string) => {
        try {
            const response = await axios.get(`${BASE_PATH_STAY}?dni=${dni}&carplate=${carPlate}&membernumber=${memberNumber}`, { headers: localStorageUtils.getDefaultHeaders()});
            return response
            
          } catch (error: any) {
            console.error(error);
            return error.response
        }
    },

    getActiveReserves: async(): Promise<IGeneralInfoStay[]> => {
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

          } catch (error) {
            console.error(error);
        } 
    },

    deleteReserve: async(idReserve: string) => {
        try {
            await axios.delete(`${BASE_PATH_STAY}/`, { headers: localStorageUtils.getDefaultHeaders()});

          } catch (error) {
            console.error(error);
        } 
    }
}

export default reserveServices;