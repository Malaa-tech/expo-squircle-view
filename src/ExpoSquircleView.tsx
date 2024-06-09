import { requireNativeViewManager } from "expo-modules-core";
import * as React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  processColor,
  ViewProps,
  ViewStyle,
} from "react-native";

import {
  SquircleButtonProps,
  SquircleViewProps,
  ExpoSquircleNativeViewProps,
} from "./ExpoSquircleView.types";

const NativeView: React.ComponentType<ExpoSquircleNativeViewProps> =
  requireNativeViewManager("ExpoSquircleView");

const ExpoSquircleViewNativeWrapper = (
  props: React.PropsWithChildren<SquircleViewProps | SquircleButtonProps>
) => {
  const {
    cornerSmoothing,
    backgroundColor,
    borderRadius,
    borderColor,
    borderWidth,
    preserveSmoothing,
    enabledIOSAnimation,
  } = props;

  return (
    <NativeView
      backgroundColor={processColor(backgroundColor)}
      borderColor={processColor(borderColor)}
      borderRadius={borderRadius}
      cornerSmoothing={cornerSmoothing}
      borderWidth={borderWidth}
      preserveSmoothing={preserveSmoothing}
      enabledIOSAnimation={enabledIOSAnimation}
      style={StyleSheet.absoluteFill}
    />
  );
};

export const SquircleButton = (
  props: React.PropsWithChildren<SquircleButtonProps>
) => {
  const { children } = props;
  const {squircleProps, wrapperStyle} = useSquircleProps(props);

  return (
    <TouchableOpacity
      {...props}
      style={wrapperStyle}
    >
      <ExpoSquircleViewNativeWrapper
        {...squircleProps}
      />
      {children}
    </TouchableOpacity>
  );
};

export const SquircleView = (props: ViewProps & SquircleViewProps) => {
  const { children } = props;
  const {squircleProps, wrapperStyle} = useSquircleProps(props);

  return (
    <View
      {...props}
      style={wrapperStyle}
    >
      <ExpoSquircleViewNativeWrapper
        {...squircleProps}
      />
      {children}
    </View>
  );
};


const useSquircleProps = (
  props: SquircleViewProps | SquircleButtonProps
) => {
  const style = props.style as ViewStyle | undefined;

  const {
    cornerSmoothing,
    borderRadius,
    borderWidth,
    backgroundColor,
    borderColor,
  } = props;

  return {
    squircleProps: {
      ...props,
      borderRadius: borderRadius || style?.borderRadius || 0,
      borderWidth: borderWidth || style?.borderWidth || 0,
      backgroundColor:
        backgroundColor || style?.backgroundColor || "transparent",
      borderColor: borderColor || style?.borderColor || "transparent",
      cornerSmoothing: cornerSmoothing || 100,
      preserveSmoothing: props.preserveSmoothing || false,
      enabledIOSAnimation: props.enabledIOSAnimation || false,
    },
    wrapperStyle: [
      styles.container,
      style,
      {
        // remove styles from wrapper
        borderWidth: undefined,
        borderRadius: undefined,
        borderColor: undefined,
        backgroundColor: undefined,
      },
    ],
  };
};

const styles = StyleSheet.create({
  container: { backgroundColor: "transparent" },
});
