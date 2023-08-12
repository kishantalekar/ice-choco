import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { urlFor } from "../sanity";
import { color } from "../styles/colors";
import { AntDesign, Entypo, MaterialIcons } from "@expo/vector-icons";
import { AddItemToCart } from "../helpers/cart";
import { useDispatch } from "react-redux";
import {
  addToCart,
  decreaseQuantity,
  removeFromCart,
} from "../features/cartSlice";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    try {
      const { _id, brand, category, image, name, price, short_description } =
        item;
      dispatch(
        addToCart({
          _id,
          brand,
          category,
          image,
          name,
          price,
          short_description,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };
  const handleDecreement = () => {
    dispatch(decreaseQuantity(item._id));
  };
  const handleRemoveFromCart = () => {
    dispatch(removeFromCart(item._id));
  };
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: urlFor(item.image).url() }}
          style={styles.image}
          resizeMode="contain"
        />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.ml}>{item.ml ? item.ml : "200"}ml</Text>
        <Text style={styles.price}>
          {"\u20B9"}
          {item.price}
        </Text>
      </View>
      <View style={styles.actionsContainer}>
        <TouchableOpacity
          style={styles.removeButton}
          onPress={handleRemoveFromCart}
        >
          <AntDesign name="delete" size={22} color={color.darkPink} />
        </TouchableOpacity>
        <View style={styles.quantityContainer}>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={handleDecreement}
          >
            <Entypo name="minus" size={14} color={color.darkPink} />
          </TouchableOpacity>
          <Text style={styles.quantityText}>{item.quantity}</Text>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={handleAddToCart}
          >
            <Entypo name="plus" size={14} color={color.darkPink} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    elevation: 10,
    borderRadius: 10,
    backgroundColor: "white",
    padding: 10,
    margin: 10,
    paddingVertical: 20,
    flexDirection: "row",
  },
  imageContainer: {
    width: 100,
    height: 100,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 5,
  },
  infoContainer: {
    flex: 1,
    marginLeft: 10,
    justifyContent: "space-between",
  },
  name: {
    textTransform: "capitalize",
    fontWeight: 400,
    fontSize: 10,
  },
  ml: {
    color: "gray",
    fontSize: 10,
  },
  price: {
    color: color.pink,
    fontSize: 12,
  },
  actionsContainer: {
    justifyContent: "space-between",
    alignItems: "center",
  },
  removeButton: {
    // backgroundColor: "red",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    // marginRight: -50,
  },
  removeButtonText: {
    color: "white",
    fontSize: 12,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 0.4,
    borderColor: color.pink,
    justifyContent: "space-between",
    width: 80,
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: "#fce8f0",
    gap: 4,
  },
  quantityButton: {
    padding: 5,
  },
  quantityText: {
    fontSize: 12,
  },
});

export default CartItem;
