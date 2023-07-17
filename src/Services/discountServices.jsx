import axios from 'axios';

const discountServices = {
    getDiscounts: async() => {
        try {
            const response = await axios.get('http://localhost:3001/balneario/api/reserve/discount');
            return response.data
            
          } catch (error) {
            console.error(error);
        } 
    },

    postDiscount: async(body) => {
        try {
            await axios.post('http://localhost:3001/balneario/api/reserve/discount', body);

          } catch (error) {
            console.error(error);
        } 
    },

    deleteDiscount: async(idDiscount) => {
        try {
            await axios.delete(`http://localhost:3001/balneario/api/reserve/discount/${idDiscount}`);

          } catch (error) {
            console.error(error);
        } 
    },

    editDiscount: async(idDiscount, body) => {
        try {
            await axios.put(`http://localhost:3001/balneario/api/reserve/discount/${idDiscount}`, body);

          } catch (error) {
            console.error(error);
        } 
    }
}

export default discountServices;