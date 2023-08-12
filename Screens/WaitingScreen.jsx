import { View, Text, Image } from "react-native";
import React, { useEffect } from "react";
import { auth } from "../firebaseConfig";
import { useDispatch } from "react-redux";
import { currentUser } from "../features/authSlice";
import { useNavigation } from "@react-navigation/native";

const WaitingScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  useEffect(() => {
    // Subscribe to authentication state changes
    const unsubscribe = auth.onAuthStateChanged((user) => {
      // `user` will be null if the user is signed out
      // and will contain the user object if the user is signed in
      // setCurrentUser(user);

      if (user) {
        const { email, name, uid } = user;
        console.log("first");
        dispatch(currentUser({ email, name, uid }));
        if (email == "frozenfactory123@gmail.com") {
          navigation.navigate("AdminScreen");
        } else {
          navigation.navigate("MainTab");
        }
      } else {
        navigation.navigate("Login");
      }
    });

    // Clean up the subscription when the component unmounts
    return () => unsubscribe();
  }, []);
  const getData = async () => {
    const user = auth;
    if (auth.user) {
      navigation.navigate("MainTab");
    } else {
      navigation.navigate("Login");
    }
  };
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
      }}
    >
      <Image
        source={require("../assets/waiting.jpg")}
        style={{ width: 100, height: 100, borderRadius: 50 }}
      />
      <Text
        style={{ fontWeight: "bold", fontSize: 16, fontFamily: "sans-serif" }}
      >
        Frozen Factory
      </Text>
    </View>
  );
};

export default WaitingScreen;
