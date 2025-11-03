import cardList from "./cardList";

export default {
    feature: {
        prefix: 'GA',
        reward: [{name: 'currencyGalleryBeautyGain', type: 'mult', value: lvl => lvl * 0.075 + 1}],
        shinyReward: [{name: 'currencyGalleryCashGain', type: 'mult', value: lvl => lvl * 0.05 + 1}],
        powerReward: [
            {name: 'currencyGalleryBeautyGain', type: 'mult', value: lvl => Math.pow(1.1, lvl)},
            {name: 'currencyGalleryCashGain', type: 'mult', value: lvl => Math.pow(1.02, lvl)},
        ],
        unlock: 'galleryFeature'
    },
    collection: {
        artDisplay: {reward: [
            {name: 'galleryCardCap', type: 'base', value: 1},
            {name: 'currencyGalleryBeautyGain', type: 'mult', value: 2}
        ]},
        deliveryService: {reward: [
            {name: 'currencyGalleryConverterGain', type: 'mult', value: 1.25},
            {name: 'currencyGalleryPackageGain', type: 'mult', value: 1.25}
        ]},
        abstractShapes: {reward: [
            {name: 'galleryShapeGain', type: 'mult', value: 2.5},
            {name: 'currencyMiningEmberCap', type: 'base', value: 300}
        ]},
        handmade: {reward: [
            {name: 'galleryColorGain', type: 'mult', value: 1.5},
            {name: 'villageArtisan', type: 'base', value: 1}
        ]},
    },
    pack: {
        newArtist: {unlock: 'galleryAuction', amount: 3, price: 55, content: {
            'GA-0001': 1.2, 'GA-0002': 1, 'GA-0003': 0.8, 'GA-0004': 0.6,
            'GA-0005': 3.2, 'GA-0006': 1.45, 'GA-0007': 2.5, 'GA-0008': 1.55, 'GA-0009': 1.8, 'GA-0010': 0.8, 'GA-0011': 0.66,
            'GA-0012': 1.24, 'GA-0013': 1.5, 'GA-0014': 1.18,
            'GA-0015': 1.4, 'GA-0016': 1.32, 'GA-0017': 1.12, 'GA-0018': 1.03,
        }},
        inspiringCreations: {unlock: 'galleryAuction', amount: 3, price: 120, content: {
            'GA-0012': 1.24, 'GA-0013': 2.25, 'GA-0014': 1.18,
            'GA-0015': 1.4, 'GA-0016': 1.32, 'GA-0017': 1.12, 'GA-0018': 1.03,
            'GA-0019': 1.6, 'GA-0020': 0.77, 'GA-0021': 0.92, 'GA-0022': 0.85, 'GA-0023': 1.08,
        }},
        differentColors: {unlock: 'galleryDrums', amount: 2, price: 105, content: {
            'GA-0019': 1.5, 'GA-0020': 1.23, 'GA-0021': 1.3, 'GA-0022': 1.26, 'GA-0023': 1.38,
            'GA-0024': 2.1, 'GA-0025': 1.65, 'GA-0026': 1.95, 'GA-0027': 1.85,
        }},
        bigCanvas: {unlock: 'galleryCanvas', amount: 5, price: 370, content: {
            'GA-0024': 1.25, 'GA-0025': 1.11, 'GA-0026': 1.2, 'GA-0027': 1.17,
            'GA-0028': 1.6, 'GA-0029': 2.15, 'GA-0030': 2.08, 'GA-0031': 1.75, 'GA-0032': 1.6, 'GA-0034': 0.9,
        }},
        famousPainter: {unlock: 'galleryAdvancedCardPack', amount: 4, price: 410, content: {
            'GA-0029': 0.66, 'GA-0030': 0.75, 'GA-0031': 0.8, 'GA-0032': 0.83, 'GA-0034': 1.25,
            'GA-0033': 2.2, 'GA-0035': 1.97, 'GA-0036': 1.86, 'GA-0037': 1.5, 'GA-0038': 1.1,
        }},
    },
    card: cardList
}
