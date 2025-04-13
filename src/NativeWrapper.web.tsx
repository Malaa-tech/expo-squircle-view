import { View, Text, StyleSheet, LayoutRectangle } from "react-native";
import { getSvgPath } from 'figma-squircle';
import { useLayoutEffect, useRef, useState } from "react";


export const NativeView = ({
  squircleBackgroundColor = 'transparent',
  squircleBorderColor = 'transparent',
  squircleBorderWidth = 0,
  borderRadius = 0,
  cornerSmoothing = 100,
  preserveSmoothing = false,
}: {
  squircleBackgroundColor?: string;
  squircleBorderColor?: string;
  squircleBorderWidth?: number;
  borderRadius?: number;
  cornerSmoothing?: number;
  preserveSmoothing?: boolean;
  enabledIOSAnimation?: boolean;
}) => {
  const wrapperRef = useRef<View>(null);
  const [layout, setLayout] = useState<LayoutRectangle>({
    width: 0,
    height: 0,
    x: 0,
    y: 0
  });

  const svgPath = getSvgPath({
    width: layout.width - squircleBorderWidth,
    height: layout.height - squircleBorderWidth,
    cornerRadius: borderRadius,
    cornerSmoothing: cornerSmoothing / 100,
    preserveSmoothing: preserveSmoothing ?? false
  });


  return (
    <View ref={wrapperRef} onLayout={(e) => {
      setLayout(e.nativeEvent.layout)
    }} style={StyleSheet.absoluteFill}>
      <svg style={{
        position: 'absolute',
        width: layout?.width,
        height: layout?.height,
        pointerEvents: 'none', // Make sure SVG doesn't block interactions
      }}>
        <path
          d={svgPath}
          style={{
            transform: `translateX(${squircleBorderWidth / 2}px) translateY(${squircleBorderWidth / 2}px)`
          }}
          fill={typeof squircleBackgroundColor === 'string' ? squircleBackgroundColor : 'transparent'}
          stroke={typeof squircleBorderColor === 'string' ? squircleBorderColor : undefined}
          strokeWidth={squircleBorderWidth}
        />
      </svg></View>
  )
};
