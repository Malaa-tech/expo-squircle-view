import { DimensionValue } from "react-native";
import { SquircleButton, SquircleView } from "./ExpoSquircleView";
import {
  SquircleButtonProps,
  SquircleViewProps,
} from "./ExpoSquircleView.types";

export {
  SquircleButton,
  SquircleView,
  SquircleViewProps,
  SquircleButtonProps,
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