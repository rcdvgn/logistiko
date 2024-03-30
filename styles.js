"use strict";
import { StyleSheet } from "react-native";

module.exports = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
    backgroundColor: "#f2f2f2",
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
  expensesList: {
    width: "100%",
  },
  expense: {
    display: "flex",
    justifyContent: "space-between",
    padding: 15,
    backgroundColor: "white",
    borderRadius: 10,
    flexDirection: "row",
    gap: 5,
    marginBottom: 5,
    elevation: 4,
  },
});
