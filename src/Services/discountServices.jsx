import axios from 'axios';
const getDefaultsHeaders = () => {
    const userData = JSON.parse(localStorage.getItem('userData'))
    return {'x-role-id': userData.roleId}
}

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
const discountServices = {
    getDiscounts: async() => {
        try {
            const response = await axios.get(`${backendUrl}balneario/api/reserve/discount`, { headers: getDefaultsHeaders()});
            return response.data
            
          } catch (error) {
            console.error(error);
        } 
    },

    postDiscount: async(body) => {
        try {
            await axios.post(`${backendUrl}balneario/api/reserve/discount`, body, { headers: getDefaultsHeaders()});

          } catch (error) {
            console.error(error);
        } 
    },

    deleteDiscount: async(idDiscount) => {
        try {
            await axios.delete(`${backendUrl}balneario/api/reserve/discount/${idDiscount}`, { headers: getDefaultsHeaders()});

          } catch (error) {
            console.error(error);
        } 
    },

    editDiscount: async(idDiscount, body) => {
        try {
            await axios.put(`${backendUrl}balneario/api/reserve/discount/${idDiscount}`, body, { headers: getDefaultsHeaders()});

          } catch (error) {
            console.error(error);
        } 
    }
}

export default discountServices;