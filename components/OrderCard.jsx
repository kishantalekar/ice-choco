import { View, Text, StyleSheet } from "react-native";
import React from "react";
import OrderItemCard from "./OrderItemCard";
import { AirbnbRating } from "react-native-ratings";
import { color } from "../styles/colors";
import { addRatingToOrders } from "../api/firebaseApi";

const OrderCard = ({ order }) => {
  const handleRatingChange = (r) => {
    addRatingToOrders(order.id, r);
  };
  return (
    <View style={styles.container}>
      {/* Render order items */}
      {order?.items?.map((item) => (
        <OrderItemCard key={item.productId} item={item} />
      ))}

      {/* Horizontal line */}
      <View style={styles.horizontalLine} />

      {/* Order details */}
      <View style={styles.detailsContainer}>
        <Text style={styles.timeText}>{order?.time}</Text>
        <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
          <Text style={{ fontWeight: "bold", fontSize: 18 }}>Total: </Text>
          <Text style={styles.totalPriceText}>
            {"\u20B9"} {order?.totalPrice}
          </Text>
        </View>
      </View>

      {/* Rating section */}
      <View style={styles.ratingContainer}>
        <AirbnbRating
          onFinishRating={(r) => handleRatingChange(r)}
          reviews={["Terrible", "Bad", "Average", "Good", "Excellent"]}
          imageSize={15}
          ratingColor={"pink"}
          defaultRating={order?.rating || 0}
          ratingBackgroundColor={"pink"}
          size={15}
        />
        <Text style={styles.experienceText}>How was your Experience?</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderColor: "gray",
    borderWidth: 0.4,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    paddingRight: 40,
    marginVertical: 20,
    backgroundColor: "white",
    elevation: 10,
  },
  horizontalLine: {
    borderBottomColor: "gray",
    borderWidth: 0.2,
    marginVertical: 10,
  },
  detailsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  timeText: {
    color: "gray",
    fontWeight: "400",
    fontSize: 15,
  },
  totalPriceText: {
    fontSize: 16,
    fontWeight: 400,
  },
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

export default OrderCard;
