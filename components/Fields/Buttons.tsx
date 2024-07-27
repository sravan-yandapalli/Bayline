import { StyleSheet, TouchableOpacity, Text } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { color } from "../../colorCodes";

interface ButtonProp {
  name: string;
  type: string;
  press: any;
}

export default function Button({ name, type, press }: ButtonProp) {
  return (
    <TouchableOpacity
      style={type === "DARK" ? styles.Btn1 : styles.Btn2}
      onPress={() => press()}
    >
      <Text style={type === "DARK" ? styles.BtnText1 : styles.BtnText2}>
        {name}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  Btn1: {
    backgroundColor: color.blue,
    width: wp("85%"),
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 3,
  },
  BtnText1: {
    color: color.white,
    fontWeight: "bold",
  },

  Btn2: {
    backgroundColor: color.lightBlue,
    width: 228,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 3,
  },
  BtnText2: {
    color: color.blue,
    fontWeight: "bold",
  },
});
