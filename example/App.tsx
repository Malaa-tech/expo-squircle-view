import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { ExpoSquircleView, ExpoSquircleButtonView } from "expo-squircle-view";
import { SquircleView } from "react-native-figma-squircle";
import { getSvgPath } from "figma-squircle";

export default function App() {
  const WIDTH = 200;
  const HEIGHT = 120;
  const CORNER_RADIUS = 30;
  const CORNER_SMOOTHING = 100;
  const BORDER_WIDTH = 2;
  const BORDER_COLOR = "blue";
  const BACKGROUND_COLOR = "pink";

  console.log(
    getSvgPath({
      height: HEIGHT,
      width: WIDTH,
      cornerRadius: CORNER_RADIUS,
      cornerSmoothing: CORNER_SMOOTHING / 100,
    })
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <ExpoSquircleView
          backgroundColor={BACKGROUND_COLOR}
          borderWidth={BORDER_WIDTH}
          borderColor={BORDER_COLOR}
          borderRadius={CORNER_RADIUS}
          cornerSmoothing={CORNER_SMOOTHING}
          style={{
            marginTop: 20,
            width: WIDTH,
            height: HEIGHT,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text>Our component</Text>
        </ExpoSquircleView>

        <ExpoSquircleButtonView
         backgroundColor={BACKGROUND_COLOR}
         borderWidth={BORDER_WIDTH}
         borderColor={BORDER_COLOR}
         borderRadius={CORNER_RADIUS}
         cornerSmoothing={CORNER_SMOOTHING}
          style={{
            marginTop: 20,
            width: WIDTH,
            height: HEIGHT,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text>Our clickable component</Text>
        </ExpoSquircleButtonView>

        <SquircleView
          style={{
            width: WIDTH,
            height: HEIGHT,
            marginTop: 20,
            justifyContent: "center",
            alignItems: "center",
          }}
          squircleParams={{
            cornerSmoothing: CORNER_SMOOTHING / 100,
            cornerRadius: CORNER_RADIUS,
            fillColor: BACKGROUND_COLOR,
          }}
        >
          <Text>react-native-figma-squircle</Text>
        </SquircleView>

        <View
          style={{
            width: WIDTH,
            height: HEIGHT,
            marginTop: 20,
            backgroundColor: BACKGROUND_COLOR,
            borderRadius: CORNER_RADIUS,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text>DEFAULT VIEW</Text>
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
