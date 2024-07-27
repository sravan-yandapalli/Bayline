import React, { useMemo, useState } from "react";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import {
    StyleSheet,
    Text,
    View,
} from "react-native";
import { color } from "../../colorCodes";
import Icon from "react-native-vector-icons/FontAwesome";

export default function HomeOptions({ handleSelect }: any
    // { route, navigation }
) {
    const [isDrop, setIdDrop] = useState(false);
    const [value, setValue] = useState(0);

    const handleTrigerDropDown = () => {
        setIdDrop(!isDrop);
        
    };

    const handleSelectOption = (value: number) => {
        setValue(value)
        handleSelect(value)
        handleTrigerDropDown()
    }

    const handleShowSelected = useMemo(() => {
        if (value == 0) {
            return "Select Option"
        } else if (value == 1) {
            return "PL 8 - 9"
        } else if (value == 2) {
            return "PL 10 - 11"
        }else if (value == 3) {
            return "PL 12 - 13"
        }
    }, [value])

    return (
        <View style={styles.container}>
            {/* ====================== Content ====================== */}
            <View style={styles.MainContent}>
                <View style={styles.DropDownCon1} onTouchStart={handleTrigerDropDown}>
                    <View style={styles.DropDownCol1}>
                        <Text style={styles.DropDownSelectText1} >
                            {handleShowSelected}
                        </Text>
                    </View>
                    <View style={styles.DropDownCol2}>
                        <Text style={styles.DropDownSelectText2}>
                            {isDrop ? (
                                <Icon name="chevron-down" size={15} />
                            ) : (
                                <Icon name="chevron-right" size={15} />
                            )}
                        </Text>
                    </View>
                </View>
                <View>
                    {isDrop && (
                        <>
                            <View
                                style={styles.DropDownCon2}
                            >
                                <View style={styles.DropDownCol1}
                                    onTouchStart={() => handleSelectOption(1)}
                                >
                                    <Text style={styles.DropDownSelectText3}> PL 8 - 9  </Text>
                                </View>
                            </View>
                            <View
                                style={{
                                    borderBottomColor: color.grayish,
                                    borderBottomWidth: StyleSheet.hairlineWidth,
                                }}
                            />
                            <View
                                style={styles.DropDownCon2}
                            >
                                <View style={styles.DropDownCol1} onTouchStart={() => handleSelectOption(2)}>
                                    <Text style={styles.DropDownSelectText4}> PL 10 - 11 </Text>
                                </View>
                            </View>
                            <View
                                style={{
                                    borderBottomColor: color.grayish,
                                    borderBottomWidth: StyleSheet.hairlineWidth,
                                }}
                            />
                            <View
                                style={styles.DropDownCon2}
                            >
                                <View style={styles.DropDownCol1} onTouchStart={() => handleSelectOption(3)}>
                                    <Text style={styles.DropDownSelectText4}> PL 12 - 13 </Text>
                                </View>
                            </View>

                        </>
                    )}
                </View>
            </View>
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        paddingBottom: hp("15%")
    },
    //   ========================================================
    MainContent: {
        alignItems: "center",
        flex: 1,
        paddingTop: hp("2%"),
    },

    DropDownCon1: {
        flexDirection: "row",
        backgroundColor: color.lightBlue,
        width: wp("90%"),
        height: hp("5%"),
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.1,
        shadowRadius: 10,
    },

    DropDownCon2: {
        flexDirection: "row",
        backgroundColor: color.lightSkyBlue,
        width: wp("90%"),
        height: hp("4%"),
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
    },

    DropDownCol1: {
        flex: 1,
        justifyContent: "center",
    },

    DropDownCol2: {
        justifyContent: "center",
    },

    DropDownSelectText1: {
        color: color.blue,
        fontWeight: "bold",
        paddingLeft: wp("4%"),
        fontSize: 17
    },

    DropDownSelectText2: {
        color: color.blue,
        paddingRight: wp("4%"),
    },
    DropDownSelectText3: {
        color: color.grayish,
        marginLeft: wp("4%"),
        fontWeight: "bold",
    },
    DropDownSelectText4: {
        color: color.grayish,
        marginLeft: wp("4%"),
        fontWeight: "bold",
    },
    // ==========================================================
});
