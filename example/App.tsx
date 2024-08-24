import { Button, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";

import { SquircleView } from "expo-squircle-view";
import { Slider } from "@miblanchard/react-native-slider";
import React from "react";
import Animated, { useAnimatedProps, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";


export default function App() {
  const WIDTH = 390;
  const HEIGHT = 100;
  const CORNER_RADIUS = 40;
  const CORNER_SMOOTHING = 100;
  const BORDER_WIDTH = 4;
  const BORDER_COLOR = "gray";
  const BACKGROUND_COLOR = "red";
  const PRESERVE_SMOOTHING = true;

  const [width, setWidth] = React.useState(WIDTH);
  const [height, setHeight] = React.useState(HEIGHT);
  const [cornerRadius, setCornerRadius] = React.useState(CORNER_RADIUS);
  const [cornerSmoothing, setCornerSmoothing] =
    React.useState(CORNER_SMOOTHING);
  const [borderWidth, setBorderWidth] = React.useState(BORDER_WIDTH);
  const [padding, setPadding] = React.useState(0);


  // Reanimated Testing
  // const widthSV = useSharedValue(WIDTH);
  // const scaleSV = useSharedValue(0.9);
  // const animatedStyle = useAnimatedStyle(() => {
  //   return {
  //     width: widthSV.value,
  //     flexDirection: 'row-reverse',
  //     transform: [{ scale: scaleSV.value }]
  //   }
  // })
  // End Reanimated Testing

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <View
          style={{
            width: "100%",
            height: 300,
            flexDirection: "row",
            paddingHorizontal: 10,
            gap: 12,
            alignItems: "center",
          }}
        >
          <View style={{ height: "100%", justifyContent: "space-around" }}>
            <Text>Border Radius</Text>
            <Text>Corner Smoothing</Text>
            <Text>Width</Text>
            <Text>Height</Text>
            <Text>Border Width</Text>
            <Text>Padding</Text>
          </View>
          <View
            style={{ height: "100%", justifyContent: "space-between", flex: 1 }}
          >
            <Slider
              value={cornerRadius}
              onValueChange={(value) => {
                setCornerRadius(value[0]);
              }}
              minimumValue={0}
              maximumValue={100}
              step={1}
              animateTransitions
              minimumTrackTintColor={"black"}
              maximumTrackTintColor={"gray"}
            />
            <Slider
              value={cornerSmoothing}
              onValueChange={(value) => {
                setCornerSmoothing(value[0]);
              }}
              minimumValue={0}
              maximumValue={100}
              step={1}
              animateTransitions
              minimumTrackTintColor={"black"}
              maximumTrackTintColor={"gray"}
            />
            <Slider
              value={width}
              onValueChange={(value) => {
                setWidth(value[0]);
              }}
              minimumValue={50}
              maximumValue={400}
              step={1}
              animateTransitions
              minimumTrackTintColor={"black"}
              maximumTrackTintColor={"gray"}
            />
            <Slider
              value={height}
              onValueChange={(value) => {
                setHeight(value[0]);
              }}
              minimumValue={50}
              maximumValue={400}
              step={1}
              animateTransitions
              minimumTrackTintColor={"black"}
              maximumTrackTintColor={"gray"}
            />
            <Slider
              value={borderWidth}
              onValueChange={(value) => {
                setBorderWidth(value[0]);
              }}
              minimumValue={1}
              maximumValue={10}
              step={1}
              animateTransitions
              minimumTrackTintColor={"black"}
              maximumTrackTintColor={"gray"}
            />
            <Slider
              value={padding}
              onValueChange={(value) => {
                setPadding(value[0]);
              }}
              minimumValue={0}
              maximumValue={100}
              step={1}
              animateTransitions
              minimumTrackTintColor={"black"}
              maximumTrackTintColor={"gray"}
            />
          </View>
        </View>

        <View style={{ marginVertical: 20 }}>
          <SquircleView
            cornerSmoothing={cornerSmoothing}
            preserveSmoothing={PRESERVE_SMOOTHING}
            style={{
              width,
              height,
              padding,
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: BACKGROUND_COLOR,
              borderColor: BORDER_COLOR,
              borderRadius: cornerRadius,
              borderWidth: borderWidth,
              overflow: 'hidden',
            }}
          >
            <Text>Squircle</Text>
            <View style={{ backgroundColor: 'yellow', height: 20, width: '100%' }} />
            {/* <View style={{ height: '50%', width: 100, backgroundColor: 'green', position: 'absolute', start: -50, top: 0, opacity: 0.8 }} /> */}
          </SquircleView>
        </View>

        {/* <SquircleButton
          backgroundColor={BACKGROUND_COLOR}
          borderWidth={BORDER_WIDTH}
          borderColor={BORDER_COLOR}
          borderRadius={cornerRadius}
          cornerSmoothing={CORNER_SMOOTHING}
          style={{
            marginTop: 20,
            width,
            height,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text>ExpoSquircleButton</Text>
        </SquircleButton> */}

        {/* <SvgSquircleView
          style={{
            width,
            height,
            marginTop: 20,
            justifyContent: "center",
            alignItems: "center",
          }}
          squircleParams={{
            cornerSmoothing: cornerSmoothing / 100,
            cornerRadius: cornerRadius,
            fillColor: BACKGROUND_COLOR,
            strokeWidth: borderWidth,
            strokeColor: BORDER_COLOR,
          }}
        >
          <Text>react-native-figma-squircle</Text>
        </SvgSquircleView> */}


        {/* Reanimated Testing */}
        {/* <Button title="change style" onPress={() => {
          widthSV.value = withTiming(widthSV.value > 250 ? 200 : 390, { duration: 300 });
          scaleSV.value = withTiming(scaleSV.value > 1 ? 0.8 : 1.1, { duration: 300 });
        }} />
        <Animated.View style={{...animatedStyle }}>
          <SquircleView
            cornerSmoothing={cornerSmoothing}
            preserveSmoothing={PRESERVE_SMOOTHING}
            style={{
              flex: 1,
              height,
              padding,
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: BACKGROUND_COLOR,
              borderColor: BORDER_COLOR,
              borderRadius: cornerRadius,
              borderWidth: borderWidth,
              overflow: 'hidden',
            }}
          >
            <Text>Squircle</Text>
            <View style={{ backgroundColor: 'yellow', height: 20, width: '100%' }} />
            <View style={{ height: '50%', width: 100, backgroundColor: 'green', position: 'absolute', start: -50, top: 0, opacity: 0.8 }} />
          </SquircleView>
        </Animated.View> */}
        {/* End Reanimated Testing */}


        <View style={{ marginVertical: 20 }}>
          <View
            style={{
              width,
              height,
              backgroundColor: BACKGROUND_COLOR,
              borderRadius: cornerRadius,
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              borderColor: BORDER_COLOR,
              borderWidth: borderWidth,
              padding,
              overflow: 'hidden'
            }}
          >
            <Text>View</Text>
            <View style={{ backgroundColor: 'yellow', height: 20, width: '100%' }} />
            {/* <View style={{ height: '50%', width: 100, backgroundColor: 'green', position: 'absolute', start: -50, top: 0, opacity: 0.8 }} /> */}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 50,
    backgroundColor: "#fff",
    alignItems: "center",
  },
});
