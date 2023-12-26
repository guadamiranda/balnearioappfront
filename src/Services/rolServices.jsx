import axios from 'axios';

const getDefaultsHeaders = () => {
    const userData = JSON.parse(localStorage.getItem('userData'))
    return {'x-role-id': userData.roleId}
}
const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
const BASE_PATH_ROL = `${backendUrl}balneario/api/role`
const rolServices = {
    getRols: async() => {
        try {
            const response = await axios.get(`${BASE_PATH_ROL}/`, { headers: getDefaultsHeaders()});
            return response.data
            
          } catch (error) {
            console.error(error);
        } 
    },

    /*postRol: async(body) => {
        try {
            await axios.post(`${backendUrl}balneario/api/user/role`, body, { headers: getDefaultsHeaders()});

          } catch (error) {
            console.error(error);
        } 
    },

    deleteRol: async(idRol) => {
        try {
            await axios.delete(`${backendUrl}balneario/api/user/role/${idRol}`, { headers: getDefaultsHeaders()});

          } catch (error) {
            console.error(error);
        } 
    },

    editRol: async(idRol, body) => {
        try {
            await axios.put(`${backendUrl}balneario/api/user/role/${idRol}`, body, { headers: getDefaultsHeaders()});

          } catch (error) {
            console.error(error);
        } 
    }*/
}

export default rolServices;