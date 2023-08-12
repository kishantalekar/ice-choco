import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Entypo, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { color } from "../styles/colors";
import CartItem from "../components/CartItem";
import { SafeAreaView } from "react-native-safe-area-context";
import { createUser } from "../sanity";
import { addOrder } from "../api/firebaseApi";
import { getCurrentTime } from "../moment";
import CartEmptyComponent from "../components/CartEmptyComponent";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../firebaseConfig";
import { addToCart, clearFromCart } from "../features/cartSlice";
import { useToast } from "react-native-toast-notifications";
import { sendOrderDetailsToNodejs } from "../api/nodejsApi";
import CurrentLocation from "../components/CurrentLocation";

const CartScreen = () => {
  const [itemsTotal, setItemsTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState("");
  const cartItems = useSelector((state) => state.cart.items);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const toast = useToast();
  const calculateTotalPrice = (cartItems) => {
    let totalPrice = 0;
    for (const item of cartItems) {
      totalPrice += item.price * item.quantity;
    }
    return totalPrice;
  };
  useEffect(() => {
    const res = calculateTotalPrice(cartItems);
    setItemsTotal(res);
  }, [cartItems]);

  const handleOrder = async () => {
    setLoading(true);
    try {
      const productIdsWithQuantity = getProductIdsWithQuantity(cartItems);
      const { uid, displayName, email } = auth.currentUser;
      const orderDetails = {
        userId: uid,
        items: productIdsWithQuantity,
        time: getCurrentTime(),
        name: displayName,
        email: email,
        totalPrice: itemsTotal + 1 + 40,
        status: "Pending",
        address: address || "near karwar ,581328",
      };
      await sendOrderDetailsToNodejs(orderDetails);
      addOrder(orderDetails, setLoading);
      dispatch(clearFromCart());
      // navigation.navigate("MainTab");
    } catch (error) {
    } finally {
      setLoading(false);
      toast.show("Your orders has been placed", {
        type: "success",
        duration: 4000,
      });
    }
  };
  const getProductIdsWithQuantity = (products) => {
    return products.map((product) => ({
      productId: product._id,
      quantity: product.quantity,
    }));
  };

  const location = useSelector((state) => state?.location?.location);

  useEffect(() => {
    const extractAddressInfo = (address) => {
      const { district, city, postalCode } = address;
      const addressParts = [];

      if (district) {
        addressParts.push(district);
      }
      if (city) {
        addressParts.push(city);
      }
      if (postalCode) {
        addressParts.push(postalCode);
      }

      return addressParts.join(", ");
    };
    setAddress(extractAddressInfo(location));
  }, []);

  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Entypo name="chevron-small-left" size={28} color="black" />
          </TouchableOpacity>
          <Text style={styles.title}>Your Cart</Text>
        </View>
        {cartItems?.length === 0 ? (
          <CartEmptyComponent />
        ) : (
          <>
            <View style={styles.deliveryContainer}>
              <Ionicons name="ios-timer" size={24} color={color.pink} />
              <Text style={styles.deliveryText}>Delivery in 60-70 min</Text>
            </View>
            <ScrollView
              style={styles.itemAddedContainer}
              showsVerticalScrollIndicator={false}
            >
              <Text style={styles.itemAddedText}>ITEM(S) ADDED</Text>
              <View style={styles.cartItemsContainer}>
                {cartItems?.map((item) => (
                  <CartItem key={item._id} item={item} />
                ))}
              </View>

              <View
                style={{
                  flex: 1,
                  marginTop: 20,
                  gap: 10,
                  marginHorizontal: 5,
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    fontWeight: 500,
                    fontSize: 14,
                    color: "gray",
                  }}
                >
                  BILL SUMMARY
                </Text>
                <View style={styles.billSummaryContainer}>
                  <View style={styles.billSummaryRow}>
                    <View>
                      <Text style={{ fontWeight: 400, fontSize: 12 }}>
                        item total
                      </Text>
                      <Text
                        style={{ fontSize: 8, color: "gray", fontWeight: 400 }}
                      >
                        Includes 1rs to feeding indian donation{" "}
                      </Text>
                    </View>
                    <View>
                      <Text style={{ fontFamily: "sans-serif", fontSize: 10 }}>
                        {" "}
                        {"\u20B9"}
                        {itemsTotal + 1}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.billSummaryRow}>
                    <View>
                      <Text style={{ fontWeight: 500, fontSize: 12 }}>
                        Delivery charges
                      </Text>
                      <Text
                        style={{ fontSize: 10, color: "gray", fontWeight: 500 }}
                      >
                        fully goes to them for their time and effort
                      </Text>
                    </View>
                    <View
                      style={{
                        fontSize: 10,
                        fontWeight: 400,
                        fontFamily: "sans-serif",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 10,
                          fontWeight: 400,
                          fontFamily: "sans-serif",
                        }}
                      >
                        {" "}
                        {"\u20B9"}40
                      </Text>
                    </View>
                  </View>
                  <View style={styles.billSummaryRow}>
                    <View>
                      <Text style={{ fontWeight: 500, fontSize: 12 }}>
                        Address
                      </Text>
                      <Text
                        style={{ fontSize: 10, color: "gray", fontWeight: 500 }}
                      >
                        {address}
                      </Text>
                    </View>
                    <View
                      style={{
                        fontSize: 10,
                        fontWeight: 400,
                        fontFamily: "sans-serif",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 10,
                          fontWeight: 400,
                          fontFamily: "sans-serif",
                        }}
                      >
                        {" "}
                        {"\u20B9"}40
                      </Text>
                    </View>
                  </View>
                  <View style={styles.billSummaryRow}>
                    <Text style={{ fontWeight: "bold", fontSize: 13 }}>
                      Grand Total
                    </Text>
                    <Text
                      style={{
                        fontSize: 11,
                        fontWeight: "bold",
                        fontFamily: "sans-serif",
                      }}
                    >
                      {"\u20B9"}
                      {itemsTotal + 1 + 40}
                    </Text>
                  </View>
                </View>
              </View>
              <View
                style={{
                  marginTop: 20,
                  marginBottom: 20,
                  gap: 10,
                  marginHorizontal: 5,
                }}
              >
                <View style={styles.cancellationPolicyContainer}>
                  <Text
                    style={{
                      fontSize: 9,
                      color: "gray",
                      fontWeight: 500,
                      fontFamily: "sans-serif",
                    }}
                  >
                    100% cancellation fee will be applicable if you decide to
                    cancel the order anytime after order placement.Avoid
                    cancellation as it leads to food wastage{" "}
                  </Text>
                </View>
              </View>
            </ScrollView>
          </>
        )}
      </SafeAreaView>
      {cartItems.length ? (
        <View style={styles.bottomBar}>
          <Text style={styles.totalText}>
            Total : {"\u20B9"} {itemsTotal + 1 + 40}
          </Text>
          {auth.currentUser !== null ? (
            <TouchableOpacity
              style={styles.placeOrderButton}
              onPress={handleOrder}
            >
              {loading ? (
                <ActivityIndicator color={"white"} />
              ) : (
                <Text style={styles.placeOrderButtonText}>Place order</Text>
              )}
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.placeOrderButton}
              onPress={() => navigation.navigate("Login")}
            >
              <Text style={styles.placeOrderButtonText}>Login to Order</Text>
            </TouchableOpacity>
          )}
        </View>
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
    backgroundColor: "white",
    // marginHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "sans-serif",
  },
  deliveryContainer: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 10,
    elevation: 6,
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  deliveryText: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: -4,
  },
  itemAddedContainer: {
    marginTop: 30,
  },
  itemAddedText: {
    textAlign: "center",
    fontWeight: "600",
    fontSize: 16,
    fontFamily: "sans-serif",
  },
  cartItemsContainer: {
    marginTop: 20,
  },
  billSummaryContainer: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 10,
    elevation: 6,
    gap: 10,
  },
  billSummaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 5,
  },
  cancellationPolicyContainer: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 10,
    elevation: 6,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  bottomBar: {
    justifyContent: "space-between",
    marginTop: 10,
    backgroundColor: "white",
    // alignItems: "flex-end",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderTopColor: "gray",
    borderTopWidth: 0.1,
    elevation: 10,
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 20,
  },
  totalText: {
    fontWeight: "bold",
    fontSize: 16,
    paddingLeft: 10,
  },
  placeOrderButton: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: color.darkPink,
    borderRadius: 12,
  },
  placeOrderButtonText: {
    color: "white",
    fontSize: 10,
    fontWeight: "500",
    fontFamily: "sans-serif",
  },
});

export default CartScreen;
