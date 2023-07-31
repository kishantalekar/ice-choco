import React, { useState } from "react";
import {
  View,
  Text,
  KeyboardAvoidingView,
  TextInput,
  StyleSheet,
  ImageBackground,
  Image,
} from "react-native";
import { color } from "../styles/colors";
import Button from "../components/Button";
import { useNavigation } from "@react-navigation/native";
import {
  signUp,
  updateTheUserPhoneNumber,
  updateTheUserProfile,
} from "../api/AuthApi";

import { useDispatch } from "react-redux";
import { currentUser } from "../features/authSlice";
import { useToast } from "react-native-toast-notifications";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";

const RegisterScreen = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    email: "",
    password: "",
    userName: "",
    number: "",
    confirmPassword: "",
    imageUrl: "",
  });
  const handleSignUp = async () => {
    setLoading(true);
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        form.email.toLowerCase(),
        form.password.toLowerCase()
      );
      if (user) {
        updateTheUserProfile(form.userName, form.imageUrl);
        toast.show("Account has been created successfully", {
          type: "success",
        });
        const { email, name, uid } = user;
        dispatch(currentUser({ email, name, uid }));
        navigation.navigate("MainTab");
      } else {
        // The signUp function returned null (Something went wrong during sign-up)
        throw new Error("Something went wrong during sign-up");
      }
    } catch (error) {
      toast.show(error.message, { type: "danger", placement: "center" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <View style={styles.inputContainer}>
        <View style={styles.inputRow}>
          <View style={styles.inputItem}>
            <Text style={styles.label}>Enter Your Full Name</Text>
            <TextInput
              style={styles.input}
              value={form.userName}
              onChangeText={(e) => setForm({ ...form, userName: e })}
            />
          </View>
        </View>
        <View style={styles.inputRow}>
          <View style={styles.inputItem}>
            <Text style={styles.label}>Email id</Text>
            <TextInput
              style={styles.input}
              value={form.email}
              keyboardType="email-address"
              onChangeText={(e) => setForm({ ...form, email: e })}
            />
          </View>
        </View>
        <View style={styles.inputRow}>
          <View style={styles.inputItem}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              value={form.password}
              onChangeText={(e) => setForm({ ...form, password: e })}
            />
          </View>
        </View>
        <View style={styles.inputRow}>
          <View style={styles.inputItem}>
            <Text style={styles.label}>Phone No</Text>
            <TextInput
              style={styles.input}
              value={form.number}
              onChangeText={(e) => setForm({ ...form, number: e })}
            />
          </View>
        </View>

        {/* <View style={styles.inputRow}>
          <View style={styles.inputItem}>
            <Text style={styles.label}>Image URL (optional)</Text>
            <TextInput
              style={styles.input}
              value={form.imageUrl}
              onChangeText={(e) => setForm({ ...form, imageUrl: e })}
              keyboardType="url"
            />
          </View>
        </View> */}
        <View style={{ gap: 20, marginTop: 40 }}>
          <Button
            text={"Create account"}
            styles={styles.registerButton}
            handlePress={handleSignUp}
            loading={loading}
          />
          <Button
            text={"Sign in"}
            styles={styles.signInButton}
            handlePress={() => navigation.navigate("Login")}
          />
          {/* <Image
            source={require("../assets/loginImage.jpg")}
            style={{
              width: "100%",
              height: 200,
              marginLeft: 10,
              marginTop: 20,
              position: "absolute",
              zIndex: -99,
              top: -30,
              //   borderRadius: 10,
            }}
            resizeMode="cover"
            blurRadius={10}
          /> */}
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 70,
    paddingHorizontal: 25,
    backgroundColor: "white",
  },
  title: {
    color: color.brightYellow,
    fontWeight: "bold",
    fontSize: 20,
  },
  inputContainer: {
    paddingTop: 50,
    gap: 20,
  },
  inputRow: {
    flexDirection: "row",
    width: "100%",
    gap: 10,
  },
  inputItem: {
    flex: 1,
    gap: 2,
  },
  label: {
    color: color.blue,
    fontSize: 16,
  },
  input: {
    padding: 10,
    borderColor: color.blue,
    borderWidth: 1,
    borderRadius: 13,
    color: color.blue,
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
    marginTop: 10,
  },
});

export default RegisterScreen;
