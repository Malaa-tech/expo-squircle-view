# expo-squircle-view

A native implementation for figma corner smoothing (Squircle Shape) for react native expo apps

<p align="center">
<img width="498" alt="Screenshot 2024-01-18 at 6 37 42 PM" src="https://github.com/Malaa-tech/expo-squircle-view/assets/24798045/3a0f2d19-c113-43df-8f98-bee2f9694dc7">
</p>


# Installation in managed Expo projects
```
npm install expo-squircle-view 
```
or
```
yarn add expo-squircle-view 
```

Then prebuild your app

# Installation in bare React Native projects

For bare React Native projects, you must ensure that you have [installed and configured the `expo` package](https://docs.expo.dev/bare/installing-expo-modules/) before continuing.
then do 
```
npm install expo-squircle-view
```
then do `npx pod-install`


### Props (All props are optional)

<table>
  <tr>
    <th>Name</th>
    <th>Type</th>
    <th>Explanation</th>
    <th>Default Value</th>
  </td>
  <tr>
    <td><code>borderRadius</code></td>
    <td><code>number</code></td>
    <td>The component's border radius</td>
    <td><code>0</code></td>
  </tr>
  <tr>
    <td><code>cornerSmoothing</code></td>
    <td><code>number</code></td>
    <td>Controls the amount of smoothing for the radius, <code>0</code> means there is no smoothing (will render like any other <code>View</code>, 100 is maximum amount</td>
    <td><code>0</code></td>
  </tr>
   <tr>
    <td><code>backgroundColor</code></td>
    <td><code>ColorValue</code></td>
    <td>The background color of the component</td>
    <td><code>transperent</code></td>
  </tr>
   <tr>
    <td><code>borderColor</code></td>
    <td><code>ColorValue</code></td>
    <td>Since borders has to match the squircle, you won't be able to set it using the <code>style</code> prop, so use this prop instead</td>
    <td><code>transperent</code></td>
  </tr>
   <tr>
    <td><code>borderWidth</code></td>
    <td><code>number</code></td>
    <td>Since borders has to match the squircle, you won't be able to set it using the <code>style</code> prop, so use this prop instead</td>
    <td><code>0</code></td>
  </tr>
    <tr>
    <td><code>preserveSmoothing</code></td>
    <td><code>boolean<code></td>
    <td>Setting this value to <code>false</code> the produced squircle will match the figma shape exactly, setting this to <code>false</code> will give you even more smoothing for higher <code>borderRadius</code> values</td>
    <td><code>false</code></td>
  </tr>
  <tr>
    <td><code>style</code></td>
    <td><code>StyleProp<ViewStyle><code></td>
    <td>Default style prop for the component, like any other view</td>
    <td><code>undefined</code></td>
  </tr>
</table>


### Basic Example 

```tsx | pure
import { Text, View } from "react-native";
import { SquircleView } from "expo-squircle-view";

export default function App() {
  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
      }}
    >
      <SquircleView
        backgroundColor={"pink"}
        borderWidth={4}
        borderColor={"gray"}
        borderRadius={40}
        cornerSmoothing={100} // 0-100
        preserveSmoothing={true} // false matches figma, true has more rounding
        style={{
          width: 200,
          height: 100,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>Squircle</Text>
      </SquircleView>
    </View>
  );
}
```

### Using as a Button

import SquircleButton instead of SquircleView, and use it the same way as a TouchableOpacity

```tsx | pure
import { SquircleButton } from "expo-squircle-view"; 

...
  <SquircleButton>
  ...
  </SquircleButton>
...

```

### Kudos
Libraries that made this possible

https://github.com/phamfoo/figma-squircle

https://github.com/phamfoo/react-native-figma-squircle

https://github.com/samuel-rl/react-native-squircle


Blog from figma team explaining squircle

https://www.figma.com/blog/desperately-seeking-squircles/


