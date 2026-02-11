export default function(save) {
    if (save.gallery?.shapeGrid) {
        save.gallery.shapeGrid = save.gallery.shapeGrid.map(row => row.map(cell => cell ?? 'circle'));
    }
    if (save.mining?.beaconPlaced) {
        delete save.mining.beaconPlaced;
    }
    if (save.mining?.beaconCooldown) {
        delete save.mining.beaconCooldown;
    }

    return save;
}
