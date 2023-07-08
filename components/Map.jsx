import React, { useEffect, useRef } from "react";
import MapView, { Marker } from "react-native-maps";
import { StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  selectDestination,
  selectOrigin,
  setTravelTimeInfo,
} from "../slices/navSlice";
import MapViewDirections from "react-native-maps-directions";
const API_KEY = "AIzaSyDesOie1K0-Ho2y_Aj35-FNI8L2Jk8P-qg";

export default function App() {
  const origin = useSelector(selectOrigin);
  const dispatch = useDispatch();
  const destination = useSelector(selectDestination);
  const mapRef = useRef(null);
  useEffect(() => {
    if (!origin || !destination) return;
    mapRef.current.fitToSuppliedMarkers(["origin", "destination"], {
      edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
    });
  }, [origin, destination]);

  useEffect(() => {
    if (!origin || !destination) return;
    const getTravelTime = async () => {
      console.log(origin.description);
      console.log(destination.description);

      const URL = `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${origin.description}&destinations=${destination.description}&key=${API_KEY}
      `;
      fetch(URL).then((res) => {
        res.json().then((data) => {
          dispatch(setTravelTimeInfo(data.rows[0].elements[0]));
        });
      });
    };

    getTravelTime();
  }, [origin, destination, API_KEY]);

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={{
          latitude: origin.location.lat,
          longitude: origin.location.lng,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
      >
        {origin && destination && (
          <MapViewDirections
            origin={origin.description}
            destination={destination.description}
            apikey={API_KEY}
            strokeWidth={3}
            strokeColor="black"
            mode="DRIVING"
          />
        )}
        {origin?.location.lat && (
          <Marker
            coordinate={{
              latitude: origin.location.lat,
              longitude: origin.location.lng,
            }}
            title="origin"
            description={origin.description}
            identifier="origin"
          />
        )}
        {destination?.location.lat && (
          <Marker
            coordinate={{
              latitude: destination.location.lat,
              longitude: destination.location.lng,
            }}
            title="destination"
            description={destination.description}
            identifier="destination"
          />
        )}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
