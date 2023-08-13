import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { Ionicons, Feather, Entypo } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  KeyboardAvoidingView,
  TextInput,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableOpacity,
} from "react-native";
import { color } from "../styles/colors";
import Button from "../components/Button";
import {
  signUp,
  updateTheUserPhoneNumber,
  updateTheUserProfile,
} from "../api/AuthApi";

import { useDispatch, useSelector } from "react-redux";
import { currentUser } from "../features/authSlice";
import { useToast } from "react-native-toast-notifications";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { addUserDetails, getUserDetails } from "../api/firebaseApi";

const EditProfileScreen = () => {
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
    address: "",
  });
  const handleUpdateAccount = async () => {
    setLoading(true);
    if (form.userName === "" || form.number === "" || form.address === "") {
      return alert("Fields cant be empty");
    }
    if (!form.number.length === 10) {
      return alert("Mobile number  must be of 10 digits ");
    }
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        form.email.toLowerCase(),
        form.password.toLowerCase()
      );
      if (user) {
        updateTheUserProfile(form.userName, form.imageUrl);
        toast.show("Account has been updated successfully", {
          type: "success",
        });
        const { email, name, uid } = user;
        const userDetails = {
          userName: form.userName,
          email: form.email,
          number: form.number,
          address: form.address,
        };
        const updateUsers = await addUserDetails(userDetails);

        dispatch(currentUser({ email, name, uid }));
        navigation.navigate("MainTab");
      } else {
        // The signUp function returned null (Something went wrong during sign-up)
        toast.show("Something went wrong during -up", {
          type: "danger",
          placement: "center",
        });
      }
    } catch (error) {
      toast.show(error.message, { type: "danger", placement: "center" });
    } finally {
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   const getUserDetailsFromFirebase = async () => {
  //     const data = await getUserDetails(auth?.currentUser?.email);
  //     console.log(data);
  //   };
  //   getUserDetailsFromFirebase();
  // });

  return (
    <SafeAreaView
      style={{
        paddingHorizontal: 20,
        marginTop: 10,
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center", gap: 30 }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-outline" size={24} color="black" />
        </TouchableOpacity>
        <Text
          style={{ fontSize: 18, fontWeight: 500, fontFamily: "sans-serif" }}
        >
          EditProfileScreen
        </Text>
      </View>
      <KeyboardAvoidingView style={styles.container}>
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
                keyboardType="numeric"
              />
            </View>
          </View>

          <View style={styles.inputRow}>
            <View style={styles.inputItem}>
              <Text style={styles.label}>Address</Text>
              <TextInput
                style={styles.input}
                value={form.address}
                onChangeText={(e) => setForm({ ...form, address: e })}
                keyboardType="url"
              />
            </View>
          </View>
          <View style={{ gap: 20, marginTop: 40 }}>
            <Button
              text={"Update Account"}
              styles={styles.registerButton}
              handlePress={handleUpdateAccount}
              loading={loading}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: 40,
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
    padding: 8,
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
