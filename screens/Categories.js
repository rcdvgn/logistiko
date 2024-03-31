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

import { useAuth } from "../context/AuthContext";

export default function Categories() {
  const { user } = useAuth();

  const deleteCategory = async (category) => {
    let updatedCategories = [...user.data.categories];

    updatedCategories = updatedCategories.filter(
      (currCategory) => currCategory.toLowerCase() !== category.toLowerCase()
    );

    const currUserRef = doc(db, "users", user.uid);
    await updateDoc(currUserRef, {
      categories: updatedCategories,
    });
  };

  const Item = ({ category }) => {
    return (
      <View>
        <Text>{category}</Text>
        <Pressable title="Excluir" onPress={() => deleteCategory(category)} />
      </View>
    );
  };

  const keyExtractor = (item, index) => index.toString();

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.expensesList}
        data={user.data?.categories.slice().reverse()}
        renderItem={({ item }) => <Item category={item} />}
        keyExtractor={keyExtractor}
      />
    </View>
  );
}
