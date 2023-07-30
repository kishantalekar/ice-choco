import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import React from "react";

const Button = ({ text, handlePress, styles, textStyles, loading }) => {
  return (
    <TouchableOpacity onPress={handlePress} style={[styles, { elevation: 6 }]}>
      {loading ? (
        <ActivityIndicator color={"white"} />
      ) : (
        <Text
          style={[
            { color: "white", fontSize: 22, textAlign: "center" },
            textStyles,
          ]}
        >
          {text}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default Button;
