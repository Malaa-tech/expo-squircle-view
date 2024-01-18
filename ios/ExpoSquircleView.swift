import UIKit
import ExpoModulesCore
import PocketSVG

class ExpoSquircleView: ExpoView {
    let squircleLayer = CAShapeLayer()
    var radius: CGFloat = 0
    var cornerSmoothing: CGFloat = 0
    var preserveSmoothing: Bool = false
    
    required init(appContext: AppContext? = nil) {
        super.init(appContext: appContext)
        setupSquircleLayer()
    }
    
    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    private func setupSquircleLayer() {
        layer.addSublayer(squircleLayer)
    }
    
    override func layoutSubviews() {
        super.layoutSubviews()
        squircleLayer.frame = bounds
        squircleLayer.path = createSquirclePath()
    }
    
    private func createSquirclePath() -> CGPath {
        let width: CGFloat = bounds.width
        let height: CGFloat = bounds.height
        
        let checkedRadius = min(radius, bounds.width / 2, bounds.height / 2)
        let checkedCornerSmoothing =  max(min(cornerSmoothing / 100, 1), 0)
        
        return SquirclePath.create(width: width, height: height, radius: checkedRadius, cornerSmoothing: checkedCornerSmoothing, preserveSmoothing: preserveSmoothing);
    }
    
    func setCornerSmoothing(_ cornerSmoothing: CGFloat) {
        self.cornerSmoothing = cornerSmoothing
        squircleLayer.setNeedsLayout()
        setNeedsLayout()
    }
    
    func setRadius(_ radius: CGFloat) {
        self.radius = radius
        squircleLayer.setNeedsLayout()
        setNeedsLayout()
    }
    
    func setPreserveSmoothing(_ preserveSmoothing: Bool) {
        self.preserveSmoothing = preserveSmoothing
        squircleLayer.setNeedsLayout()
        setNeedsLayout()
    }
}

