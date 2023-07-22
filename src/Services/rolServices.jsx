import axios from 'axios';

const getDefaultsHeaders = () => {
    const userData = JSON.parse(localStorage.getItem('userData'))
    return {'x-role-id': userData.roleId}
}

const rolServices = {
    getRols: async() => {
        try {
            const response = await axios.get('http://localhost:3001/balneario/api/user/role', { headers: getDefaultsHeaders()});
            return response.data
            
          } catch (error) {
            console.error(error);
        } 
    },

    postRol: async(body) => {
        try {
            await axios.post('http://localhost:3001/balneario/api/user/role', body, { headers: getDefaultsHeaders()});

          } catch (error) {
            console.error(error);
        } 
    },

    deleteRol: async(idRol) => {
        try {
            await axios.delete(`http://localhost:3001/balneario/api/user/role/${idRol}`, { headers: getDefaultsHeaders()});

          } catch (error) {
            console.error(error);
        } 
    },

    editRol: async(idRol, body) => {
        try {
            await axios.put(`http://localhost:3001/balneario/api/user/role/${idRol}`, body, { headers: getDefaultsHeaders()});

          } catch (error) {
            console.error(error);
        } 
    }
}

export default rolServices;