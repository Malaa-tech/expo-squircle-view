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

            Prop("backgroundColor") { view: ExpoSquircleView, prop: Int? ->
                if (prop != null) {
                    view.setViewBackgroundColor(prop)
                }
            }

            Prop("borderColor") { view: ExpoSquircleView, prop: Int? ->
                if (prop != null) {
                    view.setBorderColor(prop)
                }
            }

            Prop("borderWidth") { view: ExpoSquircleView, prop: Float ->
                view.setBorderWidth(prop)
            }
        }
    }
}
