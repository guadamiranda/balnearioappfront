import axios from 'axios';
const getDefaultsHeaders = () => {
    const userData = JSON.parse(localStorage.getItem('userData'))
    return {'x-role-id': userData.roleId}
}

const mockedEmployees = [
    {
        dni: "11222333",
        firstName: "Roberto",
        lastName: "Casillas",
        email: "roberto@hotmail.com",
        password: "roberto",
        roleId: "a40f006f-6a8f-4808-aa80-08f9555e71cd",
        isDismissal: false
    },
    {
        dni: "33444555",
        firstName: "Guadalupe",
        lastName: "Miranda",
        email: "guadalupe@hotmail.com",
        password: "guadalupe",
        roleId: "eb2c431f-ce15-4770-af81-09c2a1c41fa2",
        isDismissal: false
    },
    {
        dni: "33222111",
        firstName: "German",
        lastName: "Carrizo",
        email: "german-admin@cecjm.com",
        password: "german2323",
        roleId: "eb2c431f-ce15-4770-af81-09c2a1c41fa2",
        isDismissal: false
    },
    {
        dni: "335",
        firstName: "Raul",
        lastName: "Monges",
        email: "raul-monges@cecjm.com",
        password: "raul2023",
        roleId: "a40f006f-6a8f-4808-aa80-08f9555e71cd",
        isDismissal: false
    },
    {
        dni: "332223",
        firstName: "Alejandro",
        lastName: "Moyano",
        email: "alejandro-moyano@cecjm.com",
        password: "alejandro2023",
        roleId: "a40f006f-6a8f-4808-aa80-08f9555e71cd",
        isDismissal: false
    },
    {
        dni: "312389",
        firstName: "Pipi",
        lastName: "Carruccio",
        email: "pipi-carruccio@cecjm.com",
        password: "pipi2023",
        roleId: "a40f006f-6a8f-4808-aa80-08f9555e71cd",
        isDismissal: false
    },
    {
        dni: "332225623",
        firstName: "Fabian",
        lastName: "Leal",
        email: "fabian-leal@cecjm.com",
        password: "fabi2023",
        roleId: "a40f006f-6a8f-4808-aa80-08f9555e71cd",
        isDismissal: false
    },
    {
        dni: "7894563",
        firstName: "Matias",
        lastName: "Mori",
        email: "matias-admin@gmail.com",
        password: "matias",
        roleId: "eb2c431f-ce15-4770-af81-09c2a1c41fa2",
        isDismissal: false
    },
    {
        dni: "33222",
        firstName: "Francisco",
        lastName: "Mori",
        email: "francisco-mori@cecjm.com",
        password: "fran2023",
        roleId: "a40f006f-6a8f-4808-aa80-08f9555e71cd",
        isDismissal: false
    },
]


const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
const BASE_PATH_EMPLOYEE = `${backendUrl}balneario/api/employee`
const employeeServices = {
    getEmployee: async() => {
        try {
            /*const response = await axios.get(`BASE_PATH_EMPLOYEE/`, { headers: getDefaultsHeaders()});
            return response.data
            */
           return mockedEmployees
            
          } catch (error) {
            console.error(error);
        } 
    },

    postEmployee: async(body) => {
        try {
            await axios.post(`BASE_PATH_EMPLOYEE/`, body, { headers: getDefaultsHeaders()});

          } catch (error) {
            console.error(error);
        } 
    },

    deleteEmployee: async(idEmployee) => {
        try {
            await axios.delete(`BASE_PATH_EMPLOYEE/${idEmployee}`, { headers: getDefaultsHeaders()});

          } catch (error) {
            console.error(error);
        } 
    },

    editEmployee: async(idEmployee, body) => {
        try {
            await axios.put(`BASE_PATH_EMPLOYEE/${idEmployee}`, body, { headers: getDefaultsHeaders()});

          } catch (error) {
            console.error(error);
        } 
    }
}

export default employeeServices;