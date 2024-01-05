import localStorageUtils from '@/utils/localStorageUtils';
import axios from 'axios';

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
const BASE_PATH_PRICE = `${backendUrl}balneario/api/price`;
const priceServices = {

    getPrices: async() => {
        try {
            const response = await axios.get(`${BASE_PATH_PRICE}/`, { headers: localStorageUtils.getDefaultHeaders() });
            return response.data
          } catch (error) {
            console.error(error);
        }
    },

    //Estos endpoints no existen en el back aun
    postPrice: async(body: any) => {
        try {
            const result = await axios.post(`${backendUrl}balneario/api/reserve/price`, body, { headers: localStorageUtils.getDefaultHeaders() });
            console.log(result)

          } catch (error) {
            console.error(error);
        } 
    },

    deletePrice: async(idPrice: string) => {
        try {
            await axios.delete(`${backendUrl}balneario/api/reserve/price/${idPrice}`, { headers: localStorageUtils.getDefaultHeaders() });

          } catch (error) {
            console.error(error);
        }
    },

    editPrice: async(idPrice: string, body:any) => {
        try {
            await axios.put(`${BASE_PATH_PRICE}/${idPrice}`, body, { headers: localStorageUtils.getDefaultHeaders() });

          } catch (error) {
            console.error(error);
        } 
    }
}

export default priceServices;