import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { color } from "../styles/colors";
import AdminHeader from "../components/AdminHeader";
import { getAllOrders } from "../api/firebaseApi";
import OrderCard from "../components/OrderCard";

const AdminScreen = () => {
  const [orders, setOrders] = useState([]);
  const [status, setStatus] = useState("all");
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [isStatusChange, setIsStatusChange] = useState(false);
  const [loading, setLoading] = useState(false);

  const getOrdersFromFirebase = async () => {
    setLoading(true);
    try {
      const data = await getAllOrders();
      //   console.log(data);
      setOrders(data);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getOrdersFromFirebase();
  }, []);
  const filterOrders = (status, orders) => {
    if (status === "pending") {
      return orders.filter(
        (order) => !order.status || order.status.toLowerCase() === "pending"
      );
    } else if (status === "approved") {
      return orders.filter(
        (order) => order.status && order.status.toLowerCase() === "approved"
      );
    } else if (status === "delivered") {
      return orders.filter(
        (order) => order.status && order.status.toLowerCase() === "delivered"
      );
    } else {
      // Return all orders if status is not recognized
      return orders;
    }
  };

  useEffect(() => {
    const filtered = filterOrders(status, orders);
    setFilteredOrders(filtered);
  }, [status, orders]);

  useEffect(() => {
    getOrdersFromFirebase();
  }, [isStatusChange]);

  return (
    <View style={{ paddingTop: 50, flex: 1, backgroundColor: "white" }}>
      <AdminHeader status={status} setStatus={setStatus} />
      {loading ? (
        <View style={{ flex: 1, justifyContent: "center" }}>
          <ActivityIndicator color={"black"} size={"large"} />
        </View>
      ) : (
        <>
          {filteredOrders.length === 0 ? (
            <View
              style={{
                justifyContent: "center",
                //   backgroundColor: "gray",
                alignItems: "center",
                flex: 1,
              }}
            >
              <Text style={{ fontSize: 18, fontWeight: 400 }}>
                Looks like the list is empty 😅
              </Text>
            </View>
          ) : (
            <ScrollView
              style={{ flex: 1 }}
              contentContainerStyle={{ marginHorizontal: 20 }}
            >
              {filteredOrders?.map((order) => (
                <OrderCard
                  key={order.id}
                  order={order}
                  adminPage={true}
                  setIsStatusChange={setIsStatusChange}
                />
              ))}
            </ScrollView>
          )}
        </>
      )}
    </View>
  );
};

export default AdminScreen;
