import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { frozenDesertAppInfo } from "../helpers/data";
const AboutScreen = () => {
  const navigation = useNavigation();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
        paddingHorizontal: 20,
        paddingTop: 50,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          paddingBottom: 20,
          gap: 20,
        }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-outline" size={24} color="black" />
        </TouchableOpacity>
        <Text style={{ fontWeight: "bold", fontSize: 22 }}>Frozen Factory</Text>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ marginBottom: 20, paddingBottom: 20 }}
      >
        {frozenDesertAppInfo.map((data) => (
          <View key={data.title} style={{ gap: 5, marginVertical: 10 }}>
            <Text style={{ fontWeight: "bold", fontSize: 14 }}>
              {data.title}
            </Text>
            <Text
              style={{ fontSize: 10, color: "gray", fontFamily: "sans-serif" }}
            >
              {data.description}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default AboutScreen;
