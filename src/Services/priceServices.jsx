import axios from 'axios';

const priceServices = {
    getPrices: async() => {
        try {
            const response = await axios.get('http://localhost:3001/balneario/api/reserve/price');
            return response.data
          } catch (error) {
            console.error(error);
        } 
    },

    postPrice: async(body) => {
        try {
            const result = await axios.post('http://localhost:3001/balneario/api/reserve/price', body);
            console.log(result)

          } catch (error) {
            console.error(error);
        } 
    },

    deletePrice: async(idPrice) => {
        try {
            await axios.delete(`http://localhost:3001/balneario/api/reserve/price/${idPrice}`);

          } catch (error) {
            console.error(error);
        } 
    },

    editPrice: async(idPrice, body) => {
        try {
            await axios.put(`http://localhost:3001/balneario/api/reserve/price/${idPrice}`, body);

          } catch (error) {
            console.error(error);
        } 
    }
}

export default priceServices;