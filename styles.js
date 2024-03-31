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
  buttons: {
    display: "flex",
    gap: 5,
    flexDirection: "row",
  },
  expensesList: {
    width: "100%",
  },
  expense: {
    display: "flex",
    padding: 15,
    backgroundColor: "white",
    borderRadius: 10,
    flexDirection: "column",
    gap: 5,
    marginBottom: 5,
    elevation: 4,
  },
  expenseInfoContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  expenseInfo: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  expenseActions: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 5,
  },
  amount: {
    fontSize: 20,
    fontWeight: "700",
    color: "#454545",
  },
  description: {
    fontSize: 18,
    fontWeight: "600",
  },
  category: {
    fontSize: 14,
    fontWeight: "700",
    color: "#454545",
    padding: 5,
    borderRadius: 5,
    backgroundColor: "#cccccc",
    textAlign: "center",
  },
});
