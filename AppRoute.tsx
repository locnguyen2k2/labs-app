import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import Tabs from './src/resources/navigation/Tab';
import { jwtManager } from './src/configs/configJwt';
import { setUser } from './src/redux/userReducer/userSlice';
import { Alert, Text, TouchableOpacity, View } from 'react-native'
import accountService from './src/services/accounts/account.service';
import { LoginScreen } from './src/resources/screens';

export default function AppRoute() {
    const dispatch = useDispatch();
    const [isAuth, setIsAuth] = useState<boolean>(false);
    const [token, setToken] = useState<string | null>(null);
    const getToken = async () => setToken((await jwtManager).get());
    useEffect(() => {
        getToken();
        if (token) {
            accountService.checkLogin()
                .then((res: any) => {
                    dispatch(setUser({
                        info: {
                            id: res.data.id,
                            email: res.data.email,
                            fullName: res.data.firstName + ' ' + res.data.lastName,
                            role: res.data.role,
                            address: res.data.address,
                            isLogin: true,
                        }
                    }))
                    setIsAuth(true)
                })
                .catch(async (error: any) => {
                    (await jwtManager).clear();
                    Alert.alert(error.response.data.message);
                })
        }
    }, [token])
    return (
        <>
            {
                isAuth ? <Tabs /> : <LoginScreen />
            }
        </>
    )
}