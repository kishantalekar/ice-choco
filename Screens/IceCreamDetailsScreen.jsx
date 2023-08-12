import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { urlFor } from "../sanity";
import { Ionicons, FontAwesome5, AntDesign, Entypo } from "@expo/vector-icons";
import { color } from "../styles/colors";
import { Rating } from "react-native-ratings";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  decreaseQuantity,
  removeFromCart,
} from "../features/cartSlice";
import { addToFavorite, removeFromFavourite } from "../features/favouriteSlice";

const IceCreamDetailsScreen = ({ route }) => {
  const { iceCream } = route.params;
  const dispatch = useDispatch();

  const navigation = useNavigation();
  const cartItems = useSelector((state) => state.cart.items);
  const handleAddToCart = () => {
    try {
      const {
        _id,
        brand,
        category,
        image,
        name,
        price,
        short_description,
        rating,
      } = iceCream;
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
  const isItemInCart = cartItems.some(
    (cartItem) => cartItem._id == iceCream._id
  );

  const handleDecreement = () => {
    dispatch(decreaseQuantity(iceCream._id));
  };
  const handleRemoveFromCart = () => {
    dispatch(removeFromCart(iceCream._id));
  };
  const presentItem = cartItems.filter((item) => item._id == iceCream._id);

  const favouriteItems = useSelector((state) => state.favourite.items);

  const handleAddToFavourite = () => {
    dispatch(addToFavorite(iceCream));
  };
  const isFavouriteItem = favouriteItems.some(
    (item) => item._id == iceCream._id
  );
  const handleRemoveFromFavourite = () => {
    dispatch(removeFromFavourite(iceCream._id));
  };
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: urlFor(iceCream?.image).url() }}
          style={styles.image}
        />
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back-outline" size={24} color={color.pink} />
          </TouchableOpacity>
          <Text style={styles.headerText}>Strawberry</Text>
          {isFavouriteItem ? (
            <TouchableOpacity onPress={handleRemoveFromFavourite}>
              <AntDesign name="heart" size={24} color="#f072a0" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={handleAddToFavourite}>
              <AntDesign name="hearto" size={24} color="#f072a0" />
            </TouchableOpacity>
          )}
        </View>
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.name}>{iceCream?.name}</Text>
        <View style={styles.ratingContainer}>
          <Rating
            ratingCount={5}
            imageSize={14}
            onFinishRating={() => {}}
            defaultRating={iceCream?.rating || 3}
            size={12}
            readonly={true}
          />
        </View>
        <Text style={styles.description}>{iceCream?.short_description}</Text>
        <View style={styles.footer}>
          <View style={styles.priceContainer}>
            <Text style={styles.priceLabel}>Total Price</Text>
            <Text style={styles.price}>
              {"\u20B9"}
              {iceCream.price}
            </Text>
          </View>
          {!isItemInCart ? (
            <TouchableOpacity
              style={styles.addButton}
              onPress={handleAddToCart}
            >
              <Text style={styles.addButtonText}>
                {isItemInCart ? "Added To Cart" : "  Add to Cart"}
              </Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.quantityContainer}>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={handleDecreement}
              >
                <Entypo name="minus" size={16} color={color.darkPink} />
              </TouchableOpacity>
              <Text style={styles.quantityText}>
                {presentItem[0]?.quantity}
              </Text>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={handleAddToCart}
              >
                <Entypo name="plus" size={16} color={color.darkPink} />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  imageContainer: {
    height: 450,
    flex: 2,
  },
  image: {
    width: "100%",
    height: "100%",
    borderBottomLeftRadius: 100,
  },
  header: {
    position: "absolute",
    justifyContent: "space-between",
    flexDirection: "row",
    top: 45,
    paddingHorizontal: 25,
    width: "100%",
  },
  headerText: {
    fontWeight: "500",
    fontSize: 22,
    color: "white",
  },
  detailsContainer: {
    backgroundColor: "white",
    marginHorizontal: 25,
    flex: 1,
    paddingTop: 10,
    gap: 5,
  },
  name: {
    fontWeight: "bold",
    fontSize: 28,
    textTransform: "capitalize",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  description: {
    color: "gray",
    fontSize: 14,
    fontWeight: "400",
    lineHeight: 18,
    paddingTop: 5,
  },
  footer: {
    position: "absolute",
    bottom: 20,
    flexDirection: "row",
  },
  priceContainer: {
    flex: 1,
    paddingLeft: 10,
  },
  priceLabel: {
    fontWeight: "400",
    fontSize: 12,
  },
  price: {
    fontSize: 28,
    fontWeight: "bold",
  },
  addButton: {
    paddingHorizontal: 20,
    borderRadius: 10,
    backgroundColor: "#ef71a0",
    alignItems: "center",
    paddingVertical: 10,
    elevation: 10,
  },
  addButtonText: {
    color: "white",
    fontWeight: "500",
    fontSize: 18,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 0.4,
    borderColor: color.pink,
    justifyContent: "space-between",
    width: 100,
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: "#fce8f0",
    gap: 4,
  },
  quantityButton: {
    padding: 5,
  },
  quantityText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default IceCreamDetailsScreen;
