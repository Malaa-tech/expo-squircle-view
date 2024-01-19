import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";

import { SquircleButton, SquircleView } from "expo-squircle-view";
import { SquircleView as SvgSquircleView } from "react-native-figma-squircle";
import { getSvgPath } from "figma-squircle";
import { Slider } from "@miblanchard/react-native-slider";
import React from "react";

export default function App() {
  const WIDTH = 380;
  const HEIGHT = 100;
  const CORNER_RADIUS = 40;
  const CORNER_SMOOTHING = 100;
  const BORDER_WIDTH = 4;
  const BORDER_COLOR = "gray";
  const BACKGROUND_COLOR = "white";
  const PRESERVE_SMOOTHING = true;

  const [width, setWidth] = React.useState(WIDTH);
  const [height, setHeight] = React.useState(HEIGHT);
  const [cornerRadius, setCornerRadius] = React.useState(CORNER_RADIUS);
  const [cornerSmoothing, setCornerSmoothing] =
    React.useState(CORNER_SMOOTHING);
  const [borderWidth, setBorderWidth] = React.useState(BORDER_WIDTH);

  // console.log(
  //   getSvgPath({
  //     height: HEIGHT,
  //     width: WIDTH,
  //     cornerRadius: CORNER_RADIUS,
  //     cornerSmoothing: CORNER_SMOOTHING / 100,
  //   })
  // );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <View
          style={{
            width: "100%",
            height: 200,
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
          </View>
        </View>

        <SquircleView
          // backgroundColor={BACKGROUND_COLOR}
          borderWidth={borderWidth}
          borderColor={BORDER_COLOR}
          borderRadius={cornerRadius}
          cornerSmoothing={cornerSmoothing}
          preserveSmoothing={PRESERVE_SMOOTHING}
          backgroundColor={BACKGROUND_COLOR}
          // enabledIOSAnimation
          style={{
            marginTop: 20,
            width,
            height,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text>Squircle</Text>
        </SquircleView>

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

        <SvgSquircleView
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
        </SvgSquircleView>

        <View
          style={{
            width,
            height,
            marginTop: 20,
            backgroundColor: BACKGROUND_COLOR,
            borderRadius: cornerRadius,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            borderColor: BORDER_COLOR,
            borderWidth: borderWidth,
          }}
        >
          <Text>View</Text>
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

// import { Text, View } from "react-native";
// import { ExpoSquircleButtonView } from "expo-squircle-view";

// export default function App() {
//   return (
//     <View
//       style={{
//         alignItems: "center",
//         justifyContent: "center",
//         flex: 1,
//       }}
//     >
//       <ExpoSquircleButtonView
//         backgroundColor={"pink"}
//         borderWidth={4}
//         borderColor={"gray"}
//         borderRadius={40}
//         cornerSmoothing={100} // 0-100
//         preserveSmoothing={true} // false matches figma, true has more rounding
//         style={{
//           width: 200,
//           height: 100,
//           flexDirection: "row",
//           justifyContent: "center",
//           alignItems: "center",
//         }}
//       >
//         <Text>Squircle</Text>
//       </ExpoSquircleButtonView>
//     </View>
//   );
// }
