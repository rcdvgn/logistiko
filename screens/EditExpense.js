import styles from "../styles";

import { View, Text, TextInput, Button } from "react-native";

import { useNavigation, useRoute } from "@react-navigation/native";

export default function EditExpense() {
  const route = useRoute();
  const expenseId = route.params?.expenseId;

  return (
    <View style={styles.container}>
      <Text>Uid: {expenseId}</Text>
    </View>
  );
}
