import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { StyleSheet, Text, View, Image } from "react-native";
import { color } from "../../colorCodes";
import Icon from "react-native-vector-icons/FontAwesome";
// import SmallLogo from "../../assets/images/small-logo.svg";

// small-logo.svg

interface TopBarProp {
  title: string;
  handleBack: any;
}

export default function TopBar({ title, handleBack }: TopBarProp) {
  return (
    <View style={styles.TopContainer}>
      <View style={styles.TopLeftTextCont}>
        <View onTouchStart={() => handleBack()}>
          <Text style={styles.TopLeftText}>
            <Icon name="chevron-left" size={17} />
            {"  "}
            {title}
          </Text>
        </View>
      </View>
      <View style={styles.TopRightCont}>
        <View style={{ alignItems: "flex-end" }}>
          {/* <SmallLogo /> */}
          <Image source={require("../../assets/icon/white.png")} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  // ========================================================
  TopContainer: {
    backgroundColor: color.blue,
    height: hp("18px"),
    borderBottomEndRadius: 25,
    borderBottomLeftRadius: 25,
    flexDirection: "row",
  },
  TopLeftTextCont: {
    flex: 1,
    paddingTop: hp("11%"),
    paddingLeft: wp("7%"),
    
  },
  TopLeftText: {
    color: "white",
    fontSize: 20,
    fontWeight: "500",
    width: 400
  },
  TopRightCont: {
    flex: 1,
    paddingTop: hp("10%"),
    paddingRight: wp("6%"),
  },
  //   ======================================================
});
