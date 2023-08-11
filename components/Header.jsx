import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useState, useEffect } from "react";
import { Ionicons, Entypo, MaterialIcons } from "@expo/vector-icons";
import { color } from "../styles/colors";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { auth } from "../firebaseConfig";
import * as Location from "expo-location";

const Header = ({ searchQuery, setSearchQuery }) => {
  const [imageSource, setImageSource] = useState(auth?.currentUser?.photoURL);
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState("");
  const [formattedAddress, setFormattedAddress] = useState("");

  const navigation = useNavigation();

  const handleNavigation = () => {
    navigation.navigate("Profile");
  };
  const cartItems = useSelector((state) => state.cart.items);
  const user = useSelector((state) => state.user.user);

  const getLocationAsync = async () => {
    setLoading(true);
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.log("Permission to access location was denied");
      return;
    }

    const options = {
      accuracy: Location.Accuracy.BestForNavigation,
      timeout: 20000, // 10 seconds timeout
    };

    try {
      const location = await Location.getCurrentPositionAsync(options);
      const { position } = location;

      const { latitude, longitude } = location.coords;

      setLatitude(latitude);
      setLongitude(longitude);
      reverseGeocodeAsync(latitude, longitude);
    } catch (error) {
      console.log("Error getting location:", error);
    } finally {
      setLoading(false);
    }
  };
  //getting the location in words
  const reverseGeocodeAsync = async (latitude, longitude) => {
    try {
      const response = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });

      if (response.length > 0) {
        const address = response[0];

        setLocation(address);
        setFormattedAddress(constructAddress(address));
      } else {
        console.log("No address found");
        getLocationAsync();
      }
    } catch (error) {
      console.log("Error reverse geocoding:", error);
    }
  };

  useEffect(() => {
    getLocationAsync();
  }, []);
  let i = 0;
  function constructAddress({ street, district, city, i }) {
    i += 1;
    const addressParts = [];

    if (street) {
      addressParts.push(street);
    }
    if (district) {
      addressParts.push(district);
    }
    if (city) {
      addressParts.push(city);
    }

    return addressParts.join(", ");
  }
  const reloadAddress = async () => {
    try {
      getLocationAsync();
    } catch (error) {
      console.log("faild in reloading");
    }
  };
  const handleLocation = () => {
    navigation.navigate("LocationScreen");
  };
  return (
    <>
      <View style={styles.container}>
        <View style={styles.locationContainer}>
          <Ionicons name="location-outline" size={30} color={color.pink} />
          <View style={styles.locationTextContainer}>
            <View style={styles.locationRow}>
              <Text style={styles.locationTitle}>Home</Text>
            </View>
            <View style={{ flexDirection: "row", gap: 5 }}>
              <Text style={styles.locationDescription}>
                {formattedAddress.length > 25
                  ? formattedAddress.substring(0, 25) + "..."
                  : formattedAddress}{" "}
                - {location?.postalCode}
              </Text>
              <TouchableOpacity onPress={handleLocation}>
                <Ionicons name="chevron-down" size={16} color={color.pink} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          {user == null ? (
            <TouchableOpacity
              onPress={() => navigation.navigate("Login")}
              style={{
                // borderColor: color.pink,
                // borderWidth: 0.8,
                backgroundColor: color.pink,
                paddingVertical: 6,
                paddingHorizontal: 10,
                borderRadius: 10,
              }}
            >
              <Text style={{ fontSize: 18, color: "white" }}>login</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={handleNavigation}>
              {auth?.currentUser?.photoURL ? (
                <Image
                  source={{ uri: auth?.currentUser?.photoURL }}
                  style={styles.profileImage}
                  alt="profile image"
                />
              ) : (
                <Image
                  source={require("../assets/male.jpg")}
                  style={styles.profileImage}
                />
              )}
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={{ position: "relative" }}
            onPress={() => navigation.navigate("Cart")}
          >
            <Text
              style={{
                position: "absolute",
                right: -9,
                top: 0,
                color: "white",
                zIndex: 99,
                padding: 2,
                borderRadius: 15,
                backgroundColor: "red",
                fontSize: 8,
                paddingHorizontal: 4,
              }}
            >
              {cartItems?.length}
            </Text>
            <Ionicons name="cart-outline" size={28} color={color.pink} />
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",

          marginVertical: 20,
          alignItems: "center",
          marginLeft: 30,
          marginRight: 20,
        }}
      >
        <View style={{ marginRight: -40 }}>
          <Entypo name="magnifying-glass" size={24} color={color.pink} />
        </View>
        <TextInput
          placeholder="ice-cream name,category or brand"
          style={{
            paddingVertical: 10,
            borderColor: color.gray,
            borderWidth: 0.8,
            borderRadius: 14,
            flex: 1,
            paddingLeft: 50,
          }}
          value={searchQuery}
          onChangeText={(e) => setSearchQuery(e)}
        />
        {searchQuery && (
          <TouchableOpacity
            style={{
              borderColor: "gray",
              borderRadius: 4,
              marginRight: 4,
              flexDirection: "row",
              borderWidth: 0.2,
              padding: 3,
              position: "absolute",
              right: 20,
            }}
            onPress={() => setSearchQuery("")}
          >
            <MaterialIcons name="clear" size={12} color="black" />
          </TouchableOpacity>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    justifyContent: "space-between",
    flexDirection: "row",
    marginHorizontal: 20,
    backgroundColor: color.backgroundColor,
  },
  locationContainer: {
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
  },
  locationTextContainer: {
    marginLeft: 5,
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  locationTitle: {
    color: color.pink,
    fontWeight: "600",
    fontSize: 18,
  },
  locationDescription: {
    color: color.pink,
    fontSize: 12,
    fontWeight: "400",
  },
  profileImage: {
    width: 30,
    height: 30,
    borderRadius: 20,
  },
});

export default Header;
