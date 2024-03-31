import styles from "../styles";

import React, { useState, useEffect } from "react";

import { View, Text, TextInput, Button, Alert } from "react-native";

import { useAuth } from "../context/AuthContext";

import addCategory from "../utils/addCategory";
import checkExpense from "../utils/checkExpense";

import ExpenseForm from "../components/ExpenseForm";

import { doc, updateDoc, Timestamp } from "firebase/firestore";
import { db } from "../config/firebaseConfig";

import { useNavigation, useRoute } from "@react-navigation/native";

export default function EditExpense() {
  const { user } = useAuth();

  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");

  const [targetExpense, setTargetExpense] = useState();

  const route = useRoute();
  const expenseId = route.params?.expenseId;

  const navigation = useNavigation();

  const handleEditExpense = async () => {
    const invalidExpense = checkExpense(description, amount, category);

    if (!invalidExpense) {
      const updatedExpenses = user.data.expenses;

      updatedExpenses[targetExpense] = {
        ...user.data.expenses[targetExpense],
        description: description,
        amount: amount,
        lastModified: Timestamp.now(),
      };

      addCategory(user, category);

      const currUserRef = doc(db, "users", user.uid);
      await updateDoc(currUserRef, {
        expenses: updatedExpenses,
      });

      setAmount("");
      setDescription("");
      setCategory("");
      setTargetExpense(null);

      navigation.navigate("Home");
    } else {
      Alert.alert("Erro", invalidExpense, [{ text: "Ok" }]);
    }
  };

  useEffect(() => {
    for (let i = 0; i < user.data.expenses.length; i++) {
      if (user.data.expenses[i].uid === expenseId) {
        setAmount(user.data.expenses[i].amount);
        setDescription(user.data.expenses[i].description);
        setCategory(user.data.expenses[i].category);
        setTargetExpense(i);
        break;
      }
    }
  }, [expenseId]);

  return (
    <View style={styles.container}>
      <ExpenseForm
        description={description}
        setDescription={setDescription}
        amount={amount}
        setAmount={setAmount}
        category={category}
        setCategory={setCategory}
      />
      <View style={styles.buttons}>
        <Button title="Cancelar" onPress={() => navigation.navigate("Home")} />
        <Button title="Salvar Alteracoes" onPress={handleEditExpense} />
      </View>
    </View>
  );
}
