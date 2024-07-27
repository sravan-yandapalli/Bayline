import React, { useState, useEffect, useRef, useMemo } from "react";
import { Dimensions, Animated, Easing, Alert, View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Camera, CameraType } from "expo-camera/legacy";
import axios from "axios";
import Icon from "react-native-vector-icons/FontAwesome";
import { getData } from "@/api/store";
import { color } from "../../colorCodes";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import TopBar from "../../components/TopBar";
import { useNavigation } from "@react-navigation/native";
import * as Device from 'expo-device';
import { manipulateAsync, SaveFormat } from "expo-image-manipulator";


type SizeVariationType = any;

export default function Counting() {
  const navigation = useNavigation();
  
  const [type, setType] = useState(CameraType.back);
  const [camera, setCamera] = useState<Camera | null>(null);
  const [imageUri, setImageUri] = useState<string>("");
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [sizeVariation, setSizeVariation] = useState<SizeVariationType>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const countAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (imageUri && isSubmit) {
      handleSubmitForCount(imageUri);
    }
  }, [imageUri, isSubmit]);

  useEffect(() => {
    if (sizeVariation) {
      Animated.timing(countAnim, {
        toValue: sizeVariation.count,
        duration: 1500,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
        useNativeDriver: true,
      }).start();
    }
  }, [sizeVariation, countAnim]);

  const takePicture = async () => {
    if (camera) {
      try {
        const data = await camera.takePictureAsync();
        setImageUri(data.uri);
        setIsSubmit(false); // Reset isSubmit when taking a new picture
      } catch (error) {
        console.log("Error taking picture:", error);
        Alert.alert("Error", "Failed to take picture.");
      }
    } else {
      Alert.alert("Error", "Camera is not ready.");
    }
  };
  

  const handleSubmitForCount = async (img: any) => {
    setIsLoading(true);

    const getUserId: any = await getData("user_id");

    // Get device model using expo-device
    const deviceModel: any = await Device.modelName;
    console.log(deviceModel);

    // const croppedImage = await manipulateAsync(
    //   img,
    //   [{ crop: { originX: (Dimensions.get("window").width - 60) / 2, originY: (Dimensions.get("window").width - 60) / 2, width: 180, height: 180 } }],
    //   { compress: 1, format: SaveFormat.JPEG }
    // );

    const formData = new FormData();
    formData.append("file", {
      uri: img,
      type: "image/jpeg",
      name: "captured_image.jpeg",
    } as unknown as File);
    formData.append("user_id", getUserId);
    formData.append("device_info",  deviceModel); // Append device model to formData

    handleInvokeApi(formData);
  };

  const handleInvokeApi = async (formData: any) => {
    axios({
      method: "POST",
      maxBodyLength: Infinity,
      url: "https://fastapi-counting.aiqua.co/size_variation_detection",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then(function (response) {
        setIsLoading(false);
        setSizeVariation(response?.data || null);
        setIsSubmit(true); // Set isSubmit to true after successful response
      })
      .catch(function (error) {
        console.log(error.response);
        Alert.alert("Error", "Something Went Wrong!", [
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ]);
        setIsLoading(false);
      });
  };

  const handleReCapture = () => {
    setImageUri("");
    setIsLoading(false);
    setSizeVariation(null);
    setIsSubmit(false); // Reset isSubmit when recapturing
  };

  const handleSubmitButtonPress = () => {
    if (!imageUri) {
      Alert.alert("Error", "Please capture an image first.");
    } else {
      setIsSubmit(true); // Trigger counting and loading display
    }
  };

  const captureView = useMemo(() => {
    return (
      <>
        {isLoading ? (
          <View style={styles.loader}>
            <Image
              source={require("../../assets/images/loading.gif")}
              style={{
                width: 100,
                height: 100,
                resizeMode: "contain",
              }}
            />
          </View>
        ) : (
          <View style={styles.cameraSection}>
            {imageUri ? (
              <Image style={styles.cameraImage} source={{ uri: imageUri }} />
            ) : (
              <>
                {permission?.granted ? (
                  <View style={{ borderRadius: 350, overflow: "hidden" }}>
                    <Camera
                      style={styles.camera}
                      type={type}
                      ref={(ref: Camera | null) => setCamera(ref)}
                      ratio="1:1"
                    />
                  </View>
                ) : (
                  <>
                    <Text style={{ textAlign: "center" }}>
                      We need your permission to show the camera
                    </Text>
                    <TouchableOpacity
                      onPress={requestPermission}
                      style={styles.permissionButton}
                    >
                      <Text style={styles.permissionButtonText}>
                        Grant Permission
                      </Text>
                    </TouchableOpacity>
                  </>
                )}
              </>
            )}
          </View>
        )}
      </>
    );
  }, [isLoading, imageUri, permission, camera]);

  const displayCount = useMemo(() => {
    return (
      sizeVariation && isSubmit && (
        <View style={{ alignItems: 'center' }}>
          <View style={styles.countContainer}>
            <Text style={styles.countText}>Count :</Text>
            <Text style={styles.countValue}>{sizeVariation.count}</Text>
          </View>
          <TouchableOpacity style={styles.refreshBut} onPress={handleReCapture}>
            <Text style={styles.refreshButText}>Re-Capture</Text>
          </TouchableOpacity>
        </View>
      )
    );
  }, [sizeVariation, isSubmit]);
  
  return (
    <View style={styles.container}>
      {/* =========== heading TopBar ============ */}
      <TopBar title={"Counting"} handleBack={() => navigation.goBack()} />
      {/* ======================================= */}
      {/* ============== Capture View ============ */}
      {captureView}
      {!isLoading && imageUri && !sizeVariation && (
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.refreshButton} onPress={handleReCapture}>
            <Text style={styles.refreshButtonText}>Re-Capture</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmitButtonPress}>
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      )}
      {/* ======================================= */}
      {/* =========== Camera Button ============ */}
      {!isLoading && !imageUri && (
        <View style={styles.cameraButtonContainer}>
          <TouchableOpacity style={styles.Camerabtn} onPress={takePicture}>
            <Icon name="camera" size={25} color={color.blue} />
          </TouchableOpacity>
        </View>
      )}
      {/* ======================================= */}
      {/* ============= Display Count ============ */}
      {displayCount}
      {/* ======================================= */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loader: {
    position: "absolute",
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(187,187,187,0.5)",
  },
  cameraButtonContainer: {
    alignItems: "center",
    paddingTop: hp("8%"),
  },
  Camerabtn: {
    borderWidth: 10,
    alignItems: "center",
    justifyContent: "center",
    width: 80,
    height: 80,
    backgroundColor: "#fff",
    borderRadius: 50,
    borderColor: color.lightBlue,
    marginBottom: 10,
  },
  cameraSection: {
    alignItems: "center",
    marginTop: 100,
  },
  camera: {
    height: Dimensions.get("window").width - 60,
    width: Dimensions.get("window").width - 60,
    overflow: "hidden",
    borderRadius: 170,
  },
  cameraImage: {
    borderWidth: 3,
    height: Dimensions.get("window").width - 60,
    width: Dimensions.get("window").width - 60,
    overflow: "hidden",
    borderRadius: 180,
  },
  countContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: hp("5%"),
  },
  countText: {
    fontSize: 30,
    color: color.blue,
    fontWeight: "bold",
    marginRight: 10,
  },
  countValue: {
    fontSize: 30,
    color: color.blue,
    fontWeight: "bold",
  },
  permissionButton: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: color.lightBlue,
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  permissionButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginTop: 20,
  },
  refreshButton: {
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: color.blue,
    padding: 10,
    borderRadius: 5,
    width: 120,
  },
  refreshBut: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: color.blue,
    padding: 15,
    borderRadius: 5,
    marginTop: 40,
    width: 120,
    alignSelf: "center"
  },
  refreshButText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  refreshButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  submitButton: {
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: color.blue,
    padding: 10,
    borderRadius: 5,
    width: 120,
  },
  submitButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  }, 
});
