export default function(save) {
    // Fix event token values
    if (save.stat.event_bloomToken !== undefined) {
        save.stat.event_bloomToken[0] = 0;
    }
    if (save.stat.event_weatherChaosToken !== undefined) {
        save.stat.event_weatherChaosToken[0] = 0;
    }
    if (save.stat.event_summerFestivalToken !== undefined) {
        save.stat.event_summerFestivalToken[0] = 0;
    }
    if (save.stat.event_nightHuntToken !== undefined) {
        save.stat.event_nightHuntToken[0] = 0;
    }
    if (save.stat.event_snowdownToken !== undefined) {
        save.stat.event_snowdownToken[0] = 0;
    }

    // Give missing cinders tokens
    if (save.stat.event_cindersToken !== undefined && save.stat.event_cindersHighscore !== undefined && save.stat.event_cindersHighscore[1] > save.stat.event_cindersHighscore[0]) {
        const missingTokens = save.stat.event_cindersToken[1] - save.stat.event_cindersHighscore[0];
        if (missingTokens > 0) {
            save.stat.event_cindersToken[0] -= missingTokens;
        }
    }

    return save;
}
