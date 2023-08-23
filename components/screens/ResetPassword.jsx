import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";

const ResetPassword = ({ navigation }) => {
  const [newPassword, setNewPassword] = useState("");
  const [reNewPassword, setReNewPassword] = useState("");
  const [uppercase, setUppercase] = useState(false);

  const [special, setSpecial] = useState(false);
  const [number, setNumber] = useState(false);
  const [email, setEmail] = useState("");
  useEffect(() => {
    const getEmpData = async () => {
      try {
        await AsyncStorage.getItem("emp").then((value) => {
          setEmail(JSON.parse(value).email);
        });
      } catch (error) {
        console.error(error);
      }
    };
    getEmpData();
  });

  useEffect(() => {
    if (/[A-Z]/.test(newPassword) && /[A-Z]/.test(reNewPassword)) {
      setUppercase(true);
    } else {
      setUppercase(false);
    }
    if (/[0-9]/.test(newPassword) && /[0-9]/.test(reNewPassword)) {
      setNumber(true);
    } else {
      setNumber(false);
    }
    if (
      /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(newPassword) &&
      /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(reNewPassword)
    ) {
      setSpecial(true);
    } else {
      setSpecial(false);
    }
  }, [newPassword, reNewPassword]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== reNewPassword) {
      alert("Passwords do not match");
    } else if (number === false || special === false || uppercase === false) {
      toast.error("Password does not meet requirements");
    } else if (number === true && special === true && uppercase === true) {
      const res = await fetch("https://msedcl-tpms.vercel.app/api/auth/reset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email,
          password: newPassword,
        }),
      });
      const data = await res.json();
      if (data.message === "Password Updated") {
        const response = await fetch(
          "https://msedcl-tpms.vercel.app/api/sendpasswordresetmail",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: email,
              html: `<!DOCTYPE html>
            <html>
            <body>
                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                    <tr>
                        <td align="center" bgcolor="#f4f4f4">
                            <table width="600" border="0" cellspacing="0" cellpadding="20" bgcolor="#ffffff" style="border: 1px solid #e0e0e0;">
                                <tr>
                                    <td align="center" style="font-size: 24px; font-weight: bold;">Password Update Notification</td>
                                </tr>
                                <tr>
                                    <td>
                                        <p>Your password has been successfully changed. If you did not make this change, please contact our support team immediately.</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td align="center">
                                        <a href="https://msedcl-tpms.vercel.app" style="text-decoration: none; background-color: #0078d4; color: #ffffff; padding: 10px 20px; border-radius: 5px; font-weight: bold;">Visit Our Website</a>
                                    </td>
                                </tr>
                                <tr>
                                    <td align="center" style="font-size: 12px; color: #777777;">
                                        This is an automated email, please do not reply.
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </body>
            </html>`,
            }),
          }
        );
        const response_data = await response.json();
        if (response_data.message === "Success") {
          alert("Password Updated Successfully");
        } else {
          alert("Something went wrong. Please try again.");
        }
      } else {
        alert("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fdba72b3",
      }}
    >
      <View style={{ alignItems: "center" }}>
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
            flexDirection: "column",
          }}
        >
          <Text
            style={{
              fontSize: 16,
              color: "white",
              marginBottom: 20,
              textAlign: "center",
            }}
          >
            Reset Password for {email}
          </Text>
          <View style={{ marginBottom: 10 }}>
            <Text style={{ fontSize: 16, color: "#888" }}>New Password</Text>
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: "#ccc",
                borderRadius: 5,
                padding: 10,
                marginBottom: 10,
                color: "white",
              }}
              placeholderTextColor={"#ccc"}
              placeholder="New Password"
              value={newPassword}
              onChangeText={(text) => setNewPassword(text)}
              secureTextEntry={true}
            />
          </View>
          <View style={{ marginBottom: 10 }}>
            <Text style={{ fontSize: 16, color: "#888" }}>
              Re-enter New Password
            </Text>
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: "#ccc",
                borderRadius: 5,
                padding: 10,
                marginBottom: 10,
                color: "white",
              }}
              placeholderTextColor={"#ccc"}
              placeholder="Re-enter your password"
              value={reNewPassword}
              onChangeText={(text) => setReNewPassword(text)}
              secureTextEntry={true}
            />
          </View>
          <TouchableOpacity
            onPress={handleSubmit}
            style={{
              backgroundColor: "green",
              borderRadius: 5,
              padding: 10,
              alignItems: "center",
              marginBottom: 10,
            }}
          >
            <Text style={{ color: "white", fontWeight: "bold", fontSize: 16 }}>
              Reset Password
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            backgroundColor: "#111827",
            borderRadius: 10,
            padding: 16,
            marginTop: 10,
          }}
        >
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 16,
              color: "white",
              marginBottom: 10,
            }}
          >
            Password must contain:
          </Text>
          <Text
            style={{
              color:
                newPassword.length >= 8 && reNewPassword.length >= 8
                  ? "green"
                  : "red",
            }}
          >
            - At least 8 characters
          </Text>
          <Text style={{ color: uppercase ? "green" : "red" }}>
            - At least 1 uppercase letter
          </Text>
          <Text style={{ color: special ? "green" : "red" }}>
            - At least 1 special character
          </Text>
          <Text style={{ color: number ? "green" : "red" }}>
            - At least 1 number
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ResetPassword;
