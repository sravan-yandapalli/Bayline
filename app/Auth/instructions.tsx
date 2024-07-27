import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Animated } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { color } from "../../colorCodes";
import CustomCheckBox from './CustomCheckBox'; // Adjust the path as needed

const defaultInstructions = [
  {
    text: ' Place the Sl white round tub. Pour clear sea water.',
    image: require('../../assets/step/1.gif'),
  },
  {
    text: ' Please get the Pls into round tub.',
    image: require('../../assets/step/1.gif'),
  },
  {
    text: ' Please wait for 2 minutes to settle down the PLs.',
    image: require('../../assets/step/1.gif'),
  },
  {
    text: ' Focus the camera to round tub & match circle view',
    image: require('../../assets/step/1.gif'),
  },
  {
    text: ' Click the picture when circle view is matched to tub.',
    image: require('../../assets/step/1.gif'),
  },
  {
    text: ' Please take 3 pictures and take an average value from those 3 pics.',
    image: require('../../assets/step/1.gif'),
  },
];

const Instructions = ({ instructions = defaultInstructions, onCheckboxChange }: { instructions?: Array<any>, onCheckboxChange: (isChecked: boolean) => void }) => {
  const [animations] = useState(instructions.map(() => new Animated.Value(0)));
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    if (!isChecked) {
      const animationSequence = animations.map((anim, index) =>
        Animated.timing(anim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
          delay: index * 200,
        })
      );
      Animated.stagger(200, animationSequence).start();
    }
  }, [isChecked]);

  // Additional logic to handle checkbox change
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    if (onCheckboxChange) {
      onCheckboxChange(!isChecked);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Instructions</Text>
        <Image source={require('../../assets/icon/Group-1.png')} style={styles.headerLogo} />
      </View>
      <View style={{ marginTop: 20 }} />
      {instructions.map((step, index) => (
        <Animated.View
          key={index}
          style={[
            styles.stepContainer,
            {
              opacity: animations[index],
              transform: [
                {
                  translateY: animations[index].interpolate({
                    inputRange: [0, 1],
                    outputRange: [50, 0],
                  }),
                },
              ],
            },
          ]}
        >
          <View style={styles.stepContent}>
            {(index % 2 === 0) && (
              <View style={styles.imageWrapper}>
                <Image source={step.image} style={styles.stepImage} />
              </View>
            )}
            <Text style={[styles.stepText, { color: color.blue }]}>
              {step.text} {/* Apply the desired color */}
            </Text>
            {(index % 2 !== 0) && (
              <View style={styles.imageWrapper}>
                <Image source={step.image} style={styles.stepImage} />
              </View>
            )}
          </View>
        </Animated.View>
      ))}
      <CustomCheckBox
        title="I agree to the Terms and Conditions"
        checked={isChecked}
        onPress={handleCheckboxChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.white, // Use white color from color file
    padding: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingTop: 20,
  },
  headerText: {
    fontSize: 22, // Slightly bigger font size
    fontWeight: 'bold',
    color: color.blue,
    fontFamily: 'Mulish-Bold', // Use Mulish font
  },
  headerLogo: {
    width: 45, // Slightly bigger logo
    height: 45,
    resizeMode: 'contain',
  },
  stepContainer: {
    marginBottom: 15, // Slightly bigger margin
  },
  stepContent: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: color.lightSkyBlue,
  },
  stepText: {
    fontSize: 18, // Slightly bigger font size
    textAlign: 'left',
    marginLeft: 10,
    flexWrap: 'wrap',
    flex: 1,
    fontWeight: '500',
    fontFamily: 'Mulish-Regular', // Use Mulish font
    marginTop: -10, // Move text up
  },
  imageWrapper: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#084571',
    borderRadius: 5,
    overflow: 'hidden', // Ensure the image respects the border radius
    marginTop: -10, // Move image up
  },
  stepImage: {
    width: 90, // Slightly bigger image
    height: 90,
    resizeMode: 'contain',
  },
});

export default Instructions;
