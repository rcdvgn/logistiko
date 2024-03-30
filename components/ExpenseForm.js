import styles from "../styles";

import { View, Text, TextInput, Button } from "react-native";

import React, { useState } from "react";

export default function ExpenseForm(props) {
  return (
    <>
      <TextInput
        style={styles.input}
        placeholder="Valor"
        value={props.amount}
        onChangeText={props.setAmount}
      />
      <TextInput
        style={styles.input}
        placeholder="Descricao"
        value={props.description}
        onChangeText={props.setDescription}
      />
    </>
  );
}
