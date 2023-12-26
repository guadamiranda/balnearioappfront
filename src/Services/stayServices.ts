import axios from 'axios';

const getDefaultsHeaders = () => {
    const userDataString = localStorage.getItem('userData')
    const defaultsHeaders = {
        'x-role-id': ''
    }

    if(userDataString) { 
        const userData = JSON.parse(userDataString)
        defaultsHeaders['x-role-id'] = userData.roleId
    }
    return defaultsHeaders
}
const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
const BASE_PATH_STAY = `${backendUrl}balneario/api/stay`
const reserveServices = {
    getSpecificReserve: async(dni: string, carPlate:string, memberNumber: string) => {
        try {
            const response = await axios.get(`${BASE_PATH_STAY}?dni=${dni}&carplate=${carPlate}&membernumber=${memberNumber}`, { headers: getDefaultsHeaders()});
            return response
            
          } catch (error: any) {
            console.error(error);
            return error.response
        }
    },

    getActiveReserves: async() => {
        try {
            const response = await axios.get(`${BASE_PATH_STAY}/active`, { headers: getDefaultsHeaders()});
            return response.data
            
          } catch (error) {
            console.error(error);
        } 
    },

    postReserve: async(body: any) => {
        try {
            const response = await axios.post(`${BASE_PATH_STAY}/`, body, { headers: getDefaultsHeaders()});
            return response

          } catch (error) {
            console.error(error);
        } 
    },

    deleteReserve: async(idReserve: string) => {
        try {
            await axios.delete(`${BASE_PATH_STAY}/${idReserve}`, { headers: getDefaultsHeaders()});

          } catch (error) {
            console.error(error);
        } 
    }
}

export default reserveServices;