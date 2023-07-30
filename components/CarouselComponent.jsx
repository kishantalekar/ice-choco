import { View, Text, ScrollView, Image, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { SliderBox } from "react-native-image-slider-box";
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
    <View style={{ height: 200, marginBottom: 20 }}>
      {sanityImages?.length > 0 && (
        <SliderBox
          images={sanityImages?.map((image) => ({
            uri: urlFor(image.image).url(),
          }))}
          // onCurrentImagePressed={(index) => console.warn(`image ${index} pressed`)}
          // currentImageEmitter={(index) => console.warn(`current pos is: ${index}`)}
          sliderBoxHeight={200}
          dotColor={color.pink}
          inactiveDotColor="#90A4AE"
          resizeMethod={"resize"}
          resizeMode={"contain"}
          paginationBoxStyle={{
            position: "absolute",
            bottom: 0,
            padding: 0,
            alignItems: "center",
            alignSelf: "center",
            justifyContent: "center",
            paddingVertical: 10,
          }}
          dotStyle={{
            width: 10,
            height: 10,
            borderRadius: 5,
            marginHorizontal: 0,
            padding: 0,
            margin: 0,
            backgroundColor: "rgba(128, 128, 128, 0.92)",
          }}
          ImageComponentStyle={{
            borderRadius: 15,
            width: "90%",
            marginTop: 5,
            // marginBottom: 10,
          }}
          imageLoadingColor="#2196F3"
        />
      )}
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
