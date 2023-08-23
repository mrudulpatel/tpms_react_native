import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  Alert,
  BackHandler,
} from "react-native";

export default function Dashboard({ navigation }) {
  const [emp, setEmp] = useState();

  useFocusEffect(() => {
    const getEmpData = async () => {
      try {
        await AsyncStorage.getItem("emp").then((value) => {
          if (value === null) {
            navigation.navigate("Home");
          }
          setEmp(JSON.parse(value));
        });
      } catch (error) {
        console.error(error);
      }
    };
    getEmpData();
  });

  useEffect(() => {
    const backAction = () => {
      Alert.alert("Hold on!", "Are you sure you want to go back?", [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel",
        },
        { text: "YES", onPress: () => BackHandler.exitApp() },
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "#fdba72b3" }}>
      <View>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            textAlign: "center",
            marginTop: 10,
          }}
        >
          Welome {emp?.name} ({emp?.emp_id})
        </Text>
      </View>
    </View>
  );
}
