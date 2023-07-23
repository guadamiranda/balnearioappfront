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


export default {
    authUser: async (email: string, password: string) => {
        try {
            const response = await axios.post('http://localhost:3001/balneario/api/user/authenticate', {email, password});
            return response
        } catch (error:any) {
            return error.response
        }
    },

    logOutUser: async (observations: string) => {
        try {
            const userData = getUserData();
            const response = await axios.put(`http://localhost:3001/balneario/api/user/workshifts/${userData?.workshiftId}/finish`, {observations}, { headers: getDefaultsHeaders()});
            return response
        } catch (error:any) {
            return error.response
        }
    }
}