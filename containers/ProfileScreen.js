import React, { useState } from "react";
import { useRoute, useNavigation } from "@react-navigation/core";
import { TouchableOpacity } from "react-native-gesture-handler";
import {
  Image,
  Text,
  TextInput,
  View,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  StatusBar,
} from "react-native";
import axios from "axios";
import Constants from "expo-constants";

import AppButton from "../components/AppButton";

export default function ProfileScreen({ setToken }) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const donnees = async (event) => {
    try {
      const response = await axios.get(
        "https://express-airbnb-api.herokuapp.com/user/",

        {
          email: email,
          username: username,
          name: name,
          description: description,
        },
        { headers: { "Content-Type": "application/json" } }
      );
      console.log(response);
      if (response.data.token) {
        Link;
      } else {
        throw Error(response.data);
      }
    } catch (event) {
      Alert.alert("Echec de la recuperation", event.message);
    }
  };

  return (
    <ScrollView style={{ backgroundColor: "white" }}>
      <StatusBar barStyle="light-content" backgroundColor="#f0475b" />
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        style={styles.global}
      >
        <View style={styles.portraituser}>{/* <Image /> */}</View>

        <View style={styles.saisie}>
          <TextInput
            style={styles.input}
            placeholder="username"
            placeholderTextColor="black"
            value={username}
            onChangeText={(username) => setUsername(username)}
          />
        </View>
        <View style={styles.saisie}>
          <TextInput
            style={styles.input}
            placeholder="email"
            placeholderTextColor="black"
            value={email}
            onChangeText={(email) => setEmail(email)}
          />
        </View>
        <View style={styles.saisie}>
          <TextInput
            style={styles.input}
            placeholder="name"
            placeholderTextColor="black"
            value={name}
            onChangeText={(name) => setName(name)}
          />
        </View>

        <View style={styles.saisie}>
          <TextInput
            style={styles.inputBloc}
            placeholderTextColor="#fffa"
            multiline={true}
            numberOfLines={6}
            textAlignVertical="top"
            value={description}
            onChangeText={(description) => setDescription(description)}
          />
        </View>

        <AppButton
          title="Mettre a Jour"
          onPress={async () => {
            donnees();
          }}
        />
        {/* <View>
  <Text>user id : {params.userId}</Text>
</View> */}
        <AppButton
          title="Se deconnecter"
          buttonColor="red"
          onPress={() => {
            setToken(null);
          }}
        />
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  global: {
    flex: 1,
    fontSize: 16,
    padding: 40,
    justifyContent: "center",
    paddingTop: Constants.StatusBarHeight,
    backgroundColor: "white",
  },
  portraituser: {
    backgroundColor: "#f0475b",
    borderColor: "#ffffff",
    borderWidth: 1,

    height: 100,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30,
  },

  saisie: {
    paddingBottom: 30,
  },
  input: {
    color: "black",
    paddingLeft: 6,

    borderBottomColor: "#f0475b",
    borderBottomWidth: 1,
  },
  inputBloc: {
    color: "black",
    paddingLeft: 6,

    borderColor: "#f0475b",
    borderWidth: 1,
  },
  presentation: {
    padding: 50,
    color: "white",
    fontSize: 17,
  },
  deconnection: {
    textAlign: "center",
    paddingTop: 40,
    color: "white",
    fontSize: 15,
  },
});
