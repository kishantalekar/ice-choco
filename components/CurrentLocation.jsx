import { View, Text } from "react-native";
import React from "react";
import { color } from "../styles/colors";
import { MaterialIcons } from "@expo/vector-icons";
const CurrentLocation = () => {
  return (
    <View
      style={{
        flexDirection: "row",
        gap: 30,
        marginTop: 30,
        alignItems: "center",
        backgroundColor: "white",
        elevation: 8,
        borderRadius: 12,
        paddingVertical: 8,
        paddingHorizontal: 10,
        marginHorizontal: 10,
      }}
    >
      <MaterialIcons name="my-location" size={24} color={color.darkPink} />
      <View>
        <Text
          style={{
            fontSize: 12,
            color: color.darkPink,
            fontFamily: "sans-serif",
          }}
        >
          Change Current Location
        </Text>
        <Text style={{ color: "gray", fontSize: 10, fontFamily: "sans-serif" }}>
          Random address
        </Text>
      </View>
    </View>
  );
};

export default CurrentLocation;
