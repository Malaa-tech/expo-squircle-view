import android.graphics.Matrix
import android.graphics.Path
import androidx.core.graphics.PathParser
import kotlin.math.cos
import kotlin.math.min
import kotlin.math.sin
import kotlin.math.sqrt
import kotlin.math.tan

data class CurveProperties(
    var a: Float,
    var b: Float,
    var c: Float,
    var d: Float,
    var p: Float,
    var arcSectionLength: Float,
    var cornerRadius: Float
)

class SquirclePath(
    private var width: Float,
    private var height: Float,
    private var borderRadius: Float,
    private var cornerSmoothing: Float,
    private var preserveSmoothing: Boolean,
) : Path() {

    init {
        val checkedRadius = minOf(this.borderRadius, this.width / 2f, this.height / 2f)
        val checkedCornerSmoothing = maxOf(minOf(this.cornerSmoothing, 1f),0f)

        val curvedProperties = calculateCurveProperties(
            checkedRadius,
            checkedCornerSmoothing,
            this.preserveSmoothing,
            min(this.width , this.height) / 2
        );
        val path =
            PathParser.createPathFromPathData(
                getSVGPathFromPathParams(
                    this.width,
                    this.height,
                    curvedProperties
                )
            )

        this.addPath(path)
    }


    private fun getSVGPathFromPathParams(
        width: Float,
        height: Float,
        curveProperties: CurveProperties
    ): String {
        return """
                M ${width - curveProperties.p} 0 
                ${getTopRightPath(curveProperties)} 
                L $width ${height - curveProperties.p} 
                ${getBottomRightPath(curveProperties)} 
                L ${curveProperties.p} $height 
                ${getBottomLeftPath(curveProperties)}  
                L 0 ${curveProperties.p} 
                ${getTopLeftPath(curveProperties)}  
                Z""".trimIndent();
    }

    private fun getTopLeftPath(curveProperties: CurveProperties): String {
        if (curveProperties.cornerRadius >= 0) {
            return """
            c 0 ${-curveProperties.a} 0 ${-(curveProperties.a + curveProperties.b)} ${curveProperties.d} ${-(curveProperties.a + curveProperties.b + curveProperties.c)}
            a ${curveProperties.cornerRadius} ${curveProperties.cornerRadius} 0 0 1 ${curveProperties.arcSectionLength} -${curveProperties.arcSectionLength}
            c ${curveProperties.c} ${-curveProperties.d} ${curveProperties.b + curveProperties.c} ${-curveProperties.d} ${curveProperties.a + curveProperties.b + curveProperties.c} ${-curveProperties.d}
        """.trimIndent()
        }
        return ""
    }

    private fun getBottomLeftPath(curveProperties: CurveProperties): String {
        if (curveProperties.cornerRadius >= 0) {
            return """
            c ${-curveProperties.a} 0 ${-(curveProperties.a + curveProperties.b)} 0 ${-(curveProperties.a + curveProperties.b + curveProperties.c)} ${-curveProperties.d}
            a ${curveProperties.cornerRadius} ${curveProperties.cornerRadius} 0 0 1 -${curveProperties.arcSectionLength} -${curveProperties.arcSectionLength}
            c ${-curveProperties.d} ${-curveProperties.c} ${-curveProperties.d} ${-(curveProperties.b + curveProperties.c)} ${-curveProperties.d} ${-(curveProperties.a + curveProperties.b + curveProperties.c)}
        """.trimIndent()
        }
        return ""
    }

    private fun getBottomRightPath(curveProperties: CurveProperties): String {
        if (curveProperties.cornerRadius >= 0) {
            return """
            c 0 ${curveProperties.a} 0 ${curveProperties.a + curveProperties.b} ${-curveProperties.d} ${curveProperties.a + curveProperties.b + curveProperties.c}
            a ${curveProperties.cornerRadius} ${curveProperties.cornerRadius} 0 0 1 -${curveProperties.arcSectionLength} ${curveProperties.arcSectionLength}
            c ${-curveProperties.c} ${curveProperties.d} ${-(curveProperties.b + curveProperties.c)} ${curveProperties.d} ${-(curveProperties.a + curveProperties.b + curveProperties.c)} ${curveProperties.d}
        """.trimIndent()
        }
        return ""
    }

    private fun getTopRightPath(curveProperties: CurveProperties): String {
        if (curveProperties.cornerRadius >= 0) {
            return """
            c ${curveProperties.a} 0 ${curveProperties.a + curveProperties.b} 0 ${curveProperties.a + curveProperties.b + curveProperties.c} ${curveProperties.d}
            a ${curveProperties.cornerRadius} ${curveProperties.cornerRadius} 0 0 1 ${curveProperties.arcSectionLength} ${curveProperties.arcSectionLength}
            c ${curveProperties.d} ${curveProperties.c} ${curveProperties.d} ${curveProperties.c + curveProperties.d} ${curveProperties.d} ${curveProperties.a + curveProperties.b + curveProperties.c}
        """.trimIndent()
        }
        return ""
    }

    private fun calculateCurveProperties(
        cornerRadius: Float,
        cornerSmoothing: Float,
        preserveSmoothing: Boolean,
        roundingAndSmoothingBudget: Float
    ): CurveProperties {

        var p = (1 + cornerSmoothing) * cornerRadius
        var cornerSmoothingVar = cornerSmoothing

        if (!preserveSmoothing) {
            val maxCornerSmoothing = roundingAndSmoothingBudget / cornerRadius - 1
            cornerSmoothingVar = minOf(cornerSmoothingVar, maxCornerSmoothing)
            p = minOf(p, roundingAndSmoothingBudget)
        }

        val arcMeasure = 90 * (1 - cornerSmoothingVar)
        val arcSectionLength = sin(toRadians(arcMeasure / 2)) * cornerRadius * sqrt(2f)
        val angleAlpha = (90 - arcMeasure) / 2
        val p3ToP4Distance = cornerRadius * tan(toRadians(angleAlpha / 2))
        val angleBeta = 45 * cornerSmoothingVar
        val c = p3ToP4Distance * cos(toRadians(angleBeta))
        val d = c * tan(toRadians(angleBeta))
        var b = (p - arcSectionLength - c - d) / 3
        var a = 2 * b

        if (preserveSmoothing && p > roundingAndSmoothingBudget) {
            val p1ToP3MaxDistance = roundingAndSmoothingBudget - d - arcSectionLength - c
            val minA = p1ToP3MaxDistance / 6
            val maxB = p1ToP3MaxDistance - minA
            b = minOf(b, maxB)
            a = p1ToP3MaxDistance - b
            p = minOf(p, roundingAndSmoothingBudget)
        }

        return CurveProperties(a, b, c, d, p, arcSectionLength, cornerRadius)
    }

    private fun toRadians(degrees: Float): Float {
        return degrees * (Math.PI.toFloat() / 180f)
    }
}