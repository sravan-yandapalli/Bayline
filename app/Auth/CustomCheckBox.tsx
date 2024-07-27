import React from 'react';
import { View, Text, StyleSheet, Pressable, Dimensions } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; // Use any icon library you prefer
import { color } from "../../colorCodes";

const { width: screenWidth } = Dimensions.get('window');
const MIN_WIDTH = 300; // Set your minimum width here
const MAX_WIDTH = 600; // Set your maximum width here

const CustomCheckBox = ({ title = 'Check me', checked = false, onPress = () => {} }) => {
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <MaterialIcons
        name={checked ? 'check-box' : 'check-box-outline-blank'}
        size={24}
        color={color.blue}
      />
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginVertical: 10,
    marginLeft: -13, // Move the container up
    width: screenWidth > MAX_WIDTH ? MAX_WIDTH : screenWidth > MIN_WIDTH ? screenWidth : MIN_WIDTH,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  text: {
    marginLeft: 10,
    fontSize: 16,
    color: color.blue,
  },
});

export default CustomCheckBox;
