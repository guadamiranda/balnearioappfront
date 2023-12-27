import axios from "axios";
import localStorageUtils from '../utils/localStorageUtils';

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
export default {

    finish: async (observations: string) => {
        try {
            const response = await axios.put(
                `${backendUrl}balneario/api/workshift/finish`, 
                {observations}, 
                {headers: localStorageUtils.getDefaultHeaders()}
            );
            return response
        } catch (error:any) {
            return error.response
        }
    }
}