import styles from "../styles";
import { View, Text, TextInput, Button } from "react-native";

import React, { useState } from "react";

import { useNavigation } from "@react-navigation/native";

import { useAuth } from "../context/AuthContext";

export default function SignIn() {
  const { signIn } = useAuth();

  const navigation = useNavigation();

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
