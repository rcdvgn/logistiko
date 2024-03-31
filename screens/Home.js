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

import React, { useState, useEffect } from "react";

export default function Home() {
  const { user } = useAuth();

  const [qry, setQry] = useState("");
  const [filters, setFilters] = useState({
    qry: qry,
  });

  const navigation = useNavigation();

  const Item = ({ amount, description, category, uid }) => {
    return (
      <Pressable
        style={styles.expense}
        onPress={() => navigation.navigate("Edit Expense", { expenseId: uid })}
      >
        <Text>{description}</Text>
        <Text>{category}</Text>
        <Text>{amount}</Text>
      </Pressable>
    );
  };

  const filter = (expenses) => {
    let filteredExpenses = [...expenses];

    return filteredExpenses.filter((expense) =>
      expense.description.toLowerCase().includes(qry.toLowerCase())
    );
  };

  // useEffect(() => {
  //   const expenses
  // }, [filters])

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Procurar gasto"
        value={qry}
        onChangeText={setQry}
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
        data={filter(user.data?.expenses).slice().reverse()}
        renderItem={({ item }) => (
          <Item
            amount={item.amount}
            description={item.description}
            category={item.category}
            uid={item.uid}
          />
        )}
        keyExtractor={(item) => item.uid}
      />
    </View>
  );
}
