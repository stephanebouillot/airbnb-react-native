import * as React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";

const AppButton = ({ onPress, title }) => (
  <TouchableOpacity onPress={onPress} style={styles.appButtonContainer}>
    <Text style={styles.appButtonText}>{title}</Text>
  </TouchableOpacity>
);
export default AppButton;

const styles = StyleSheet.create({
  appButtonContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 50,
    width: 200,
    paddingVertical: 20,
    paddingHorizontal: 12,
    alignSelf: "center",
  },
  appButtonText: {
    fontSize: 19,
    color: "#f0475b",
    fontWeight: "200",
    alignSelf: "center",
    textTransform: "uppercase",
  },
});
