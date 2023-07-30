import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { color } from "../styles/colors";
import { useNavigation } from "@react-navigation/native";

const CartEmptyComponent = () => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <View style={{ height: 200, width: 250, alignItems: "center" }}>
        <Image
          source={require("../assets/cartEmpty.jpg")}
          style={{ width: "80%", height: "80%", borderRadius: 20 }}
        />
      </View>
      <View style={{ alignItems: "center", gap: 5 }}>
        <Text style={{ fontSize: 22, fontWeight: "bold" }}>
          Good icecream is Always Preparing
        </Text>

        <Text style={{ color: "gray" }}>
          Your cart is empty.Add something from the menu
        </Text>
      </View>
      <TouchableOpacity
        style={{
          borderColor: color.darkPink,
          borderWidth: 0.8,
          padding: 10,
          borderRadius: 10,
          marginTop: 30,
        }}
        onPress={() => navigation.goBack()}
      >
        <Text style={{ color: color.darkPink, fontSize: 18 }}>Browse Menu</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CartEmptyComponent;
