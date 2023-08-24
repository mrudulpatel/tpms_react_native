import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";

const ForgotPassword = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setEmail("");
  }, []);
  
  const handleDataSubmit = async () => {
    setLoading(true);
    try {
      let values = {
        email: email,
        html: `<html><body><p>Dear ${email},</p><p>We received a password reset request for your ${email} account.</p><p>To reset your password, <a href="https://msedcl-tpms.vercel.app/resetpassword/${email}">click here</a>.</p><p>If you didn't request this reset, please ignore this email.</p><p>Best regards,<br>MSEDCL T&P Management Team</p></body></html>`,
      };
      let res = await fetch(
        "https://msedcl-tpms.vercel.app/api/sendpasswordresetmail",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );

      let data = await res.json();
      if (data.message === "Success") {
        setLoading(false);
        Alert.alert(
          "Forgot Password",
          "Password reset link sent to your email address."
        );
        navigation.navigate("Home");
      } else {
        setLoading(false);
        Alert.alert(
          "Forgot Password",
          "Failed to send password reset link. Please try again later."
        );
      }
    } catch (error) {
      setLoading(false);
      Alert.alert("Forgot Password", error.message);
    }
  };
  return (
    <View style={{ flex: 1, backgroundColor: "#fdba72b3" }}>
      <Text style={{ fontSize: 25, margin: 10, textAlign: "center" }}>
        Forgot Password
      </Text>
      <View style={{ flex: 1, alignItems: "center" }}>
        <View style={{ margin: 10 }}>
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
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: "#ccc",
                borderRadius: 5,
                padding: 10,
                marginBottom: 10,
                color: "white",
              }}
              placeholder="Enter your email"
              placeholderTextColor={"white"}
              autoFocus={true}
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
            <TouchableOpacity
              onPress={handleDataSubmit}
              disabled={email === "" ? true : false}
              style={{
                backgroundColor: "green",
                borderRadius: 5,
                maxWidth: "100%",
                padding: 10,
                alignItems: "center",
                marginLeft: 70,
                marginRight: 70,
              }}
            >
              {!loading ? (
                <Text
                  style={{
                    color: "white",
                    fontWeight: "bold",
                    fontSize: 15,
                    textAlign: "center",
                  }}
                >
                  Send Password Reset Link
                </Text>
              ) : (
                <ActivityIndicator size="small" color="white" />
              )}
            </TouchableOpacity>
            <View>
              <Text style={{ color: "white", margin: 10 }}>
                A password reset link will be sent to email entered in the above
                link. Please follow the instructions mentioned in the email
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ForgotPassword;
