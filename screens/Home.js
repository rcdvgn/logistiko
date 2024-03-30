import styles from "../styles";
import {
  View,
  Text,
  TextInput,
  FlatList,
  Button,
  Pressable,
} from "react-native";

import { useNavigation } from "@react-navigation/native";

import { useAuth } from "../context/AuthContext";

export default function Home() {
  const { user } = useAuth();

  const navigation = useNavigation();

  const Item = ({ amount, description, uid }) => {
    return (
      <Pressable
        style={styles.expense}
        onPress={() => navigation.navigate("Edit Expense", { expenseId: uid })}
      >
        <Text>{description}</Text>
        <Text>{amount}</Text>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Procurar gasto"
        // value={email}
        // onChangeText={setEmail}
        // keyboardType="email-address"
        // autoCapitalize="none"
        // autoCompleteType="email"
      />
      <Button
        title="Adicionar gasto"
        onPress={() => navigation.navigate("Add Expense")}
      />
      <FlatList
        style={styles.expensesList}
        data={user.data?.expenses.slice().reverse()}
        renderItem={({ item }) => (
          <Item
            amount={item.amount}
            description={item.description}
            uid={item.uid}
          />
        )}
        keyExtractor={(item) => item.uid}
      />
    </View>
  );
}
