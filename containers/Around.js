import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/core";
import { Ionicons } from "@expo/vector-icons";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import {
  View,
  Button,
  Text,
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Image,
  ImageBackground,
  StatusBar,
  Platform,
  LayoutAnimation,
  Dimensions,
} from "react-native";

import axios from "axios";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import MapView, { Callout } from "react-native-maps";

const Around = () => {
  const [isLoading, setIsLoading] = useState(true);

  const [coords, setCoords] = useState();
  const [rooms, setRooms] = useState([]);
  useEffect(() => {
    const askPermission = async () => {
      const obj = await Permissions.askAsync(Permissions.LOCATION);
      if (obj.status === "granted") {
        const location = await Location.getCurrentPositionAsync({});
        setCoords(location.coords);
      } else {
        alert("You have to accept permission");
      }
    };

    askPermission();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://airbnb-api.herokuapp.com/api/room/around`,
          {
            params: {
              latitude: coords.latitude,
              longitude: coords.longitude,
            },
          }
        );

        setRooms(response.data);
        setIsLoading(false);
      } catch (error) {
        alert("An error occured");
        console.log(error.response);
      }
    };
    if (coords) {
      fetchData();
    }
  }, [coords]);

  const navigation = useNavigation();

  return isLoading === true ? (
    <View>
      <ActivityIndicator size="large" color="#00ff00" />
    </View>
  ) : (
    <View style={styles.global}>
      <MapView
        style={{
          width: "100%",
          height: "100%",
        }}
        initialRegion={{
          latitude: coords.latitude,
          longitude: coords.longitude,
          latitudeDelta: 0.2,
          longitudeDelta: 0.2,
        }}
        showsUserLocation={true}
      >
        {rooms.map((room) => (
          <MapView.Marker
            coordinate={{
              latitude: room.loc[1],
              longitude: room.loc[0],
            }}
            key={room.shortId}
          >
            <Callout
              onPress={() => {
                navigation.navigate("Room", {
                  id: room._id,
                });
              }}
            >
              <Text>{room.title}</Text>
            </Callout>
          </MapView.Marker>
        ))}
      </MapView>
    </View>
  );
};

export default Around;

const styles = StyleSheet.create({
  global: {
    backgroundColor: "white",
  },
});
