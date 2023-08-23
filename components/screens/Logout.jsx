import { View, Text, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Logout = ({ navigation }) => {
  const handleLogout = () => {
    // Log the user out by calling handleLogout function
    const removeEmpData = async () => {
      try {
        await AsyncStorage.removeItem("emp");
      } catch (e) {
        console.log(e);
      }
    };
    removeEmpData();
    navigation.navigate("Home");
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
            <View>
              <Text style={{ color: "white" }}>
                Are you sure you want to Logout?
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text
                  style={{
                    fontSize: 20,
                    marginTop: 10,
                    fontWeight: "bold",
                    color: "red",
                    textAlign: "center",
                  }}
                >
                  No
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleLogout()}>
                <Text
                  style={{
                    fontSize: 20,
                    marginTop: 10,
                    fontWeight: "bold",
                    color: "green",
                    textAlign: "center",
                  }}
                >
                  Yes
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Logout;
