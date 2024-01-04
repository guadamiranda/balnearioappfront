interface IuserData {
    access_token: string
    firstName: string
    lastName: string
    workshiftId: string
    isAdmin: boolean
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
        isAdmin: false
    }
}

export default {
    getUserData: getToken,
    isUserAdmin: () => {
        const userData = getToken()
        return userData.isAdmin
    },
    getDefaultHeaders: () => {
        const userData = getToken()
        return {
            'Authorization': `bearer ${userData.access_token}`
        }
    }
}