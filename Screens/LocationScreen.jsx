import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Ionicons, Entypo, MaterialIcons } from "@expo/vector-icons";
import { color } from "../styles/colors";
import { useNavigation } from "@react-navigation/native";
const LocationScreen = () => {
  const navigation = useNavigation();
  const [address, setAddress] = useState("");
  const handleAddressSave = async () => {};
  return (
    <View
      style={{
        paddingTop: 40,
        paddingHorizontal: 20,
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <View style={{ flexDirection: "row", gap: 20 }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-outline" size={24} color="black" />
        </TouchableOpacity>
        <Text style={{ fontSize: 22, fontWeight: 500 }}>
          Specify your location
        </Text>
      </View>

      <View
        style={{ flexDirection: "row", alignItems: "center", marginTop: 20 }}
      >
        {/* <TouchableOpacity
          style={{ marginRight: -30, zIndex: 2 }}
          onPress={() => navigation.goBack()}
        >
          <Entypo name="chevron-small-left" size={26} color={color.darkPink} />
        </TouchableOpacity> */}

        <TextInput
          placeholder="Enter locaty or street name"
          style={{
            backgroundColor: "white",
            elevation: 8,
            padding: 10,
            borderRadius: 10,
            flex: 1,
            paddingLeft: 35,
          }}
          value={address}
          onChangeText={(e) => setAddress(e)}
        />
      </View>
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
        }}
      >
        <MaterialIcons name="my-location" size={24} color={color.darkPink} />
        <View>
          <Text
            style={{
              fontSize: 20,
              color: color.darkPink,
              fontFamily: "sans-serif",
            }}
          >
            Use Current Location
          </Text>
          <Text
            style={{ color: "gray", fontSize: 12, fontFamily: "sans-serif" }}
          >
            Random address
          </Text>
        </View>
      </View>
    </View>
  );
};

export default LocationScreen;
