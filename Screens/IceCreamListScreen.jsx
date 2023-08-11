import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useEffect, useState } from "react";
import { getIceCreamByCategoryOrBrandID } from "../sanity";
import Header from "../components/Header";
import IceCreamCard from "../components/IceCreamCard";
import { Entypo, Ionicons } from "@expo/vector-icons";
import { color } from "../styles/colors";
import { useNavigation } from "@react-navigation/native";

const IceCreamListScreen = ({ route }) => {
  const { id, type, name } = route.params;
  const [iceCreams, setIceCreams] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  useEffect(() => {
    const fetchIceCreams = async () => {
      setLoading(true);
      try {
        const data = await getIceCreamByCategoryOrBrandID(type, id);
        setIceCreams(data);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };
    fetchIceCreams();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "white", paddingTop: 50 }}>
      {/* <Header /> */}
      <View style={{ marginHorizontal: 20, flex: 1 }}>
        <View style={{ flexDirection: "row", gap: 30 }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back-outline" size={24} color="black" />
          </TouchableOpacity>
          <View>
            <Text
              style={{
                fontWeight: 500,
                fontSize: 22,
                textTransform: "capitalize",
              }}
            >
              {name}
              <Text style={{ textTransform: "lowercase" }}>'s</Text> Product
              Collection
            </Text>
          </View>
        </View>

        {/* <View style={{ flex: 1 }}> */}
        {iceCreams?.length > 0 ? (
          <ScrollView
            contentContainerStyle={{
              justifyContent: "space-between",
              // flexDirection: "row",
              // flexWrap: "wrap",
              gap: 15,
              marginTop: 20,
              paddingBottom: 100,
              marginTop: 50,
            }}
            showsVerticalScrollIndicator={false}
            // horizontal
          >
            {iceCreams.map((ice, i) => (
              <IceCreamCard key={i} ice={ice} />
            ))}
          </ScrollView>
        ) : (
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              flex: 1,
              flexDirection: "row",
              gap: 5,
            }}
          >
            {loading ? (
              <ActivityIndicator color={color.brightYellow} size={"large"} />
            ) : (
              <>
                <Text style={{ color: "gray", fontWeight: 500, fontSize: 18 }}>
                  Looks like the list is empty"
                </Text>
                <Entypo name="emoji-sad" size={20} color="gray" />
              </>
            )}
          </View>
        )}
        {/* </View> */}
      </View>
    </View>
  );
};

export default IceCreamListScreen;
