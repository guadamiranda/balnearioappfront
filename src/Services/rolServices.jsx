import axios from 'axios';

const rolServices = {
    getRols: async() => {
        try {
            const response = await axios.get('http://localhost:3001/balneario/api/user/role');
            return response.data
            
          } catch (error) {
            console.error(error);
        } 
    },

    postRol: async(body) => {
        try {
            await axios.post('http://localhost:3001/balneario/api/user/role', body);

          } catch (error) {
            console.error(error);
        } 
    },

    deleteRol: async(idRol) => {
        try {
            await axios.delete(`http://localhost:3001/balneario/api/user/role/${idRol}`);

          } catch (error) {
            console.error(error);
        } 
    },

    editRol: async(idRol, body) => {
        try {
            await axios.put(`http://localhost:3001/balneario/api/user/role/${idRol}`, body);

          } catch (error) {
            console.error(error);
        } 
    }
}

export default rolServices;