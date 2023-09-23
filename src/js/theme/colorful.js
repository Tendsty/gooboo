import colors from "./colors";
import { filterColor, filterColorObject } from "../utils/color";
import _default from "./default";

const colorFilter = color => color.saturate(0.15);

export default {
    hasCustomColors: true,
    light: {
        primary: '#D94712',
        secondary: '#424242',
        accent: '#FFA182',
        error: filterColor(_default.light.error, colorFilter),
        info: filterColor(_default.light.info, colorFilter),
        success: filterColor(_default.light.success, colorFilter),
        warning: filterColor(_default.light.warning, colorFilter),

        ...filterColorObject(colors, colorFilter)
    },
    dark: {
        primary: '#D94712',
        secondary: '#424242',
        accent: '#FFA182',
        error: filterColor(_default.dark.error, colorFilter),
        info: filterColor(_default.dark.info, colorFilter),
        success: filterColor(_default.dark.success, colorFilter),
        warning: filterColor(_default.dark.warning, colorFilter),

        ...filterColorObject(colors, colorFilter)
    }
}
