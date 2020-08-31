import * as React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";

const AppButton = ({ onPress, title, buttonColor }) => (
  <TouchableOpacity
    onPress={onPress}
    activeOpacity={0.7}
    style={{
      ...styles.appButtonContainer,
      ...(buttonColor === "red" ? styles.appButtonRed : styles.appButtonWhite),
    }}
  >
    <Text
      style={{
        ...styles.appButtonText,
        ...(buttonColor === "red"
          ? styles.appButtonTextRed
          : styles.appButtonTextWhite),
      }}
    >
      {title}
    </Text>
  </TouchableOpacity>
);
export default AppButton;

const styles = StyleSheet.create({
  appButtonContainer: {
    borderRadius: 50,
    borderColor: "#f0475b",
    borderWidth: 1,
    width: 200,
    paddingVertical: 10,
    paddingHorizontal: 12,
    alignSelf: "center",
    marginBottom: 20,
  },
  appButtonWhite: {
    backgroundColor: "#FFFFFF",
  },
  appButtonRed: {
    backgroundColor: "#f0475b",
  },
  appButtonText: {
    fontSize: 19,
    fontWeight: "200",
    alignSelf: "center",
    // textTransform: "uppercase",
  },
  appButtonTextWhite: {
    color: "#f0475b",
  },
  appButtonTextRed: {
    color: "#fff",
  },
});
