export default {
    isAdmin: () => {
        const userDataString = localStorage.getItem('userData')
        if(userDataString) { 
            const userData = JSON.parse(userDataString)
            return userData.roleName == 'Administrador'
        }
        return false;
    }
}