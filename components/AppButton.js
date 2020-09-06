import * as React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";

/*
 ** Button with a design adapted for our use case.
 */
const AppButton = ({ onPress, title, buttonColor, textSize, fixedWidth }) => (
  <TouchableOpacity
    onPress={onPress}
    activeOpacity={0.7}
    style={{
      ...styles.appButtonContainer,
      ...(buttonColor === "red" ? styles.appButtonRed : styles.appButtonWhite),
      width: fixedWidth ? fixedWidth : undefined,
    }}
  >
    <Text
      style={{
        ...styles.appButtonText,
        ...(buttonColor === "red"
          ? styles.appButtonTextRed
          : styles.appButtonTextWhite),
        fontSize: textSize ? textSize : styles.appButtonText.fontSize,
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
  },
  appButtonTextWhite: {
    color: "#f0475b",
  },
  appButtonTextRed: {
    color: "#fff",
  },
});
