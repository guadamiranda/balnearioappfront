interface IuserData {
    access_token: string
    firstName: string
    lastName: string
    workshiftId: string
}

const getToken = () => {
    const userData = localStorage.getItem('userData')
    
    if(userData) {
        const parsedData:IuserData = JSON.parse(userData)
        return parsedData
    }

    return {
        access_token: '',
        firstName: '',
        lastName: '',
        roleId: '',
        roleName: '',
    }
}

export default {
    getUserData: getToken,
    getDefaultHeaders: () => {
        const userData = getToken()
        return {
            'Authorization': `bearer ${userData.access_token}`
        }
    }
}