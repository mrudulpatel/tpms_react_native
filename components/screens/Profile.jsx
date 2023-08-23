import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Profile = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [empid, setEmpid] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    const getEmpData = async () => {
      try {
        await AsyncStorage.getItem("emp").then((value) => {
          setEmail(JSON.parse(value).email);
          setEmpid(JSON.parse(value).emp_id);
          setName(JSON.parse(value).name);
        });
      } catch (error) {
        console.error(error);
      }
    };
    getEmpData();
  }, []);

  const handleSubmit = async () => {
    const res = await fetch("https://msedcl-tpms.vercel.app/api/employees", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ emp_id: empid, name: name, email: email }),
    });
    const { response, empData } = await res.json();
    console.log(empData);
    if (response.affectedRows === 1) {
      const storeData = async () => {
        try {
          await AsyncStorage.setItem("emp", JSON.stringify(empData));
        } catch (e) {
          console.log(e);
        }
      };
      await storeData();
      alert("Profile Updated Successfully");
    } else {
      alert("Something went wrong");
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fdba72b3" }}>
      <View style={{ flex: 1, padding: 8 }}>
        <View style={{ flex: 1, justifyContent: "space-around" }}>
          <View
            style={{
              backgroundColor: "#111827",
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.2,
              shadowRadius: 3,
              elevation: 5,
              borderRadius: 10,
              padding: 16,
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
              Edit Profile
            </Text>
            <View style={{ marginBottom: 10 }}>
              <Text style={{ fontSize: 16, color: "white" }}>Employee ID</Text>
              <TextInput
                style={{
                  borderWidth: 1,
                  borderColor: "#ccc",
                  borderRadius: 5,
                  color: "white",
                  padding: 10,
                  marginBottom: 10,
                }}
                placeholder="Enter your employee ID"
                editable={false} // To make it disabled
                value={empid}
                onChangeText={(text) => setEmpid(text)}
              />
            </View>
            <View style={{ marginBottom: 10 }}>
              <Text style={{ fontSize: 16, color: "white" }}>Name</Text>
              <TextInput
                style={{
                  borderWidth: 1,
                  borderColor: "#ccc",
                  borderRadius: 5,
                  padding: 10,
                  color: "white",
                  marginBottom: 10,
                }}
                placeholder="Enter your name"
                value={name}
                onChangeText={(text) => setName(text)}
              />
            </View>
            <View style={{ marginBottom: 10 }}>
              <Text style={{ fontSize: 16, color: "white" }}>Email</Text>
              <TextInput
                style={{
                  borderWidth: 1,
                  borderColor: "#ccc",
                  borderRadius: 5,
                  color: "white",
                  padding: 10,
                  marginBottom: 10,
                }}
                placeholder="Enter your email"
                value={email}
                onChangeText={(text) => setEmail(text)}
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                // margin: 10,
              }}
            >
              <TouchableOpacity
                onPress={() => navigation.navigate("Reset Password")}
                style={{
                  flex: 1,
                  backgroundColor: "red",
                  padding: 10,
                  borderRadius: 10,
                  marginRight: 10,
                }}
              >
                <Text style={{ color: "white", textAlign: "center" }}>
                  Change Password?
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleSubmit}
                style={{
                  flex: 1,
                  backgroundColor: "green",
                  padding: 10,
                  borderRadius: 10,
                }}
              >
                <Text style={{ color: "white", textAlign: "center" }}>
                  Update
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Profile;
