import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React from "react";
import { color } from "../styles/colors";
import { onLogOut } from "../api/AuthApi";
import { useDispatch } from "react-redux";
import { logOut } from "../features/authSlice";
import { useNavigation } from "@react-navigation/native";

const AdminHeader = ({ status, setStatus }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const handleLogout = async () => {
    await onLogOut();
    dispatch(logOut());
    navigation.navigate("Login");
  };
  return (
    <View style={{ marginHorizontal: 20 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text style={{ color: color.blue, fontSize: 14, fontWeight: "bold" }}>
          Frozen Factory Admin Panel
        </Text>
        <TouchableOpacity
          style={{
            backgroundColor: color.darkBlue,
            padding: 8,
            borderRadius: 12,
          }}
          onPress={handleLogout}
        >
          <Text style={{ color: "white", fontSize: 10 }}>Logout</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity
          onPress={() => navigation.navigate("AdminFeedbackScreen")}
          style={{ marginVertical: 10 }}
        >
          <Text
            style={{
              color: color.darkBlue,
              textDecorationLine: "underline",
              fontSize: 10,
            }}
          >
            Show Feedbacks from customers
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        style={{
          marginTop: 40,
        }}
        contentContainerStyle={{
          justifyContent: "space-between",
        }}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        <TouchableOpacity
          style={{
            color: "white",
            backgroundColor: status === "all" ? color.blue : "white",
            padding: 8,
            borderRadius: 12,
            marginHorizontal: 10,
            borderWidth: 0.8,
            borderColor: "gray",
          }}
          onPress={() => setStatus("all")}
        >
          <Text
            style={{
              color: status === "all" ? "white" : "black",
              fontSize: 10,
              fontFamily: "sans-serif",
              fontWeight: "bold",
            }}
          >
            All orders
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            color: "white",
            backgroundColor: status === "pending" ? color.blue : "white",
            padding: 8,
            borderRadius: 12,
            borderWidth: 0.8,
            marginHorizontal: 10,
            borderColor: "gray",
          }}
          onPress={() => setStatus("pending")}
        >
          <Text
            style={{
              color: status === "pending" ? "white" : "black",
              fontSize: 10,
              fontFamily: "sans-serif",
              fontWeight: "bold",
            }}
          >
            {" "}
            Pending orders
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            color: "white",
            backgroundColor: status === "approved" ? color.blue : "white",
            padding: 8,
            borderRadius: 12,
            borderWidth: 0.8,
            marginHorizontal: 10,
            borderColor: "gray",
          }}
          onPress={() => setStatus("approved")}
        >
          <Text
            style={{
              color: status === "approved" ? "white" : "black",
              fontSize: 10,
              fontFamily: "sans-serif",
              fontWeight: "bold",
            }}
          >
            {" "}
            Approved orders
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            color: "white",
            backgroundColor: status === "delivered" ? color.blue : "white",
            padding: 8,
            borderRadius: 12,
            borderWidth: 0.8,
            marginHorizontal: 10,
            borderColor: "gray",
          }}
          onPress={() => setStatus("delivered")}
        >
          <Text
            style={{
              color: status === "delivered" ? "white" : "black",
              fontSize: 10,
              fontFamily: "sans-serif",
              fontWeight: "bold",
            }}
          >
            {" "}
            Delivered orders
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default AdminHeader;
