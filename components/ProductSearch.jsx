import { View, Text, ActivityIndicator } from "react-native";
import { useEffect, useState } from "react";
import { getIceCreamByCategoryOrBrandID } from "../sanity";
import Header from "../components/Header";
import IceCreamCard from "../components/IceCreamCard";
import { Entypo } from "@expo/vector-icons";
import { color } from "../styles/colors";

const ProductSearch = ({ iceCreams, searchQuery, loading, setLoading }) => {
  return (
    <View style={{ flex: 1 }}>
      <View style={{ marginHorizontal: 20, flex: 1 }}>
        <Text
          style={{
            fontWeight: 500,
            fontSize: 22,
            textTransform: "capitalize",
          }}
        >
          Search results for {searchQuery}
        </Text>
        {iceCreams?.length > 1 ? (
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              gap: 15,
              marginTop: 20,
            }}
          >
            {iceCreams.map((ice, i) => (
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
            {loading ? (
              <ActivityIndicator color={color.brightYellow} size={"large"} />
            ) : (
              <>
                <Text style={{ color: "gray", fontWeight: 500, fontSize: 18 }}>
                  No result found
                </Text>
                <Entypo name="emoji-sad" size={20} color="gray" />
              </>
            )}
          </View>
        )}
      </View>
    </View>
  );
};

export default ProductSearch;
