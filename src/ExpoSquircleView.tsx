import { requireNativeViewManager } from "expo-modules-core";
import * as React from "react";
import { View, StyleSheet, TouchableOpacity, processColor } from "react-native";

import {
  ExpoSquircleButtonViewProps,
  ExpoSquircleNativeViewProps,
  ExpoSquircleViewProps,
} from "./ExpoSquircleView.types";

const NativeView: React.ComponentType<ExpoSquircleNativeViewProps> =
  requireNativeViewManager("ExpoSquircleView");

const ExpoSquircleViewNativeWrapper = (
  props: React.PropsWithChildren<
    ExpoSquircleViewProps | ExpoSquircleButtonViewProps
  >
) => {
  const {
    cornerSmoothing = 100,
    backgroundColor = "transparent",
    borderRadius = 0,
    borderColor = "transparent",
    borderWidth = 0,
  } = props;

  return (
    <NativeView
      backgroundColor={processColor(backgroundColor)}
      borderColor={processColor(borderColor)}
      borderRadius={borderRadius}
      cornerSmoothing={cornerSmoothing}
      borderWidth={borderWidth}
      style={StyleSheet.absoluteFill}
    />
  );
};

const ExpoSquircleView = (
  props: React.PropsWithChildren<ExpoSquircleViewProps>
) => {
  const { style, children } = props;

  return (
    <View
      {...props}
      style={[
        styles.container,
        style,
        {
          borderWidth: undefined,
          borderRadius: undefined,
        },
      ]}
    >
      <ExpoSquircleViewNativeWrapper {...props} />
      {children}
    </View>
  );
};

export const ExpoSquircleButtonView = (
  props: React.PropsWithChildren<ExpoSquircleButtonViewProps>
) => {
  const { style, children } = props;

  return (
    <TouchableOpacity
      {...props}
      style={[
        styles.container,
        style,
        {
          borderWidth: undefined,
          borderRadius: undefined,
        },
      ]}
    >
      <ExpoSquircleViewNativeWrapper {...props} />
      {children}
    </TouchableOpacity>
  );
};

export default ExpoSquircleView;

const styles = StyleSheet.create({
  container: { backgroundColor: "transparent" },
});
