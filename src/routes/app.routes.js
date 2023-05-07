import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Scanner from '../pages/Scanner/Index';
import Home from '../pages/Home/Index';

import Ionicons from '@expo/vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

function AppRoutes() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Home') {
                        iconName = focused
                            ? 'ios-home'
                            : 'ios-home-outline';
                    } else if (route.name === 'Settings') {
                        iconName = focused ? 'ios-settings' : 'ios-settings-outline';
                    } else if (route.name === 'Scanner') {
                        iconName = focused ? 'ios-scan' : 'ios-scan-outline';
                    }

                    // You can return any component that you like here!
                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: 'tomato',
                tabBarInactiveTintColor: 'gray',
            })}
        >
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Scanner" component={Scanner} />
            <Tab.Screen name="Settings" component={Scanner} />
            {/* <Tab.Screen name="Scanner" component={SettingsScreen} />
            <Tab.Screen name="Settings" component={SettingsScreen} /> */}
        </Tab.Navigator>
    );
}


export default AppRoutes;
