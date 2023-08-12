import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { auth } from "../firebaseConfig";
import { color } from "../styles/colors";
import { useToast } from "react-native-toast-notifications";
import { addFeedBack } from "../api/firebaseApi";

const FeedbackScreen = () => {
  const [feedback, setFeedback] = useState("");
  const [loading, setloading] = useState(false);
  const navigation = useNavigation();
  const toast = useToast();
  const handleFeedback = async () => {
    setloading(true);
    try {
      if (feedback == "") {
        return alert("feedback cannot be empty");
      }
      const fb = { email: auth?.currentUser?.email, feedback };
      const data = await addFeedBack(fb);
      toast.show("Your feedback has been submitted", {
        type: "success",
      });
      navigation.goBack();
    } catch (error) {
    } finally {
      setloading(false);

      setFeedback("");
    }
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
        paddingTop: 50,
        paddingHorizontal: 20,
      }}
    >
      <View style={{ flexDirection: "row", gap: 100, paddingBottom: 20 }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-outline" size={24} color="black" />
        </TouchableOpacity>
        <Text style={{ fontWeight: "bold", fontSize: 18 }}>Feedback</Text>
      </View>
      <View style={{ gap: 10 }}>
        <Text
          style={{
            fontWeight: 400,
            fontSize: 14,
            textAlign: "center",
            marginVertical: 20,
          }}
        >
          We care about your valuable feedback{" "}
        </Text>
        <View>
          <TextInput
            value={auth?.currentUser?.email}
            editable={false}
            style={[styles.textArea, { color: "black" }]}
          />
          <TextInput
            style={styles.textArea}
            multiline
            numberOfLines={5}
            value={feedback}
            onChangeText={setFeedback}
            placeholder="Type your feedback here..."
          />
          <View
            style={{
              justifyContent: "flex-end",
              alignItems: "center",
              margin: 10,
            }}
          >
            <TouchableOpacity
              onPress={handleFeedback}
              style={{
                backgroundColor: color.darkPink,
                // width: 150,
                // paddingVertical: 10,
                // paddingHorizontal: 4,
                borderRadius: 15,
              }}
            >
              {loading ? (
                <ActivityIndicator color={"white"} />
              ) : (
                <Text
                  style={{
                    color: "white",
                    fontSize: 12,
                    fontWeight: "bold",
                    padding: 10,
                  }}
                >
                  Submit feedback
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
  },
  textArea: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    fontSize: 12,
    marginBottom: 10,
    textAlignVertical: "top",
    borderRadius: 10,
  },
});
export default FeedbackScreen;
