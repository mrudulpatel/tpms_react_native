import React from "react";
import { View, Image } from "react-native";

import Logo from "../assets/logo.png"; // Import your logo image

const Navbar = () => {
  return (
    <View
      style={{
        backgroundColor: "#fdba72b3",
        alignItems: "center",
        padding: 6,
        paddingHorizontal: 8,
      }}
    >
      <Image
        source={Logo}
        style={{ width: 200, height: 85 }} // Adjust width and height as needed
      />
    </View>
  );
};

export default Navbar;
