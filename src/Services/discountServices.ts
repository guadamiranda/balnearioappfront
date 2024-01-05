import localStorageUtils from '../utils/localStorageUtils';
import axios from 'axios';

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
const BASE_PATH_DISCOUNT = `${backendUrl}balneario/api/discount`;
const discountServices = {
    getDiscounts: async(): Promise<IDiscount[]> => {
        try {
            const response = await axios.get(`${BASE_PATH_DISCOUNT}/`, { headers: localStorageUtils.getDefaultHeaders() });
            return response.data
            
          } catch (error) {
            console.error(error);
            return []
        } 
    },


    postDiscount: async(body: any) => {
        try {
            await axios.post(`${BASE_PATH_DISCOUNT}/`, body, { headers: localStorageUtils.getDefaultHeaders()});

          } catch (error) {
            console.error(error);
        } 
    },

    deleteDiscount: async(idDiscount: string) => {
        try {
            await axios.delete(`${BASE_PATH_DISCOUNT}/${idDiscount}`, { headers: localStorageUtils.getDefaultHeaders()});

          } catch (error) {
            console.error(error);
        } 
    },

    editDiscount: async(idDiscount:string, body:any) => {
        try {
            await axios.put(`${BASE_PATH_DISCOUNT}/${idDiscount}`, body, { headers: localStorageUtils.getDefaultHeaders()});

          } catch (error) {
            console.error(error);
        } 
    }
}

export default discountServices;