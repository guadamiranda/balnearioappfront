import localStorageUtils from '@/utils/localStorageUtils';
import axios from 'axios';

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
const BASE_PATH_DISCOUNT = `${backendUrl}balneario/api/discount`;
const discountServices = {
    getDiscounts: async() => {
        try {
            const response = await axios.get(`${BASE_PATH_DISCOUNT}/`, { headers: localStorageUtils.getDefaultsHeaders() });
            return response.data
            
          } catch (error) {
            console.error(error);
        } 
    },

    //Estos endpoints no existen en el back aun
    postDiscount: async(body) => {
        try {
            await axios.post(`${backendUrl}balneario/api/reserve/discount`, body, { headers: getDefaultsHeaders()});

          } catch (error) {
            console.error(error);
        } 
    },

    deleteDiscount: async(idDiscount) => {
        try {
            await axios.delete(`${backendUrl}balneario/api/reserve/discount/${idDiscount}`, { headers: getDefaultsHeaders()});

          } catch (error) {
            console.error(error);
        } 
    },

    editDiscount: async(idDiscount, body) => {
        try {
            await axios.put(`${backendUrl}balneario/api/reserve/discount/${idDiscount}`, body, { headers: getDefaultsHeaders()});

          } catch (error) {
            console.error(error);
        } 
    }
}

export default discountServices;