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
};

export type ExpoSquircleNativeViewProps = {
  backgroundColor?: ReturnType<typeof processColor>;
  borderColor?: ReturnType<typeof processColor>;
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
