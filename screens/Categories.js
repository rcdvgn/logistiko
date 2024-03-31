import styles from "../styles";

import {
  View,
  Text,
  TextInput,
  FlatList,
  Button,
  Pressable,
} from "react-native";

import { doc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebaseConfig";

import React, { useState } from "react";

import { useAuth } from "../context/AuthContext";

const Item = ({
  category,
  editedCategory,
  setEditedCategory,
  updatedCategory,
  setUpdatedCategory,
  saveEditedCategory,
  editCategory,
  deleteCategory,
  fixedCategories,
}) => {
  return (
    <View>
      {editedCategory === category ? (
        <TextInput
          style={styles.input}
          value={updatedCategory}
          onChangeText={setUpdatedCategory}
        />
      ) : (
        <Text>{category}</Text>
      )}

      {fixedCategories.includes(category) ? null : (
        <>
          {editedCategory === category ? (
            <Button
              title="Salvar"
              onPress={() => saveEditedCategory(category)}
            />
          ) : (
            <Button title="Editar" onPress={() => editCategory(category)} />
          )}
          <Button title="Excluir" onPress={() => deleteCategory(category)} />
        </>
      )}
    </View>
  );
};

export default function Categories() {
  const { user, fixedCategories } = useAuth();

  const [editedCategory, setEditedCategory] = useState("");
  const [updatedCategory, setUpdatedCategory] = useState("");

  const deleteCategory = async (category) => {
    let updatedCategories = [...user.data.categories];
    let updatedExpenses = [...user.data.expenses];

    updatedExpenses = updatedExpenses.filter(
      (expense) => expense.category !== category
    );

    updatedCategories = updatedCategories.filter(
      (currCategory) => currCategory !== category
    );

    await updateDoc(doc(db, "users", user.uid), {
      categories: updatedCategories,
      expenses: updatedExpenses,
    });
  };

  const editCategory = (category) => {
    setEditedCategory(category);
    setUpdatedCategory(category);
  };

  const saveEditedCategory = async (category) => {
    setEditedCategory("");
    setUpdatedCategory("");

    if (updatedCategory) {
      if (updatedCategory !== category) {
        let updatedCategories = [...user.data.categories, updatedCategory];
        let updatedExpenses = [...user.data.expenses];

        updatedCategories = updatedCategories.filter(
          (currCategory) => currCategory !== category
        );

        for (let i = 0; i < updatedExpenses.length; i++) {
          updatedExpenses[i].category === category
            ? (updatedExpenses[i].category = updatedCategory)
            : "";
        }

        await updateDoc(doc(db, "users", user.uid), {
          categories: updatedCategories,
          expenses: updatedExpenses,
        });
      }
    }
  };

  const keyExtractor = (item, index) => index.toString();

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.expensesList}
        data={user.data?.categories.slice().reverse()}
        renderItem={({ item }) => (
          <Item
            category={item}
            editedCategory={editedCategory}
            setEditedCategory={setEditedCategory}
            saveEditedCategory={saveEditedCategory}
            editCategory={editCategory}
            deleteCategory={deleteCategory}
            updatedCategory={updatedCategory}
            setUpdatedCategory={setUpdatedCategory}
            fixedCategories={fixedCategories}
          />
        )}
        keyExtractor={keyExtractor}
      />
    </View>
  );
}
