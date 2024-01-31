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

const checkLogin = () => {

}

export default {
    login,
    register,
    logout,
    checkLogin
}