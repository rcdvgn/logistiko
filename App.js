import "react-native-gesture-handler";

import React, { useState } from "react";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";

import { v4 as uuidv4 } from "uuid";

import { doc, updateDoc } from "firebase/firestore";
import { db } from "./config/firebaseConfig";

import { StatusBar } from "expo-status-bar";
import {
  View,
  Text,
  TextInput,
  FlatList,
  Button,
  StyleSheet,
} from "react-native";

import { AuthProvider, useAuth } from "./context/AuthContext";
import { auth } from "./config/firebaseConfig";

const dummyData = [
  {
    id: "1",
    title: "Expense 1",
    description: "This is the description for the expense 1",
  },
  {
    id: "2",
    title: "Expense 2",
    description: "This is the description for the expense 2",
  },
  {
    id: "3",
    title: "Expense 3",
    description: "This is the description for the expense 3",
  },
  {
    id: "4",
    title: "Expense 4",
    description: "This is the description for the expense 4",
  },
  {
    id: "5",
    title: "Expense 5",
    description: "This is the description for the expense 5",
  },
  {
    id: "6",
    title: "Expense 6",
    description: "This is the description for the expense 6",
  },
  {
    id: "7",
    title: "Expense 7",
    description: "This is the description for the expense 7",
  },
  {
    id: "8",
    title: "Expense 8",
    description: "This is the description for the expense 8",
  },
  {
    id: "9",
    title: "Expense 9",
    description: "This is the description for the expense 9",
  },
  {
    id: "10",
    title: "Expense 10",
    description: "This is the description for the expense 10",
  },
];

const Drawer = createDrawerNavigator();

const AddExpense = () => {
  const { user } = useAuth();
  user ? console.log("AddExpense user: " + JSON.stringify(user)) : "";

  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");

  const handleAddExpense = async () => {
    console.log(user.data);
    const updatedExpenses = user.data.expenses;

    let expenseId = uuidv4();
    // do {
    //   expenseId = uuidv4();
    // } while (!updatedExpenses.some((obj) => obj.id === expenseId));

    updatedExpenses.push({
      uid: expenseId,
      description: description,
      amount: amount,
    });

    console.log("Updated Expenses : " + JSON.stringify(updatedExpenses));

    const currUserRef = doc(db, "users", user.uid);
    await updateDoc(currUserRef, {
      expenses: updatedExpenses,
    });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Valor"
        value={amount}
        onChangeText={setAmount}
      />
      <TextInput
        style={styles.input}
        placeholder="Descricao"
        value={description}
        onChangeText={setDescription}
      />
      <Button title="Adicionar" onPress={handleAddExpense} />
    </View>
  );
};

function Home() {
  const navigation = useNavigation();
  const Item = ({ title, description }) => {
    return (
      <>
        <Text>{title}</Text>
        <Text>{description}</Text>
      </>
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
        data={dummyData}
        renderItem={({ item }) => (
          <Item title={item.title} description={item.description} />
        )}
        keyExtractor={(item) => item.id}
      />
      <StatusBar style="auto" />
    </View>
  );
}

function Profile() {
  const { logOut } = useAuth();
  return (
    <View style={styles.container}>
      <Text>This is profile!</Text>
      <Button title="Logout" onPress={() => logOut(auth)} />
      <StatusBar style="auto" />
    </View>
  );
}

function SignUp({ navigation }) {
  const { signUp } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = () => {
    signUp(email, password);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCompleteType="email"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <View style={styles.authButtons}>
        <Button
          title="Ja possuo conta"
          onPress={() => navigation.navigate("SignIn")}
        />
        <Button title="Sign Up" onPress={handleSignUp} />
      </View>
    </View>
  );
}

function SignIn({ navigation }) {
  const { signIn } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = () => {
    signIn(email, password);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCompleteType="email"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <View style={styles.authButtons}>
        <Button
          title="Nao possuo conta"
          onPress={() => navigation.navigate("SignUp")}
        />
        <Button title="Sign In" onPress={handleSignIn} />
      </View>
    </View>
  );
}

function Root() {
  const { user } = useAuth();
  user ? console.log("root user: " + JSON.stringify(user)) : "";

  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        {user ? (
          <>
            <Drawer.Screen name="Home" component={Home} />
            <Drawer.Screen name="Profile" component={Profile} />
            <Drawer.Screen name="Add Expense" component={AddExpense} />
          </>
        ) : (
          <>
            <Drawer.Screen name="SignIn" component={SignIn} />
            <Drawer.Screen name="SignUp" component={SignUp} />
          </>
        )}
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Root />
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  input: {
    height: 40,
    width: "100%",
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  authButtons: {
    display: "flex",
    gap: 5,
    flexDirection: "row",
  },
});
