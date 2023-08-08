import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { AirbnbRating } from "react-native-ratings";
const RatingComponent = ({ handleRatingChange, rating }) => {
  return (
    <View style={styles.ratingContainer}>
      {/* Rating section */}

      <AirbnbRating
        onFinishRating={(r) => handleRatingChange(r)}
        reviews={["Terrible", "Bad", "Average", "Good", "Excellent"]}
        imageSize={15}
        ratingColor={"pink"}
        defaultRating={rating || 0}
        ratingBackgroundColor={"pink"}
        size={15}
      />
      <Text style={styles.experienceText}>How was your Experience?</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  ratingContainer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 4,
  },
  experienceText: {
    color: "gray",
    fontSize: 14,
    textAlign: "center",

    marginBottom: -30,
    paddingLeft: 20,
    paddingTop: 20,
    // position: "absolute",
  },
});
export default RatingComponent;
