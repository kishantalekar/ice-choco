// import { NavigationContainer } from "@react-navigation/native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import RegisterScreen from "../Screens/RegisterScreen";
// import LoginScreen from "../Screens/LoginScreen";
// import HomeScreen from "../Screens/HomeScreen";
// import IceCreamListScreen from "../Screens/IceCreamListScreen";
// import IceCreamDetailsScreen from "../Screens/IceCreamDetailsScreen";

// const Stack = createNativeStackNavigator();
// const Navigation = () => {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator screenOptions={{ headerShown: false }}>
//         <Stack.Screen name="Home" component={HomeScreen} />
//         <Stack.Screen name="Login" component={LoginScreen} />
//         <Stack.Screen name="Register" component={RegisterScreen} />
//         <Stack.Screen name="IceCreamList" component={IceCreamListScreen} />
//         <Stack.Screen
//           name="IceCreamDetails"
//           component={IceCreamDetailsScreen}
//         />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// };
// export default Navigation;
import React from "react";
import { NavigationContainer, useRoute } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import RegisterScreen from "../Screens/RegisterScreen";
import LoginScreen from "../Screens/LoginScreen";
import HomeScreen from "../Screens/HomeScreen";
import IceCreamListScreen from "../Screens/IceCreamListScreen";
import IceCreamDetailsScreen from "../Screens/IceCreamDetailsScreen";
import CartScreen from "../Screens/CartScreen";
import ProfileScreen from "../Screens/ProfileScreen";
import { color } from "../styles/colors";
import OrderScreen from "../Screens/OrderScreen";
import FavouriteScreen from "../Screens/FavouriteScreen";
import AboutScreen from "../Screens/AboutScreen";
import FeedbackScreen from "../Screens/FeedbackScreen";
import LocationScreen from "../Screens/LocationScreen";
import AdminScreen from "../Screens/AdminScreen";
import AdminFeedbackScreen from "../Screens/AdminFeedbackScreen";
import WaitingScreen from "../Screens/WaitingScreen";
import EditProfileScreen from "../Screens/EditProfileScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Cart") {
            iconName = focused ? "cart" : "cart-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline";
          }

          // You can return any icon component here
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: color.pink,
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="Waiting"
          component={WaitingScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Cart"
          component={CartScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="MainTab"
          component={MainTabNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="IceCreamList" component={IceCreamListScreen} />
        <Stack.Screen
          name="IceCreamDetails"
          component={IceCreamDetailsScreen}
        />
        <Stack.Screen name="OrderScreen" component={OrderScreen} />
        <Stack.Screen name="FavouriteScreen" component={FavouriteScreen} />
        <Stack.Screen name="AboutScreen" component={AboutScreen} />
        <Stack.Screen name="FeedbackScreen" component={FeedbackScreen} />
        <Stack.Screen name="LocationScreen" component={LocationScreen} />
        <Stack.Screen name="AdminScreen" component={AdminScreen} />
        <Stack.Screen
          name="AdminFeedbackScreen"
          component={AdminFeedbackScreen}
        />
        <Stack.Screen name="EditProfileScreen" component={EditProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
