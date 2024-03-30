import styles from "../styles";
import { View, Text, TextInput, Button, Pressable } from "react-native";

import React, { useState } from "react";

import { useNavigation } from "@react-navigation/native";

import { useAuth } from "../context/AuthContext";

export default function SignUp() {
  const { signUp } = useAuth();

  const navigation = useNavigation();

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
