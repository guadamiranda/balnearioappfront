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

    //Estos endpoints no existen en el back aun
    postDiscount: async(body: any) => {
        try {
            await axios.post(`${backendUrl}balneario/api/reserve/discount`, body, { headers: localStorageUtils.getDefaultHeaders()});

          } catch (error) {
            console.error(error);
        } 
    },

    deleteDiscount: async(idDiscount: string) => {
        try {
            await axios.delete(`${backendUrl}balneario/api/reserve/discount/${idDiscount}`, { headers: localStorageUtils.getDefaultHeaders()});

          } catch (error) {
            console.error(error);
        } 
    },

    editDiscount: async(idDiscount:string, body:any) => {
        try {
            await axios.put(`${backendUrl}balneario/api/reserve/discount/${idDiscount}`, body, { headers: localStorageUtils.getDefaultHeaders()});

          } catch (error) {
            console.error(error);
        } 
    }
}

export default discountServices;