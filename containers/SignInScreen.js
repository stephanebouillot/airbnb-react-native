import React, { useState } from "react";
import { useNavigation } from "@react-navigation/core";
import AppButton from "../components/AppButton";
import {
  Button,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Alert,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import axios from "axios";

export default function SignInScreen({ setToken, setUserId }) {
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = async (event) => {
    if (email === "" || password === "") {
      alert("Veuillez remplir les champs vides.");
    } else {
      try {
        const response = await axios.post(
          "https://express-airbnb-api.herokuapp.com/user/log_in",
          { email: email, password: password }
        );
        if (response.data.token) {
          setToken(response.data.token);
          setUserId(response.data.id);
        }
      } catch (error) {
        if (error.response.status === 401) {
          Alert.alert(
            "Echec de la connexion",
            "Mauvaise combinaison email/mot de passe."
          );
        } else {
          Alert.alert("Echec de la connexion", error.message);
        }
      }
    }
  };

  return (
    <ScrollView style={{ backgroundColor: "#f0475b" }}>
      <StatusBar barStyle="light-content" backgroundColor="#f0475b" />
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        style={styles.global}
      >
        <View style={styles.haut}>
          <Ionicons name="ios-home" size={170} color="white" />
        </View>
        <View style={styles.saisie}>
          <TextInput
            style={styles.input}
            placeholder="email"
            placeholderTextColor="#fffa"
            value={email}
            onChangeText={(email) => {
              setEmail(email);
            }}
          />
        </View>
        <View style={styles.saisie}>
          <TextInput
            style={styles.input}
            event
            placeholder="mot de passe"
            placeholderTextColor="#fffa"
            secureTextEntry={true}
            value={password}
            onChangeText={(password) => {
              setPassword(password);
            }}
          />
        </View>
        <AppButton
          title="Se connecter"
          onPress={async () => {
            signIn();
          }}
        />
        <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
          <Text style={styles.inscription}>Pas de compte ? S'inscrire</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  global: {
    flex: 1,
    fontSize: 16,
    padding: 40,
    color: "#f0475b",
  },
  haut: {
    alignItems: "center",
    paddingBottom: 40,
  },
  saisie: {
    paddingBottom: 50,
  },
  input: {
    color: "white",
    paddingLeft: 6,

    borderBottomColor: "#ffffff",
    borderBottomWidth: 1,
  },
  inscription: {
    textAlign: "center",
    paddingTop: 40,
    color: "white",
    fontSize: 15,
  },
  button: {
    height: 100,
    borderRadius: 50,
    color: "#f0475b",
    backgroundColor: "white",
  },
});
