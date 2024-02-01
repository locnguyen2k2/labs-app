import axios from "axios"
import { LoginDto } from "./dtos/login.dto"

const logout = () => {

}

const register = () => {

}

const login = async (LoginDto: { email: string, password: string }) => {
    const data = { email: LoginDto.email, password: LoginDto.password };
    return await axios.post('auths/login', data)
}

const checkLogin = async () => {
    return await axios.get('auths/info')
}

export default {
    login,
    register,
    logout,
    checkLogin
}