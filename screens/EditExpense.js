import styles from "../styles";

import React, { useState, useEffect } from "react";

import { View, Text, TextInput, Button } from "react-native";

import { useAuth } from "../context/AuthContext";

import ExpenseForm from "../components/ExpenseForm";

import { doc, updateDoc, Timestamp } from "firebase/firestore";
import { db } from "../config/firebaseConfig";

import { useNavigation, useRoute } from "@react-navigation/native";

export default function EditExpense() {
  const { user } = useAuth();

  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [targetExpense, setTargetExpense] = useState();

  const route = useRoute();
  const expenseId = route.params?.expenseId;

  const navigation = useNavigation();

  const handleEditExpense = async () => {
    const updatedExpenses = user.data.expenses;

    updatedExpenses[targetExpense] = {
      ...user.data.expenses[targetExpense],
      description: description,
      amount: amount,
      lastModified: Timestamp.now(),
    };

    // console.log(updatedExpenses);

    const currUserRef = doc(db, "users", user.uid);
    await updateDoc(currUserRef, {
      expenses: updatedExpenses,
    });

    setAmount("");
    setDescription("");
    setTargetExpense(null);

    navigation.navigate("Home");
  };

  useEffect(() => {
    console.log("useEffect");
    for (let i = 0; i < user.data.expenses.length; i++) {
      if (user.data.expenses[i].uid === expenseId) {
        setAmount(user.data.expenses[i].amount);
        setDescription(user.data.expenses[i].description);
        setTargetExpense(i);
        console.log("target: " + JSON.stringify(user.data.expenses[i]));
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
      />
      <Button title="Cancelar" onPress={() => navigation.navigate("Home")} />
      <Button title="Adicionar" onPress={handleEditExpense} />
    </View>
  );
}
