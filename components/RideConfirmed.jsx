import { StyleSheet, Text, SafeAreaView } from "react-native";
import React from "react";
import tw from "tailwind-react-native-classnames";

const RideConfirmed = () => {
  return (
    <SafeAreaView style={tw`m-auto`}>
      <Text style={tw`text-xl text-center`}>Ride Confirmed </Text>
    </SafeAreaView>
  );
};

export default RideConfirmed;

const styles = StyleSheet.create({});
