import React, { useState, useEffect } from "react";
import { AsyncStorage, StatusBar, UIManager } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import HomeScreen from "./containers/HomeScreen";
import ProfileScreen from "./containers/ProfileScreen";
import RoomScreen from "./containers/RoomScreen";
import SignInScreen from "./containers/SignInScreen";
import SignUpScreen from "./containers/SignUpScreen";
import SettingsScreen from "./containers/SettingsScreen";
import Around from "./containers/Around";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);

  const setToken = async (token) => {
    if (token) {
      AsyncStorage.setItem("userToken", token);
    } else {
      AsyncStorage.removeItem("userToken");
    }

    setUserToken(token);
  };

  useEffect(() => {
    if (Platform.OS === "android") {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }, []);

  useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      // We should also handle error for production apps
      const userToken = await AsyncStorage.getItem("userToken");

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      setIsLoading(false);
      setUserToken(userToken);
    };

    bootstrapAsync();
  }, []);

  return (
    // STACK NAVIGATOR AFFICHAGE SANS TOKEN ENREGISTRE

    <NavigationContainer>
      {isLoading ? null : userToken === null ? ( // We haven't finished checking for the token yet
        // No token found, user isn't signed in
        <Stack.Navigator initialRouteName="SignUp">
          <Stack.Screen
            name="SignIn"
            options={{ header: () => null, animationEnabled: false }}
          >
            {() => <SignInScreen setToken={setToken} />}
          </Stack.Screen>
          <Stack.Screen
            name="SignUp"
            options={{
              header: () => null,
              animationEnabled: false,
            }}
          >
            {() => <SignUpScreen setToken={setToken} />}
          </Stack.Screen>
        </Stack.Navigator>
      ) : (
        // STACK NAVIGATOR AFFICHAGE TOKEN ENREGISTRE
        // User is signed in

        // Option des reglages du header (haut de l appli) et tabbab (bas de l appli)
        <Tab.Navigator
          tabBarOptions={{
            style: {
              backgroundColor: "#f0475b",
              height: 80,
            },
            labelStyle: {
              fontSize: 14,
            },
            tabStyle: { height: 50, marginTop: 15 },
            activeTintColor: "black",
            inactiveTintColor: "white",
          }}
        >
          <Tab.Screen
            name="Home"
            options={{
              tabBarLabel: "Home",
              tabBarIcon: ({ color, size }) => (
                <AntDesign name={"home"} size={30} color={color} />
              ),
            }}
          >
            {() => (
              <Stack.Navigator>
                <Stack.Screen
                  name="Home"
                  options={{
                    title: "Mon AIRBNB",
                    headerStyle: { backgroundColor: "#f0475b", height: 70 },
                    headerTintColor: "white",
                    headerTitleAlign: "center",
                  }}
                >
                  {() => (
                    <>
                      <StatusBar
                        barStyle="light-content"
                        backgroundColor="#f0475b"
                      />
                      <HomeScreen />
                    </>
                  )}
                </Stack.Screen>

                <Stack.Screen
                  name="Room"
                  options={{
                    title: "Room",
                    headerStyle: { backgroundColor: "#f0475b", height: 70 },
                    headerTitleAlign: "center",
                    headerTintColor: "white",
                  }}
                >
                  {() => (
                    <>
                      <StatusBar
                        barStyle="light-content"
                        backgroundColor="#f0475b"
                      />
                      <RoomScreen />
                    </>
                  )}
                </Stack.Screen>
              </Stack.Navigator>
            )}
          </Tab.Screen>
          <Tab.Screen
            name="Around me"
            options={{
              tabBarLabel: "Around me",
              tabBarIcon: ({ color, size }) => (
                <AntDesign name={"enviromento"} size={30} color={color} />
              ),
            }}
          >
            {() => (
              <Stack.Navigator>
                <Stack.Screen
                  name="Around me"
                  options={{
                    title: "Around me",
                    headerStyle: { backgroundColor: "#f0475b", height: 70 },
                    headerTitleAlign: "center",
                    headerTintColor: "white",
                  }}
                >
                  {() => (
                    <>
                      <StatusBar
                        barStyle="light-content"
                        backgroundColor="#f0475b"
                      />
                      <Around />
                    </>
                  )}
                </Stack.Screen>
                <Stack.Screen
                  name="Room"
                  options={{
                    title: "Room",
                    headerStyle: { backgroundColor: "#f0475b", height: 70 },
                    headerTitleAlign: "center",
                    headerTintColor: "white",
                  }}
                >
                  {() => (
                    <>
                      <StatusBar
                        barStyle="light-content"
                        backgroundColor="#f0475b"
                      />
                      <RoomScreen />
                    </>
                  )}
                </Stack.Screen>
              </Stack.Navigator>
            )}
          </Tab.Screen>
          <Tab.Screen
            name="Profile"
            options={{
              tabBarLabel: "Profile",
              tabBarIcon: ({ color, size }) => (
                <AntDesign name={"user"} size={30} color={color} />
              ),
            }}
          >
            {() => (
              <Stack.Navigator>
                <Stack.Screen
                  name="Profile"
                  options={{
                    title: "User Profile",
                    headerStyle: { backgroundColor: "#f0475b", height: 70 },
                    headerTitleAlign: "center",
                    headerTintColor: "white",
                  }}
                >
                  {() => (
                    <>
                      <StatusBar
                        barStyle="light-content"
                        backgroundColor="#f0475b"
                      />
                      <ProfileScreen setToken={setToken} />
                    </>
                  )}
                </Stack.Screen>
              </Stack.Navigator>
            )}
          </Tab.Screen>
        </Tab.Navigator>
      )}
    </NavigationContainer>
  );
}
