import { View, Text, Image } from "react-native";
import { useEffect, useState } from "react";
import { getIceCreamById, urlFor } from "../sanity";
import { Entypo, FontAwesome } from "@expo/vector-icons";

const OrderItemCard = ({ item }) => {
  const [iceCream, setIceCream] = useState({});
  useEffect(() => {
    const getIceCreamByIdFromSanity = async () => {
      const data = await getIceCreamById(item.productId);
      setIceCream(data);
    };
    getIceCreamByIdFromSanity();
  }, []);

  return (
    <View style={{ flexDirection: "row", marginVertical: 8 }}>
      <View style={{ paddingRight: 20 }}>
        {iceCream[0]?.image && (
          <Image
            source={{ uri: urlFor(iceCream[0]?.image).url() }}
            style={{ width: 40, height: 40, borderRadius: 10 }}
            resizeMode="cover"
          />
        )}
      </View>
      <View
        style={{
          flexDirection: "row",
          flex: 1,
          alignItems: "center",
          gap: 15,
        }}
      >
        <Text
          style={{
            fontWeight: 400,
            textTransform: "capitalize",
            fontSize: 12,
            fontFamily: "sans-serif",
          }}
        >
          {iceCream[0]?.name}
        </Text>
        <FontAwesome name="remove" size={8} color="gray" />
        <Text style={{ flex: 1, color: "gray", fontSize: 10 }}>
          {item.quantity}
        </Text>
        <Text
          style={{ fontSize: 12, fontFamily: "sans-serif", fontWeight: "bold" }}
        >
          {"\u20B9"}
          {iceCream[0]?.price * item?.quantity}
        </Text>
      </View>
    </View>
  );
};

export default OrderItemCard;
