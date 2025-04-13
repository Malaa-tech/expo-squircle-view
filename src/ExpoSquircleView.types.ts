import {
  AnimatableNumericValue,
  ColorValue,
  TouchableOpacityProps,
  ViewProps,
  processColor,
} from "react-native";

type SquircleProps = {
  cornerSmoothing?: number;
  borderRadius?: AnimatableNumericValue;
  borderWidth?: number;
  preserveSmoothing?: boolean;
  enabledIOSAnimation?: boolean;
  ignoreBorderWidthFromPadding?: boolean;
};

export type ExpoSquircleNativeViewProps = {
  squircleBackgroundColor?: ReturnType<typeof processColor> | ColorValue;
  squircleBorderColor?: ReturnType<typeof processColor> | ColorValue;
  squircleBorderWidth?: number;
} & ViewProps &
  SquircleProps;

export type SquircleViewProps = {
  backgroundColor?: ColorValue;
  borderColor?: ColorValue;
} & ViewProps &
  SquircleProps;

export type SquircleButtonProps = {
  backgroundColor?: ColorValue;
  borderColor?: ColorValue;
} & TouchableOpacityProps &
  SquircleProps;
