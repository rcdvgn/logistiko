import styles from "../styles";
import { View, Text, TextInput, Button, Pressable } from "react-native";

import { useAuth } from "../context/AuthContext";

import { auth } from "../config/firebaseConfig";

export default function Profile() {
  const { logOut } = useAuth();
  return (
    <View style={styles.container}>
      <Text>This is profile!</Text>
      <Button title="Logout" onPress={() => logOut(auth)} />
    </View>
  );
}
