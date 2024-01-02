import localStorageUtils from '@/utils/localStorageUtils';
import axios from 'axios';

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
const BASE_PATH_PRICE = `${backendUrl}balneario/api/price`;
const priceServices = {

    getPrices: async() => {
        try {
            const response = await axios.get(`${BASE_PATH_PRICE}/`, { headers: localStorageUtils.getDefaultsHeaders() });
            return response.data
          } catch (error) {
            console.error(error);
        } 
    },

    //Estos endpoints no existen en el back aun
    postPrice: async(body) => {
        try {
            const result = await axios.post(`${backendUrl}balneario/api/reserve/price`, body, { headers: getDefaultsHeaders()});
            console.log(result)

          } catch (error) {
            console.error(error);
        } 
    },

    deletePrice: async(idPrice) => {
        try {
            await axios.delete(`${backendUrl}balneario/api/reserve/price/${idPrice}`, { headers: getDefaultsHeaders()});

          } catch (error) {
            console.error(error);
        } 
    },

    editPrice: async(idPrice, body) => {
        try {
            await axios.put(`${backendUrl}balneario/api/reserve/price/${idPrice}`, body, { headers: getDefaultsHeaders()});

          } catch (error) {
            console.error(error);
        } 
    }
}

export default priceServices;