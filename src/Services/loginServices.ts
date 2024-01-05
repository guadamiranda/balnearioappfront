import localStorageUtils from "../utils/localStorageUtils";
import axios from "axios";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
const BASE_PATH_AUTH = `${backendUrl}balneario/api/auth`
export default {
    authUser: async (dni: string, password: string) => {
        try {
            const response = await axios.post(`${BASE_PATH_AUTH}/login`, { dni, password });
            return response
        } catch (error: any) {
            return error.response
        }
    },

    validateToken: async() => {
        try {
            const response = await axios.get(`${BASE_PATH_AUTH}/validate`, { headers: localStorageUtils.getDefaultHeaders()});
            return response.data
            
          } catch (error) {
            console.error(error);
        }
    }
}