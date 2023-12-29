import axios from "axios";
import localStorageUtils from '../utils/localStorageUtils';

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
const BASE_PATH_WORKSHIFT = `${backendUrl}balneario/api/workshift`
export default {
    finish: async (observations: string) => {
        try {
            const response = await axios.put(
                `${BASE_PATH_WORKSHIFT}/finish`, 
                {observations}, 
                {headers: localStorageUtils.getDefaultHeaders()}
            );
            return response
        } catch (error:any) {
            return error.response
        }
    }
}