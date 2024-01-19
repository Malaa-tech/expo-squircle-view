import { requireNativeViewManager } from "expo-modules-core";
import * as React from "react";
import { View, StyleSheet, TouchableOpacity, processColor } from "react-native";

import {
  SquircleButtonProps,
  SquircleViewProps,
  ExpoSquircleNativeViewProps,
} from "./ExpoSquircleView.types";

const NativeView: React.ComponentType<ExpoSquircleNativeViewProps> =
  requireNativeViewManager("ExpoSquircleView");

const ExpoSquircleViewNativeWrapper = (
  props: React.PropsWithChildren<
  SquircleViewProps | SquircleButtonProps
  >
) => {
  const {
    cornerSmoothing = 100,
    backgroundColor = "transparent",
    borderRadius = 0,
    borderColor = "transparent",
    borderWidth = 0,
    preserveSmoothing = false
  } = props;

  return (
    <NativeView
      backgroundColor={processColor(backgroundColor)}
      borderColor={processColor(borderColor)}
      borderRadius={borderRadius}
      cornerSmoothing={cornerSmoothing}
      borderWidth={borderWidth}
      preserveSmoothing={preserveSmoothing}
      style={StyleSheet.absoluteFill}
    />
  );
};



export const SquircleButton = (
  props: React.PropsWithChildren<SquircleButtonProps>
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

export const SquircleView = (
  props: React.PropsWithChildren<SquircleViewProps>
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

const styles = StyleSheet.create({
  container: { backgroundColor: "transparent" },
});
