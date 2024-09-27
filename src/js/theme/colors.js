import { filterColorObject, mergeColorObject } from "../utils/color";

let obj = {
    // Standard vuetify colors
    red: {
        base: '#F44336',
        lighten5: '#FFEBEE',
        lighten4: '#FFCDD2',
        lighten3: '#EF9A9A',
        lighten2: '#E57373',
        lighten1: '#EF5350',
        darken1: '#E53935',
        darken2: '#D32F2F',
        darken3: '#C62828',
        darken4: '#B71C1C'
    },
    pink: {
        base: '#e91e63',
        lighten5: '#fce4ec',
        lighten4: '#f8bbd0',
        lighten3: '#f48fb1',
        lighten2: '#f06292',
        lighten1: '#ec407a',
        darken1: '#d81b60',
        darken2: '#c2185b',
        darken3: '#ad1457',
        darken4: '#880e4f'
    },
    purple: {
        base: '#9c27b0',
        lighten5: '#f3e5f5',
        lighten4: '#e1bee7',
        lighten3: '#ce93d8',
        lighten2: '#ba68c8',
        lighten1: '#ab47bc',
        darken1: '#8e24aa',
        darken2: '#7b1fa2',
        darken3: '#6a1b9a',
        darken4: '#4a148c'
    },
    'deep-purple': {
        base: '#673ab7',
        lighten5: '#ede7f6',
        lighten4: '#d1c4e9',
        lighten3: '#b39ddb',
        lighten2: '#9575cd',
        lighten1: '#7e57c2',
        darken1: '#5e35b1',
        darken2: '#512da8',
        darken3: '#4527a0',
        darken4: '#311b92'
    },
    indigo: {
        base: '#3f51b5',
        lighten5: '#e8eaf6',
        lighten4: '#c5cae9',
        lighten3: '#9fa8da',
        lighten2: '#7986cb',
        lighten1: '#5c6bc0',
        darken1: '#3949ab',
        darken2: '#303f9f',
        darken3: '#283593',
        darken4: '#1a237e'
    },
    blue: {
        base: '#2196F3',
        lighten5: '#E3F2FD',
        lighten4: '#BBDEFB',
        lighten3: '#90CAF9',
        lighten2: '#64B5F6',
        lighten1: '#42A5F5',
        darken1: '#1E88E5',
        darken2: '#1976D2',
        darken3: '#1565C0',
        darken4: '#0D47A1'
    },
    'light-blue': {
        base: '#03a9f4',
        lighten5: '#e1f5fe',
        lighten4: '#b3e5fc',
        lighten3: '#81d4fa',
        lighten2: '#4fc3f7',
        lighten1: '#29b6f6',
        darken1: '#039be5',
        darken2: '#0288d1',
        darken3: '#0277bd',
        darken4: '#01579b'
    },
    cyan: {
        base: '#00bcd4',
        lighten5: '#e0f7fa',
        lighten4: '#b2ebf2',
        lighten3: '#80deea',
        lighten2: '#4dd0e1',
        lighten1: '#26c6da',
        darken1: '#00acc1',
        darken2: '#0097a7',
        darken3: '#00838f',
        darken4: '#006064'
    },
    teal: {
        base: '#009688',
        lighten5: '#e0f2f1',
        lighten4: '#b2dfdb',
        lighten3: '#80cbc4',
        lighten2: '#4db6ac',
        lighten1: '#26a69a',
        darken1: '#00897b',
        darken2: '#00796b',
        darken3: '#00695c',
        darken4: '#004d40'
    },
    green: {
        base: '#4CAF50',
        lighten5: '#E8F5E9',
        lighten4: '#C8E6C9',
        lighten3: '#A5D6A7',
        lighten2: '#81C784',
        lighten1: '#66BB6A',
        darken1: '#43A047',
        darken2: '#388E3C',
        darken3: '#2E7D32',
        darken4: '#1B5E20'
    },
    'light-green': {
        base: '#8bc34a',
        lighten5: '#f1f8e9',
        lighten4: '#dcedc8',
        lighten3: '#c5e1a5',
        lighten2: '#aed581',
        lighten1: '#9ccc65',
        darken1: '#7cb342',
        darken2: '#689f38',
        darken3: '#558b2f',
        darken4: '#33691e'
    },
    lime: {
        base: '#cddc39',
        lighten5: '#f9fbe7',
        lighten4: '#f0f4c3',
        lighten3: '#e6ee9c',
        lighten2: '#dce775',
        lighten1: '#d4e157',
        darken1: '#c0ca33',
        darken2: '#afb42b',
        darken3: '#9e9d24',
        darken4: '#827717'
    },
    yellow: {
        base: '#ffeb3b',
        lighten5: '#fffde7',
        lighten4: '#fff9c4',
        lighten3: '#fff59d',
        lighten2: '#fff176',
        lighten1: '#ffee58',
        darken1: '#fdd835',
        darken2: '#fbc02d',
        darken3: '#f9a825',
        darken4: '#f57f17'
    },
    amber: {
        base: '#ffc107',
        lighten5: '#fff8e1',
        lighten4: '#ffecb3',
        lighten3: '#ffe082',
        lighten2: '#ffd54f',
        lighten1: '#ffca28',
        darken1: '#ffb300',
        darken2: '#ffa000',
        darken3: '#ff8f00',
        darken4: '#ff6f00'
    },
    orange: {
        base: '#ff9800',
        lighten5: '#fff3e0',
        lighten4: '#ffe0b2',
        lighten3: '#ffcc80',
        lighten2: '#ffb74d',
        lighten1: '#ffa726',
        darken1: '#fb8c00',
        darken2: '#f57c00',
        darken3: '#ef6c00',
        darken4: '#e65100'
    },
    'deep-orange': {
        base: '#ff5722',
        lighten5: '#fbe9e7',
        lighten4: '#ffccbc',
        lighten3: '#ffab91',
        lighten2: '#ff8a65',
        lighten1: '#ff7043',
        darken1: '#f4511e',
        darken2: '#e64a19',
        darken3: '#d84315',
        darken4: '#bf360c'
    },
    brown: {
        base: '#795548',
        lighten5: '#efebe9',
        lighten4: '#d7ccc8',
        lighten3: '#bcaaa4',
        lighten2: '#a1887f',
        lighten1: '#8d6e63',
        darken1: '#6d4c41',
        darken2: '#5d4037',
        darken3: '#4e342e',
        darken4: '#3e2723'
    },
    'blue-grey': {
        base: '#607d8b',
        lighten5: '#eceff1',
        lighten4: '#cfd8dc',
        lighten3: '#b0bec5',
        lighten2: '#90a4ae',
        lighten1: '#78909c',
        darken1: '#546e7a',
        darken2: '#455a64',
        darken3: '#37474f',
        darken4: '#263238'
    },

    // Full custom colors
    babypink: {
        base: '#E325B5',
        lighten5: '#FDE8F8',
        lighten4: '#F8C4EB',
        lighten3: '#F49FDF',
        lighten2: '#EF71D0',
        lighten1: '#EB4CC5',
        darken1: '#D219A5',
        darken2: '#B3148D',
        darken3: '#8E106F',
        darken4: '#650B4F'
    },
};

// Add pale variants
['red', 'pink', 'purple', 'blue', 'light-blue', 'cyan', 'green', 'light-green', 'yellow', 'orange'].forEach(c => {
    obj['pale-' + c] = filterColorObject(obj[c], color => color.desaturate(0.5));
});

// Add color combinations
obj['orange-red'] = mergeColorObject(obj.orange, obj.red);
obj['red-pink'] = mergeColorObject(obj.red, obj.pink);
obj['pink-purple'] = mergeColorObject(obj.pink, obj.purple);
obj['dark-blue'] = mergeColorObject(obj.blue, obj.indigo);
obj.aqua = mergeColorObject(obj.green, obj.teal, 0.75);

// Add custom colors
obj.wooden = filterColorObject(mergeColorObject(obj.brown, obj['orange-red']), color => color.blacken(0.8));
obj.cherry = filterColorObject(mergeColorObject(obj.wooden, obj.red), color => color.saturate(0.25).blacken(0.25));
obj.skyblue = filterColorObject(obj['blue-grey'], color => color.saturate(0.8));
obj.beige = filterColorObject(obj['pale-orange'], color => color.desaturate(0.2));

export default obj;
