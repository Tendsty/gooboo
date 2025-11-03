export default {
    redGain: {subfeature: 0, scalesWithGL: true, minGL: 20, maxGL: 119, effect: [
        {name: 'currencyGalleryRedGain', type: 'mult', value: lvl => lvl * 0.02 + 1}
    ]},
    converterCap: {subfeature: 0, scalesWithGL: true, minGL: 40, maxGL: 139, effect: [
        {name: 'currencyGalleryConverterCap', type: 'base', value: lvl => lvl * 20}
    ]},
    shapeGain: {subfeature: 0, scalesWithGL: true, minGL: 60, effect: [
        {name: 'galleryShapeGain', type: 'mult', value: lvl => Math.pow(1.01, lvl)}
    ]},
    packageCap: {subfeature: 0, scalesWithGL: true, minGL: 80, maxGL: 178, effect: [
        {name: 'currencyGalleryPackageCap', type: 'base', value: lvl => Math.ceil(lvl / 2)}
    ]},
    drumCap: {subfeature: 0, scalesWithGL: true, minGL: 100, maxGL: 190, effect: [
        {name: 'galleryColorDrumCap', type: 'base', value: lvl => Math.ceil(lvl / 10)}
    ]},
    canvasSpeed: {subfeature: 0, scalesWithGL: true, minGL: 120, maxGL: 219, effect: [
        {name: 'galleryCanvasSpeed', type: 'mult', value: lvl => lvl * 0.01 + 1}
    ]},
}
