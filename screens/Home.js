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

import { doc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebaseConfig";

export default function Home() {
  const { user } = useAuth();

  const [qry, setQry] = useState("");

  const navigation = useNavigation();

  const deleteExpense = async (uid) => {
    let updatedExpenses = [...user.data.expenses];

    updatedExpenses = updatedExpenses.filter((expense) => expense.uid !== uid);

    await updateDoc(doc(db, "users", user.uid), {
      expenses: updatedExpenses,
    });
  };

  const Item = ({ amount, description, category, uid }) => {
    return (
      <View style={styles.expense}>
        <View>
          <Text>{description}</Text>
          <Text>{category}</Text>
          <Text>{amount}</Text>
        </View>
        <View>
          <Button
            title="Editar"
            onPress={() =>
              navigation.navigate("Edit Expense", { expenseId: uid })
            }
          />
          <Button title="Excluir" onPress={() => deleteExpense(uid)} />
        </View>
      </View>
    );
  };

  const filter = (expenses) => {
    if (expenses) {
      let filteredExpenses = [...expenses];

      return filteredExpenses.filter(
        (expense) =>
          expense.description.toLowerCase().includes(qry.toLowerCase()) ||
          expense.category.toLowerCase().includes(qry.toLowerCase())
      );
    } else {
      return [];
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Procurar gasto"
        value={qry}
        onChangeText={setQry}
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
