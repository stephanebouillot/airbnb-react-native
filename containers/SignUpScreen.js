import React, { useState } from "react";
import { useNavigation } from "@react-navigation/core";
import AppButton from "../components/AppButton";
import {
  Button,
  Text,
  TextInput,
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  SafeAreaView,
  StatusBar,
} from "react-native";
import Constants from "expo-constants";

import axios from "axios";

export default function SignUpScreen({ setToken }) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const navigation = useNavigation();

  const signUp = async (event) => {
    if (password !== confirmpassword) {
      alert("Les mots de passe sont differents.");
    } else if (
      username === "" ||
      email === "" ||
      password === "" ||
      confirmpassword === ""
    ) {
      alert("Veuillez remplir les champs vides.");
    } else {
      try {
        const response = await axios.post(
          "https://express-airbnb-api.herokuapp.com/user/sign_up",

          {
            email: email,
            username: username,
            name: name,
            description: description,
            password: password,
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
        Alert.alert("Echec de l'inscription", event.message);
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
          <Text style={styles.titre}>Rejoignez nous !</Text>
        </View>

        <View style={styles.saisie}>
          <TextInput
            style={styles.input}
            placeholder="email"
            placeholderTextColor="#fffa"
            value={email}
            onChangeText={(email) => setEmail(email)}
          />
        </View>
        <View style={styles.saisie}>
          <TextInput
            style={styles.input}
            placeholder="username"
            placeholderTextColor="#fffa"
            value={username}
            onChangeText={(username) => setUsername(username)}
          />
        </View>
        <View style={styles.saisie}>
          <TextInput
            style={styles.input}
            placeholder="name"
            placeholderTextColor="#fffa"
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
            placeholder="presentez vous en quelques mots:"
            value={description}
            onChangeText={(description) => setDescription(description)}
          />
        </View>
        <View style={styles.saisie}>
          <TextInput
            style={styles.input}
            placeholderTextColor="#fffa"
            placeholder="mot de passe"
            secureTextEntry={true}
            value={password}
            onChangeText={(password) => setPassword(password)}
          />
        </View>
        <View style={styles.saisie}>
          <TextInput
            style={styles.input}
            placeholderTextColor="#fffa"
            placeholder="confirmez le mot de passe"
            secureTextEntry={true}
            value={confirmpassword}
            onChangeText={(confirmpassword) =>
              setConfirmpassword(confirmpassword)
            }
          />
        </View>

        <AppButton
          title="S'inscrire"
          onPress={async () => {
            signUp();
          }}
        />

        <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
          <Text style={styles.connection}>Deja un compte ? Se connecter</Text>

          {/* <Link screenName={"SignUp"}></Link> */}
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
    justifyContent: "center",
    paddingTop: Constants.StatusBarHeight,
  },
  titre: {
    fontSize: 25,
    color: "white",
  },
  haut: {
    alignItems: "center",
    paddingBottom: 40,
  },
  saisie: {
    paddingBottom: 30,
  },
  input: {
    color: "white",
    paddingLeft: 6,

    borderBottomColor: "#ffffff",
    borderBottomWidth: 1,
  },
  inputBloc: {
    color: "white",
    paddingLeft: 6,

    borderColor: "#ffffff",
    borderWidth: 1,
  },
  presentation: {
    padding: 50,
    color: "white",
    fontSize: 17,
  },
  connection: {
    textAlign: "center",
    paddingTop: 40,
    color: "white",
    fontSize: 15,
  },
});
