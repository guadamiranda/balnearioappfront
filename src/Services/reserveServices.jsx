import axios from 'axios';

const getDefaultsHeaders = () => {
    const userData = JSON.parse(localStorage.getItem('userData'))
    return {'x-role-id': userData.roleId}
}

const reserveServices = {
    getReserves: async() => {
        try {
            const response = await axios.get('http://localhost:3001/balneario/api/reserve', { headers: getDefaultsHeaders()});
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
    }
}

export default reserveServices;