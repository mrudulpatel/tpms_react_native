import React from 'react';
import { View, Text } from 'react-native';

const Footer = () => {
  return (
    <View style={{ backgroundColor: '#111827', padding: 12 }}>
      <Text style={{ color: 'white', textAlign: 'center' }}>
        &copy; All rights reserved by MSEDCL {new Date().getFullYear()}
      </Text>
    </View>
  );
};

export default Footer;
