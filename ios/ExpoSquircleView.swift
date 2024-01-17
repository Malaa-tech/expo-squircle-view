import UIKit
import ExpoModulesCore
import PocketSVG

class ExpoSquircleView: ExpoView {
    let squircleLayer = CAShapeLayer()
    var radius: CGFloat = 0
    var cornerSmoothing: CGFloat = 1
    
    
    @objc(setCornerSmoothing:)
    func setCornerSmoothing(_ cornerSmoothing: CGFloat) {
        self.cornerSmoothing = cornerSmoothing
        squircleLayer.setNeedsLayout()
        setNeedsLayout()
    }
    
    @objc(setRadius:)
    func setRadius(_ radius: CGFloat) {
        self.radius = radius
        squircleLayer.setNeedsLayout()
        setNeedsLayout()
    }
    
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
        
        return SquirclePath.create(width: width, height: height, radius: radius, cornerSmoothing: cornerSmoothing / 100);
    }
}

