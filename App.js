import "react-native-gesture-handler";

import styles from "./styles";

import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";

import Home from "./screens/Home";
import Profile from "./screens/Profile";
import AddExpense from "./screens/AddExpense";
import EditExpense from "./screens/EditExpense";
import SignUp from "./screens/SignUp";
import SignIn from "./screens/SignIn";

import { AuthProvider, useAuth } from "./context/AuthContext";

const Drawer = createDrawerNavigator();

function Root() {
  const { user } = useAuth();

  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        {user ? (
          <>
            <Drawer.Screen name="Home" component={Home} />
            <Drawer.Screen name="Profile" component={Profile} />
            <Drawer.Screen name="Add Expense" component={AddExpense} />
            <Drawer.Screen name="Edit Expense" component={EditExpense} />
          </>
        ) : (
          <>
            <Drawer.Screen name="SignIn" component={SignIn} />
            <Drawer.Screen name="SignUp" component={SignUp} />
          </>
        )}
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Root />
    </AuthProvider>
  );
}
