import { capitalize } from "./format";
import { chance, randomElem, randomInt, weightSelect } from "./random";

export { generateSentence }

const wordList = [
    [
        // 2 characters
        'be', 'in', 'on', 'at', 'we', 'do', 'to', 'of', 'it', 'he', 'by', 'or',
        'as', 'if', 'up', 'me', 'no', 'us', 'so', 'go', 'is',
    ], [
        // 3 characters
        'and', 'she', 'too', 'for', 'you', 'his', 'her', 'say', 'but', 'egg',
        'not', 'can', 'who', 'get', 'all', 'one', 'out', 'see', 'now', 'how',
        'why', 'our', 'two', 'way', 'new', 'day', 'use', 'man', 'any', 'may',
        'try', 'ask', 'own', 'put', 'old', 'let', 'big', 'few', 'run', 'off',
        'six', 'ten', 'odd', 'low', 'gem', 'bed', 'mud', 'cow', 'pig', 'men',
        'bad', 'sun', 'win', 'cat', 'dog', 'log', 'end', 'fun', 'lot', 'eye',
        'job', 'far', 'red', 'yes',
    ], [
        // 4 characters
        'have', 'four', 'five', 'nine', 'that', 'this', 'they', 'with', 'from',
        'what', 'make', 'know', 'will', 'time', 'year', 'when', 'them', 'some',
        'home', 'take', 'food', 'into', 'just', 'your', 'come', 'than', 'like',
        'then', 'more', 'want', 'look', 'also', 'here', 'many', 'well', 'only',
        'tell', 'very', 'even', 'back', 'good', 'life', 'work', 'down', 'call',
        'over', 'last', 'need', 'feel', 'high', 'most', 'much', 'mean', 'keep',
        'same', 'seem', 'help', 'talk', 'turn', 'hand', 'show', 'part', 'such',
        'case', 'farm', 'mine', 'note', 'week', 'each', 'hear', 'play', 'move',
        'live', 'hold', 'next', 'must', 'room', 'area', 'lamp', 'lamb', 'word',
        'list', 'test', 'text', 'exam', 'book', 'dust', 'easy', 'hard', 'evil',
        'rain', 'dark', 'duck', 'game', 'lose', 'cake', 'fish', 'wood', 'tree',
        'mind', 'join', 'loop', 'card', 'left', 'side', 'kind', 'head', 'blue',
        'pink', 'long', 'both', 'hour',
    ], [
        // 5 characters
        'woman', 'women', 'grade', 'house', 'table', 'where', 'relic', 'event',
        'trial', 'exist', 'would', 'about', 'there', 'think', 'which', 'witch',
        'three', 'seven', 'eight', 'brain', 'could', 'cloud', 'light', 'other',
        'these', 'goose', 'guilt', 'thing', 'those', 'child', 'world', 'slice',
        'still', 'water', 'stone', 'metal', 'state', 'never', 'night', 'group',
        'leave', 'while', 'great', 'begin', 'issue', 'every', 'start', 'sheep',
        'place', 'again', 'power', 'small', 'large', 'point', 'score', 'after',
        'under', 'write', 'money', 'right', 'study', 'close', 'black', 'white',
        'brown', 'green', 'short', 'since', 'among', 'chaos', 'order',
    ], [
        // 6 characters
        'people', 'reason', 'should', 'school', 'always', 'become', 'really',
        'friend', 'family', 'sister', 'mother', 'father', 'repeat', 'system',
        'option', 'choice', 'during', 'number', 'happen', 'ignore', 'wealth',
        'before', 'nation', 'though', 'yellow', 'orange', 'purple', 'little',
        'around', 'member', 'almost', 'change', 'minute', 'second', 'follow',
        'social', 'parent', 'create', 'public', 'office', 'health', 'person',
        'nature', 'moment', 'enough', 'toward', 'market', 'former', 'theory',
        'recent', 'figure', 'doctor', 'chance', 'energy', 'likely', 'course',
        'period',
    ], [
        // 7 characters
        'because', 'through', 'village', 'gallery', 'chicken', 'between',
        'another', 'brother', 'student', 'teacher', 'country', 'problem',
        'shelter', 'against', 'company', 'control', 'program', 'without',
        'million', 'warning', 'provide', 'service', 'however', 'include',
        'exclude', 'century', 'several', 'nothing', 'whether', 'weather',
        'already', 'history', 'science', 'morning', 'evening', 'suggest',
        'perhaps', 'require', 'explain', 'develop', 'society', 'support',
        'project',
    ], [
        // 8 characters
        'treasure', 'universe', 'question', 'sentence', 'national', 'business',
        'remember', 'continue', 'together', 'anything', 'research', 'although',
        'consider', 'actually', 'probably', 'interest', 'possible', 'decision',
        'building', 'activity', 'industry', 'practice', 'describe', 'personal',
        'computer', 'evidence', 'material', 'security', 'increase', 'movement',
    ], [
        // 9 characters
        'something', 'different', 'important', 'political', 'community',
        'president', 'principal', 'education', 'sometimes', 'according',
        'situation', 'attention', 'difficult', 'available', 'condition',
        'determine', 'recognize', 'character',
    ], [
        // 10 characters
        'government', 'understand', 'everything', 'protection', 'experience',
        'impossible', 'difference', 'suggestion', 'especially', 'technology',
        'experiment', 'population', 'individual',
    ]
];

/**
 * Generate a random sentence
 * @param {Number} grade The school grade determining the sentence complexity
 * @returns {String} randomly generated sentence
 */
function generateSentence(grade = 0) {
    let sentence = '';
    const maxLength = Math.round(Math.pow(grade * 2.75, 1.16) + 8);

    // Generate weight lists
    const lengthWeights = [
        3,
        Math.max(Math.min(3, grade + 1), 0),
        Math.max(Math.min(3, grade - 1), 0),
        Math.max(Math.min(3, grade - 3), 0),
        Math.max(Math.min(3, grade - 5), 0),
        Math.max(Math.min(3, grade - 7), 0) * 0.9,
        Math.max(Math.min(3, grade - 9), 0) * 0.7,
        Math.max(Math.min(3, grade - 11), 0) * 0.5,
        Math.max(Math.min(3, grade - 13), 0) * 0.3,
    ];
    const delimiterWeigts = [
        20,
        Math.max(Math.min(3, grade - 2), 0),
        Math.max(Math.min(3, grade - 6), 0) * 0.6,
        Math.max(Math.min(3, grade - 8), 0) * 0.5,
        Math.max(Math.min(3, grade - 10), 0) * 0.35,
    ];
    const delimiterList = ['', ',', ':', ';', ' -'];
    const numberModifierWeights = [
        7,
        Math.max(Math.min(3, grade - 9), 0),
        Math.max(Math.min(3, grade - 11), 0),
        Math.max(Math.min(3, grade - 13), 0),
    ];
    const wordCapsWeights = [
        20,
        Math.max(Math.min(5, grade - 11), 0),
        Math.max(Math.min(5, grade - 15), 0) * 0.4,
    ];
    const wordModifierWeights = [
        60,
        Math.max(Math.min(5, grade - 6), 0),
        Math.max(Math.min(5, grade - 8), 0),
        Math.max(Math.min(3, grade - 11), 0),
        Math.max(Math.min(3, grade - 12), 0),
        Math.max(Math.min(3, grade - 13), 0),
    ];
    const numberChance = Math.max(Math.min(10, grade - 4) * 0.01, 0);

    for (let i = 0; i < 500; i++) {
        // Choose word / number length
        const chosenListIndex = weightSelect(lengthWeights);
        let word = '';

        if (chance(numberChance)) {
            // Create random number
            word = randomInt(Math.pow(10, chosenListIndex + 1), Math.pow(10, chosenListIndex + 2) - 1).toString();

            const chosenModifier = weightSelect(numberModifierWeights);
            switch (chosenModifier) {
                case 1:
                    word = '#' + word;
                    break;
                case 2:
                    word = '$' + word;
                    break;
                case 3:
                    word += '%';
                    break;
            }
        } else {
            // Choose word first
            word = randomElem(wordList[chosenListIndex]);

            // Apply caps modifiers
            const chosenCapsModifier = weightSelect(wordCapsWeights);
            switch (chosenCapsModifier) {
                case 1:
                    word = capitalize(word);
                    break;
                case 2:
                    word = word.toUpperCase();
                    break;
            }

            // Apply word modifiers
            const chosenModifier = weightSelect(wordModifierWeights);
            switch (chosenModifier) {
                case 1:
                    word = '"' + word + '"';
                    break;
                case 2:
                    word = '\'' + word + '\'';
                    break;
                case 3:
                    word = '(' + word + ')';
                    break;
                case 4:
                    word = '[' + word + ']';
                    break;
                case 5:
                    word = '{' + word + '}';
                    break;
            }
        }

        // Add final word
        sentence += word;

        // Decide whether to add another word or to stop
        if (sentence.length >= (maxLength - 2)) {
            break;
        } else {
            sentence += delimiterList[weightSelect(delimiterWeigts)] + ' ';
        }
    }

    // End of sentence
    const sentenceEnds = ['', '.', '!', '?', '...', '!!!', '???', '!?!', '?!?'];
    const sentenceEndsWeight = [
        3,
        Math.max(Math.min(10, grade), 0),
        Math.max(Math.min(5, grade - 4), 0),
        Math.max(Math.min(5, grade - 6), 0),
        Math.max(Math.min(5, grade - 8), 0) * 0.8,
        Math.max(Math.min(5, grade - 10), 0) * 0.7,
        Math.max(Math.min(5, grade - 10), 0) * 0.7,
        Math.max(Math.min(5, grade - 12), 0) * 0.4,
        Math.max(Math.min(5, grade - 12), 0) * 0.4,
    ];
    sentence += sentenceEnds[weightSelect(sentenceEndsWeight)];

    return sentence;
}
