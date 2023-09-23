import { newGame } from '../../src/js/init';
import { autoplay } from '../../src/js/autoplay';
import store from '../../src/store';

test('game can simulate a day of autoplay', () => {
    newGame(false);

    autoplay(1);

    // General systems
    const reportSize = JSON.stringify(store.state.system.autoplayData).length;

    // Show report size
    console.info(reportSize);

    expect(reportSize).toBeGreaterThan(0);
});
