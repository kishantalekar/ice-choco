import { View, Text } from "react-native";
import React from "react";
import IceCreamCard from "./IceCreamCard";

const FeaturedRow = ({ featured }) => {
  return (
    <View style={{ marginHorizontal: 20, marginVertical: 15, gap: 10 }}>
      <Text
        style={{ fontSize: 18, fontWeight: "bold", fontFamily: "sans-serif" }}
      >
        {featured?.name}
      </Text>
      <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 15 }}>
        {featured?.iceCream?.map((ice, i) => (
          <IceCreamCard key={i} ice={ice} />
        ))}
      </View>
    </View>
  );
};

export default FeaturedRow;
