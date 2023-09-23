import Color from "color";
import colors from "./colors";
import { filterColor, filterColorObject } from "../utils/color";
import _default from "./default";

const frozenBase = '#20DFDF';
const frozenFilter = color => color.mix(Color(frozenBase), 0.3).desaturate(0.3);

export default {
    hasCustomColors: true,
    hasParticles: true,
    particles: {
        icons: ['mdi-snowflake', 'mdi-snowflake-variant'],
        colors: ['white'],
        opacity: [10, 40],
        size: [10, 50],
        time: [5, 30],
        amount: 3,
        rotate: true
    },
    light: {
        primary: filterColor(frozenBase, color => color.desaturate(0.6)),
        secondary: '#424242',
        accent: filterColor(frozenBase, color => color.desaturate(0.7).lighten(0.3)),
        error: filterColor(_default.light.error, frozenFilter),
        info: filterColor(_default.light.info, frozenFilter),
        success: filterColor(_default.light.success, frozenFilter),
        warning: filterColor(_default.light.warning, frozenFilter),

        ...filterColorObject(colors, frozenFilter)
    },
    dark: {
        primary: filterColor(frozenBase, color => color.desaturate(0.6)),
        secondary: '#424242',
        accent: filterColor(frozenBase, color => color.desaturate(0.7).lighten(0.3)),
        error: filterColor(_default.dark.error, frozenFilter),
        info: filterColor(_default.dark.info, frozenFilter),
        success: filterColor(_default.dark.success, frozenFilter),
        warning: filterColor(_default.dark.warning, frozenFilter),

        ...filterColorObject(colors, frozenFilter)
    }
}
