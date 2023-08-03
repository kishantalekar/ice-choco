import {
  View,
  Text,
  TextInput,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import { color } from "../styles/colors";
import Button from "../components/Button";
import { useNavigation } from "@react-navigation/native";
import { signIn } from "../api/AuthApi";
import { auth } from "../firebaseConfig";
import { useDispatch, useSelector } from "react-redux";
import { currentUser } from "../features/authSlice";
import { useToast } from "react-native-toast-notifications";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

const LoginScreen = () => {
  const [usernameFocused, setUsernameFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const [loginLoading, setLoginLoading] = useState(false);
  const dispatch = useDispatch();
  const toast = useToast();
  const handleUsernameFocus = () => {
    setUsernameFocused(true);
  };

  const handleUsernameBlur = () => {
    setUsernameFocused(false);
  };

  const handlePasswordFocus = () => {
    setPasswordFocused(true);
  };

  const handlePasswordBlur = () => {
    setPasswordFocused(false);
  };

  const handleSignIn = async () => {
    setLoginLoading(true);
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        userName.toLowerCase(),
        password.toLowerCase()
      );
      if (user) {
        const { email, name, uid } = user;
        dispatch(currentUser({ email, name, uid }));
        setUserName("");
        setPassword("");
      }
    } catch (error) {
      toast.show(error.code, {
        type: "danger",
      });
    } finally {
      setLoginLoading(false);
    }
  };
  useEffect(() => {
    // Subscribe to authentication state changes
    const unsubscribe = auth.onAuthStateChanged((user) => {
      // `user` will be null if the user is signed out
      // and will contain the user object if the user is signed in
      // setCurrentUser(user);

      if (user) {
        const { email, name, uid } = user;
        dispatch(currentUser({ email, name, uid }));
        navigation.navigate("MainTab");
      }
    });
    setLoading(false);

    // Clean up the subscription when the component unmounts
    return () => unsubscribe();
  }, []);
  const user = useSelector((state) => state.user.user);

  return (
    //  <>
    //   (
    //     <View
    //       style={{ justifyContent: "center", alignItems: "center", flex: 1 }}
    //     >
    //       <ActivityIndicator />
    //     </View>
    //   ) : (
    <KeyboardAvoidingView style={styles.container}>
      {auth.currentUser == null ? (
        <View style={styles.content}>
          <Text style={styles.heading}>Welcome</Text>
          <TextInput
            placeholder="Enter user name"
            value={userName}
            keyboardType="email-address"
            onChangeText={(e) => setUserName(e)}
            placeholderTextColor={usernameFocused ? color.blue : "gray"}
            style={[
              styles.input,
              {
                borderColor: usernameFocused ? color.blue : "gray",
                color: usernameFocused ? color.blue : "gray",
              },
            ]}
            onFocus={handleUsernameFocus}
            onBlur={handleUsernameBlur}
            autoCapitalize="none"
          />

          <TextInput
            placeholder="Password"
            keyboardType="visible-password"
            value={password}
            onChangeText={(e) => setPassword(e)}
            placeholderTextColor={passwordFocused ? color.blue : "gray"}
            style={[
              styles.input,
              {
                borderColor: passwordFocused ? color.blue : "gray",
                color: passwordFocused ? color.blue : "gray",
              },
            ]}
            onFocus={handlePasswordFocus}
            onBlur={handlePasswordBlur}
          />

          {/* <Text style={styles.forgotPasswordText}>Forgot Password</Text> */}
          <Button
            text={"Sign in"}
            styles={styles.signInButton}
            handlePress={handleSignIn}
            loading={loginLoading}
          />
          <Button
            text={"Register now"}
            styles={styles.registerButton}
            handlePress={() => navigation.navigate("Register")}
          />
        </View>
      ) : (
        <View style={{ justifyContent: "center", flex: 1 }}>
          <ActivityIndicator size={"large"} />
        </View>
      )}
    </KeyboardAvoidingView>
    // )
    //  <View style={styles.imageContainer}>
    //     <Image
    //       source={require("../assets/loginImage.jpg")}
    //       style={styles.image}
    //     />
    //   </View>
    //  </>
    // );
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: 100,
  },
  content: {
    flex: 1,
    paddingHorizontal: 30,
    gap: 20,
    justifyContent: "center",
    paddingBottom: 90,
  },
  heading: {
    marginBottom: 20,
    textAlign: "center",
    fontWeight: "400",
    fontSize: 20,
  },
  input: {
    width: "100%",
    padding: 10,
    borderWidth: 1,
    borderRadius: 12,
  },
  forgotPasswordText: {
    textAlign: "right",
    color: "gray",
    fontWeight: 400,
  },
  imageContainer: {
    backgroundColor: "white",
    alignItems: "center",
  },
  image: {
    height: 260,
    width: 260,
    borderRadius: 10,
  },
  signInButton: {
    backgroundColor: color.brightYellow,
    padding: 10,
    borderRadius: 12,
  },
  registerButton: {
    backgroundColor: color.blue,
    padding: 10,
    borderRadius: 12,
  },
});

export default LoginScreen;
