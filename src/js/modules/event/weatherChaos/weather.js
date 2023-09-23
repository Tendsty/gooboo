export default {
    sunny: {
        icon: 'mdi-weather-sunny',
        next: ['hazy', 'partlyCloudy', 'partlyLightning', 'partlyRainy', 'partlySnowy'],
        sun: true,
    },
    cloudy: {
        icon: 'mdi-weather-cloudy',
        next: ['fog', 'lightning', 'partlyCloudy', 'partlyLightning', 'partlyRainy', 'partlySnowy', 'rainy', 'snowy', 'partlyWindy'],
    },
    fog: {
        icon: 'mdi-weather-fog',
        next: ['cloudy', 'hazy', 'rainy', 'partlyWindy'],
    },
    hail: {
        icon: 'mdi-weather-hail',
        next: ['pouring', 'rainy', 'snowy', 'snowstorm'],
        rain: true,
        snow: true,
    },
    hazy: {
        icon: 'mdi-weather-hazy',
        next: ['sunny', 'fog', 'partlyCloudy'],
        sun: true,
    },
    lightning: {
        icon: 'mdi-weather-lightning',
        next: ['cloudy', 'thunderstorm', 'partlyLightning'],
        thunder: true,
    },
    thunderstorm: {
        icon: 'mdi-weather-lightning-rainy',
        next: ['lightning', 'pouring', 'rainy'],
        rain: true,
        thunder: true,
    },
    partlyCloudy: {
        icon: 'mdi-weather-partly-cloudy',
        next: ['sunny', 'cloudy', 'hazy', 'partlyLightning', 'partlyRainy', 'partlySnowy'],
        sun: true,
    },
    partlyLightning: {
        icon: 'mdi-weather-partly-lightning',
        next: ['sunny', 'cloudy', 'lightning', 'partlyCloudy'],
        sun: true,
        thunder: true,
    },
    partlyRainy: {
        icon: 'mdi-weather-partly-rainy',
        next: ['sunny', 'cloudy', 'partlyCloudy', 'rainy'],
        sun: true,
        rain: true,
    },
    partlySnowy: {
        icon: 'mdi-weather-partly-snowy',
        next: ['sunny', 'cloudy', 'partlyCloudy', 'snowy'],
        sun: true,
        snow: true,
    },
    pouring: {
        icon: 'mdi-weather-pouring',
        next: ['hail', 'thunderstorm', 'rainy'],
        rain: true,
    },
    rainy: {
        icon: 'mdi-weather-rainy',
        next: ['cloudy', 'fog', 'hail', 'thunderstorm', 'partlyRainy', 'pouring', 'snowyRainy'],
        rain: true,
    },
    snowy: {
        icon: 'mdi-weather-snowy',
        next: ['cloudy', 'hail', 'partlySnowy', 'snowstorm', 'snowyRainy'],
        snow: true,
    },
    snowstorm: {
        icon: 'mdi-weather-snowy-heavy',
        next: ['hail', 'snowy'],
        snow: true,
    },
    snowyRainy: {
        icon: 'mdi-weather-snowy-rainy',
        next: ['rainy', 'snowy'],
        rain: true,
    },
    windy: {
        icon: 'mdi-weather-windy',
        next: ['partlyWindy', 'storm'],
        wind: true,
    },
    partlyWindy: {
        icon: 'mdi-weather-windy-variant',
        next: ['cloudy', 'fog', 'windy'],
        wind: true,
    },
    storm: {
        icon: 'mdi-weather-tornado',
        next: ['windy'],
        wind: true,
    }
}
