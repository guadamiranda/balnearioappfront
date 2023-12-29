import axios from "axios";

interface userData {
    firstName: string,
    lastName: string,
    roleId: string,
    roleName: string,
    workshiftId:string,
}

const getDefaultsHeaders = () => {
    const userDataString = localStorage.getItem('userData')
    const defaultsHeaders = {
        'x-role-id': ''
    }

    if(userDataString) { 
        const userData = JSON.parse(userDataString)
        defaultsHeaders['x-role-id'] = userData.roleId
    }
    return defaultsHeaders
}


const getUserData = (): userData | undefined=> {
    const userDataString = localStorage.getItem('userData')
    if(userDataString) { 
        return JSON.parse(userDataString)
    }
    console.log('ERROR EN LA OBTENCION DEL USERDATA')
}

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
export default {
    authUser: async (dni: string, password: string) => {
        try {
            const response = await axios.post(backendUrl + 'balneario/api/auth/login', {dni, password});
            return response
        } catch (error:any) {
            return error.response
        }
    },

    logOutUser: async (observations: string) => {
        try {
            const userData = getUserData();
            const response = await axios.put(`${backendUrl}balneario/api/user/workshifts/${userData?.workshiftId}/finish`, {observations}, { headers: getDefaultsHeaders()});
            return response
        } catch (error:any) {
            return error.response
        }
    }
}