import React from "react";
import { View, Image } from "react-native";

import Logo from "../assets/logo.png"; // Import your logo image
import Logo1 from "../assets/icon.png";

const Navbar = () => {
  return (
    <View
      style={{
        backgroundColor: "#fdba72b3",
        alignItems: "center",
        padding: 6,
        flexDirection: "row",
        justifyContent: "center",
        paddingHorizontal: 8,
      }}
    >
      <Image
        source={Logo}
        style={{
          objectFit: "contain",
          aspectRatio: "16/9",
          width: 150,
          // marginLeft: "auto",
        }}
        // style={{ width: 200, height: 85 }} // Adjust width and height as needed
      />
      <Image
        source={Logo1}
        style={{
          objectFit: "contain",
          aspectRatio: "16/9",
          width: 150,
        }}
      />
    </View>
  );
};

export default Navbar;
