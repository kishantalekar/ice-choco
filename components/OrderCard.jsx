import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import OrderItemCard from "./OrderItemCard";

import { color } from "../styles/colors";
import { addRatingToOrders, updateOrderStatus } from "../api/firebaseApi";
import { Picker } from "@react-native-picker/picker";
import RatingComponent from "./RatingComponent";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
const OrderCard = ({ order, adminPage, setIsStatusChange }) => {
  const [selectedValue, setSelectedValue] = useState(
    order?.status || "Pending"
  );
  // const [selectedValue, setSelectedValue] = useState("Approved");

  const handleRatingChange = (r) => {
    addRatingToOrders(order.id, r);
  };
  const handleStatusChange = async (status) => {
    const data = await updateOrderStatus(order.id, status);
    setIsStatusChange((prev) => !prev);
  };
  return (
    <View style={styles.container}>
      {adminPage && (
        <View style={{ paddingVertical: 10 }}>
          <Text style={{ fontSize: 14, fontWeight: 400 }}>{order.email}</Text>
        </View>
      )}
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
      {adminPage && adminPage ? (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 10,
          }}
        >
          <Text
            style={{ fontSize: 18, fontWeight: 400, fontFamily: "sans-serif" }}
          >
            Order status
          </Text>
          <View
          // style={{ borderWidth: 1, borderColor: "gray", borderRadius: 5 }}
          >
            <Picker
              selectedValue={selectedValue}
              onValueChange={(itemValue, itemIndex) => {
                setSelectedValue(itemValue);
                handleStatusChange(itemValue);
              }}
              style={{ width: 150 }}
            >
              <Picker.Item label="Pending" value="Pending" />
              <Picker.Item label="Approved" value="Approved" />
              <Picker.Item label="Delivered" value="Delivered" />
              {/* Add more Picker.Item components as needed */}
            </Picker>
          </View>
        </View>
      ) : selectedValue === "Pending" ? (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 10,
          }}
        >
          <Text
            style={{ fontSize: 16, fontWeight: 400, fontFamily: "sans-serif" }}
          >
            Order Status:
          </Text>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <Ionicons name="timer-sharp" size={20} color={color.darkPink} />
            <Text
              style={{
                fontSize: 16,
                fontWeight: 400,
                fontFamily: "sans-serif",
              }}
            >
              Pending
            </Text>
          </View>
        </View>
      ) : selectedValue === "Approved" ? (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 10,
          }}
        >
          <Text
            style={{ fontSize: 16, fontWeight: 400, fontFamily: "sans-serif" }}
          >
            Order Status:
          </Text>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <Ionicons name="checkmark-circle" size={24} color={color.green} />
            <Text
              style={{
                fontSize: 16,
                fontWeight: 400,
                fontFamily: "sans-serif",
              }}
            >
              Approved
            </Text>
          </View>
        </View>
      ) : (
        <>
          <View
            style={{
              marginTop: 10,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{
                fontSize: 15,
                fontWeight: 400,
                fontFamily: "sans-serif",
              }}
            >
              Order Status:
            </Text>
            <View
              style={{ flexDirection: "row", gap: 10, alignItems: "center" }}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: 400,
                  fontFamily: "sans-serif",
                }}
              >
                Delivered
              </Text>
              <MaterialCommunityIcons
                name="truck-check"
                size={24}
                color={color.blue}
              />
            </View>
          </View>
          <RatingComponent
            rating={order?.rating}
            handleRatingChange={handleRatingChange}
          />
        </>
      )}
      <View
        style={{ borderTopWidth: 0.4, borderColor: color.gray, marginTop: 10 }}
      ></View>
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
