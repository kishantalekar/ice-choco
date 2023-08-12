import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { getAllFeedbacks } from "../api/firebaseApi";
import { Ionicons } from "@expo/vector-icons";
import { color } from "../styles/colors";
import { useNavigation } from "@react-navigation/native";
const AdminFeedbackScreen = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const navigation = useNavigation();
  useEffect(() => {
    const getFeedbacksFromFirebase = async () => {
      const data = await getAllFeedbacks();

      setFeedbacks(data);
    };
    getFeedbacksFromFirebase();
  }, []);

  return (
    <View style={{ marginTop: 50, marginHorizontal: 20 }}>
      <View
        style={{
          flexDirection: "row",
          gap: 20,
          alignItems: "center",
          marginVertical: 10,
        }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-outline" size={24} color="black" />
        </TouchableOpacity>
        <Text style={{ fontSize: 16, fontWeight: 400 }}>
          Feedbacks from customers{" "}
        </Text>
      </View>
      <View>
        {feedbacks.length === 0 ? (
          <View style={{ alignItems: "center", marginTop: 100 }}>
            <Text>No feedbacks to show 😅</Text>
          </View>
        ) : (
          <ScrollView showsVerticalScrollIndicator={false}>
            {feedbacks?.map((feedback) => (
              <View
                key={feedback.id}
                style={{
                  paddingVertical: 15,
                  borderWidth: 0.8,
                  borderColor: "gray",
                  marginVertical: 10,
                  paddingHorizontal: 15,
                  borderRadius: 10,
                  gap: 10,
                }}
              >
                <Text style={{ color: color.gray, fontSize: 12 }}>
                  {feedback.feedback.email}
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  {/* <Text style={{ fontSize: 14 }}>Feedback:</Text> */}
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: 400,
                      fontFamily: "sans-serif",
                    }}
                  >
                    {feedback.feedback.feedback}
                    {/* Nice app,loved to shop it on again */}
                  </Text>
                </View>
              </View>
            ))}
          </ScrollView>
        )}
      </View>
    </View>
  );
};

export default AdminFeedbackScreen;
