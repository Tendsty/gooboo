export default function(save) {
    if (save.horde && save.horde.loadout) {
        save.horde.loadout = save.horde.loadout.map(elem => {
            return {name: encodeURIComponent(elem.name), content: elem.content};
        });
    }
    return save;
}
