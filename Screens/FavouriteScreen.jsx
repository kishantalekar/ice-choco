import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Entypo, Ionicons } from "@expo/vector-icons";
import IceCreamCard from "../components/IceCreamCard";
import { useNavigation } from "@react-navigation/native";
const FavouriteScreen = () => {
  const dispatch = useDispatch();
  const favouriteItems = useSelector((state) => state.favourite.items);
  console.log(favouriteItems, "from favaorite ssveen");
  const navigation = useNavigation();
  return (
    <View
      style={{
        backgroundColor: "white",
        paddingTop: 50,
        flex: 1,
        paddingHorizontal: 20,
        gap: 20,
      }}
    >
      <View style={{ flexDirection: "row", gap: 20 }}>
        <TouchableOpacity
          // style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back-outline" size={24} color="black" />
        </TouchableOpacity>
        <Text
          style={{
            fontWeight: 500,
            fontSize: 22,
            textTransform: "capitalize",
          }}
        >
          Your Favourite Orders
        </Text>
      </View>
      <View style={{ flex: 1 }}>
        {favouriteItems?.length >= 1 ? (
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              flexWrap: "wrap",
              gap: 10,
            }}
          >
            {favouriteItems.map((ice, i) => (
              <IceCreamCard key={i} ice={ice} />
            ))}
          </View>
        ) : (
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              flex: 1,
              flexDirection: "row",
              gap: 5,
            }}
          >
            <Text style={{ color: "gray", fontWeight: 500, fontSize: 18 }}>
              Looks like the list is empty"
            </Text>
            <Entypo name="emoji-sad" size={20} color="gray" />
          </View>
        )}
      </View>
    </View>
  );
};

export default FavouriteScreen;
