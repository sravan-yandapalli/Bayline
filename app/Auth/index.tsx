import React, { useEffect, useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useNavigation } from 'expo-router';
import { Formik } from "formik";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Image
} from "react-native";
import { color } from "../../colorCodes";
import { LoginSchema } from "../../formValidation";
import { loginApi } from "../../api/api";
import { saveData } from "../../api/store";
import Input from "../../components/Fields/Input";
import Button from "../../components/Fields/Buttons";
import Welcome from "./welcome";
import Instructions from "./instructions";

export default function Login({ navigation }: any) {
  const [isAuth, setIsAuth] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowInstructions(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isChecked && showInstructions) {
      setIsAuth(true);
    }
  }, [isChecked, showInstructions]);

  return (
    <>
      {!isAuth ? (
        !showInstructions ? <Welcome /> : <Instructions onCheckboxChange={setIsChecked} />
      ) : (
        <View style={styles.container}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            enabled
          >
            <View style={styles.topRightImage}>
              <Image
                source={require("../../assets/icon/Asset 3.png")}
                style={styles.reducedImage}
              />
            </View>

            <View style={styles.centerImage}>
              <Image
                source={require("../../assets/icon/frameee.png")}
                style={styles.centerSmallImage}
              />
            </View>

            <View style={{ alignItems: "center" }}>
              <Text style={styles.headText}>Let's Login.</Text>
            </View>

            <View style={{ paddingTop: hp("5%") }}>
              <Formik
                initialValues={{ emailId: "", password: "" }}
                validationSchema={LoginSchema}
                onSubmit={(values) => {
                  const params = {
                    email: values.emailId,
                    password: values.password,
                  };
                  loginApi(params)
                    .then((res) => {
                      console.log(res.data);
                      saveData("isLoggedIn", "true");
                      saveData("token", res.data.token);
                      saveData("user_id", res.data.userId);
                      navigation.navigate("Counting/index")
                    })
                    .catch((error) => {
                      let errorMessage = "An unexpected error occurred.";
                      if (error.response) {
                        // The request was made and the server responded with a status code
                        // that falls out of the range of 2xx
                        if (error.response.status === 401) {
                          errorMessage = "Incorrect email or password.";
                        } else {
                          errorMessage = "Incorrect email or password";
                        }
                      } else if (error.request) {
                        // The request was made but no response was received
                        errorMessage = "No internet connection. Please check your connection and try again.";
                      } else {
                        // Something happened in setting up the request that triggered an Error
                        errorMessage = "An error occurred while processing your request.";
                      }
                      Alert.alert("Error", errorMessage, [
                        { text: "OK", onPress: () => console.log("OK Pressed") },
                      ]);
                    });
                }}
              >
                {({
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  values,
                  errors,
                  touched,
                }) => (
                  <>
                    <SafeAreaView>
                      <View>
                        <Input
                          id="emailId"
                          placeholder="Email Id"
                          secureTextEntry={false}
                          onChangeText={handleChange("emailId")}
                          onBlur={handleBlur("emailId")}
                          value={values.emailId}
                        />
                        {touched.emailId && errors.emailId && (
                          <Text style={{ color: "red" }}>{errors.emailId}</Text>
                        )}
                      </View>
                      <View style={{ paddingTop: 20 }}>
                        <Input
                          id="password"
                          placeholder="Password"
                          secureTextEntry={true}
                          onChangeText={handleChange("password")}
                          onBlur={handleBlur("password")}
                          value={values.password}
                        />
                        {touched.password && errors.password && (
                          <Text style={{ color: "red" }}>{errors.password}</Text>
                        )}
                        <Text
                          style={styles.forgetPassTxt}
                        >
                          Forgot Password?
                        </Text>
                      </View>
                    </SafeAreaView>
                    <View style={{ paddingTop: hp("5%") }}>
                      <Button name="Login" type="DARK" press={handleSubmit} />
                    </View>
                  </>
                )}
              </Formik>
            </View>
          </KeyboardAvoidingView>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.white,
    alignItems: "center",
  },
  headText: {
    fontSize: 35,
    fontWeight: "300",
    color: color.blue,
  },
  forgetPassTxt: {
    alignSelf: "flex-end",
    fontWeight: "bold",
    fontSize: 12,
    paddingTop: 6,
  },
  centerImage: {
    paddingTop: hp("20%"),
    alignItems: "center",
    paddingLeft: hp("1.4%"),
  },
  centerSmallImage: {
    width: wp("60%"),
    height: hp("15%"),
    resizeMode: "contain",
  },
  topRightImage: {
    paddingTop: hp("10%"),
    alignItems: "flex-end",
    width: wp("85%"),
    height: hp("10%"),
  },
  reducedImage: {
    width: wp("10%"),
    height: hp("8%"),
    resizeMode: "contain",
  },
});
