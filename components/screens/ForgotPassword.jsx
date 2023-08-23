import { View, Text } from "react-native";
import React from "react";

const ForgotPassword = () => {
  const handleDataSubmit = async () => {
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
        alert("Password reset link sent to your email address.");
      } else {
        alert("Failed to send password reset link. Please try again later.");
      }
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <View>
      <Text>ForgotPassword</Text>
    </View>
  );
};

export default ForgotPassword;
