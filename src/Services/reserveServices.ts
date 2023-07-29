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
const reserveServices = {
    getSpecificReserve: async(dni: string, carPlate:string) => {
        console.log('aqui')
        try {
            const response = await axios.get(`http://localhost:3001/balneario/api/reserve?dni=${dni}&carPlate=${carPlate}`, { headers: getDefaultsHeaders()});
            return response
            
          } catch (error: any) {
            console.error(error);
            return error.response
        }
    },

    /*getReserves: async() => {
        try {
            const response = await axios.get('http://localhost:3001/balneario/api/reserve', { headers: getDefaultsHeaders()});
            return response.data
            
          } catch (error) {
            console.error(error);
        } 
    },

    getActiveReserves: async() => {
        try {
            const response = await axios.get('http://localhost:3001/balneario/api/reserve/actives', { headers: getDefaultsHeaders()});
            return response.data
            
          } catch (error) {
            console.error(error);
        } 
    },

    postReserve: async(body) => {
        try {
            const response = await axios.post('http://localhost:3001/balneario/api/reserve', body, { headers: getDefaultsHeaders()});
            return response

          } catch (error) {
            console.error(error);
        } 
    },

    deleteReserve: async(idReserve) => {
        try {
            await axios.delete(`http://localhost:3001/balneario/api/reserve/${idReserve}`, { headers: getDefaultsHeaders()});

          } catch (error) {
            console.error(error);
        } 
    },

    editReserve: async(idReserve, body) => {
        try {
            await axios.put(`http://localhost:3001/balneario/api/reserve/${idReserve}`, body, { headers: getDefaultsHeaders()});

          } catch (error) {
            console.error(error);
        } 
    }*/
}

export default reserveServices;