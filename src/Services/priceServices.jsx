import axios from 'axios';

const getDefaultsHeaders = () => {
    const userData = JSON.parse(localStorage.getItem('userData'))
    return {'x-role-id': userData.roleId}
}

const priceServices = {

    getPrices: async() => {
        try {
            const response = await axios.get('http://localhost:3001/balneario/api/reserve/price', { headers: getDefaultsHeaders()});
            return response.data
          } catch (error) {
            console.error(error);
        } 
    },

    postPrice: async(body) => {
        try {
            const result = await axios.post('http://localhost:3001/balneario/api/reserve/price', body, { headers: getDefaultsHeaders()});
            console.log(result)

          } catch (error) {
            console.error(error);
        } 
    },

    deletePrice: async(idPrice) => {
        try {
            await axios.delete(`http://localhost:3001/balneario/api/reserve/price/${idPrice}`, { headers: getDefaultsHeaders()});

          } catch (error) {
            console.error(error);
        } 
    },

    editPrice: async(idPrice, body) => {
        try {
            await axios.put(`http://localhost:3001/balneario/api/reserve/price/${idPrice}`, body, { headers: getDefaultsHeaders()});

          } catch (error) {
            console.error(error);
        } 
    }
}

export default priceServices;