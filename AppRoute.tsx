import accountService from './src/services/accounts/account.service';
import { useEffect, useState } from 'react';
import { Alert, Text, TouchableOpacity, View } from 'react-native'
import { useSelector, useDispatch } from 'react-redux';
import { clearUser, selectUser, setUser } from './src/redux/userReducer/userSlice';
import { jwtManager } from './src/configs/configJwt';
import userService from './src/services/users/user.service';
import Tabs from './src/resources/navigation/Tab';

export default function AppRoute() {
    const [isAuth, setIsAuth] = useState(useSelector(selectUser));
    const dispatch = useDispatch();
    useEffect(() => {
        let promise = new Promise(async function token() {
            return (await jwtManager).get();
        })
        console.log(promise)
        if (isAuth.isLogin) {
            userService.getProfile()
                .then((res: any) => {
                    const info = res.data
                    dispatch(setUser({
                        info: {
                            id: info.id,
                            fullName: info.firstName + ' ' + info.lastName,
                            address: info.address,
                            role: info.role,
                            email: info.email,
                            isLogin: true
                        }
                    }))
                })
                .catch((error: any) => {
                    dispatch(clearUser())
                    Alert.alert(error.response?.data.message)
                })
        }
    }, [isAuth])

    const handleLogin = () => {
        accountService.login({ email: 'locnguyentan1230@gmail.com', password: '123456789Loc' })
            .then(async (res: any) => {
                await (await jwtManager).set(res.data.access_token)
                setIsAuth({ ...isAuth, isLogin: true })
                Alert.alert("Login successfull!")
            })
            .catch((error: any) => {
                Alert.alert(error.response?.data.message)
            })
    }
    return (
        <View>
            {
                isAuth.isLogin ?
                    <Tabs />
                    :
                    <>
                        <Text>
                            Login to continute ...
                        </Text>
                        <TouchableOpacity
                            onPress={handleLogin}
                        >
                            <Text
                                style={{
                                    backgroundColor: 'red'
                                }}
                            >
                                Click
                            </Text>
                        </TouchableOpacity>
                    </>
            }
        </View>
    )
}