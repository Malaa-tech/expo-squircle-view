import { requireNativeViewManager } from "expo-modules-core";
import * as React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  processColor,
  ViewProps,
  DimensionValue,
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
      squircleBackgroundColor={processColor(backgroundColor)}
      squircleBorderColor={processColor(borderColor)}
      squircleBorderWidth={borderWidth}
      borderRadius={borderRadius}
      cornerSmoothing={cornerSmoothing}
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
  const { squircleProps, wrapperStyle } = useSquircleProps(props);

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
  const { squircleProps, wrapperStyle } = useSquircleProps(props);

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
  const style = props.style ? StyleSheet.flatten(props.style) : undefined;

  const {
    cornerSmoothing,
    borderRadius,
    borderWidth,
    backgroundColor,
    borderColor,
    ignoreBorderWidthFromPadding,
  } = props;

  const { 
    padding,
    paddingVertical, 
    paddingHorizontal, 
    paddingBottom,
    paddingEnd,
    paddingLeft,
    paddingRight,
    paddingStart, 
    paddingTop 
  } = style || {};

  const calculatedPadding = React.useMemo(() => {
    const extraPadding = borderWidth || style?.borderWidth || 0;

    const calculatePadding = (_paddingValue: DimensionValue) => {
      if (typeof _paddingValue === "number") {
        return _paddingValue + extraPadding;
      }
      return _paddingValue;
    };

    return {
      padding: padding ? calculatePadding(padding) : extraPadding,
      paddingVertical: paddingVertical ? calculatePadding(paddingVertical) : undefined,
      paddingHorizontal: paddingHorizontal ? calculatePadding(paddingHorizontal) : undefined,
      paddingBottom: paddingBottom ? calculatePadding(paddingBottom) : undefined,
      paddingEnd: paddingEnd ? calculatePadding(paddingEnd) : undefined,
      paddingLeft: paddingLeft ? calculatePadding(paddingLeft) : undefined,
      paddingRight: paddingRight ? calculatePadding(paddingRight) : undefined,
      paddingStart: paddingStart ? calculatePadding(paddingStart) : undefined,
      paddingTop: paddingTop ? calculatePadding(paddingTop) : undefined,
    }
  }, [style, borderWidth])

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
        borderColor: undefined,
        backgroundColor: undefined,
        ...(ignoreBorderWidthFromPadding === true ? undefined: calculatedPadding)
      },
    ],
  };
};

const styles = StyleSheet.create({
  container: { backgroundColor: "transparent" },
});
