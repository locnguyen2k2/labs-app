import axios from "axios"

const getProfile = async () => {
    return await axios.get('auths/info')
}

export default {
    getProfile
}