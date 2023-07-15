import axios from 'axios';

const priceServices = {
    getPrices: async() => {
        try {
            const response = await axios.get('http://localhost:3001/balneario/api/reserve/price');
            console.log(response.data)
            return response.data
          } catch (error) {
            console.error(error);
        } 
    },

    postPrice: async(body) => {
        try {
            await axios.post('http://localhost:3001/balneario/api/reserve/price', body);

          } catch (error) {
            console.error(error);
        } 
    }
}

export default priceServices;