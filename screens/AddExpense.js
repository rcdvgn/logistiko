import styles from "../styles";

import React, { useState } from "react";

import { View, Text, TextInput, Button, Pressable } from "react-native";
import ExpenseForm from "../components/ExpenseForm";
import { useNavigation } from "@react-navigation/native";

import { useAuth } from "../context/AuthContext";

import { addCategory } from "../utils/utils";

import { doc, updateDoc, Timestamp } from "firebase/firestore";
import { db } from "../config/firebaseConfig";

import { v4 as uuidv4 } from "uuid";

export default function AddExpense() {
  const { user } = useAuth();

  const navigation = useNavigation();

  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");

  const handleAddExpense = async () => {
    const updatedExpenses = user.data.expenses;

    let expenseId = uuidv4();
    // do {
    //   expenseId = uuidv4();
    // } while (!updatedExpenses.some((obj) => obj.id === expenseId));

    updatedExpenses.push({
      uid: expenseId,
      description: description,
      amount: amount,
      category: category,
      lastModified: Timestamp.now(),
    });

    addCategory(user, category);

    const currUserRef = doc(db, "users", user.uid);
    await updateDoc(currUserRef, {
      expenses: updatedExpenses,
    });

    setAmount("");
    setDescription("");
    setCategory("");

    navigation.navigate("Home");
  };

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
      <Button title="Cancelar" onPress={() => navigation.navigate("Home")} />
      <Button title="Adicionar" onPress={handleAddExpense} />
    </View>
  );
}
