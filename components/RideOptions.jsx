import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import React, { useState } from "react";
import tw from "tailwind-react-native-classnames";
import { Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import { selectTravelTimeInfo } from "../slices/navSlice";

const RideOptions = () => {
  const data = [
    {
      id: "Uber-X-123",
      title: "UberX",
      multiplayer: 1,
      image: "https://links.papareact.com/3pn",
    },
    {
      id: "Uber-XL-456",
      title: "Uber XL",
      multiplayer: 1.2,
      image: "https://links.papareact.com/5w8",
    },
    {
      id: "Uber-LUX-789",
      title: "Uber LUX",
      multiplayer: 1.75,
      image: "https://links.papareact.com/7pf",
    },
  ];
  const navigation = useNavigation();
  const [selected, setSelected] = useState(null);
  const selector = useSelector(selectTravelTimeInfo);
  return (
    <View style={tw`bg-white flex-grow pb-2`}>
      <View style={tw`absolute top-3 left-5 p-3 rounded-full`}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("NavigateCard");
          }}
        >
          <Icon name="chevron-left" type="fontawesome" />
        </TouchableOpacity>
      </View>
      <Text style={tw`text-center py-5 text-xl`}>
        Select a Ride - {selector?.distance.text}
      </Text>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              setSelected(item);
            }}
            style={tw`flex-row items-center justify-between px-10 ${
              item.id === selected?.id && "bg-gray-200"
            }`}
          >
            <Image
              style={{
                width: 100,
                height: 100,
                resizeMode: "contain",
              }}
              source={{
                uri: item.image,
              }}
            />
            <View>
              <Text style={tw`text-xl font-semibold`}>{item.title}</Text>
              <Text>{selector?.duration.text}</Text>
            </View>
            <View>
              <Text style={tw`text-lg`}>
                $
                {(
                  selector?.distance.text.split(" ")[0] *
                  3 *
                  item?.multiplayer
                ).toFixed(2)}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
      <View>
        {selected && (
          <TouchableOpacity
            disabled={!selected}
            style={tw`bg-black p-3 `}
            onPress={() => {
              navigation.navigate("RideConfirmed");
            }}
          >
            <Text style={tw`text-center text-white text-lg`}>
              Choose {selected?.title}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default RideOptions;

const styles = StyleSheet.create({});
