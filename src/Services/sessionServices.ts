import localStorageUtils from "../utils/localStorageUtils"

export default {
    isAdmin: () => {
        const userData = localStorageUtils.getUserData()
        return userData.isAdmin
    }
}