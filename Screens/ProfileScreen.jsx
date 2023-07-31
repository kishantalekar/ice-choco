import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import React from "react";
import { Ionicons, Feather, Entypo } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { color } from "../styles/colors";
import { useNavigation } from "@react-navigation/native";
import { onLogOut } from "../api/AuthApi";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../features/authSlice";
import { auth } from "../firebaseConfig";
const ProfileScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    await onLogOut();
    dispatch(logOut());
    navigation.navigate("Home");
  };
  const user = useSelector((state) => state.user.user);

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back-outline" size={24} color="black" />
      </TouchableOpacity>
      <View style={styles.profileContainer}>
        {auth.currentUser?.photoURL ? (
          <Image
            source={{ uri: auth.currentUser?.photoURL }}
            style={styles.profileImage}
          />
        ) : (
          <Image
            source={require("../assets/male.jpg")}
            style={styles.profileImage}
          />
        )}

        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>
            {auth?.currentUser?.displayName || "Anonymous"}
          </Text>
          <Text style={styles.profileEmail}>{auth?.currentUser?.email}</Text>
        </View>
      </View>
      <View style={styles.ordersContainer}>
        <Text style={styles.sectionTitle}>Food Orders</Text>
        <View style={{ marginHorizontal: 20, marginVertical: 10 }}>
          <TouchableOpacity
            style={styles.orderItem}
            onPress={() => navigation.navigate("OrderScreen")}
          >
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
            >
              <Feather
                name="shopping-bag"
                size={14}
                color="gray"
                style={styles.orderItemIcon}
              />
              <Text style={styles.orderItemText}>Your orders</Text>
            </View>
            <Entypo name="chevron-small-right" size={24} color="black" />
          </TouchableOpacity>
          <View style={styles.divider}></View>
          <TouchableOpacity
            style={styles.orderItem}
            onPress={() => navigation.navigate("FavouriteScreen")}
          >
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
            >
              <Entypo
                name="heart-outlined"
                size={14}
                color="gray"
                style={styles.orderItemIcon}
              />
              <Text style={styles.orderItemText}>Favourite orders</Text>
            </View>
            <Entypo name="chevron-small-right" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.moreContainer}>
        <Text style={styles.sectionTitle}>More</Text>
        <View style={{ marginHorizontal: 20, marginVertical: 10 }}>
          <TouchableOpacity
            style={styles.moreItem}
            onPress={() => navigation.navigate("AboutScreen")}
          >
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
            >
              <Feather
                name="info"
                size={14}
                color="gray"
                style={styles.moreItemIcon}
              />
              <Text style={styles.moreItemText}>About</Text>
            </View>
            <Entypo name="chevron-small-right" size={24} color="black" />
          </TouchableOpacity>
          <View style={styles.divider}></View>
          <TouchableOpacity
            style={styles.moreItem}
            onPress={() => navigation.navigate("FeedbackScreen")}
          >
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
            >
              <Feather
                name="edit"
                size={14}
                color="gray"
                style={styles.moreItemIcon}
              />
              <Text style={styles.moreItemText}>Send feedback</Text>
            </View>
            <Entypo name="chevron-small-right" size={24} color="black" />
          </TouchableOpacity>
          <View style={styles.divider}></View>
          <TouchableOpacity style={styles.moreItem} onPress={handleLogout}>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
            >
              <Feather
                name="power"
                size={14}
                color="gray"
                style={styles.moreItemIcon}
              />
              <Text style={styles.moreItemText}>Logout</Text>
            </View>
            <Entypo name="chevron-small-right" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    backgroundColor: color.profileBackground,
    paddingHorizontal: 15,
  },
  backButton: {
    marginTop: 10,
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    elevation: 7,
    borderRadius: 10,
    padding: 10,
    paddingVertical: 15,
    paddingHorizontal: 15,
    marginTop: 10,
  },
  profileImage: {
    borderRadius: 50,
    width: 80,
    height: 80,
  },
  profileInfo: {
    paddingLeft: 20,
    gap: 3,
  },
  profileName: {
    fontWeight: "500",
    fontSize: 28,
  },
  profileEmail: {
    fontWeight: "400",
    fontSize: 18,
  },
  ordersContainer: {
    backgroundColor: "white",
    elevation: 10,
    paddingVertical: 10,
    marginVertical: 10,
    borderRadius: 10,
    marginTop: 40,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "500",
    borderLeftWidth: 3,
    borderColor: "#b30000",
    paddingLeft: 10,
    borderRadius: 1,
  },
  orderItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 20,
  },
  orderItemIcon: {
    backgroundColor: color.profileBackground,
    padding: 8,
    borderRadius: 20,
  },
  orderItemText: {
    fontSize: 17,
    fontWeight: "400",
  },
  divider: {
    borderBottomColor: "#b3b3b3",
    borderBottomWidth: 0.2,
  },
  moreContainer: {
    backgroundColor: "white",
    elevation: 10,
    paddingVertical: 10,
    marginVertical: 10,
    borderRadius: 10,
    marginTop: 40,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "500",
    borderLeftWidth: 3,
    borderColor: "#b30000",
    paddingLeft: 10,
    borderRadius: 1,
  },
  moreItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 20,
  },
  moreItemIcon: {
    backgroundColor: color.profileBackground,
    padding: 8,
    borderRadius: 20,
  },
  moreItemText: {
    fontSize: 17,
    fontWeight: "400",
  },
  divider: {
    borderBottomColor: "#b3b3b3",
    borderBottomWidth: 0.2,
  },
});

export default ProfileScreen;
