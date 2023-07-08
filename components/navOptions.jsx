import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { FlatList } from "react-native";
import { TouchableOpacity } from "react-native";
import { Image } from "react-native";
import { Icon } from "react-native-elements";
import tw from "tailwind-react-native-classnames";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { selectOrigin } from "../slices/navSlice";

const data = [
  {
    id: 123,
    title: "Get a ride",
    img: "https://links.papareact.com/3pn",
    screen: "MapScreen",
  },
  {
    id: 523,
    title: "Order Food",
    img: "https://links.papareact.com/28w",
    screen: "food screen",
  },
];

const navOptions = () => {
  const origin = useSelector(selectOrigin);
  const navigation = useNavigation();

  return (
    <FlatList
      horizontal
      data={data}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={tw`p-2 pl-6 pb-8 pt-4 bg-gray-200 m-2 w-40 shadow-md`}
          onPress={() => {
            navigation.navigate(item.screen);
          }}
          disabled={!origin}
        >
          <View>
            <Image
              style={{ width: 120, height: 120, resizeMode: "contain" }}
              source={{ uri: item.img }}
            />
          </View>
          <Text style={tw`mt-2 text-lg font-semibold`}>{item.title}</Text>
          <Icon
            style={tw`p-2 bg-black rounded-full w-10 mt-4`}
            name="arrowright"
            color="white"
            type="antdesign"
          />
        </TouchableOpacity>
      )}
      keyExtractor={(item) => {
        item.id;
      }}
    />
  );
};

export default navOptions;

const styles = StyleSheet.create({});
