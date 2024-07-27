import { StyleSheet, TextInput } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { color } from "../../colorCodes";

interface InputProp {
  id: string;
  placeholder: string;
  secureTextEntry: boolean;
  onChangeText: any;
  onBlur: any;
  value: any;
}

export default function Input({
  id,
  placeholder,
  secureTextEntry,
  onChangeText,
  onBlur,
  value,
}: InputProp) {
  return (
    <TextInput
      style={styles.field}
      id={id}
      placeholder={placeholder}
      secureTextEntry={secureTextEntry}
      onChangeText={onChangeText}
      onBlur={onBlur}
      value={value}
    />
  );
}

const styles = StyleSheet.create({
  field: {
    backgroundColor: color.lightSkyBlue,
    width: wp("85%"),
    height: 48,
    paddingLeft: 20,
    borderRadius: 3,
    color: color.blue,
    fontWeight: "bold",
  },
});
