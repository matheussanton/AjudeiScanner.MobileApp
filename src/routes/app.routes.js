import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Scanner from '../pages/Scanner/Index';
import Home from '../pages/Home/Index';
import SignIn from '../pages/SignIn/Index';
import Configuration from '../pages/Configuration/Index';
import { useContext } from 'react'

import Ionicons from '@expo/vector-icons/Ionicons';

import { UserContext } from '../contexts/user'

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function AppRoutes() {

    var { isAuthenticated } = useContext(UserContext);

    return (
        isAuthenticated ?
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;

                        if (route.name === 'Home') {
                            iconName = focused
                                ? 'ios-home'
                                : 'ios-home-outline';
                        } else if (route.name === 'Configurações') {
                            iconName = focused ? 'ios-settings' : 'ios-settings-outline';
                        } else if (route.name === 'Scanner') {
                            iconName = focused ? 'ios-scan' : 'ios-scan-outline';
                        }

                        // You can return any component that you like here!
                        return <Ionicons name={iconName} size={size} color={color} />;
                    },
                    tabBarActiveTintColor: '#515BBA',
                    tabBarInactiveTintColor: 'gray',
                })}
            >
                <Tab.Screen name="Home" component={Home} options={{ headerShown: false }} />
                <Tab.Screen name="Scanner" component={Scanner} options={{ headerShown: false }} />
                <Tab.Screen name="Configurações" component={Configuration} options={{ headerShown: false }} />
                {/* <Tab.Screen name="Scanner" component={SettingsScreen} />
            <Tab.Screen name="Settings" component={SettingsScreen} /> */}
            </Tab.Navigator>

            :

            <Stack.Navigator>
                <Stack.Screen
                    name="SignIn"
                    component={SignIn}
                    options={{ headerShown: false }}
                />
            </Stack.Navigator>
    );
}


export default AppRoutes;
