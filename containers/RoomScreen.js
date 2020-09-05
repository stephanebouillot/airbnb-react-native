import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/core";
import { Ionicons } from "@expo/vector-icons";
import * as Location from "expo-location";
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
} from "react-native";

import axios from "axios";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";

import SwiperFlatList from "react-native-swiper-flatlist";
import MapView from "react-native-maps";

const RoomScreen = () => {
  const route = useRoute();
  const [room, setRoom] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [tabimage, setTabImage] = useState([]);
  const [expandedDescription, setExpandedDescription] = useState(false);

  const { id } = route.params;

  const Stars = ({ rate }) => {
    const tab = [];
    for (let i = 0; i < 5; i++) {
      if (i < rate) {
        tab.push(
          <Ionicons key={i} name="ios-star" size={24} color="#f5e042" />
        );
      } else {
        tab.push(<Ionicons key={i} name="ios-star" size={24} color="#eee" />);
      }
    }

    return tab;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://airbnb-api.herokuapp.com/api/room/${id}`
        );
        setRoom(response.data);
        setTabImage(response.data.photos);

        setIsLoading(false);
      } catch (error) {
        alert("An error occured");
        console.log(error.response);
      }
    };
    fetchData();
  }, []);

  useNavigation();

  return isLoading === true ? (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
      }}
    >
      <ActivityIndicator size="large" color="#f0475b" />
    </View>
  ) : (
    <ScrollView>
      <StatusBar barStyle="light-content" backgroundColor="#f0475b" />
      <View style={styles.global}>
        <View style={styles.slide}>
          <SwiperFlatList
            autoplay={true}
            autoplayDelay={5}
            loop
            index={0}
            showPagination={true}
            paginationDefaultColor="white"
            paginationActiveColor="#f0475b"
            paginationStyleItem={styles.sliderpage}
          >
            {tabimage.map((photos, index) => {
              return (
                <View key={index}>
                  <ImageBackground
                    style={styles.bgImage}
                    source={{
                      uri: photos,
                    }}
                  >
                    <View style={styles.priceView}>
                      <Text style={styles.price}>{room.price} €</Text>
                    </View>
                  </ImageBackground>
                </View>
              );
            })}
          </SwiperFlatList>
        </View>
        <View style={styles.informations}>
          <View style={styles.informationsTexts}>
            <Text numberOfLines={1} style={styles.title}>
              {room.title}
            </Text>
            <View style={styles.rating}>
              <Stars rate={room.ratingValue} />
              <Text style={styles.avis}>{room.reviews} avis</Text>
            </View>
          </View>
          <View>
            <Image
              source={{
                uri: room.user.account.photos[0],
              }}
              style={styles.profilePicture}
            />
          </View>
        </View>
        <View>
          <TouchableOpacity
            activeOpacity={1.0}
            onPress={() => {
              LayoutAnimation.configureNext(
                LayoutAnimation.Presets.easeInEaseOut
              );
              if (expandedDescription) {
                setExpandedDescription(false);
              } else {
                setExpandedDescription(true);
              }
            }}
          >
            <Text
              numberOfLines={expandedDescription ? undefined : 4}
              style={styles.description}
            >
              {room.description}
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Around me", {
              id: item._id,
            });
          }}
        >
          <View>
            <MapView
              style={styles.map}
              region={{
                latitude: room.loc[1],
                longitude: room.loc[0],
                latitudeDelta: 0.05,
                longitudeDelta: 0.05,
              }}
              showsUserLocation={true}
            >
              <MapView.Marker
                coordinate={{
                  latitude: room.loc[1],
                  longitude: room.loc[0],
                }}
              />
            </MapView>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default RoomScreen;

const styles = StyleSheet.create({
  global: {
    backgroundColor: "white",
  },
  slide: {
    height: 300,
    width: 400,

    marginBottom: 10,
  },
  sliderpage: {
    height: 5,
    width: 5,
    marginHorizontal: 2,
  },
  priceView: {
    width: 100,
    height: 50,
    backgroundColor: "black",
    marginBottom: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  price: {
    color: "white",
    fontSize: 20,
  },
  bgImage: {
    flex: 1,

    width: 400,
    height: 300,
    justifyContent: "flex-end",
  },
  profilePicture: {
    height: 80,
    width: 80,
    borderRadius: 80,
    marginLeft: 20,
  },
  informations: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
    paddingTop: 20,
  },
  informationsTexts: {
    justifyContent: "space-around",
    flex: 1,
  },
  rating: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
  },
  avis: {
    paddingLeft: 20,
    fontSize: 20,
    color: "#aaa",
  },
  description: {
    marginHorizontal: 20,
    fontSize: 20,
    marginVertical: 10,
  },

  map: {
    marginHorizontal: 20,
    marginTop: 30,
    height: 200,
  },
});
