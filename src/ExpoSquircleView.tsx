import * as React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  processColor,
  ViewProps,
  Platform,
  DimensionValue,
} from "react-native";

import {
  SquircleButtonProps,
  SquircleViewProps,
} from "./ExpoSquircleView.types";
import { NativeView } from "./NativeWrapper";


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
      squircleBackgroundColor={Platform.OS === 'web' ? backgroundColor : processColor(backgroundColor)}
      squircleBorderColor={Platform.OS === 'web' ? borderColor : processColor(borderColor)}
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

  const calculatedPadding = React.useMemo(() => {
    return calculateSquirclePadding(style, borderWidth);
  }, [style, borderWidth])

  return {
    squircleProps: {
      ...props,
      borderRadius: borderRadius || style?.borderRadius || 0,
      borderWidth: borderWidth || style?.borderWidth || 0,
      backgroundColor:
        backgroundColor || style?.backgroundColor || "transparent",
      borderColor: borderColor || style?.borderColor || "transparent",
      cornerSmoothing: cornerSmoothing !== undefined ? cornerSmoothing : 100,
      preserveSmoothing: props.preserveSmoothing || false,
      enabledIOSAnimation: props.enabledIOSAnimation || false,
    },
    wrapperStyle: [
      {
        ...styles.container,
        ...style,
        // remove styles from wrapper
        borderWidth: undefined,
        borderColor: undefined,
        backgroundColor: undefined,
        ...(ignoreBorderWidthFromPadding === true ? undefined : calculatedPadding)
      },
    ],
  };
};

export const calculateSquirclePadding = (
  style?: {
    padding?: DimensionValue;
    paddingVertical?: DimensionValue;
    paddingHorizontal?: DimensionValue;
    paddingBottom?: DimensionValue;
    paddingEnd?: DimensionValue;
    paddingLeft?: DimensionValue;
    paddingRight?: DimensionValue;
    paddingStart?: DimensionValue;
    paddingTop?: DimensionValue;
    borderWidth?: number;
  },
  borderWidth?: number
) => {
  const extraPadding = borderWidth || style?.borderWidth || 0;

  const calculatePadding = (_paddingValue: DimensionValue) => {
    if (typeof _paddingValue === "number") {
      return _paddingValue + extraPadding;
    }
    return _paddingValue;
  };

  return {
    padding: style?.padding ? calculatePadding(style.padding) : extraPadding,
    paddingVertical: style?.paddingVertical ? calculatePadding(style.paddingVertical) : undefined,
    paddingHorizontal: style?.paddingHorizontal ? calculatePadding(style.paddingHorizontal) : undefined,
    paddingBottom: style?.paddingBottom ? calculatePadding(style.paddingBottom) : undefined,
    paddingEnd: style?.paddingEnd ? calculatePadding(style.paddingEnd) : undefined,
    paddingLeft: style?.paddingLeft ? calculatePadding(style.paddingLeft) : undefined,
    paddingRight: style?.paddingRight ? calculatePadding(style.paddingRight) : undefined,
    paddingStart: style?.paddingStart ? calculatePadding(style.paddingStart) : undefined,
    paddingTop: style?.paddingTop ? calculatePadding(style.paddingTop) : undefined,
  };
};

const styles = StyleSheet.create({
  container: { backgroundColor: "transparent" },
});
