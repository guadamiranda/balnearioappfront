import axios from "axios";


export default {
    authUser: async (email: string, password: string) => {
        try {
            const response = await axios.post('http://localhost:3001/balneario/api/user/authenticate', {email, password});
            return response
        } catch (error:any) {
            return error.response
        }
    }
}