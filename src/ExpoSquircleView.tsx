import { requireNativeViewManager } from "expo-modules-core";
import * as React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  DimensionValue,
} from "react-native";

import {
  SquircleButtonProps,
  SquircleViewProps,
  ExpoSquircleNativeViewProps,
} from "./ExpoSquircleView.types";

const NativeView: React.ComponentType<ExpoSquircleNativeViewProps> =
  requireNativeViewManager("ExpoSquircleView");

export const SquircleButton = (
  props: React.PropsWithChildren<SquircleButtonProps>
) => {
  const { children } = props;
  const { nativeSquircleProps, containerStyle } = useSquircleProps(props);

  return (
    <TouchableOpacity
      {...props}
      style={containerStyle}
    >
      <NativeView
        {...nativeSquircleProps}
        style={StyleSheet.absoluteFill}
      />
      {children}
    </TouchableOpacity>
  );
};

export const SquircleView = (props: SquircleViewProps) => {
  const {
    backgroundColor: _backgroundColor,
    borderColor: _borderColor,
    ignoreBorderWidthFromPadding: _ignoreBorderWidthFromPadding,
    style: _style,
    ...restProps
  } = props;
  const { nativeSquircleProps, containerStyle } = useSquircleProps(props);

  return (
    <NativeView {...restProps} {...nativeSquircleProps} style={containerStyle} />
  );
};

const useSquircleProps = (
  props: SquircleViewProps | SquircleButtonProps
) => {
  const style = props.style ? StyleSheet.flatten(props.style) : undefined;

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
    if (props.ignoreBorderWidthFromPadding === true) {
      return undefined;
    }
    const extraPadding = props.borderWidth || style?.borderWidth || 0;

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
  }, [style, props.borderWidth])

  return {
    nativeSquircleProps: {
      squircleBackgroundColor: (
        props.backgroundColor || style?.backgroundColor || "transparent"
      ),
      squircleBorderColor: (
        props.borderColor || style?.borderColor || "transparent"
      ),
      squircleBorderWidth: props.borderWidth || style?.borderWidth || 0,
      borderRadius: props.borderRadius || style?.borderRadius,
      cornerSmoothing: props.cornerSmoothing !== undefined ? props.cornerSmoothing : 100,
      preserveSmoothing: props.preserveSmoothing,
      enabledIOSAnimation: props.enabledIOSAnimation,
    },
    containerStyle: [
      styles.container,
      style,
      {
        // remove styles from wrapper
        borderWidth: undefined,
        borderColor: undefined,
        backgroundColor: undefined,
        ...calculatedPadding,
      },
    ],
  };
};

const styles = StyleSheet.create({
  container: { backgroundColor: "transparent" },
});
