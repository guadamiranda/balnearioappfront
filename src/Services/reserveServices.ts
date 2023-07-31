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
const reserveServices = {
    getSpecificReserve: async(dni: string, carPlate:string) => {
        console.log('aqui')
        try {
            const response = await axios.get(`${backendUrl}balneario/api/reserve?dni=${dni}&carPlate=${carPlate}`, { headers: getDefaultsHeaders()});
            return response
            
          } catch (error: any) {
            console.error(error);
            return error.response
        }
    },

    getActiveReserves: async() => {
        try {
            const response = await axios.get(`${backendUrl}balneario/api/reserve/actives`, { headers: getDefaultsHeaders()});
            return response.data
            
          } catch (error) {
            console.error(error);
        } 
    },

    postReserve: async(body: any) => {
        try {
            const response = await axios.post(`${backendUrl}balneario/api/reserve`, body, { headers: getDefaultsHeaders()});
            return response

          } catch (error) {
            console.error(error);
        } 
    },

    deleteReserve: async(idReserve: string) => {
        try {
            await axios.delete(`${backendUrl}balneario/api/reserve/${idReserve}`, { headers: getDefaultsHeaders()});

          } catch (error) {
            console.error(error);
        } 
    }
}

export default reserveServices;