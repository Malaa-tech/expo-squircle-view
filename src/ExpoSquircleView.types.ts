import {
  ColorValue,
  TouchableOpacityProps,
  ViewProps,
  processColor,
} from "react-native";

type SquircleProps = {
  cornerSmoothing?: number;
  borderRadius?: number;
  borderWidth?: number;
};

export type ExpoSquircleNativeViewProps = {
  backgroundColor?: ReturnType<typeof processColor>;
  borderColor?: ReturnType<typeof processColor>;
} & ViewProps &
  SquircleProps;

export type ExpoSquircleViewProps = {
  backgroundColor?: ColorValue;
  borderColor?: ColorValue;
} & ViewProps &
  SquircleProps;

export type ExpoSquircleButtonViewProps = {
  backgroundColor?: ColorValue;
  borderColor?: ColorValue;
} & TouchableOpacityProps &
  SquircleProps;
