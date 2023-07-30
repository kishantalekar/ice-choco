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

const RegisterScreen = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
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
      const user = await signUp(
        form.email.toLowerCase(),
        form.password.toLowerCase(),
        form
      );
      if (user) {
        updateTheUserProfile(form.userName, form.imageUrl);
        // updateTheUserPhoneNumber(form.number);
      }
      console.log(user, "from register screen");
      if (user) {
        const { email, uid } = user;
        dispatch(currentUser({ email, uid }));
        navigation.navigate("MainTab");
      } else {
        alert("something went wrong");
      }
    } catch (error) {
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
            <Text style={styles.label}>Phone No</Text>
            <TextInput
              style={styles.input}
              value={form.number}
              onChangeText={(e) => setForm({ ...form, number: e })}
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
            <Text style={styles.label}>Confirm password</Text>
            <TextInput
              style={styles.input}
              value={form.confirmPassword}
              onChangeText={(e) => setForm({ ...form, confirmPassword: e })}
            />
          </View>
        </View>
        <View style={styles.inputRow}>
          <View style={styles.inputItem}>
            <Text style={styles.label}>Image URL (optional)</Text>
            <TextInput
              style={styles.input}
              value={form.imageUrl}
              onChangeText={(e) => setForm({ ...form, imageUrl: e })}
              keyboardType="url"
            />
          </View>
        </View>
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
