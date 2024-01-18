package expo.modules.squircleview

import SquirclePath
import android.content.Context
import android.graphics.Canvas
import android.graphics.Paint
import android.graphics.Path
import android.graphics.RectF
import android.util.DisplayMetrics
import android.util.Log
import expo.modules.kotlin.AppContext
import expo.modules.kotlin.views.ExpoView


class ExpoSquircleView(context: Context, appContext: AppContext) : ExpoView(context, appContext) {
    private val paint = Paint(Paint.ANTI_ALIAS_FLAG)
    private val borderPaint = Paint(paint)
    private val path = Path()
    private var cornerSmoothing = 0
    private var borderColor = 0xFF000000.toInt()
    private var borderWidth = 0f
    private var backgroundColor = 0x00000000
    private var borderRadius = 0f;

    init {
        paint.color = backgroundColor;
        paint.style = Paint.Style.FILL
        setWillNotDraw(false)
    }


    override fun onDraw(canvas: Canvas) {
        super.onDraw(canvas)
        paint.color = backgroundColor
        canvas.drawPath(path, paint)

        if (borderWidth > 0) {
            borderPaint.color = borderColor
            borderPaint.style = Paint.Style.STROKE
            borderPaint.strokeWidth = Utils.convertDpToPixel(borderWidth, context).toFloat()
            canvas.drawPath(path, borderPaint)
        }
    }

    override fun onSizeChanged(newWidth: Int, newHeight: Int, oldWidth: Int, oldHeight: Int) {
        super.onSizeChanged(newWidth, newHeight, oldWidth, oldHeight)
        resetSquirclePath(newWidth.toFloat(), newHeight.toFloat())
    }

    private fun resetSquirclePath(
        width: Float,
        height: Float
    ) {
        Log.d("TEST", "$width  $height")

        if (width == 0f || height == 0f) {
            return;
        }

        val newPath = SquirclePath(
            width,
            height,
            borderRadius = Utils.convertDpToPixel(borderRadius, context),
            cornerSmoothing = cornerSmoothing.toFloat() / 100
        )

        path.reset()
        path.addPath(newPath)
    }

    fun setCornerSmoothing(c: Int) {
        cornerSmoothing = c
        resetSquirclePath(width.toFloat(), height.toFloat())
        invalidate()
    }

    fun setBorderRadius(b: Float) {
        borderRadius = b;
        resetSquirclePath(width.toFloat(), height.toFloat())
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
