import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { getCategories, urlFor } from "../sanity";
import { color } from "../styles/colors";
import Button from "./Button";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const Categories = ({ refreshing }) => {
  const [categories, setCategories] = useState([]);
  const navigation = useNavigation();
  const getCategoriesFromSanity = async () => {
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getCategoriesFromSanity();
  }, []);
  useEffect(() => {
    if (refreshing) getCategoriesFromSanity();
  }, [refreshing]);
  const handleNavigation = (categoryId, name) => {
    navigation.navigate("IceCreamList", {
      id: categoryId,
      type: "category",
      name: name,
    });
  };
  return (
    <View style={{ marginHorizontal: 10, marginVertical: 20 }}>
      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
          fontFamily: "sans-serif",
          paddingLeft: 10,
        }}
      >
        Variety of Ice Creams
      </Text>
      <View
        style={{
          flexWrap: "wrap",
          flexDirection: "row",
          justifyContent: "space-between",
          marginVertical: 10,
        }}
      >
        {categories?.map((category) => {
          return (
            <TouchableOpacity
              key={category._id}
              style={{
                width: 75,
                height: 75,
                borderRadius: 200,
                margin: 10,
                // backgroundColor: "green",
                marginBottom: 20,
                gap: 4,
                // borderColor: color.brightYellow,
                // borderWidth: 0.8,
                elevation: 1,
              }}
              onPress={() => handleNavigation(category?._id, category.name)}
            >
              <Image
                source={{ uri: urlFor(category?.image).url() }}
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: 100,
                }}
                resizeMode="contain"
              />
              <Text
                style={{
                  textAlign: "center",
                  color: color.gray,
                  fontWeight: "bold",
                  fontSize: 14,
                }}
              >
                {category.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
      {/* <TouchableOpacity
        style={{
          borderWidth: 0.8,
          borderColor: color.gray,
          padding: 2,
          borderRadius: 18,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          marginTop: 20,
        }}
      >
        <Text
          style={{ textAlign: "center", color: "gray", fontWeight: "bold" }}
        >
          See More{" "}
        </Text>
        <Entypo name="chevron-small-down" size={26} color={color.gray} />
      </TouchableOpacity> */}
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
export default Categories;
