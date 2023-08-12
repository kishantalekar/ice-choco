import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { color } from "../styles/colors";
import { getImages, urlFor } from "../sanity";

const CarouselComponent = ({ refreshing }) => {
  const [sanityImages, setSanityImages] = useState([]);
  const getImagesFromSanity = async () => {
    try {
      const data = await getImages();

      setSanityImages(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getImagesFromSanity();
  }, []);
  useEffect(() => {
    if (refreshing) getImagesFromSanity();
  });
  return (
    <View style={{ height: 200, marginBottom: 20, flex: 1 }}>
      <ScrollView
        // style={{
        //   flexWrap: "wrap",
        //   flexDirection: "row",
        //   justifyContent: "space-between",
        //   marginVertical: 10,
        // }}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingVertical: 10, paddingHorizontal: 5 }}
      >
        {sanityImages?.map((image) => {
          return (
            <TouchableOpacity
              key={image._id}
              style={{
                width: 250,
                height: 150,
                borderRadius: 200,
                margin: 10,
                // backgroundColor: "green",
                marginBottom: 20,
                gap: 4,
                // borderColor: color.brightYellow,
                // borderWidth: 0.8,
                elevation: 1,
              }}
              // onPress={() => handleNavigation(category?._id, category.name)}
            >
              <Image
                source={{ uri: urlFor(image?.image).url() }}
                style={{
                  width: "100%",
                  height: "100%",
                  // borderRadius: 100,
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor: color.darkPink,
                }}
                resizeMode="cover"
              />
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    marginRight: 10,
    width: 300,
    height: 200,
    borderRadius: 10,
    overflow: "hidden",
  },
  image: {
    width: 300,
    height: 200,
    resizeMode: "contain",
  },
});

export default CarouselComponent;
