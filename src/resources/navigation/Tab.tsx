import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import { navigationRef } from '../../configs/RootNavigation'
import { HomeScreen, LoginScreen } from '../screens'

const Tab = createBottomTabNavigator()
export default function Tabs() {
    return (
        <>
            <NavigationContainer ref={navigationRef}>
                <Tab.Navigator
                    screenOptions={{
                        headerShown: false,
                        tabBarStyle: {
                            height: 65,
                            position: 'relative',
                        },
                    }}>
                    <Tab.Screen
                        name='Home'
                        component={HomeScreen}
                        options={{

                        }}
                    />
                    <Tab.Screen
                        name='Login'
                        component={LoginScreen}
                        options={{
                            tabBarButton: () => null,
                        }}
                    />
                </Tab.Navigator>

            </NavigationContainer>
        </>
    )
}