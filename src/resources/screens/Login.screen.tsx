import { useState } from "react";
import { jwtManager } from "../../configs/configJwt";
import { LoginDto } from "../../globals/dtos/user-login.dto";
import accountService from "../../services/accounts/account.service";
import * as RootNavigation from '../../configs/RootNavigation';
import { View, TextInput, Text, Alert, TouchableOpacity } from "react-native";

export default function LoginScreen() {
    const [data, setData] = useState<LoginDto>({ email: null, password: null })
    const [isHidden, setIsHidden] = useState<boolean>(true);
    const handleLogin = () => {
        if (data.email !== null && data.password !== null) {
            accountService.login({ email: data.email, password: data.password })
                .then(async (res: any) => {
                    await (await jwtManager).set(res.data.access_token);
                    setData({ ...data, password: null })
                    Alert.alert("Login successfull!")
                    RootNavigation.navigate('Home', {}) 
                })
                .catch((error: any) => {
                    console.log(error)
                    Alert.alert(error.response?.data.message)
                })
        } else {
            Alert.alert('Email or password is empty!')
        }
    }
    return (
        <View>
            <View>
                <Text>Email</Text>
                <TextInput
                    onChangeText={(e: string) => {
                        setData({ ...data, email: e.replace(/\s/g, '') })
                    }}
                    value={data.email}
                    placeholder="example@gmail.com"
                />
            </View>
            <View>
                <Text>Password</Text>
                <TextInput
                    onChangeText={(e: string) => {
                        setData({ ...data, password: e.replace(/\s/g, '') })
                    }}
                    secureTextEntry={isHidden}
                    value={data.password}
                    placeholder="Your password ..."
                />
                <TouchableOpacity onPress={() => setIsHidden(!isHidden)} >
                    <Text
                        style={{ backgroundColor: 'blue' }}
                    >
                        Hide
                    </Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity
                style={{
                    backgroundColor: 'red'
                }}
                onPress={handleLogin} >
                <Text>
                    Login
                </Text>
            </TouchableOpacity>
        </View>
    )
}