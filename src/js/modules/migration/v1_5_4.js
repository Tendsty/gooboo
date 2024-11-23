export default function(save) {
    // Remove snowballs to prevent old version players from getting a massive advantage
    if (save.currency.event_snowball !== undefined) {
        delete save.currency.event_snowball;
    }

    if (save.event) {
        // Convert tokens from the old to the new formula
        let tokensExpected = 0;
        const fights = save.event.snowdown_fight ?? 0;
        for (let i = 0; i < fights; i++) {
            tokensExpected += Math.floor(Math.pow(i * 0.35 + 1, 0.75) + 3);
        }
        if (save.stat.event_snowdownToken && save.currency.event_snowdownToken !== undefined) {
            const tokenDiff = tokensExpected - save.stat.event_snowdownToken[0];
            if (tokenDiff !== 0) {
                save.currency.event_snowdownToken += tokenDiff;
                if (tokenDiff > 0) {
                    save.stat.event_snowdownToken = [save.stat.event_snowdownToken[0] + tokenDiff, save.stat.event_snowdownToken[1] + tokenDiff];
                }
            }
        }

        // Convert removed producers
        if (save.event.snowdown_item !== undefined) {
            if (save.event.snowdown_item.spiceJar) {
                save.event.snowdown_item.shepherd = (save.event.snowdown_item.shepherd ?? 0) + save.event.snowdown_item.spiceJar;
                delete save.event.snowdown_item.spiceJar;
            }
            if (save.event.snowdown_item.tap) {
                save.event.snowdown_item.forest = (save.event.snowdown_item.forest ?? 0) + save.event.snowdown_item.tap;
                delete save.event.snowdown_item.tap;
            }
        }
    }

    // Convert levels of the well drawn ellipse upgrade
    if (save.upgrade.gallery_wellDrawnEllipse) {
        const newLvl = Math.ceil(save.upgrade.gallery_wellDrawnEllipse[1] / 2);
        save.upgrade.gallery_wellDrawnEllipse[1] = newLvl;
        save.upgrade.gallery_wellDrawnEllipse[2] = newLvl;
    }

    return save;
}
