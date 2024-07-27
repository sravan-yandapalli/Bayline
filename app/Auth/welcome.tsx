import React from "react";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { color } from "../../colorCodes";
// import BigLogo from "../../assets/icon/BIGLOGO.svg"

export default function Welcome() {
    return (
        <View style={styles.container}>
            <View style={{ paddingTop: hp("30%"), flex: 1 }}>
                <Image source={require("../../assets/icon/Group-1.png")} style={{
                    width: 250,
                    height: 250,
                    resizeMode: 'contain'
                }} />
                <View style={styles.container}>
                    <Image source={require("../../assets/icon/shnpl.png")} style={{ marginTop: 10,  width: 250,
                    height: 100,
                    resizeMode: 'contain'}} />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.white,
        alignItems: "center",
    },
});




