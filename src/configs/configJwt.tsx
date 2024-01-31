import AsyncStorage from '@react-native-async-storage/async-storage';

async function jwtConfig() {
    let jwtToken = await AsyncStorage.getItem('token');
    const get = () => jwtToken;
    const set = async (token: string) => {
        jwtToken = token;
        await AsyncStorage.setItem('token', token);
        return true;
    }
    const clear = async () => {
        jwtToken = null;
        await AsyncStorage.removeItem('token');
        return true;
    }
    return { set, get, clear }
}

export const jwtManager = jwtConfig();