import * as React from 'react';
import { StyleSheet } from 'react-native';
import { SquircleButtonProps, SquircleViewProps } from './ExpoSquircleView.types';
import { getSvgPath } from 'figma-squircle';
import { TouchableOpacity, View, ViewProps } from 'react-native';
import { calculateSquirclePadding } from '.';



export function SquircleView(props: ViewProps & SquircleViewProps) {
  const [svgPath, setSvgPath] = React.useState('');
  const [borderPath, setBorderPath] = React.useState('');
  const [layout, setLayout] = React.useState({
    width: typeof props.style === 'object' && props.style !== null && 'width' in props.style ? props.style.width : undefined,
    height: typeof props.style === 'object' && props.style !== null && 'height' in props.style ? props.style.height : undefined
  });


  const onLayout = React.useCallback((event) => {
    const { width, height } = event.nativeEvent.layout;
    setLayout({ width, height });
  }, []);

  const getBorderWidth = (): number => {
    if (typeof props.style === 'object' && props.style !== null && 'borderWidth' in props.style) {
      return typeof props.style.borderWidth === 'number' ? props.style.borderWidth : 0;
    }
    return 0;
  };

  const getBorderRadius = (): number => {
    if (typeof props.style === 'object' && props.style !== null && 'borderRadius' in props.style) {
      const radius = props.style.borderRadius;
      return typeof radius === 'number' ? radius : 0;
    }
    return 0;
  };

  const getBackgroundColor = (): string | undefined => {
    if (typeof props.style === 'object' && props.style !== null && 'backgroundColor' in props.style) {
      const color = props.style.backgroundColor;
      return typeof color === 'string' ? color : undefined;
    }
    return undefined;
  };

  const getBorderColor = (): string | undefined => {
    if (typeof props.style === 'object' && props.style !== null && 'borderColor' in props.style) {
      const color = props.style.borderColor;
      return typeof color === 'string' ? color : undefined;
    }
    return undefined;
  };

  const getCornerSmoothing = (): number => {
    return (props.cornerSmoothing ?? 100) / 100;
  };

  const calculatedPadding = calculateSquirclePadding(
    typeof props.style === 'object' ? StyleSheet.flatten(props.style) : undefined,
    getBorderWidth()
  );


  React.useLayoutEffect(() => {
    const borderWidth = getBorderWidth();
    const cornerRadius = getBorderRadius();

    const path = getSvgPath({
      width: layout.width ? Number(layout.width) - borderWidth : 0,
      height: layout.height ? Number(layout.height) - borderWidth : 0,
      cornerRadius: cornerRadius,
      cornerSmoothing: getCornerSmoothing(),
      preserveSmoothing: props.preserveSmoothing ?? false
    });
    setSvgPath(path);

    const border = getSvgPath({
      width: layout.width ? Number(layout.width) - borderWidth : 0,
      height: layout.height ? Number(layout.height) - borderWidth : 0,
      cornerRadius: cornerRadius,
      cornerSmoothing: getCornerSmoothing(),
      preserveSmoothing: props.preserveSmoothing ?? false
    });
    setBorderPath(border);
  }, [
    layout.width,
    layout.height,
    props.style,
    props.cornerSmoothing,
    props.preserveSmoothing
  ]);

  const borderWidth = getBorderWidth();
  const styledProps = { ...props };

  if (typeof styledProps.style === 'object' && styledProps.style !== null) {
    styledProps.style = StyleSheet.flatten([
      props.style,
      {
        backgroundColor: undefined,
        borderRadius: undefined,
        borderColor: undefined,
        borderWidth: undefined,
        overflow: 'hidden',
        ...(props.ignoreBorderWidthFromPadding === true ? undefined : calculatedPadding)
      }
    ]);
  }

  return (
    <View onLayout={onLayout} {...styledProps}>
      <svg style={{ position: 'absolute', width: '100%', height: '100%' }}>
        <path
          d={svgPath}
          style={{
            transform: `translateX(${borderWidth / 2}px) translateY(${borderWidth / 2}px)`
          }}
          fill={getBackgroundColor()}
        />
      </svg>
      {props.children}
      <svg style={{ position: 'absolute', width: '100%', height: '100%' }}>
        <path
          d={borderPath}
          style={{
            transform: `translateX(${borderWidth / 2}px) translateY(${borderWidth / 2}px)`
          }}
          fill="transparent"
          stroke={getBorderColor()}
          strokeWidth={borderWidth}
        />
      </svg>
    </View>
  );
}

export function SquircleButton(props: SquircleButtonProps) {
  return (
    <TouchableOpacity {...props}>
      {props.children}
    </TouchableOpacity>
  );
}
