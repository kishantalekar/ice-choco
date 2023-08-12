import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { getOrders } from "../api/firebaseApi";
import { auth } from "../firebaseConfig";
import OrderCard from "../components/OrderCard";
import { useNavigation } from "@react-navigation/native";

const OrderScreen = () => {
  const navigation = useNavigation();
  const { email } = auth?.currentUser;
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getOrderFromDb = async () => {
      setLoading(true);
      try {
        const data = await getOrders(email, setOrders);
        console.log(orders, "fromorders");
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };
    getOrderFromDb();
    //  getOrders(email, setOrders);

    // Unsubscribe from the snapshot listener when the component unmounts
  }, []);

  return (
    <SafeAreaView
      style={{
        paddingHorizontal: 15,
        paddingTop: 10,
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
          marginBottom: 20,
        }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={{ fontSize: 22, fontWeight: 500 }}>Order History</Text>
      </View>
      {loading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size={"large"} />
        </View>
      ) : (
        <>
          {orders && orders?.length == 0 ? (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                gap: 10,
              }}
            >
              <Image
                source={require("../assets/7612.jpg")}
                style={{ width: 200, height: 200 }}
              />

              <Text style={{ fontSize: 18, textTransform: "capitalize" }}>
                Looks like you have not order anything
              </Text>
            </View>
          ) : (
            <ScrollView showsVerticalScrollIndicator={false}>
              {orders &&
                orders?.map((order) => (
                  <OrderCard key={order.id} order={order} />
                ))}
            </ScrollView>
          )}
        </>
      )}
    </SafeAreaView>
  );
};

export default OrderScreen;
