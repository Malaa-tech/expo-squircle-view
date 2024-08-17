import UIKit
import ExpoModulesCore
import PocketSVG

class ExpoSquircleView: ExpoView {
    let squircleLayer = CAShapeLayer()
    var radius: CGFloat = 0
    var cornerSmoothing: CGFloat = 0
    var preserveSmoothing: Bool = false
    var isAnimationEnabled: Bool = false
    
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
        
        let path = SquirclePath.create(width: width - squircleLayer.lineWidth, height: height - squircleLayer.lineWidth, radius: radius, cornerSmoothing: cornerSmoothing, preserveSmoothing: preserveSmoothing);
        
        // if borderWidth is greater than 0, we need to shift the shape
        // to match the original width & height
        var translationTransform = CGAffineTransform(translationX: squircleLayer.lineWidth / 2, y: squircleLayer.lineWidth / 2)
        
        if let translatedPath = path.copy(using: &translationTransform) {
            return translatedPath
        }
        
        return path
    }
    
    func setBackgroundColor(_ backgroundColor: UIColor) {
        CATransaction.begin()
        CATransaction.setDisableActions(!isAnimationEnabled)
        squircleLayer.fillColor = backgroundColor.cgColor
        CATransaction.commit()
    }
    
    func setBorderColor(_ borderColor: UIColor) {
        CATransaction.begin()
        CATransaction.setDisableActions(!isAnimationEnabled)
        squircleLayer.strokeColor = borderColor.cgColor
        CATransaction.commit()
    }
    
    func setBorderWidth(_ borderRadius: CGFloat) {
        CATransaction.begin()
        CATransaction.setDisableActions(!isAnimationEnabled)
        squircleLayer.lineWidth = borderRadius
        CATransaction.commit()
        setNeedsLayout()
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

