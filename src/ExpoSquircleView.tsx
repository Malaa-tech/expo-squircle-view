import { requireNativeViewManager } from 'expo-modules-core';
import * as React from 'react';

import { ExpoSquircleViewProps } from './ExpoSquircleView.types';

const NativeView: React.ComponentType<ExpoSquircleViewProps> =
  requireNativeViewManager('ExpoSquircleView');

export default function ExpoSquircleView(props: ExpoSquircleViewProps) {
  return <NativeView {...props} />;
}
