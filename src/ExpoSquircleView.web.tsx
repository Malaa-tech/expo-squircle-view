import * as React from 'react';

import { ExpoSquircleViewProps } from './ExpoSquircleView.types';

export default function ExpoSquircleView(props: ExpoSquircleViewProps) {
  return (
    <div>
      <span>{props.name}</span>
    </div>
  );
}
