import { NativeModulesProxy, EventEmitter, Subscription } from 'expo-modules-core';

// Import the native module. On web, it will be resolved to ExpoSquircleView.web.ts
// and on native platforms to ExpoSquircleView.ts
import ExpoSquircleViewModule from './ExpoSquircleViewModule';
import ExpoSquircleView from './ExpoSquircleView';
import { ChangeEventPayload, ExpoSquircleViewProps } from './ExpoSquircleView.types';

// Get the native constant value.
export const PI = ExpoSquircleViewModule.PI;

export function hello(): string {
  return ExpoSquircleViewModule.hello();
}

export async function setValueAsync(value: string) {
  return await ExpoSquircleViewModule.setValueAsync(value);
}

const emitter = new EventEmitter(ExpoSquircleViewModule ?? NativeModulesProxy.ExpoSquircleView);

export function addChangeListener(listener: (event: ChangeEventPayload) => void): Subscription {
  return emitter.addListener<ChangeEventPayload>('onChange', listener);
}

export { ExpoSquircleView, ExpoSquircleViewProps, ChangeEventPayload };
