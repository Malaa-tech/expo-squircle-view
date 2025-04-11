import * as React from 'react';
import { StyleSheet } from 'react-native';
import { SquircleButtonProps, SquircleViewProps } from './ExpoSquircleView.types';
import { getSvgPath } from 'figma-squircle';
import { TouchableOpacity, View, ViewProps } from 'react-native';
import { calculateSquirclePadding } from '.';

// Custom hook to manage squircle rendering
function useSquircle(props: SquircleViewProps | SquircleButtonProps) {
  const [svgPath, setSvgPath] = React.useState('');
  const [layout, setLayout] = React.useState({ width: 0, height: 0 });

  // Extract style properties
  const style = StyleSheet.flatten(props.style || {});
  const borderWidth = typeof style.borderWidth === 'number' ? style.borderWidth : 0;
  const borderRadius = typeof style.borderRadius === 'number' ? style.borderRadius : 0;
  const backgroundColor = props.backgroundColor || style.backgroundColor || 'transparent';
  const borderColor = props.borderColor || style.borderColor;
  const cornerSmoothing = ((props.cornerSmoothing ?? 100) / 100);

  // Calculate padding
  const calculatedPadding = calculateSquirclePadding(style, borderWidth);

  // Handle layout changes
  const onLayout = React.useCallback((event) => {
    const { width, height } = event.nativeEvent.layout;
    setLayout({ width, height });
  }, []);

  // Update the SVG path when dimensions or style properties change
  React.useEffect(() => {
    if (layout.width && layout.height) {
      const path = getSvgPath({
        width: layout.width - borderWidth,
        height: layout.height - borderWidth,
        cornerRadius: borderRadius,
        cornerSmoothing: cornerSmoothing,
        preserveSmoothing: props.preserveSmoothing ?? false
      });
      setSvgPath(path);
    }
  }, [
    layout.width,
    layout.height,
    borderRadius,
    borderWidth,
    cornerSmoothing,
    props.preserveSmoothing
  ]);

  // Create clean props without squircle-specific props
  const cleanProps = { ...props };
  delete cleanProps.style;
  delete cleanProps.cornerSmoothing;
  delete cleanProps.preserveSmoothing;
  delete cleanProps.backgroundColor;
  delete cleanProps.borderColor;
  delete cleanProps.ignoreBorderWidthFromPadding;

  // Prepare style without squircle-specific properties
  const cleanStyle = {
    ...style,
    backgroundColor: undefined,
    borderRadius: undefined,
    borderColor: undefined,
    borderWidth: undefined,
    overflow: 'hidden' as const,
    ...(props.ignoreBorderWidthFromPadding ? undefined : calculatedPadding)
  };

  // Create the path element
  const pathElement = (
    <svg style={{ position: 'absolute', width: '100%', height: '100%' }}>
      <path
        d={svgPath}
        style={{
          transform: `translateX(${borderWidth / 2}px) translateY(${borderWidth / 2}px)`
        }}
        fill={typeof backgroundColor === 'string' ? backgroundColor : 'transparent'}
        stroke={typeof borderColor === 'string' ? borderColor : undefined}
        strokeWidth={borderWidth}
      />
    </svg>
  );

  return {
    onLayout,
    cleanProps,
    cleanStyle,
    pathElement
  };
}

export function SquircleView(props: ViewProps & SquircleViewProps) {
  const { onLayout, cleanProps, cleanStyle, pathElement } = useSquircle(props);

  return (
    <View onLayout={onLayout} {...cleanProps} style={cleanStyle}>
      {pathElement}
      {props.children}
    </View>
  );
}

export function SquircleButton(props: SquircleButtonProps) {
  const { onLayout, cleanProps, cleanStyle, pathElement } = useSquircle(props);

  return (
    <TouchableOpacity onLayout={onLayout} {...cleanProps} style={cleanStyle}>
      {pathElement}
      {props.children}
    </TouchableOpacity>
  );
}
