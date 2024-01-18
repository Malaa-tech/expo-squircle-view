package expo.modules.squircleview

import android.content.Context
import android.util.DisplayMetrics

class Utils {
    companion object {
        fun convertDpToPixel(dp: Float, context: Context): Float {
            return dp * (context.resources.displayMetrics.densityDpi.toFloat() / DisplayMetrics.DENSITY_DEFAULT)
        }
    }
}