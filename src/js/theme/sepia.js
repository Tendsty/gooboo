import Color from "color";
import colors from "./colors";
import { filterColor, filterColorObject } from "../utils/color";
import _default from "./default";

const sepiaBase = '#704214';
const sepiaFilter = color => color.mix(Color(sepiaBase), 0.3).desaturate(0.2);

export default {
    price: 3000,
    hasCustomColors: true,
    light: {
        primary: filterColor(sepiaBase, color => color.desaturate(0.4)),
        secondary: '#424242',
        accent: filterColor(sepiaBase, color => color.desaturate(0.7).lighten(0.5)),
        error: filterColor(_default.light.error, sepiaFilter),
        info: filterColor(_default.light.info, sepiaFilter),
        success: filterColor(_default.light.success, sepiaFilter),
        warning: filterColor(_default.light.warning, sepiaFilter),

        ...filterColorObject(colors, sepiaFilter)
    },
    dark: {
        primary: filterColor(sepiaBase, color => color.desaturate(0.4)),
        secondary: '#424242',
        accent: filterColor(sepiaBase, color => color.desaturate(0.7).lighten(0.5)),
        error: filterColor(_default.dark.error, sepiaFilter),
        info: filterColor(_default.dark.info, sepiaFilter),
        success: filterColor(_default.dark.success, sepiaFilter),
        warning: filterColor(_default.dark.warning, sepiaFilter),

        ...filterColorObject(colors, sepiaFilter)
    }
}
