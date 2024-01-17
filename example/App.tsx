import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import * as ExpoSquircleView from "expo-squircle-view";
import { SquircleView } from "react-native-figma-squircle";
import { getSvgPath } from "figma-squircle";

// 200 200 problem

export default function App() {
  const WIDTH = 200;
  const HEIGHT = 200;
  const CORNER_RADIUS = 40;
  const CORNER_SMOOTHING = 100;
  const TEXT = "Malaa Techonology Company";

  console.log(
    getSvgPath({
      height: HEIGHT,
      width: WIDTH,
      cornerRadius: CORNER_RADIUS,
      cornerSmoothing: CORNER_SMOOTHING / 100,
    })
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{
          width: WIDTH,
          height: HEIGHT,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
        onPress={() => {}}
      >
        <ExpoSquircleView.ExpoSquircleView
          backgroundColor={"#FFC0CB"}
          borderWidth={3}
          borderColor={"blue"}
          borderRadius={CORNER_RADIUS}
          cornerSmoothing={CORNER_SMOOTHING}
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
          }}
        />
        <Text>{TEXT}</Text>
      </TouchableOpacity>

      <SquircleView
        style={{
          width: WIDTH,
          height: HEIGHT,
          marginTop: 50
        }}
        squircleParams={{
          cornerSmoothing: CORNER_SMOOTHING / 100,
          cornerRadius: CORNER_RADIUS,
          fillColor: "pink",
        }}
      >
        <TouchableOpacity
          style={{
            width: "100%",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => {}}
        >
          <Text>react-native-figma-squircle</Text>
        </TouchableOpacity>
      </SquircleView>

      <View
        style={{
          width: WIDTH,
          height: HEIGHT,
          marginTop: 50,
          backgroundColor: "pink",
          borderRadius: CORNER_RADIUS,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>DEFAULT VIEW</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
