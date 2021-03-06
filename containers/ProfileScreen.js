import React, { useState, useEffect } from "react";

import {
  Image,
  Text,
  Button,
  TextInput,
  View,
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  StatusBar,
  AsyncStorage,
  Alert,
} from "react-native";
import axios from "axios";
import Constants from "expo-constants";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";

import AppButton from "../components/AppButton";

/*
 ** Screen showing the user informations, and allowing him to modify them
 */
export default function ProfileScreen({ logout }) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [photo, setPhoto] = useState(null);
  const [photoLoading, setPhotoLoading] = useState(true);

  // Asks the user for permission to use the device's photos, then asks him to pick one, and sends it as user profile picture
  const updatePhotoFromCameraRoll = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

    if (status === "granted") {
      const result = await ImagePicker.launchImageLibraryAsync();

      if (!result.cancelled) {
        setPhotoLoading(true);
        sendPhoto(result.uri);
      }
    } else {
      alert("Permission refusée");
    }
  };

  // Asks the user the permission to take pictures, and if granted, takes and send a picture as user profile picture
  const updatePhotoFromCamera = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    if (status === "granted") {
      const result = await ImagePicker.launchCameraAsync();
      if (!result.cancelled) {
        setPhotoLoading(true);
        sendPhoto(result.uri);
      }
    } else {
      alert("Accès refusé");
    }
  };

  // Uploads a photo to the backend as user profile picture
  const sendPhoto = async (uri) => {
    try {
      const uriParts = uri.split(".");

      const fileType = uriParts[1];

      const formData = new FormData();
      formData.append("photo", {
        uri: uri,
        name: `photo.${fileType}`,
        type: `image/${fileType}`,
      });

      const response = await axios.put(
        `https://express-airbnb-api.herokuapp.com/user/upload_picture/${await AsyncStorage.getItem(
          "userId"
        )}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${await AsyncStorage.getItem("userToken")}`,
          },
        }
      );

      setPhoto(uri);
      setPhotoLoading(false);
      alert("Photo envoyee");
    } catch (error) {
      Alert.alert("Erreur", error.message);
      setPhotoLoading(false);
    }
  };

  // Fetches user data when the screen loads
  useEffect(() => {
    // Fetches user data from the backend
    const fetchData = async (event) => {
      try {
        const response = await axios.get(
          `https://express-airbnb-api.herokuapp.com/user/${await AsyncStorage.getItem(
            "userId"
          )}`,
          {
            headers: {
              Authorization: `Bearer ${await AsyncStorage.getItem(
                "userToken"
              )}`,
            },
          }
        );
        if (response.data.id) {
          setEmail(response.data.email);
          setDescription(response.data.description);
          setName(response.data.name);
          setUsername(response.data.username);
          setPhoto(response.data.photo[0].url);
          setPhotoLoading(false);
        } else {
          throw Error(response.data);
        }
      } catch (event) {
        Alert.alert("Echec de la recuperation des donnees", event.message);
      }
    };
    fetchData();
  }, []);

  // Updates the user data by sending them to the backend
  const updateData = async (event) => {
    try {
      const response = await axios.put(
        `https://express-airbnb-api.herokuapp.com/user/update/${await AsyncStorage.getItem(
          "userId"
        )}`,
        {
          email: email,
          username: username,
          name: name,
          description: description,
        },
        {
          headers: {
            Authorization: `Bearer ${await AsyncStorage.getItem("userToken")}`,
          },
        }
      );
      Alert.alert("Succes", "Mise a jour des donnees reussie");
    } catch (error) {
      Alert.alert("Echec de la mise a jour des donnees", error.message);
    }
  };

  return (
    <ScrollView style={{ backgroundColor: "white" }}>
      <StatusBar barStyle="light-content" backgroundColor="#f0475b" />
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        style={styles.global}
      >
        <View style={styles.portraituser}>
          {photoLoading && <ActivityIndicator size="large" color="#f0475b" />}
          {photo && !photoLoading && (
            <Image
              source={{
                uri: photo,
              }}
              style={{ height: 150, width: 150 }}
            />
          )}
        </View>
        <View style={styles.photoButtons}>
          <AppButton
            title="Prendre une photo"
            textSize={14}
            onPress={() => updatePhotoFromCamera()}
          ></AppButton>
          <AppButton
            title="Choisir une photo"
            textSize={14}
            onPress={() => updatePhotoFromCameraRoll()}
          ></AppButton>
        </View>

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
            fixedWidth={200}
            textAlignVertical="top"
            value={description}
            onChangeText={(description) => setDescription(description)}
          />
        </View>

        <AppButton
          title="Mettre a Jour"
          fixedWidth={200}
          onPress={() => {
            updateData();
          }}
        />

        <AppButton
          title="Se deconnecter"
          buttonColor="red"
          fixedWidth={200}
          onPress={() => {
            logout();
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
    height: 100,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 50,
  },
  photoButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
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
