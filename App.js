import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { StatusBar } from "expo-status-bar";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { AuthProvider, useAuth } from "./context/AuthContext";

const Stack = createNativeStackNavigator();

function Home() {
  return (
    <View style={styles.container}>
      <Text>This is home!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

function SignUp({ navigation }) {
  const { signUp } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = () => {
    signUp(email, password);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCompleteType="email"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <View style={styles.authButtons}>
        <Button
          title="Ja possuo conta"
          onPress={() => navigation.navigate("SignIn")}
        />
        <Button title="Sign Up" onPress={handleSignUp} />
      </View>
    </View>
  );
}

function SignIn({ navigation }) {
  const { signIn } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = () => {
    signIn(email, password);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCompleteType="email"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <View style={styles.authButtons}>
        <Button
          title="Nao possuo conta"
          onPress={() => navigation.navigate("SignUp")}
        />
        <Button title="Sign In" onPress={handleSignIn} />
      </View>
    </View>
  );
}

function Root() {
  const { user } = useAuth();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        {user ? (
          <>
            <Stack.Screen name="Home" component={Home} />
          </>
        ) : (
          <>
            <Stack.Screen name="SignIn" component={SignIn} />
            <Stack.Screen name="SignUp" component={SignUp} />
          </>
        )}
      </Stack.Navigator>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  input: {
    height: 40,
    width: "100%",
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  authButtons: {
    display: "flex",
    gap: 5,
    flexDirection: "row",
  },
});
