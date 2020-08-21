import * as React from "react";
import { Button } from "react-native";
import { useNavigation } from "@react-navigation/native";

function Link({ screenName }) {
  const navigation = useNavigation();
  return (
    <Button
      // title={`Go to ${screenName}`}
      title={screenName}
      onPress={() => navigation.navigate(screenName)}
    ></Button>
  );
}

export default Link;
