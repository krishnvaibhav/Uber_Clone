import { StyleSheet, Text, SafeAreaView, View } from "react-native";
import React from "react";
import tw from "tailwind-react-native-classnames";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { useDispatch } from "react-redux";
import { setDestination } from "../slices/navSlice";
import { useNavigation } from "@react-navigation/native";

const API_KEY = "AIzaSyDesOie1K0-Ho2y_Aj35-FNI8L2Jk8P-qg";

const NavigateCard = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  return (
    <SafeAreaView style={tw`bg-white flex-1`}>
      <Text style={tw`text-center py-5 text-xl`}>Good Morning, Vaibhav</Text>
      <View style={tw`border-t border-gray-200 flex-shrink`}></View>
      <GooglePlacesAutocomplete
        styles={toInputBox}
        placeholder="Where To ?"
        debounce={400}
        nearbyPlacesAPI="GooglePlacesSearch"
        query={{
          key: API_KEY,
          language: "en",
        }}
        fetchDetails={true}
        onPress={(data, details) => {
          dispatch(
            setDestination({
              location: details.geometry.location,
              description: data.description,
            })
          );
          navigation.navigate("RideOptionsCard");
        }}
      />
    </SafeAreaView>
  );
};

export default NavigateCard;

const toInputBox = StyleSheet.create({
  container: {
    backgroundColor: "white",
    paddingTop: 20,
    flex: 0,
  },
  textInput: {
    backgroundColor: "#DDDDDDDF",
    borderRadius: 0,
    fontSize: 15,
  },
  textInputContainer: {
    paddingHorizontal: 20,
    paddingBottom: 0,
  },
});
