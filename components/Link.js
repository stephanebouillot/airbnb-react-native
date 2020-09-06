import * as React from "react";
import { Button } from "react-native";
import { useNavigation } from "@react-navigation/native";

/*
 ** Button with a design made to look like an html <a> tag
 */
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
