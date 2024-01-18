import { requireNativeViewManager } from "expo-modules-core";
import * as React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";

import { ExpoSquircleViewProps } from "./ExpoSquircleView.types";

const NativeView: React.ComponentType<ExpoSquircleViewProps> =
  requireNativeViewManager("ExpoSquircleView");

const ExpoSquircleViewNativeWrapper = (
  props: React.PropsWithChildren<ExpoSquircleViewProps>
) => {
  return <NativeView {...props} style={StyleSheet.absoluteFill} />;
};

const ExpoSquircleView = (
  props: React.PropsWithChildren<ExpoSquircleViewProps>
) => {
  const {
    cornerSmoothing = 100,
    backgroundColor = "transparent",
    borderRadius = 0,
    borderColor = "transparent",
    borderWidth = 0,
    style,
    children,
  } = props;

  return (
    <View
      {...props}
      style={[
        styles.container,
        style,
        {
          borderWidth: undefined,
          borderRadius: undefined
        },
      ]}
    >
      <ExpoSquircleViewNativeWrapper
        backgroundColor={backgroundColor}
        borderColor={borderColor}
        borderRadius={borderRadius}
        cornerSmoothing={cornerSmoothing}
        borderWidth={borderWidth}
      />
      {children}
    </View>
  );
};

export const ExpoSquircleButtonView = (
  props: React.PropsWithChildren<ExpoSquircleViewProps>
) => {
  const {
    cornerSmoothing = 100,
    backgroundColor = "transparent",
    borderRadius = 0,
    borderColor = "transparent",
    borderWidth = 0,
    style,
    children,
  } = props;

  return (
    <TouchableOpacity
      {...props}
      style={[
        styles.container,
        style,
        {
          borderWidth: undefined,
          borderRadius: undefined
        },
      ]}
    >
      <ExpoSquircleViewNativeWrapper
        backgroundColor={backgroundColor}
        borderColor={borderColor}
        borderRadius={borderRadius}
        cornerSmoothing={cornerSmoothing}
        borderWidth={borderWidth}
      />
      {children}
    </TouchableOpacity>
  );
}

export default ExpoSquircleView;

const styles = StyleSheet.create({
  container: { backgroundColor: "transparent" },
});
