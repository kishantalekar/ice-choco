import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useEffect, useState } from "react";
import { getBrands } from "../sanity";
import { color } from "../styles/colors";

import { useNavigation } from "@react-navigation/native";

const PopularBrands = ({ refreshing }) => {
  const [brands, setBrands] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const getBrandsFromSanity = async () => {
      try {
        const data = await getBrands();
        console.log(data, "from nodejs");
        setBrands(data);
      } catch (error) {
        console.log(error);
      }
    };
    getBrandsFromSanity();
  }, []);
  useEffect(() => {
    const getBrandsFromSanity = async () => {
      try {
        const data = await getBrands();
        console.log(data, "from nodejs");
        setBrands(data);
      } catch (error) {
        console.log(error);
      }
    };
    if (refreshing) getBrandsFromSanity();
  }, [refreshing]);

  const handleNavigation = (id, name) => {
    navigation.navigate("IceCreamList", {
      id: id,
      type: "brand",
      name: name,
    });
  };

  return (
    <View style={{ marginHorizontal: 10, marginTop: 20 }}>
      <Text
        style={{ fontSize: 20, fontWeight: "bold", fontFamily: "sans-serif" }}
      >
        Popular on Ice choco
      </Text>
      <ScrollView
        style={{
          marginVertical: 10,
        }}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {brands &&
          brands?.map((brand) => {
            return (
              <TouchableOpacity
                key={brand._id}
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 200,
                  margin: 10,
                  marginBottom: 20,
                  gap: 4,
                }}
                onPress={() => handleNavigation(brand?._id, brand?.name)}
              >
                <Image
                  source={{ uri: brand?.imageUrl }}
                  style={{
                    width: "90%",
                    height: "90%",
                    borderRadius: 50,
                    borderWidth: 1.5,
                    borderColor: color.blue,
                  }}
                  resizeMode="contain"
                />
                <Text
                  style={{
                    textAlign: "center",
                    color: color.gray,
                    fontWeight: "bold",
                    fontSize: 14,
                    textTransform: "capitalize",
                  }}
                >
                  {brand?.name}
                </Text>
              </TouchableOpacity>
            );
          })}
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  seeMoreBtnText: {
    color: color.gray,
    fontSize: 18,
  },
  seeMoreBtn: {
    borderColor: color.gray,
    borderWidth: 0.8,
    padding: 10,
  },
});
export default PopularBrands;
