package expo.modules.squircleview

import SquirclePath
import android.content.Context
import android.graphics.Canvas
import android.graphics.Paint
import android.graphics.Path
import android.graphics.RectF
import android.util.DisplayMetrics
import expo.modules.kotlin.AppContext
import expo.modules.kotlin.views.ExpoView
import kotlin.math.min

data class CurveProperties(
    var a: Float,
    var b: Float,
    var c: Float,
    var d: Float,
    var p: Float,
    var arcSectionLength: Float,
    var cornerRadius: Float
)

class ExpoSquircleView(context: Context, appContext: AppContext) : ExpoView(context, appContext) {
    private val paint = Paint(Paint.ANTI_ALIAS_FLAG)
    private val path = Path()
    private var cornerSmoothing = 0
    private var borderColor = 0xFF000000.toInt()
    private var borderWidth = 0f
    private var backgroundColor = 0x00000000.toInt()
    private var borderRadius = 0f;

    init {
        paint.color = backgroundColor;
        paint.style = Paint.Style.FILL
        setWillNotDraw(false)
    }


    private fun convertDpToPixel(dp: Float, context: Context): Float {
        return dp * (context.resources.displayMetrics.densityDpi.toFloat() / DisplayMetrics.DENSITY_DEFAULT)
    }

    private fun getSquirclePath(
        rect: RectF,
    ): Path {
        val width = rect.right
        val height = rect.bottom

        return SquirclePath(
            width,
            height,
            borderRadius = convertDpToPixel(borderRadius, context),
            cornerSmoothing = cornerSmoothing.toFloat() / 100
        )
    }

    override fun onDraw(canvas: Canvas) {
        super.onDraw(canvas)

        // Draw the fill
        val fillPaint = Paint(paint)
        fillPaint.color = backgroundColor
        canvas.drawPath(path, fillPaint)

        if (borderWidth > 0) {
            val borderPaint = Paint(fillPaint)
            borderPaint.color = borderColor
            borderPaint.style = Paint.Style.STROKE
            borderPaint.strokeWidth = convertDpToPixel(borderWidth, context).toFloat()
            canvas.drawPath(path, borderPaint)
        }
    }

    override fun onSizeChanged(w: Int, h: Int, oldw: Int, oldh: Int) {
        super.onSizeChanged(w, h, oldw, oldh)

        val fillRect = RectF(
            borderWidth,
            borderWidth,
            w.toFloat(),
            h.toFloat()
        )

        path.reset()
        path.addPath(getSquirclePath(fillRect))
    }


    fun setCornerSmoothing(c: Int) {
        cornerSmoothing = c

        // Recalculate the path with the new corner smoothing value
        val rect = RectF(
            borderWidth,
            borderWidth,
            width.toFloat(),
            height.toFloat()
        )

        path.reset()
        path.addPath(getSquirclePath(rect))

        // Redraw the view
        invalidate()
    }

    fun setBorderRadius(b: Float) {
        borderRadius = b;

        val rect = RectF(
            borderWidth,
            borderWidth,
            width.toFloat() - borderWidth,
            height.toFloat() - borderWidth
        )

        path.reset()
        path.addPath(getSquirclePath(rect))

        // Redraw the view
        invalidate()
    }

    fun setViewBackgroundColor(color: Int) {
        backgroundColor = color;
        paint.color = backgroundColor;
        invalidate()
    }

    fun setBorderColor(color: Int) {
        borderColor = color
        invalidate()
    }

    fun setBorderWidth(width: Float) {
        borderWidth = width
        invalidate()
    }
}
