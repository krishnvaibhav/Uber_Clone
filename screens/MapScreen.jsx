import { StyleSheet, Text, View } from "react-native";
import React from "react";
import tw from "tailwind-react-native-classnames";
import NavigateCard from "../components/NavigateCard";
import Map from "../components/Map";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RideOptions from "../components/RideOptions";

const MapScreen = () => {
  const stack = createNativeStackNavigator();

  return (
    <View>
      <View style={tw`h-1/2`}>
        <Map />
      </View>
      <View style={tw`h-1/2`}>
        <stack.Navigator>
          <stack.Screen
            name="NavigateCard"
            component={NavigateCard}
            options={{ headerShown: false }}
          />
          <stack.Screen
            name="RideOptionsCard"
            component={RideOptions}
            options={{ headerShown: false }}
          />
        </stack.Navigator>
      </View>
    </View>
  );
};

export default MapScreen;

const styles = StyleSheet.create({});
