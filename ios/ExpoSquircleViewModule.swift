import ExpoModulesCore

public class ExpoSquircleViewModule: Module {
    public func definition() -> ModuleDefinition {
        Name("ExpoSquircleView")
        
        View(ExpoSquircleView.self) { 
            Prop("backgroundColor") { (view: ExpoSquircleView, prop: UIColor) in
                view.setBackgroundColor(prop)
            }
            Prop("borderColor") { (view: ExpoSquircleView, prop: UIColor) in
                view.setBorderColor(prop)
            }
            Prop("borderWidth") { (view: ExpoSquircleView, prop: Int) in
                view.setBorderWidth(CGFloat(prop))
            }
            Prop("borderRadius") { (view: ExpoSquircleView, prop: Int) in
                view.setRadius(CGFloat(prop))
            }
            Prop("cornerSmoothing") { (view: ExpoSquircleView, prop: Int) in
                view.setCornerSmoothing(CGFloat(prop))
            }
            Prop("preserveSmoothing") { (view: ExpoSquircleView, prop: Bool) in
                view.setPreserveSmoothing(prop)
            }
            Prop("enabledIOSAnimation") { (view: ExpoSquircleView, prop: Bool) in
                view.isAnimationEnabled = prop
            }
        }
    }
}
