import { TouchableOpacityProps, ViewProps } from "react-native";

export type ExpoSquircleViewProps = {
  cornerSmoothing?: number;
  borderRadius?: number;
  backgroundColor?: string;
  borderColor?: string;
  borderWidth?: number;
} & ViewProps;

export type ExpoSquircleButtonViewProps = {
  cornerSmoothing?: number;
  borderRadius?: number;
  backgroundColor?: string;
  borderColor?: string;
  borderWidth?: number;
} & TouchableOpacityProps;