import { Text, View, TouchableOpacity, Alert } from 'react-native'
import { jwtManager } from '../../configs/configJwt';
import { useDispatch, useSelector } from 'react-redux';
import { clearUser, selectUser } from '../../redux/userReducer/userSlice';
import { useEffect } from 'react';
import { navigate } from '../../configs/RootNavigation';

export default function HomeScreen() {
    const dispatch = useDispatch();
    const getUser = useSelector(selectUser);
    const handleLogout = async () => {
        (await jwtManager).clear();
        navigate('Login')
        Alert.alert("Logout Successful")
    }

    useEffect(() => {
    }, [])

    return (
        <View
            style={{
                flex: 1
            }}
        >
            <Text>
                Welcome to Home page
            </Text>
            <TouchableOpacity
                style={{
                    backgroundColor: 'red'
                }}
                onPress={handleLogout}>
                <Text>
                    Logout
                </Text>
            </TouchableOpacity>
        </View>
    )
}