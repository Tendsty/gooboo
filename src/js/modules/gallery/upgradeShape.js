import store from "../../../store";
import { fallbackArray } from "../../utils/array";
import { buildNum } from "../../utils/format";
import { getSequence } from "../../utils/math";

export default {
    bigCircle: {type: 'shape', price(lvl) {
        return {gallery_circle: Math.pow(lvl * 0.01 + 1.35, lvl) * 100};
    }, effect: [
        {name: 'galleryShapeGain', type: 'mult', value: lvl => Math.pow(1.25, lvl)}
    ]},
    wellDrawnCircle: {type: 'shape', price(lvl) {
        return {gallery_circle: Math.pow(lvl * 0.05 + 2.25, lvl) * 5000};
    }, effect: [
        {name: 'currencyGalleryRedGain', type: 'mult', value: lvl => lvl * 0.02 + 1}
    ]},
    bigRectangle: {type: 'shape', requirement() {
        return store.state.gallery.shape.rectangle.unlocked;
    }, price(lvl) {
        return {gallery_rectangle: Math.pow(lvl * 0.1 + 1.75, lvl) * 1000};
    }, effect: [
        {name: 'currencyGalleryMotivationCap', type: 'base', value: lvl => lvl}
    ]},
    wellDrawnRectangle: {type: 'shape', requirement() {
        return store.state.gallery.shape.rectangle.unlocked;
    }, price(lvl) {
        return {gallery_rectangle: Math.pow(lvl * 0.05 + 2.25, lvl) * 6500};
    }, effect: [
        {name: 'currencyGalleryConverterCap', type: 'base', value: lvl => lvl * 40}
    ]},
    creativity: {type: 'shape', requirement() {
        return store.state.gallery.shape.triangle.unlocked;
    }, price(lvl) {
        return fallbackArray([
            {gallery_triangle: buildNum(10, 'K'), gallery_circle: 4000},
            {gallery_triangle: buildNum(100, 'K'), gallery_rectangle: buildNum(40, 'K')},
            {gallery_triangle: buildNum(10, 'M'), gallery_star: buildNum(4, 'M')},
            {gallery_triangle: buildNum(10, 'B'), gallery_ellipse: buildNum(3, 'B'), gallery_heart: buildNum(3, 'B')},
            {gallery_triangle: buildNum(100, 'T'), gallery_square: buildNum(30, 'Sx'), gallery_octagon: buildNum(30, 'T')},
            {gallery_triangle: buildNum(10, 'Qi'), gallery_pentagon: buildNum(300, 'Qa'), gallery_hexagon: buildNum(300, 'Qa')}
        ], {gallery_triangle: Math.pow(10, getSequence(1, lvl)) * buildNum(10, 'K')}, lvl);
    }, effect: [
        {name: 'bomb', type: 'galleryShape', value: lvl => lvl >= 1},
        {name: 'dice', type: 'galleryShape', value: lvl => lvl >= 2},
        {name: 'accelerator', type: 'galleryShape', value: lvl => lvl >= 3},
        {name: 'sparkles', type: 'galleryShape', value: lvl => lvl >= 4},
        {name: 'hourglass', type: 'galleryShape', value: lvl => lvl >= 5},
        {name: 'chest', type: 'galleryShape', value: lvl => lvl >= 6},
        {name: 'currencyGalleryMotivationGain', type: 'base', value: lvl => lvl >= 7 ? ((lvl - 6) * 0.005) : null}
    ]},
    wellDrawnTriangle: {type: 'shape', requirement() {
        return store.state.gallery.shape.triangle.unlocked;
    }, price(lvl) {
        return {gallery_triangle: Math.pow(lvl * 0.05 + 2.25, lvl) * 8500};
    }, effect: [
        {name: 'currencyGalleryCashGain', type: 'mult', value: lvl => lvl * 0.01 + 1}
    ]},
    luckyStar: {type: 'shape', requirement() {
        return store.state.gallery.shape.star.unlocked;
    }, price(lvl) {
        return {gallery_star: Math.pow(lvl * 0.4 + 2.35, lvl) * buildNum(75, 'K')};
    }, effect: [
        {name: 'gallerySpecialShapeChance', type: 'base', value: lvl => lvl * 0.0008}
    ]},
    wellDrawnStar: {type: 'shape', requirement() {
        return store.state.gallery.shape.star.unlocked;
    }, price(lvl) {
        return {gallery_star: Math.pow(lvl * 0.05 + 2.25, lvl) * buildNum(24, 'K')};
    }, effect: [
        {name: 'currencyGalleryRedDrumCap', type: 'base', value: lvl => lvl * 3}
    ]},
    bigEllipse: {type: 'shape', requirement() {
        return store.state.gallery.shape.ellipse.unlocked;
    }, price(lvl) {
        return {gallery_ellipse: Math.pow(lvl * 0.4 + 2.35, lvl) * buildNum(400, 'K')};
    }, effect: [
        {name: 'gallerySpecialShapeMult', type: 'base', value: lvl => lvl * 0.25}
    ]},
    wellDrawnEllipse: {type: 'shape', requirement() {
        return store.state.gallery.shape.ellipse.unlocked;
    }, price(lvl) {
        return {gallery_ellipse: Math.pow(lvl * 0.3 + 12.5, lvl) * buildNum(850, 'K')};
    }, effect: [
        {name: 'galleryColorDrumCap', type: 'base', value: lvl => lvl}
    ]},
    bigHeart: {type: 'shape', requirement() {
        return store.state.gallery.shape.heart.unlocked;
    }, price(lvl) {
        return {gallery_heart: Math.pow(lvl + 8, lvl) * buildNum(2, 'M')};
    }, effect: [
        {name: 'galleryShapeGain', type: 'mult', value: lvl => Math.pow(2, lvl)},
        {name: 'currencyGalleryMotivationCap', type: 'base', value: lvl => lvl * 2}
    ]},
    wellDrawnHeart: {type: 'shape', requirement() {
        return store.state.gallery.shape.heart.unlocked;
    }, price(lvl) {
        return {gallery_heart: Math.pow(lvl * 0.05 + 2.25, lvl) * buildNum(600, 'K')};
    }, effect: [
        {name: 'galleryColorGain', type: 'mult', value: lvl => lvl * 0.005 + 1}
    ]},
    bigSquare: {type: 'shape', requirement() {
        return store.state.gallery.shape.square.unlocked;
    }, price(lvl) {
        return {gallery_square: Math.pow(lvl * 0.002 + 1.35, lvl) * buildNum(15, 'M')};
    }, effect: [
        {name: 'currencyGallerySquareGain', type: 'mult', value: lvl => Math.pow(1.3, lvl)}
    ]},
    wellDrawnSquare: {type: 'shape', requirement() {
        return store.state.gallery.shape.square.unlocked;
    }, price(lvl) {
        return {gallery_square: Math.pow(lvl * 0.15 + 3.5, lvl) * buildNum(3.75, 'M')};
    }, effect: [
        {name: 'currencyGalleryOrangeDrumCap', type: 'base', value: lvl => lvl * 3},
        {name: 'currencyGalleryYellowDrumCap', type: 'base', value: lvl => lvl * 2},
        {name: 'currencyGalleryGreenDrumCap', type: 'base', value: lvl => lvl}
    ]},
    bigOctagon: {type: 'shape', requirement() {
        return store.state.gallery.shape.octagon.unlocked;
    }, price(lvl) {
        return {gallery_octagon: Math.pow(lvl * 0.01 + 1.45, lvl) * buildNum(1, 'B')};
    }, effect: [
        {name: 'currencyGalleryCircleGain', type: 'mult', value: lvl => Math.pow(1.1, lvl)},
        {name: 'currencyGalleryRectangleGain', type: 'mult', value: lvl => Math.pow(1.1, lvl)},
        {name: 'currencyGalleryTriangleGain', type: 'mult', value: lvl => Math.pow(1.1, lvl)}
    ]},
    wellDrawnOctagon: {type: 'shape', requirement() {
        return store.state.gallery.shape.octagon.unlocked;
    }, price(lvl) {
        return {gallery_octagon: Math.pow(lvl * 0.2 + 2.25, lvl) * buildNum(225, 'M')};
    }, effect: [
        {name: 'galleryInspirationBase', type: 'mult', value: lvl => 1 / (0.01 * lvl + 1)}
    ]},
    bigPentagon: {type: 'shape', requirement() {
        return store.state.gallery.shape.pentagon.unlocked;
    }, price(lvl) {
        return {gallery_pentagon: Math.pow(lvl * 0.01 + 1.45, lvl) * buildNum(75, 'B')};
    }, effect: [
        {name: 'currencyGalleryStarGain', type: 'mult', value: lvl => Math.pow(1.1, lvl)},
        {name: 'currencyGalleryEllipseGain', type: 'mult', value: lvl => Math.pow(1.1, lvl)},
        {name: 'currencyGalleryHeartGain', type: 'mult', value: lvl => Math.pow(1.1, lvl)}
    ]},
    wellDrawnPentagon: {type: 'shape', requirement() {
        return store.state.gallery.shape.pentagon.unlocked;
    }, price(lvl) {
        return {gallery_pentagon: Math.pow(lvl * 0.1 + 2.25, lvl) * buildNum(13.5, 'B')};
    }, effect: [
        {name: 'currencyGalleryPackageCap', type: 'base', value: lvl => lvl * 2}
    ]},
    bigHexagon: {type: 'shape', requirement() {
        return store.state.gallery.shape.hexagon.unlocked;
    }, price(lvl) {
        return {gallery_hexagon: Math.pow(lvl * 0.01 + 1.45, lvl) * buildNum(11, 'T')};
    }, effect: [
        {name: 'currencyGalleryOctagonGain', type: 'mult', value: lvl => Math.pow(1.1, lvl)},
        {name: 'currencyGalleryPentagonGain', type: 'mult', value: lvl => Math.pow(1.1, lvl)},
        {name: 'currencyGalleryHexagonGain', type: 'mult', value: lvl => Math.pow(1.1, lvl)}
    ]},
    wellDrawnHexagon: {type: 'shape', requirement() {
        return store.state.gallery.shape.hexagon.unlocked;
    }, price(lvl) {
        return {gallery_hexagon: Math.pow(lvl * 0.1 + 2.25, lvl) * buildNum(2, 'T')};
    }, effect: [
        {name: 'galleryCanvasSpeed', type: 'mult', value: lvl => lvl * 0.01 + 1}
    ]},
}
