package expo.modules.squircleview

import androidx.core.graphics.toColorInt
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition

class ExpoSquircleViewModule : Module() {
    override fun definition() = ModuleDefinition {

        Name("ExpoSquircleView")

        View(ExpoSquircleView::class) {
            Prop("cornerSmoothing") { view: ExpoSquircleView, prop: Int ->
                view.setCornerSmoothing(prop)
            }

            Prop("borderRadius") { view: ExpoSquircleView, prop: Float ->
                view.setBorderRadius(prop)
            }

            Prop("backgroundColor") { view: ExpoSquircleView, prop: String ->
                view.setViewBackgroundColor(prop.toColorInt())
            }

            Prop("borderColor") { view: ExpoSquircleView, prop: String ->
                view.setBorderColor(prop.toColorInt())
            }

            Prop("borderWidth") { view: ExpoSquircleView, prop: Float ->
                view.setBorderWidth(prop)
            }
        }
    }
}
