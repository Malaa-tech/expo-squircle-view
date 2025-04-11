import { requireNativeViewManager } from "expo-modules-core";
import { ExpoSquircleNativeViewProps } from "./ExpoSquircleView.types";

export const NativeView: React.ComponentType<ExpoSquircleNativeViewProps> =
  requireNativeViewManager("ExpoSquircleView");
