import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { urlFor } from "../sanity";
import { color } from "../styles/colors";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import {
  addToCart,
  decreaseQuantity,
  removeFromCart,
} from "../features/cartSlice";
import { useDispatch, useSelector } from "react-redux";

const IceCreamCard = ({ ice }) => {
  const navigation = useNavigation();
  const handlePress = () => {
    navigation.navigate("IceCreamDetails", { iceCream: ice });
  };
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const handleAddToCart = () => {
    try {
      const { _id, brand, category, image, name, price, short_description } =
        ice;
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

  const isItemInCart = cartItems.some((cartItem) => cartItem._id === ice._id);
  const presentItem = cartItems.filter((item) => item._id == ice._id);
  const handleDecreement = () => {
    dispatch(decreaseQuantity(ice._id));
  };
  const handleRemoveFromCart = () => {
    dispatch(removeFromCart(ice._id));
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => handlePress()} // Call the onPressItem function when the component is clicked
    >
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: urlFor(ice?.image).url() }}
          style={styles.image}
          resizeMode="contain"
        />
      </View>
      <View style={styles.textContainer}>
        <View style={styles.nameContainer}>
          <Text style={styles.name}>{ice?.name.substring(0, 12)}</Text>
          <View
            style={[
              styles.ratingContainer,
              {
                backgroundColor:
                  ice?.rating > 3 ? color.green : color.brightYellow,
              },
            ]}
          >
            <Text style={styles.ratingText}>{ice?.rating}</Text>
            <AntDesign name="star" size={8} color="white" />
          </View>
        </View>
        <Text style={styles.description}>
          {ice?.short_description.length > 30
            ? `${ice?.short_description.substring(0, 30)}...`
            : ice?.short_description}{" "}
        </Text>
        <View>
          <View style={styles.priceContainer}>
            <Text style={styles.price}>
              {"\u20B9"}
              {ice?.price}
            </Text>
            {!isItemInCart ? (
              <TouchableOpacity
                style={{
                  paddingHorizontal: 10,
                  borderRadius: 10,
                  backgroundColor: "#ef71a0",
                  alignItems: "center",
                  paddingVertical: 4,
                  elevation: 10,
                }}
                onPress={handleAddToCart}
              >
                <Text
                  style={{
                    color: "white",
                    fontWeight: 400,
                    fontSize: 12,
                    fontFamily: "sans-serif",
                  }}
                >
                  Add to Cart
                </Text>
              </TouchableOpacity>
            ) : (
              <View style={styles.quantityContainer}>
                <TouchableOpacity
                  style={styles.quantityButton}
                  onPress={handleDecreement}
                >
                  <Entypo name="minus" size={14} color={color.darkPink} />
                </TouchableOpacity>
                <Text style={styles.quantityText}>
                  {presentItem[0]?.quantity}
                </Text>
                <TouchableOpacity
                  style={styles.quantityButton}
                  onPress={handleAddToCart}
                >
                  <Entypo name="plus" size={14} color={color.darkPink} />
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    elevation: 3,
    borderWidth: 0.8,
    borderColor: "white",
    backgroundColor: "white",
    borderRadius: 12,
    flexDirection: "row",
    paddingVertical: 10,
    paddingLeft: 10,
    marginHorizontal: 20,
    paddingHorizontal: 10,
  },
  imageContainer: {
    width: 120,
    height: 120,
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor: "gray",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  image: {
    width: "100%",
    height: "100%",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  textContainer: {
    paddingBottom: 10,
    paddingTop: 10,
    paddingHorizontal: 10,
    gap: 10,
    justifyContent: "space-between",
  },
  nameContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  name: {
    textTransform: "capitalize",
    fontWeight: 400,
    fontSize: 14,
    fontFamily: "sans-serif",
  },
  ratingContainer: {
    paddingHorizontal: 4,
    borderRadius: 4,
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
  ratingText: {
    color: "white",
    fontWeight: 600,
    fontSize: 10,
  },
  description: {
    color: color.gray,
    fontSize: 10,
    fontWeight: 400,
    maxWidth: 200,
    fontFamily: "sans-serif",
    width: 150,
  },
  priceContainer: {
    flexDirection: "row",
    // justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
  },
  price: {
    color: "#ef71a0",
    fontWeight: 400,
    fontSize: 12,
    fontFamily: "sans-serif",
  },
  addToCartButton: {
    padding: 4,
    backgroundColor: color.pink,
    borderRadius: 10,
  },
  addToCartText: {
    color: "white",
    fontSize: 12,
    fontFamily: "sans-serif",
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
    fontSize: 16,
  },
});

export default IceCreamCard;
