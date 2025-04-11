import * as React from 'react';

import { SquircleButtonProps, SquircleViewProps } from './ExpoSquircleView.types';
import { getSvgPath } from 'figma-squircle'
import { TouchableOpacity, View, ViewProps } from 'react-native';

export function SquircleView(props: ViewProps & SquircleViewProps) {
  const svgPath = getSvgPath({
    width: props.style?.width - props.style?.borderWidth,
    height: props.style?.height - props.style?.borderWidth,
    cornerRadius: props.style?.borderRadius,
    cornerSmoothing: (props?.cornerSmoothing / 100) ?? 1,
    preserveSmoothing: props.preserveSmoothing
  })

  const borderPath = getSvgPath({
    width: props.style?.width - props.style?.borderWidth,
    height: props.style?.height - props.style?.borderWidth,
    cornerRadius: props.style?.borderRadius,
    cornerSmoothing: (props?.cornerSmoothing / 100) ?? 1,
    preserveSmoothing: props.preserveSmoothing
  })

  console.log({ props })

  return (

    <View {...props} style={{
      ...props.style,
      backgroundColor: undefined,
      borderRadius: undefined,
      borderColor: undefined,
      borderWidth: undefined,
      overflow: 'hidden',
    }}>
      <svg style={{ position: 'absolute', width: '100%', height: '100%' }}>
        <path d={svgPath} style={{ transform: `translateX(${props?.style?.borderWidth / 2}px) translateY(${props?.style?.borderWidth / 2}px)` }} fill={props.style?.backgroundColor} />
      </svg>
      {props.children}
      <svg style={{ position: 'absolute', width: '100%', height: '100%' }}>
        <path d={borderPath} style={{ transform: `translateX(${props?.style?.borderWidth / 2}px) translateY(${props?.style?.borderWidth / 2}px)` }} fill="transparent" stroke={props.style?.borderColor} strokeWidth={props.style?.borderWidth} />
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
