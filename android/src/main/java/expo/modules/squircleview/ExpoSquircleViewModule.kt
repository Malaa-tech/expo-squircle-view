package expo.modules.squircleview

import android.util.Log
import androidx.core.graphics.toColorInt
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition

class ExpoSquircleViewModule : Module() {
  // Each module class must implement the definition function. The definition consists of components
  // that describes the module's functionality and behavior.
  // See https://docs.expo.dev/modules/module-api for more details about available components.
  override fun definition() = ModuleDefinition {

    // Sets the name of the module that JavaScript code will use to refer to the module. Takes a string as an argument.
    // Can be inferred from module's class name, but it's recommended to set it explicitly for clarity.
    // The module will be accessible from `requireNativeModule('ReactNativeSquircleView')` in JavaScript.
    Name("ExpoSquircleView")

    // Sets constant properties on the module. Can take a dictionary or a closure that returns a dictionary.
    Constants(
      "PI" to Math.PI
    )

    // Defines event names that the module can send to JavaScript.
    Events("onChange")

    // Defines a JavaScript synchronous function that runs the native code on the JavaScript thread.
    Function("hello") {
      "Hello world! 👋"
    }

    // Defines a JavaScript function that always returns a Promise and whose native code
    // is by default dispatched on the different thread than the JavaScript runtime runs on.
    AsyncFunction("setValueAsync") { value: String ->
      // Send an event to JavaScript.
      sendEvent("onChange", mapOf(
        "value" to value
      ))
    }

    // Enables the module to be used as a native view. Definition components that are accepted as part of
    // the view definition: Prop, Events.
    View(ExpoSquircleView::class) {
      // Defines a setter for the `name` prop.
      Prop("name") { view: ExpoSquircleView, prop: String ->
        println(prop)
      }
      Prop("cornerSmoothing") { view: ExpoSquircleView, prop: Int ->
        Log.d("ExpoSquircleView", "smoothing: $prop")

        view.setCornerSmoothing(prop)
      }

      Prop("borderRadius") { view: ExpoSquircleView, prop: Float ->
        Log.d("ExpoSquircleView", "borderRadius: $prop")

        view.setBorderRadius(prop)
      }

      Prop("backgroundColor") { view: ExpoSquircleView, prop: String ->
        Log.d("ExpoSquircleView", "backgroundColor: $prop")

        view.setViewBackgroundColor(prop.toColorInt())
      }

      Prop("borderColor") { view: ExpoSquircleView, prop: String ->
        Log.d("ExpoSquircleView", "borderColor: $prop")

        view.setBorderColor(prop.toColorInt())
      }

      Prop("borderWidth") { view: ExpoSquircleView, prop: Float ->
        Log.d("ExpoSquircleView", "borderWidth: $prop")

        view.setBorderWidth(prop)
      }
    }
  }
}
