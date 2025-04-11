import * as React from 'react';
import { StyleSheet } from 'react-native';
import { SquircleButtonProps, SquircleViewProps } from './ExpoSquircleView.types';
import { getSvgPath } from 'figma-squircle';
import { TouchableOpacity, View, ViewProps } from 'react-native';
import { calculateSquirclePadding } from '.';

// Custom hook to manage squircle rendering
function useSquircle(props: SquircleViewProps | SquircleButtonProps, wrapperRef: React.RefObject<View | TouchableOpacity>) {
  const [svgPath, setSvgPath] = React.useState('');

  // Extract style properties
  const style = StyleSheet.flatten(props.style || {});
  const borderWidth = typeof style.borderWidth === 'number' ? style.borderWidth : 0;
  const borderRadius = typeof style.borderRadius === 'number' ? style.borderRadius : 0;
  const backgroundColor = props.backgroundColor || style.backgroundColor || 'transparent';
  const borderColor = props.borderColor || style.borderColor;
  const cornerSmoothing = ((props.cornerSmoothing ?? 100) / 100);
  const hasOverflow = style.overflow === 'hidden';

  // Calculate padding
  const calculatedPadding = calculateSquirclePadding(style, borderWidth);

  React.useLayoutEffect(() => {
    if (wrapperRef?.current) {
      // Type assertion to tell TypeScript this is a DOM element
      const element = wrapperRef.current as unknown as HTMLElement;
      const { width, height } = element.getBoundingClientRect();

      if (width && height) {
        const path = getSvgPath({
          width: width - borderWidth,
          height: height - borderWidth,
          cornerRadius: borderRadius,
          cornerSmoothing: cornerSmoothing,
          preserveSmoothing: props.preserveSmoothing ?? false
        });
        setSvgPath(path);
      }
    }
  }, [wrapperRef, props.style, borderWidth, borderRadius, cornerSmoothing, props.preserveSmoothing]);

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
    borderColor: undefined,
    borderWidth: undefined,
    borderRadius: undefined,
    overflow: 'visible' as const, // Force visible on outer container
    ...(props.ignoreBorderWidthFromPadding ? undefined : calculatedPadding)
  };

  // Create style for children container
  const childrenContainerStyle = hasOverflow ? {
    position: 'absolute' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: 'hidden' as const,
    borderRadius, // Use the same border radius for clipping
    // Copy key layout styles from the parent to ensure layout is preserved
    display: 'flex' as const,
    flexDirection: style.flexDirection,
    justifyContent: style.justifyContent,
    alignItems: style.alignItems,
    flexWrap: style.flexWrap,
    ...(props.ignoreBorderWidthFromPadding ? undefined : calculatedPadding)
  } : undefined;

  // Create the path element
  const pathElement = (
    <svg style={{
      position: 'absolute',
      width: '100%',
      height: '100%',
      pointerEvents: 'none', // Make sure SVG doesn't block interactions
    }}>
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
    cleanProps,
    cleanStyle,
    pathElement,
    childrenContainerStyle,
    hasOverflow
  };
}

export function SquircleView(props: ViewProps & SquircleViewProps) {
  const wrapperRef = React.useRef<View>(null);
  const { cleanProps, cleanStyle, pathElement, childrenContainerStyle, hasOverflow } = useSquircle(props, wrapperRef);

  return (
    <View ref={wrapperRef} {...cleanProps} style={cleanStyle}>
      {pathElement}
      {hasOverflow ? (
        <View style={childrenContainerStyle}>
          {props.children}
        </View>
      ) : (
        props.children
      )}
    </View>
  );
}

export function SquircleButton(props: SquircleButtonProps) {
  const wrapperRef = React.useRef<TouchableOpacity>(null);
  const { cleanProps, cleanStyle, pathElement, childrenContainerStyle, hasOverflow } = useSquircle(props, wrapperRef);

  return (
    <TouchableOpacity ref={wrapperRef} {...cleanProps} style={cleanStyle}>
      {pathElement}
      {hasOverflow ? (
        <View style={childrenContainerStyle}>
          {props.children}
        </View>
      ) : (
        props.children
      )}
    </TouchableOpacity>
  );
}
