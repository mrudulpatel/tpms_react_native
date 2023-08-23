import "react-native-gesture-handler";
import { registerRootComponent } from "expo";
import React from "react";
import {
  DrawerContentScrollView,
  DrawerItemList,
  createDrawerNavigator,
} from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";

// SCREENS
import Home from "./components/screens/Home";
import Dashboard from "./components/screens/Dashboard";
import Profile from "./components/screens/Profile";
import ResetPassword from "./components/screens/ResetPassword";
import Logout from "./components/screens/Logout";
import { StatusBar } from "react-native";

const App = () => {
  const Drawer = createDrawerNavigator();
  return (
    <NavigationContainer>
      <StatusBar backgroundColor="#4A5568" />
      <Drawer.Navigator
        screenOptions={{
          drawerStyle: {
            backgroundColor: "#111827",
            width: 240,
          },
          drawerActiveBackgroundColor: "#1F2937",
          drawerActiveTintColor: "#fff",
          drawerInactiveTintColor: "#ccc",
          swipeEnabled: true,
        }}
        drawerContent={(props) => {
          const filteredProps = {
            ...props,
            state: {
              ...props.state,
              routeNames: props.state.routeNames.filter((routeName) => {
                routeName !== "Home";
              }),
            },
          };
          return (
            <DrawerContentScrollView {...filteredProps}>
              <DrawerItemList {...filteredProps} />
            </DrawerContentScrollView>
          );
        }}
      >
        <Drawer.Screen
          name="Dashboard"
          component={Dashboard}
          options={{
            headerShown: true,
            headerStyle: { backgroundColor: "#111827" },
            headerTintColor: "#fff",
            drawerActiveBackgroundColor: "#1F2937",
            headerTitleStyle: { fontWeight: "bold" },
            headerTitle: "MSEDCL T&P Manager",
          }}
        />
        <Drawer.Screen
          name="Home"
          component={Home}
          options={{ drawerItemStyle: { display: "none" } }}
        />
        <Drawer.Screen
          name="Profile"
          component={Profile}
          options={{
            headerShown: true,
            headerStyle: { backgroundColor: "#111827" },
            headerTintColor: "#fff",
            drawerActiveBackgroundColor: "#1F2937",
            headerTitleStyle: { fontWeight: "bold" },
            headerTitle: "Profile",
          }}
        />
        <Drawer.Screen
          name="Reset Password"
          component={ResetPassword}
          options={{
            drawerItemStyle: { display: "none" },
            headerShown: true,
            headerStyle: { backgroundColor: "#111827" },
            headerTintColor: "#fff",
            drawerActiveBackgroundColor: "#1F2937",
            headerTitleStyle: { fontWeight: "bold" },
            headerTitle: "Reset Password",
          }}
        />
        <Drawer.Screen
          name="Logout"
          component={Logout}
          options={{
            headerShown: true,
            headerStyle: { backgroundColor: "#111827" },
            headerTintColor: "#fff",
            drawerActiveBackgroundColor: "#1F2937",
            headerTitleStyle: { fontWeight: "bold" },
            headerTitle: "Logout",
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default App;
registerRootComponent(App);
