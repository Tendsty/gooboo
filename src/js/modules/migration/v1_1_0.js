import { addCurrencyToSave } from "./helper";

export default function(save) {
    // Convert old grades to new ones
    if (save.school) {
        for (const [key, elem] of Object.entries(save.school)) {
            const oldGradeBase = Math.max(elem.elo, elem.grade) * 0.6;
            const newGrade = Math.floor(oldGradeBase / 100);
            save.school[key] = {
                grade: newGrade,
                currentGrade: newGrade,
                progress: oldGradeBase / 100 - newGrade
            };
        }
    }

    // Adjust know-it-all achievement
    if (save.stat?.school_highestGrade) {
        save.stat.school_highestGrade.value = Math.floor(save.stat.school_highestGrade.value * 0.006);
        save.stat.school_highestGrade.total = Math.floor(save.stat.school_highestGrade.total * 0.006);
    }

    // Award lost exam passes
    if (save.globalLevel) {
        let totalLevel = 0;
        for (const [, elem] of Object.entries(save.globalLevel)) {
            totalLevel += elem;
        }
        if (totalLevel >= 25) {
            save = addCurrencyToSave(save, 'school_examPass', Math.floor(totalLevel / 10));
        }
    }

    return save;
}
