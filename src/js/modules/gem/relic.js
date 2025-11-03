export default {
    diamondPickaxe: {icon: 'mdi-pickaxe', feature: ['gem', 'mining'], color: 'cyan', effect() {return [
        {name: 'miningPremiumOreCap', type: 'base', value: 1},
        {name: 'miningDamage', type: 'mult', value: 1.5},
    ];}, glyph() {return {dust: 6};}},
    diamondHammer: {icon: 'mdi-hammer', feature: ['gem', 'village'], color: 'cyan', effect() {return [
        {name: 'villagePremiumResourceCap', type: 'base', value: 1},
        {name: 'queueSpeedVillageBuilding', type: 'mult', value: 1.5},
    ];}, glyph() {return {wood: 6};}},
    diamondSword: {icon: 'mdi-sword', feature: ['gem', 'horde'], color: 'cyan', effect() {return [
        {name: 'hordePremiumAncientCap', type: 'base', value: 1},
        {name: 'hordeAttack', type: 'mult', value: 1.35},
        {name: 'hordeHealth', type: 'mult', value: 1.35},
    ];}, glyph() {return {spike: 6};}},
    diamondShovel: {icon: 'mdi-shovel', feature: ['gem', 'farm'], color: 'cyan', effect() {return [
        {name: 'farmCropGain', type: 'mult', value: 1.5},
    ];}, glyph() {return {cloud: 6};}},
    diamondBrush: {icon: 'mdi-brush', feature: ['gem', 'gallery'], color: 'cyan', effect() {return [
        {name: 'galleryPremiumColorCap', type: 'base', value: 1},
        {name: 'currencyGalleryBeautyGain', type: 'mult', value: 2.5},
    ];}, glyph() {return {blossom: 6};}},
    diamondPillar: {icon: 'mdi-pillar', feature: ['gem', 'relic'], color: 'cyan', effect(lvl) {return [
        {name: 'relicPedestal1', type: 'base', value: lvl}
    ];}, glyph() {return {stone: 6};}},
}
