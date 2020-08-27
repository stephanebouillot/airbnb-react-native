import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/core";
import { Ionicons } from "@expo/vector-icons";
import {
  View,
  Button,
  Text,
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Image,
  StatusBar,
} from "react-native";

import axios from "axios";
import { TouchableOpacity } from "react-native-gesture-handler";
const Stars = ({ rate }) => {
  const tab = [];
  for (let i = 0; i < 5; i++) {
    if (i < rate) {
      tab.push(<Ionicons key={i} name="ios-star" size={24} color="#f5e042" />);
    } else {
      tab.push(<Ionicons key={i} name="ios-star" size={24} color="#eee" />);
    }
  }

  return tab;
};

const HomeScreen = () => {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "https://airbnb-api.herokuapp.com/api/room?city=paris"
      );
      setData(response.data);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return isLoading ? (
    <ActivityIndicator size="large" color="#00ff00" />
  ) : (
    <View style={styles.global}>
      <FlatList
        data={data.rooms}
        renderItem={({ item }) => {
          return (
            <View style={styles.card}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Room", {
                    id: item._id,
                  });
                }}
              >
                <View>
                  <Image
                    style={styles.image}
                    source={{ uri: item.photos[0] }}
                  />
                </View>
                <Text style={styles.blocprice}>{item.price} €</Text>
              </TouchableOpacity>

              <View style={styles.annoncebas}>
                <View style={styles.annoncebasgauche}>
                  <Text style={styles.title} numberOfLines={1}>
                    {item.title}
                  </Text>
                  <View style={styles.icones}>
                    <View style={styles.icone}>
                      <Stars rate={item.ratingValue} />

                      <Text style={styles.avis}>{item.reviews} avis</Text>
                    </View>
                  </View>
                </View>

                <Image
                  style={styles.portraituser}
                  source={{ uri: item.user.account.photos[0] }}
                />
              </View>
            </View>
          );
        }}
        keyExtractor={(item) => String(item.shortId)}
      />
    </View>
  );
};
export default HomeScreen;

const styles = StyleSheet.create({
  global: {
    backgroundColor: "white",
  },
  card: {
    flex: 1,
    backgroundColor: "white",
    marginLeft: 20,
    marginRight: 20,
    paddingTop: 20,
    paddingBottom: 20,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
  image: {
    height: 230,
  },
  portraituser: {
    width: 60,
    height: 60,
    borderRadius: 60,
  },
  blocprice: {
    backgroundColor: "black",
    width: 70,
    height: 40,
    fontSize: 20,
    color: "white",
    paddingTop: 5,
    paddingLeft: 5,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 180,
  },
  annoncebas: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  annoncebasgauche: {
    flex: 1,
    marginRight: 15,
    // flexDirection: "column",
  },
  title: {
    fontSize: 20,
    color: "black",
    fontWeight: "300",
  },
  icone: {
    flexDirection: "row",
    marginTop: 5,
    marginRight: 10,

    // borderBottomWidth: 40,
    // borderBottomColor: "black",
  },
  // icones: {
  //   color: "grey",
  //   // flexDirection: "row",
  //   // borderBottomWidth: 40,
  //   // borderBottomColor: "black",
  // },
  avis: {
    fontSize: 20,
    // paddingTop: 3,
    paddingLeft: 20,
    color: "grey",
  },
});
