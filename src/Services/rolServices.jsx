import axios from 'axios';

const getDefaultsHeaders = () => {
    const userData = JSON.parse(localStorage.getItem('userData'))
    return {'x-role-id': userData.roleId}
}

const mockedRole = [
    {
        name: "Administrador",
        privileges: null,
        id: "eb2c431f-ce15-4770-af81-09c2a1c41fa2"
    },
    {
        name: "Empleado",
        privileges: null,
        id: "a40f006f-6a8f-4808-aa80-08f9555e71cd"
    }
]

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
const BASE_PATH_ROL = `${backendUrl}balneario/api/role`
const rolServices = {
    getRols: async() => {
        try {
            /*const response = await axios.get(`${BASE_PATH_ROL}/`, { headers: getDefaultsHeaders()});
            return response.data*/
            return mockedRole
            
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