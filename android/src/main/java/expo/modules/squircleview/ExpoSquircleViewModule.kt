package expo.modules.squircleview

import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition

class ExpoSquircleViewModule : Module() {
    override fun definition() = ModuleDefinition {

        Name("ExpoSquircleView")

        View(ExpoSquircleView::class) {
            Prop("squircleBackgroundColor") { view: ExpoSquircleView, prop: Int? ->
                if (prop != null) {
                    view.setViewBackgroundColor(prop)
                }
            }

            Prop("squircleBorderColor") { view: ExpoSquircleView, prop: Int? ->
                if (prop != null) {
                    view.setBorderColor(prop)
                }
            }

            Prop("squircleBorderWidth") { view: ExpoSquircleView, prop: Float ->
                view.setBorderWidth(prop)
            }

            Prop("borderRadius") { view: ExpoSquircleView, prop: Float ->
                view.setBorderRadius(prop)
            }

            Prop("cornerSmoothing") { view: ExpoSquircleView, prop: Int ->
                view.setCornerSmoothing(prop)
            }

            Prop("preserveSmoothing") { view: ExpoSquircleView, prop: Boolean ->
                view.setPreserveSmoothing(prop)
            }
        }
    }
}
