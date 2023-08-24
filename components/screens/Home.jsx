import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
  BackHandler,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Navbar from "../Navbar";
import { ActivityIndicator } from "react-native";

const Home = ({ navigation }) => {
  const [empid, setEmpid] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setEmpid("");
    setPassword("");
  }, []);

  // useFocusEffect(() => {
  //   const getEmpData = async () => {
  //     try {
  //       await AsyncStorage.getItem("emp").then((value) => {
  //         if (value.length > 0) {
  //           navigation.navigate("Dashboard");
  //         }
  //       });
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  //   getEmpData();
  // });

  const handleLogin = async () => {
    console.log("Logging in...");
    setLoading(true);
    const res = await fetch("https://msedcl-tpms.vercel.app/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ empid, password }),
    });

    const data = await res.json();
    if (data.message === "Login Successful") {
      console.log(data);
      const storeData = async () => {
        try {
          await AsyncStorage.setItem("emp", JSON.stringify(data.emp_details));
        } catch (e) {
          console.log(e);
        }
      };
      await storeData();
      setLoading(false);
      navigation.navigate("Dashboard");
    } else {
      alert("Invalid Credentials");
    }
  };

  useEffect(() => {
    const backAction = () => {
      Alert.alert("Hold on!", "Are you sure you want to exit the app?", [
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
    <View style={{ flex: 1 }}>
      <StatusBar style="auto" />
      <Navbar />
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#fdba72b3",
        }}
      >
        <View
          style={{
            borderWidth: 1,
            borderRadius: 10,
            backgroundColor: "#111827",
            padding: 16,
            width: "80%",
          }}
        >
          <Text
            style={{
              fontSize: 24,
              fontWeight: "bold",
              marginBottom: 10,
              color: "white",
              textAlign: "center",
            }}
          >
            T&P Manager
          </Text>
          <Text
            style={{
              fontSize: 16,
              color: "#888",
              marginBottom: 20,
              textAlign: "center",
            }}
          >
            Login to your account
          </Text>
          <TextInput
            autoFocus
            placeholder="Enter your Employee ID"
            style={{
              borderWidth: 1,
              borderColor: "#ccc",
              borderRadius: 5,
              padding: 10,
              marginBottom: 10,
              width: "100%",
              color: "white",
            }}
            placeholderTextColor={"#ccc"}
            onChangeText={(text) => setEmpid(text)}
            value={empid}
          />
          <TextInput
            secureTextEntry
            placeholder="Enter your password"
            style={{
              borderWidth: 1,
              borderColor: "#ccc",
              borderRadius: 5,
              padding: 10,
              marginBottom: 10,
              color: "white",
              width: "100%",
            }}
            placeholderTextColor={"#ccc"}
            onChangeText={(text) => setPassword(text)}
            value={password}
          />
          <TouchableOpacity
            onPress={handleLogin}
            disabled={empid === "" || password === "" ? true : false}
            style={{
              backgroundColor: "#4CBB17",
              borderRadius: 5,
              padding: 10,
              alignItems: "center",
            }}
          >
            {!loading ? (
              <Text style={{ color: "white", fontWeight: "bold" }}>Login</Text>
            ) : (
              <ActivityIndicator size="small" color="white" />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("Forgot Password")}
            style={{
              backgroundColor: "#C80000",
              borderRadius: 5,
              padding: 10,
              alignItems: "center",
              marginTop: 10,
            }}
          >
            <Text style={{ color: "white", fontWeight: "bold" }}>
              Forgot Password
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Home;
