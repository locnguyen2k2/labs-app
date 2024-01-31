import { Text, View, TouchableOpacity } from 'react-native'
import { jwtManager } from '../../configs/configJwt';
import { useDispatch, useSelector } from 'react-redux';
import { clearUser, selectUser } from '../../redux/userReducer/userSlice';
import { useEffect } from 'react';

export default function HomeScreen() {
    const dispatch = useDispatch();
    const getUser = useSelector(selectUser);
    const handleLogout = async () => {
        (await jwtManager).clear();
        dispatch(clearUser());
    }

    useEffect(() => {
        console.log(getUser)
    }, [getUser])

    return (
        <View>
            <Text>
                Welcome to Home page
            </Text>
            <TouchableOpacity onPress={handleLogout}>
                <Text>
                    Logout
                </Text>
            </TouchableOpacity>
        </View>
    )
}