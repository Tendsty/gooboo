import { de } from 'vuetify/lib/locale'
import card from './de/card'
import consumable from './de/consumable'
import currency from './de/currency'
import mult from './de/mult'
import note from './de/note'
import relic from './de/relic'
import stat from './de/stat'
import unlock from './de/unlock'
import upgrade from './de/upgrade'
import patchnote from './de/patchnote'

export default {
  ...de,

  gooboo: {
    buy: 'Kaufen',
    craft: 'Herstellen',
    feature: 'Funktion',
    features: 'Funktionen',
    cantAfford: 'Zu teuer',
    capTooLow: 'Kapazität zu gering',
    equip: 'Ausrüsten',
    unequip: 'Ablegen',
    unequipAll: 'Alle ablegen',
    max: 'Max',
    maxed: 'Max',
    free: 'Kostenlos',
    capacity: 'Kapazität',
    multCapacity: '{0}-Kapazität',
    gain: 'Einkommen',
    multGain: '{0}-Einkommen',
    apply: 'Anwenden',
    reset: 'Zurücksetzen',
    unlock: 'Freischalten',
    keep: 'Behalten',
    consumable: 'Verbrauchsgut',
    lock: 'Sperren',
    upgrade: 'Verbesserung',
    upgrades: 'Verbesserungen',
    upgradeVerb: 'Verbessern',
    upgradesPrestige: 'Prestige-Verbesserung',
    prestige: 'Prestige',
    prestigeDescription: 'Setze diese Funktion zurück und erhalte im Austausch Prestige-Währung',
    prestigeTime: 'Zeit in diesem Zyklus verbracht',
    saveManual: 'Speichern',
    saveExport: 'Nach Datei exportieren',
    saveImport: 'Aus Datei laden',
    closeAll: 'Alle schließen',
    draw: 'Ziehen',
    finish: 'Abschließen',
    boost: 'Boost',
    skip: 'Überspringen',
    level: 'Stufe',
    chance: 'Chance',
    effect: 'Effekt',
    effects: 'Effekte',
    confirm: 'Bestätigen',
    cancel: 'Abbrechen',
    maxLevel: 'maximale Stufe',
    inventory: 'Inventar',
    newGame: 'Neues Spiel',
    levelSuffix: 'Stufe',
    delete: 'Löschen',
    convert: 'Umwandeln',
    add: 'Hinzufügen',
    playedBefore: {
      0: 'Schon mal gespielt? Lade deinen Spielstand ',
      1: 'hier'
    },
    offlineSummary: {
      title: 'Willkommen zurück! Du warst {0} abwesend',
      newVersion: 'Neue Version! ',
      upgradesFinished: 'Verbesserungen fertiggestellt',
      downloadBackup: 'Datensicherung herunterladen',
      eventEnded: 'Event abgeschlossen',
      eventStarted: 'Event gestartet',
      toFeature: 'Zur Funktion'
    },
    operator: {
      '>=': 'mindestens',
      '>': 'über',
      '<=': 'höchstens',
      '<': 'unter',
      '==': 'genau'
    }
  },
  endOfContent: {
    name: 'Ende des Inhalts',
    description: 'Du hast das Ende dieser Funktion erreicht, der Fortschritt wird sich ab diesem Punkt verlangsamen. Warte auf ein zukünftiges Update oder konzentriere dich auf andere Funktionen, um weiter Fortschritt zu erzielen'
  },
  message: {
    achievement: {
      get: 'Erfolg erhalten!',
      gained: 'erhalten',
      relicGained: 'Relikt erhalten'
    },
    card: {
      get: 'Inhalte des Kartenpakets',
      new: 'NEU!'
    },
    feature: {
      feature: 'Neue Funktion freigeschaltet!',
      subfeature: 'Neue Unterfunktion freigeschaltet!',
      school: 'Neues Schulfach freigeschaltet!',
      general: 'Neuer General freigeschaltet!'
    },
    heirloom: {
      get: 'Erbstück gefunden'
    },
    note: {
      get: 'Notiz #{0} gefunden',
      read: 'Lesen'
    },
    save: {
      success: 'Spiel gespeichert',
      error: 'Speichern fehlgeschlagen'
    },
    prize: {
      get: 'Du hast einen Preis gewonnen!',
      bingo1: 'BINGO!',
      bingo2: 'DOPPEL-BINGO!',
      bingo3: 'DREIFACH-BINGO!'
    },
    school: {
      get: 'Schulschluss!',
      getExam: 'Prüfungsschluss!',
      score: 'Punktzahl: {0}',
      perfectScore: '(PERFEKT!)',
      grade: '{0}% Note',
      gradePlus: 'Deine Note hat sich verbessert!',
      dust: '+{0} Goldstaub'
    },
    update: {
      get: 'Neues Update!',
      apply: 'Neu laden + anwenden'
    },
    import: {
      message: 'Datei konnte nicht geladen werden',
      base64: 'Dekodieren gescheitert',
      json: 'JSON konnte nicht interpretiert werden',
      key: 'Dem geladenen Spielstand fehlen wichtige Daten',
      version: 'Diese Datei ist von einer neueren Version des Spiels (v{0}, aktuelle Version: v{1})',
      testing: 'Dateien vom Teststand können nicht in der Live-Version verwendet werden',
      migration: 'Ein Fehler ist beim Migrieren von v{0} nach v{1} aufgetreten'
    }
  },
  duplicateTab: {
    title: 'Gooboo läuft bereits in einem anderen Tab',
    description: 'Um Konflikte im Spielstand zu vermeiden, kann Gooboo nur einmal gleichzeitig laufen. Bitte schließe diesen Tab und kehre zum vorhandenen Tab mit dem Spiel zurück.'
  },
  confirm: {
    title: 'Aktion bestätigen',
    prestige: 'Bei einem Prestige wird die Funktion im Austausch gegen Prestige-Währung zurückgesetzt. Möchtest du das wirklich tun?',
    prestigeNoGain: 'Bei einem Prestige wird die Funktion zurückgesetzt. Aufgrund deines fehlenden Fortschritts erhältst du keine Prestige-Währung. Möchtest du das wirklich tun?',
    prestigeCrop: 'Beim Prestige einer Pflanze werden deren Stufe, Erfahrung und Gene zurückgesetzt, um den Ertrag aller Pflanzen zu erhöhen. Möchtest du das wirklich tun?',
    upgrade: {
      0: 'Die Verbesserung ',
      1: ' kostet seltene Währung. Möchtest du das wirklich kaufen?'
    },
    shop: 'Die Eventbelohnung kostet seltene Währung. Möchtest du das wirklich kaufen?',
    theme: {
      0: 'Das Farbschema ',
      1: ' kostet seltene Währung. Möchtest du das wirklich kaufen?'
    },
    cardPack: {
      0: 'Das Kartenpaket ',
      1: ' kostet seltene Währung. Möchtest du das wirklich kaufen?'
    },
    weatherChaosFishingRodBuy: 'Die Angel "{0}" kostet seltene Währung. Möchtest du das wirklich kaufen?',
    summerFestivalCellBuy: 'Ein neues Inselfeld kostet seltene Währung. Möchtest du das wirklich kaufen?',
    farmCrop: 'Die ausgewählten Pflanzen kosten seltene Währung. Möchtest du das wirklich kaufen?',
    treasure: 'Ein neuer Schatz kostet seltene Währung. Möchtest du das wirklich kaufen?',
    schoolExamPass: 'Ein Prüfungspass kostet seltene Währung. Möchtest du das wirklich kaufen?',
    treasureFragment: 'Fragmente kosten seltene Währung. Möchtest du das wirklich kaufen?',
    treasureDelete: 'Möchtest du den Schatz wirklich zerstören und in Fragmente umwandeln?',
    casinoBingoBuy: 'Eine Bingokarte kostet seltene Währung. Möchtest du das wirklich kaufen?',
    casinoWheelSpin: 'Ein Dreh am Glücksrad kostet seltene Währung. Möchtest du das wirklich kaufen?',
    consumable: 'Diese Aktion benötigt Verbrauchsgüter, die du nicht besitzt. Möchtest du sie automatisch für seltene Währung einkaufen?'
  },
  feature: {
    subfeature: 'Unterfunktion',

    // Main features
    mining: 'Bergbau',
    village: 'Dorf',
    horde: 'Horde',
    farm: 'Bauernhof',
    gallery: 'Gallerie',

    // Side features
    note: 'Notizen',
    relic: 'Relikte',
    gem: 'Edelsteine',
    achievement: 'Erfolge',
    school: 'Schule',
    card: 'Karten',
    general: 'Generäle',
    event: 'Event',
    treasure: 'Schätze',
    cryolab: 'Kryolabor',
    debug: 'Debug',

    // Subfeatures
    miningGas: 'Gas',
    schoolLiterature: 'Literatur',
    schoolHistory: 'Geschichte',
    schoolArt: 'Kunst',
    generalOrladee: 'Orladee',
    generalOppenschroe: 'Oppenschroe',
    generalBellux: 'Bellux',
    generalOnoclua: 'Onoclua',
    generalOmnisolix: 'Omnisolix',

    // Meta
    meta: 'Spiel'
  },
  subfeature: {
    mining: {
      0: 'Erzmine',
      1: 'Gasriese',
    },
    village: {
      0: 'Arbeiter',
      1: 'Handwerkergilde',
    },
    horde: {
      0: 'Ausrüstung',
    },
    farm: {
      0: 'Garten',
    },
    gallery: {
      0: 'Freestyle',
    }
  },
  unlock,
  mult,
  text: {
    farmUnlockDna: 'Schalte alle DNA-Verbesserungen von Stufe-1-Genen frei',
    farmGnomeBoost: 'Angrenzende Gartenzwerge erhöhen sämtlichen Pflanzenertrag um 10%',
    farmLonelyGrow: 'Pflanzen wachsen doppelt so schnell, wenn keine anderen Pflanzen der gleichen Art auf dem Feld sind',
    farmFertileBoost: 'Erhöht sämtlichen Pflanzenertrag um 30% vom Wachstumsbonus des Düngers',
    farmYieldConversion: '60% vom Ertrag wird in andere Ertragsarten umgewandelt (jeweils 20%)',
    farmFastPrestige: 'Prestige reduziert die Pflanzenstufe um 5, anstatt sie auf 0 zurückzusetzen',
  },
  upgrade,
  currency,
  stat,
  consumable,
  patchnote,
  info: {
    title: 'Gooboo',
    subtitle: 'entwickelt von Tendsty',
    testing: 'testen',
    text: 'Gooboo ist ein Idle / Incremental-Spiel, wo du verschiedene Funktionen in einer mysteriösen, unbekannten Welt verwaltest. Sammle verschiedene Ressourcen, um eine riesige Menge an Verbesserungen zu kaufen und dein Rohstoffeinkommen weiter zu erhöhen. Schreite in den Hauptfunktionen fort, um neue Inhalte freizuschalten und mehr über diese Welt zu erfahren. Und sollte der Fortschritt sich verlangsamen, kannst du für einzelne Funktionen einen Prestige durchführen, um die Rohstoffgewinne auf die nächste Stufe zu bringen.',
    updates: {
      web: 'Du verwendest die Web-Version. Das Spiel prüft automatisch auf Updates, hält sich von selbst aktuell und benachrichtigt dich, wenn ein Update verfügbar ist.',
      desktop: {
        0: 'Du verwendest die Desktop-Version. Updates müssen manuell installiert werden. Informiere dich dazu auf der ',
        1: 'Releases',
        2: '-Seite.'
      },
      offline: {
        0: 'Du verwendest die Offline-Version. Updates müssen manuell installiert werden. Informiere dich dazu auf der ',
        1: 'Releases',
        2: '-Seite.'
      },
      steam: 'Du verwendest die Steam-Version. Updates werden über Steam verwaltet.'
    },
    testingDescription: {
      0: 'Du spielst auf dem Teststand. Funktionen können unfertig oder fehlerhaft sein, und Spielmechaniken können sich jederzeit ändern. Du kannst die Live-Version ',
      1: 'hier',
      2: ' spielen (Spielstände vom Teststand können nicht in den Live-Versionen verwendet werden)'
    },
    viewPatchnotes: 'Patchnotizen ansehen',
    numberFormatting: 'Zahlenformatierung',
    numberFormattingDescription: 'Damit Zahlen lesbar bleiben, werden besonders große (und kleine) Zahlen mit den unten aufgelisteten Einheiten formatiert.',
    bigNumbers: 'Große Zahlen',
    smallNumbers: 'Kleine Zahlen',
    timeUnits: 'Zeiteinheiten',
    timeUnit: {
      s: 'Sekunde',
      m: 'Minute',
      h: 'Stunde',
      d: 'Tag'
    },
    socials: {
      title: 'Kontakte',
      text: 'Gooboo kann alleine und ohne Hilfe von außen gespielt werden. Aber wenn du dich mit anderen Spielern austauschen möchtest, kannst du das hier tun:',
      viewCode: 'Quellcode ansehen',
      patreon: 'Patreon',
      reddit: 'Reddit',
      discord: 'Discord'
    },
    supportMe: {
      title: 'Unterstütze mich',
      text: 'Das Spiel ist kostenlos und frei von Mikrotransaktionen und Werbung. Wenn du die Entwicklung unterstützen möchtest, findest du dazu Details auf meiner Patreon-Seite:',
      patreon: 'Patreon'
    },
    tech: {
      title: 'Verwendete Technologien',
      web: 'Web',
      fonts: 'Schriftarten',
      testing: 'Automatisiertes Testen',
      vue: 'Vue.js',
      vuetify: 'Vuetify',
      vuex: 'vuex',
      snackbars: 'v-snackbars',
      color: 'color',
      mdi: 'Material Design Icons',
      jsfiledownload: 'Javascript File Download',
      seedrandom: 'seedrandom',
      caveat: 'Caveat',
      roboto: 'Roboto',
      robotomono: 'Roboto Mono',
      cypress: 'Cypress',
      jest: 'Jest',
      github: 'GitHub',
      website: 'Website',
      googlefonts: 'Google Fonts'
    }
  },
  error: {
    tech: {
      vuejs: 'Vue.js',
      javascript: 'Javascript'
    },
    title: '{0}-Fehler',
    source: 'Quelle: {0}',
    position: 'Zeile {0}, Spalte {1}',
    reportBug: 'Fehler melden'
  },
  note,
  school: {
    school: 'Schule',
    beginner: {
      title: 'Noch am Lernen',
      description: 'Diese Schule ist neu für dich, was deine Goldstaub-Belohnung auf {0}% reduziert. Erreiche eine höhere globale Stufe, um diese Strafe zu reduzieren, und entferne sie ganz, indem du globale Stufe 175 erreichst.'
    },
    subjectBookGain: 'Jedes freigeschaltete Fach bringt 10 Bücher pro Stunde, egal welche Note.',
    passCapGain: 'Du erhältst jeden Tag einen neuen Prüfungspass (der Nächste in {0}) und alle 10 globale Stufen.',
    buyPass: 'Kaufe einen Prüfungspass für',
    library: 'Bücherei',
    practice: 'Üben',
    practiceDescription: 'Übe dieses Fach ohne Zeitdruck, aber erhalte keine Belohnung oder Noten',
    study: 'Lernen',
    studyDescription: 'Erhalte die höchstmögliche Punktzahl in {0}, und erhalte die Chance, deine Note zu verbessern, wenn du auf deiner besten Note lernst. Abhängig von der Punktzahl erhältst (oder verlierst) du Fortschritt zur nächsten Note. Es wird eine Durchschnittspunktzahl von {1} erwartet.',
    studyNoF: 'Du kannst auf der Note F keinen Fortschritt verlieren.',
    takeExam: 'Prüfung',
    takeExamDescription: 'Lege eine Prüfung ab, wo du {0} Zeit hast, um die höchstmögliche Punktzahl zu erreichen. Du erhältst Goldstaub als Belohnung ({1} - {2}, abhängig von der Punktzahl und der ausgewählten Note). Solltest du eine Punktzahl von {3} erreichen, wird die Prüfung als perfekt bewertet und du schaltest die nächste Note frei.',
    takeExamNoF: 'Du kannst auf der Note F keine Prüfung ablegen.',
    takeExamNoFStudy: 'Lerne erst mal etwas!',
    takeExamCost: 'Benötigt',
    examDustFull: 'Dein antikes Stundenglas ist voll! Sämtlicher Goldstaub aus der Prüfung wird verloren gehen!',
    examDustOvercap: 'Dein antikes Stundenglas ist fast voll. Goldstaub aus der Prüfung könnte durch Überkapazität verloren gehen.',
    answer: 'Antworten',
    begin: 'Der Unterricht beginnt!',
    beginExam: 'Die Prüfung beginnt!',
    grade: 'Noten',
    gradeDescription: 'Noten bestimmen die Schwierigkeit vom Fach. Du kannst jederzeit zwischen den Noten wechseln und schaltest neue Noten frei, indem du genug lernst oder eine perfekte Prüfung ablegst.',
    math: {
      name: 'Mathe',
      subtitle: 'Gleichungen lösen',
      description: 'Löse verschiedene Gleichungen, um Punkte zu sammeln. Erhalte 1 Punkt für jede richtige Antwort, und verliere 1 Punkt für jede falsche Antwort (Punkte können nicht unter 0 fallen). Mit steigender Note werden die Zahlen größer und neue Rechenarten werden eingeführt.'
    },
    literature: {
      name: 'Literatur',
      subtitle: 'Sätze schreiben',
      description: 'Tippe den angezeigten Satz ab, um Punkte zu sammeln. Erhalte 1 Punkt für jeden getippten Satz. Der Satz bleibt, bis er richtig getippt wurde, und der Anfang vom nächsten Satz ist auch sichtbar. Mit steigender Note werden die Sätze und Wörter länger und enthalten neue Sonderzeichen.'
    },
    history: {
      name: 'Geschichte',
      subtitle: 'Daten merken',
      description: 'Merke dir die angezeigten Jahreszahlen und gebe sie korrekt wieder, um Punkte zu sammeln. Am Anfang sind alle Jahreszahlen sichtbar. Wenn du dir sie gemerkt hast, kannst du zu den Fragen gehen, wodurch die Jahreszahlen verschwinden. Dir werden 5 Fragen zu den Jahreszahlen gestellt, und für jede richtige Antwort gibt es 1 Punkt. Solltest du alle 5 Fragen richtig beantworten, bekommst du 1 Bonuspunkt je 3 übrige Sekunden. Mit steigender Note werden die Jahreszahlen größer und es tauchen mehr Jahreszahlen auf.',
      year: 'Jahr {0}',
      examInfo: 'In Prüfungen bekommst du zwei Chancen, dir Jahreszahlen zu merken. Nachdem du mit den ersten Antworten fertig bist, kommt eine neue Liste mit Jahreszahlen und Fragen'
    },
    art: {
      name: 'Kunst',
      subtitle: 'Mische Farben',
      description: 'Errate Farben, um Punkte zu sammeln. Zwei Farben werden angezeigt, errate das Ergebnis, was beim Mischen entsteht. Erhalte 1 Punkt für jede richtige Antwort, und verliere 1 Punkt für jede falsche Antwort (Punkte können nicht unter 0 fallen). Mit steigender Note werden mehr Antworten hinzugefügt und die Antworten sehen sich ähnlicher.'
    }
  },
  hourglass: {
    title: 'Antikes Stundenglas',
    subtitle: 'Überspringe Zeit in dieser Funktion',
    subtitleSchool: 'Wandle Prüfungspässe in Goldstaub um',
    timeInMinutes: 'Zeit (in Minuten)'
  },
  cryolab: {
    frozen: '{0} / {1} Funktionen eingefroren',
    active: 'Aktiv: {0}%',
    activeTitle: 'Prestige-Einkommen (aktiv)',
    activeDescription: 'Erhalte automatisch Prestige-Währung in Höhe von {0}% vom besten Prestige pro Tag. Das ist nur aktiv, wenn die Funktion gefroren ist.',
    passive: 'Passiv: {0}%',
    passiveTitle: 'Prestige-Einkommen (passiv)',
    passiveDescription: 'Erhalte automatisch Prestige-Währung in Höhe von {0}% vom besten Prestige pro Tag. Das ist nur aktiv, wenn die Funktion nicht gefroren ist.',
    expDescription: 'Du hast {0} / {1} Erfahrung und bekommst {2} Erfahrung pro Tag, wenn diese Funktion eingefroren ist.',
    expDescription2: 'Das Erfahrungseinkommen hängt vom besten Prestige ab.',
    expNext: 'Effekte der nächsten Stufe:',
    expNoGain: 'Um Erfahrung für diese Funktion zu sammeln, benötigst du zuerst etwas Prestige-Währung',
    cropExp: 'Erhalte bis zu diese Menge an Erfahrung für jede Pflanze (Grundwachstumszeit und Goldkosten senken die Erfahrungsmenge). Das wird dann mit dem Unterschied zwischen höchster und aktueller Pflanzenstufe multipliziert (Pflanzen auf der höchsten Stufe erhalten keine Erfahrung)',
    frozenFeature: {
      title: 'Funktion ist eingefroren',
      description: 'Diese Funktion wurde durch das Kryolabor eingefroren. Du erzeugst keinen Fortschritt in dieser Funktion, bekommst aber automatisch Prestige-Währung.'
    }
  },
  general: {
    completionReward: 'Abschlussbelohnung',
    questGained: '{0} erhalten',
    grobodal: {
      name: 'Grobodal',
      diggingDeeper: 'Tiefer graben',
      combatTraining: 'Kampftraining',
      gardening: 'Gärtnern',
      pitchBlack: 'Pechschwarz',
      masterOfTheSystem: 'Meister des Systems',
      thinkPlayerThink: 'Denke, Spieler, denke!',
    },
    orladee: {
      name: 'Orladee',
      beautyOfThisWorld: 'Schönheit dieser Welt'
    },
    oppenschroe: {
      name: 'Oppenschroe'
    },
    bellux: {
      name: 'Bellux'
    },
    onoclua: {
      name: 'Onoclua'
    },
    omnisolix: {
      name: 'Omnisolix'
    },
  },
  event: {
    shop: {
      notFound: 'Keine Läden gefunden',
      bought: 'Auf Lager'
    },
    cinders: {
      name: 'Abendlicht',
      perProducer: 'pro Produzent',
      candle: {
        tealight: 'Teelicht',
        regular: 'Kerze',
        aroma: 'Duftkerze',
        chandelier: 'Kerzenleuchter',
        duration: 'Hält {0}',
        sootGain: {
          0: 'Erzeugt ',
          1: ' ',
          2: ' nach dem Verbrennen'
        }
      }
    },
    bloom: {
      name: 'Erblühen',
      tier: 'Stufe',
      canSell: 'Kann für {0} verkauft werden',
      sell: 'Wähle eine Blume zum Verkaufen. Wenn du eine Blume mit einem vollen Inventar bekommst, wird die Blume der selben Art mit der niedrigsten Stufe automatisch verkauft.',
      dragToBreeder: 'Ziehe eine Blume hierher um mit dem Züchten anzufangen',
      wildGrowth: 'Erhalte ein zufälliges Gen auf alle Blumen im Inventar. Das 3-Gen-Limit pro Blume kann dabei nicht umgangen werden.',
      boost: 'Erhalte sofort 1 Tag Fortschritt',
      genes: 'Gene',
      wildgrowth: 'Wildwuchs',
      flower: {
        daisy: 'Gänseblümchen',
        poppy: 'Mohn',
        iris: 'Schwertlilie',
        lily: 'Lilie',
        orchid: 'Orchidee',
        cornflower: 'Kornblume',
      },
      gene: {
        valuable: {
          name: 'Wertvoll',
          description: '3x Knospenwert'
        },
        mutating: {
          name: 'Mutierend',
          description: '2x Genchance'
        },
        splitting: {
          name: 'Teilend',
          description: '25% Chance 2 neue Blumen zu züchten'
        },
        resistant: {
          name: 'Resistent',
          description: '+10% Stufenchance'
        },
        huge: {
          name: 'Riesig',
          description: '+1 Stufe beim Zusammenfügen, dieses Gen wird dabei verbraucht'
        }
      }
    },
    weatherChaos: {
      name: 'Wetterchaos',
      chanceToCatch: 'Fangchance',
      powerNeeded: 'Angelkraft benötigt',
      maxSize: 'Maximalgröße',
      owned: 'Im Besitz',
      fishingPowerDescription: 'Angelkraft bestimmt, welche Fische du fangen kannst. Erreiche das Doppelte der benötigten Angelkraft für die höchste Wahrscheinlichkeit, den Fisch zu fangen.',
      fishSizeDescription: 'Fische unter oder auf der Durchschnittsgröße haben die gleiche Chance, gefangen zu werden. Andere Fische werden mit jeder Größe schwerer zu fangen.',
      fishDescription: 'Du hast die Chance einen Fisch zu fangen, wenn du keinen Schatz erwischt hast. Die verfügbaren Fischarten hängen vom Wetter und von der Lage ab.',
      trashTitle: 'Abfallchance',
      trashDescription: 'Du fängst Abfall wenn du weder Schatz noch Fisch erwischt.',
      treasureDescription: 'Du hast eine kleine Chance, einen Schatz zu angeln. Darin können Köder oder eine neue Angel sein. Wenn du eine Angelkraft von mindestens {0} hast, kannst du auch einen Schlüssel zum nächsten Angelplatz finden.',
      treasureDescriptionFinal: 'Du hast eine kleine Chance, einen Schatz zu angeln. Darin können Köder oder eine neue Angel sein.',
      changeWeather: 'Wetter ändern',
      location: {
        pond: 'Teich',
        lake: 'See',
        river: 'Fluss',
        ocean: 'Ozean',
        mountain: 'Berg',
        cave: 'Höhle',
      },
      fish: {
        bronzefish: 'Bronzefisch',
        snail: 'Schnecke',
        cablebiter: 'Kabelbeißer',
        blueshimmer: 'Blauschimmer',
        introvero: 'Introvero',
        zapling: 'Schockling',
        starcone: 'Sternenmuschel',
        phelaria: 'Phelaria',
        coldgil: 'Kaltkiem',
        silverbrass: 'Silberbarsch',
        circlejelly: 'Kreisqualle',
        woodcrawler: 'Holzkriecher',
        longdano: 'Langdano',
        legabara: 'Legabara',
        biggiesnail: 'Großschneck',
        sunshine: 'Sonnenschein',
        platiglob: 'Platiglob',
        stormdazer: 'Sturmwinder',
        riverTurtle: 'Flussschildkröte',
        streamsnail: 'Stromschnecke',
        ralmon: 'Rachs',
        wonelle: 'Wonelle',
        grillgil: 'Grillkiem',
        sleepysoo: 'Schlafasoo',
        oozior: 'Oozior',
        paleblob: 'Kahloblob',
        crystakin: 'Kristakin',
        shadowbiter: 'Schattenbeißer',
      },
      fishingRod: {
        name: 'Angel',
        basic: 'Anfänger',
        fast: 'Schnell',
        leafy: 'Blatt',
        heavy: 'Schwer',
        hardwood: 'Hartholz',
        master: 'Meister',
        smelly: 'Stinkend',
        turbo: 'Turbo',
        golden: 'Gold',
        dull: 'Stumpf',
        mystical: 'Mystisch',
        twins: 'Zwillinge',
      },
      bait: {
        juicyBait: 'Saftiger Köder',
        rainbowBait: 'Regenbogenköder',
        trashNet: 'Abfallnetz',
        magnet: 'Magnet',
      }
    },
    summerFestival: {
      name: 'Sommerfestival',
      produces: 'Produziert',
      producesNothing: 'Produziert nichts',
      empty: 'Leer',
      constructing: 'Bauen',
      upgrading: 'Verbessern',
      deleting: 'Abreißen',
      emptyQueue: 'Keine Gebäude in Warteschlange',
      inQueue: 'In Warteschlange',
      inDeletionQueue: 'Wartet auf Abriss',
      placeOn: 'Muss platziert werden auf',
      rotateDescription: 'Gebäude drehen',
      deleteDescription: 'Reiße dieses Gebäude ab. Rohstoffe werden nicht erstattet und der Abriss braucht Zeit in der Warteschlange.',
      complete: 'Abschließen',
      build: 'Bauen',
      freeExpansion: {
        s: '{0} kostenlose Expansion',
        p: '{0} kostenlose Expansionen'
      },
      quest: {
        name: 'Aufgabe',
        currency: 'Sammle {0} ',
        building: 'Baue {0}x Stufe {1} {2}'
      },
      tile: {
        beach: 'Strand',
        water: 'Wasser',
        palm: 'Palme',
        forest: 'Wald',
        mountain: 'Berg',
        plain: 'Ebene',
        land: 'Land'
      },
      tilePos: {
        0: 'mittig',
        1: 'rechts',
        2: 'unten rechts',
        3: 'unten links',
        4: 'links',
        5: 'oben links',
        6: 'oben rechts'
      },
      building: {
        collector: {
          name: 'Sammler',
          description: 'Sammelt automatisch Rohstoffe von angrenzenden Feldern'
        },
        mainStage: {
          name: 'Hauptbühne',
          description: 'Erzeugt Musik und schaltet neue Gebäude frei'
        },
        speaker: {
          name: 'Lautsprecher',
          description: ''
        },
        vegetablePatch: {
          name: 'Gemüsefeld',
          description: ''
        },
        kitchen: {
          name: 'Küche',
          description: 'Verarbeitet Zutaten zu Gerichten',
          action: {
            coconutSalad: 'Kokossalat',
            saltyShell: 'Salzige Muscheln',
            lemonCandy: 'Zitronenbonbon',
            steak: 'Steak',
            fishSticks: 'Fischstäbchen',
          }
        },
        sawmill: {
          name: 'Sägewerk',
          description: 'Schneide Baumaterialien in Komponenten zurecht',
          action: {
            cutPlates: 'Platten schneiden',
            cutSandstone: 'Sandstein schneiden',
            smeltSteel: 'Stahl schmelzen',
            combineMaterial: 'Material verbinden'
          }
        },
        huntingArea: {
          name: 'Jagdgebiet',
          description: ''
        },
        excavator: {
          name: 'Bagger',
          description: ''
        },
        lighthouse: {
          name: 'Leuchtturm',
          description: ''
        },
        grill: {
          name: 'Grill',
          description: 'Grillt Nahrungsmittel mit Kohle durch',
          action: {
            cookMeat: 'Fleisch grillen',
            cookFish: 'Fisch grillen'
          }
        },
        mine: {
          name: 'Bergwerk',
          description: 'Extrahiert Rohstoffe aus dem Berg'
        },
        hugeSpade: {
          name: 'Riesenspaten',
          description: 'Gräbt Sand vom Strand weg'
        },
        shellOpener: {
          name: 'Muschelöffner',
          description: 'Öffnet Muscheln für Metallteile und seltene Gegenstände',
          action: {
            openShell: 'Muschel öffnen'
          }
        },
        waterPurifier: {
          name: 'Wasserfilter',
          description: 'Reinigt das Salzwasser aus dem Ozean und gewinnt dabei Salz'
        },
        fishingNet: {
          name: 'Fischernetz',
          description: 'Fängt Fische aus dem Ozean'
        },
        pepperField: {
          name: 'Pfefferfeld',
          description: 'Züchtet und erntet Pfefferpflanzen'
        },
        beehive: {
          name: 'Bienenstock',
          description: 'Stehle den Honig von hart arbeitenden Bienen'
        },
        citrusPlantation: {
          name: 'Zitrusplantage',
          description: 'Züchtet Zitrusfrüchte und erntet sie'
        }
      },
      buildingEffect: {
        autocollectMult: 'Menge durch automatisches Sammeln',
        pearlChance: 'Perlenchance',
      }
    },
    nightHunt: {
      name: 'Nachtjagd',
      potions: 'Tränke',
      performRitual: 'Ritual durchführen',
      performRitualDescription: 'Verbrauche alle ausgewählten Zutaten, um das Ritual durchzuführen. Solltest du die richtige Zutatenkombination finden, schaltest du einen neuen Trank frei. Die Position der Zutaten ist wichtig!',
      asBonusIngredient: 'Als Bonuszutat',
      findablePotions: 'Mögliche Tränke auf dieser Ebene',
      ritualStabilityDescription: 'Stabilität beeinflusst mehrere Chancen abhängig vom Prozentwert:',
      ritualStabilityDescription1: '100% - 200%: Chance, Grundzutaten zu behalten (aktuell {0}%)',
      ritualStabilityDescription2: '0% - 100%: Chance, Bonuszutaten zu behalten (aktuell {0}%)',
      ritualStabilityDescription3: '-100% - 0%: Chance, dass das Ritual ohne Belohnung fehlschlägt (aktuell {0}%)',
      ritualSuccessDescription: 'Ein erfolgreiches neues Ritual bringt Nachtjagd-Chips, und kann eventuell einen neuen Trank freischalten. Erfolgreiche Rituale auf bekannten Tränken erhöhen deren Stufe, bringen Nachtjagd-Chips und erschweren die nächste Stufe für diesen Trank.',
      ritualFamiliarityDescription: 'Erhöht die Stabilität und Erfolgschance für dieses Ritual, wenn es fehlschlägt. Dieser Effekt kann mehrfach wirken und wird beim erfolgreichen Ritual zurückgesetzt.',
      ritualHintDescription: 'Chance, einen Hinweis auf eine Position oder Zutat zu erhalten. Hinweise werden nur bei erfolgreichen neuen Ritualen gegeben. Für jeden gefundenen Hinweis sinkt die Chance um {0}%. Hinweise und die reduzierte Chance werden zurückgesetzt, wenn das Ritual aus dem Hinweis gefunden wird.',
      clickToAdd: 'Klicke auf Zutaten, um sie dem Ritual hinzuzufügen',
      ingredientSizeDescription: 'Zutatengröße erlaubt es dir, mehrere Zutaten pro magischer Währung zu finden',
      newDescription: {
        empty: 'Hier kannst du sehen, ob das aktuelle Rezept neu ist (noch nie erfolgreich) oder nicht',
        isNew: 'Das ist ein neues Rezept und du erhältst beim Erfolg einen Nachtjagd-Chip',
        isNewPotion: 'Du könntest auch einen neuen Trank entdecken',
        discoveredPotion: 'Dies ist ein bekanntes Trankrezept. Beim Erfolg steigt die Trankstufe und du erhältst Nachtjagd-Chips',
        pointless: 'Dies ist ein bekanntes Rezept, weitere Rituale wären hier sinnlos'
      },
      potion: {
        power: 'Trank der Kraft',
        insight: 'Trank der Einsicht',
        rage: 'Trank des Zorns',
        calming: 'Trank der Beruhigung',
        sorrow: 'Trank der Trauer',
        energy: 'Trank der Energie',
        nature: 'Trank der Natur',
        intensity: 'Trank der Intensität',
        hysteria: 'Trank der Hysterie',
        insanity: 'Trank des Wahnsinns',
        patience: 'Trank der Geduld',
        transformation: 'Trank der Umwandlung',
        silence: 'Trank der Stille',
        photosynthesis: 'Trank der Photosynthese',
        sun: 'Trank der Sonne',
        growth: 'Trank des Wachstums',
        solidification: 'Trank der Festigung',
        liquification: 'Trank der Verflüssigung',
        glowing: 'Trank des Leuchtens',
        stasis: 'Trank des Stillstands',
        creativity: 'Trank der Kreativität',
        poison: 'Trank des Gifts',
        warmth: 'Trank der Wärme',
      }
    },
    snowdown: {
      name: 'Schneefall',
      fightCount: 'Kampf',
      fight: 'Kämpfen',
      fightDescription: 'Bekämpfe den gezeigten Gegner für ein paar Schneebälle. Beim Sieg erhältst du Schneebälle, Schneefall-Chips, einen Produzenten und eventuell einen Gegenstand. Den Gegenstand erhältst du garantiert für die ersten 5 Kämpfe. Deine Beutewertung erhöht die Chance auf einen Gegenstand und die Menge erhaltener Schneebälle und Schneefall-Chips.',
      pickProducer: 'Wähle einen Produzenten',
      pickItem: 'Wähle einen Gegenstand',
      reroll: 'Neu würfeln',
      rerollDescription: 'Würfle einen Gegenstand im Besitz neu, dabei erhältst du einen neuen Gegenstand der selben Kategorie (Produzent oder Nicht-Produzent).',
      buyItem: 'Gegenstand kaufen',
      buyItemDescription: 'Erhalte einen von drei zufälligen Nicht-Produzenten-Gegenständen',
      attackDescription: 'Menge an Schaden, den deine Angriffe anrichten. Der endgültige Schadenswert liegt zwischen 80% und 120% deines Angriffs.',
      healthDescription: 'Menge an Schaden, die einstecken kannst, bevor du einfrierst und kampfunfähig wirst.',
      defenseDescription: 'Reduziert eingehenden Schaden um einen flachen Wert.',
      critDescription: 'Erhöht die Chance auf einen kritischen Treffer um 1% pro Kritisch-Wertung. Kritische Treffer verursachen +10 Schaden. Über 25% erhältst du weniger kritische Chance pro Kritisch-Wertung, während die Chance sich 75% annähert. Für jedes 1% so verlorene kritische Chance erhältst du +0.2 kritischen Schaden.',
      blockDescription: 'Erhöht die Chance, eingehende Angriffe zu blockieren und keinen Schaden zu erleiden.',
      boost: 'Erhalte sofort 1 Tag Fortschritt',
      fighter: {
        player: 'Spieler',
        snowOwl: 'Schneeeule',
        dog: 'Hund',
        cat: 'Katze',
        penguin: 'Pinguin',
        rabbit: 'Hase',
        turtle: 'Schildkröte',
        toddler: 'Kleinkind',
        babysitter: 'Babysitter',
        kid: 'Kind',
        fatKid: 'Fettes Kind',
        teenager: 'Teenager',
        bully: 'Rowdy',
        youngAdult: 'Jugendlicher',
        hooligan: 'Hooligan',
        adult: 'Erwachsener',
        snowBot: 'Schnee-BOT'
      },
      item: {
        rollingPin: {
          name: 'Nudelholz',
          description: 'Produziert Teig, der zu Keksen gebacken werden kann und deine Kritisch-Wertung erhöht'
        },
        forest: {
          name: 'Wald',
          description: 'Produziert Setzlinge, welche zu Tannen wachsen können und so deinen Angriff steigern'
        },
        spiceJar: {
          name: 'Gewürzglas',
          description: 'Produziert Zimt, der für Glühwein gebraucht wird. Dadurch steigt deine Blockwertung'
        },
        tap: {
          name: 'Wasserhahn',
          description: 'Produziert Wasser, woraus Eisskulpturen entstehen, was deine Beutewertung aufbessert'
        },
        snowCannon: {
          name: 'Schneekanone',
          description: 'Produziert Schnee, womit Schneemänner gebaut werden, was dir zusätzliche Gegenstände gibt'
        },
        shepherd: {
          name: 'Schafhirte',
          description: 'Produziert Garn, woraus Wollmützen gemacht werden, was dein Leben erhöht'
        },
        animalTooth: {
          name: 'Tierzahn',
          description: ''
        },
        collar: {
          name: 'Halsband',
          description: ''
        },
        chili: {
          name: 'Chilli',
          description: ''
        },
        drumstick: {
          name: 'Hähnchenkeule',
          description: ''
        },
        mouse: {
          name: 'Maus',
          description: 'Deine Haustiere heilen den Spieler beim Angriff um 1'
        },
        bone: {
          name: 'Knochen',
          description: 'Deine Haustiere heilen sich beim Angriff um 1'
        },
        gravestone: {
          name: 'Grabstein',
          description: 'Haustier-Einfrieren heilt den Spieler und andere Haustiere um 15'
        },
        spikedCollar: {
          name: 'Stachelhalsband',
          description: '30 Kritisch-Wertung und Blockwertung auf einem zufälligen Haustier, dieser Bonus wird beim Einfrieren auf ein anderes zufälliges Haustier übertragen'
        },
        heartCollar: {
          name: 'Herz-Halsband',
          description: 'Ein zufälliges Haustier wird einmal wiederbelebt'
        },
        treatBag: {
          name: 'Leckerli-Beutel',
          description: 'Haustiere können sich für 50% maximale Leben heilen, anstatt anzugreifen. 3 Leckerlis pro Beutel'
        },
        tennisBall: {
          name: 'Tennisball',
          description: 'Alle Haustiere werden wiederbelebt wenn der Spieler einfriert'
        },
        appleJuice: {
          name: 'Apfelsaft',
          description: 'Der Spieler kann sich für 50% maximale Leben heilen, anstatt anzugreifen. Nur eine Benutzung pro Kampf'
        },
        hotWater: {
          name: 'Heißes Wasser',
          description: 'Der Spieler wird einmal mit 25% Leben wiederbelebt'
        },
        dumbbell: {
          name: 'Hantel',
          description: 'Der Spieler erhält 0.5 Angriff pro Angriff'
        },
        target: {
          name: 'Zielscheibe',
          description: 'Der Spieler erhält 4 Kritisch-Wertung pro Angriff'
        },
        gloves: {
          name: 'Handschuhe',
          description: 'Der Spieler erhält 0.2 Angriff und 1 Kritisch-Wertung, wenn er angegriffen wird'
        },
        snowboard: {
          name: 'Snowboard',
          description: 'Die ersten 5 Angriffe vom Spieler sind garantiert kritisch'
        },
        tea: {
          name: 'Tee',
          description: 'Der Spieler heilt sich um 25 und trifft beim nächsten Angriff kritisch, wenn ein Gegner einfriert'
        },
        starShield: {
          name: 'Sternenschild',
          description: 'Der Spieler erhält 5 Abwehr in den ersten 3 Runden'
        },
        coffee: {
          name: 'Kaffee',
          description: 'Der Spieler heilt sich bei kritischen Treffern um 8'
        },
        pebbles: {
          name: 'Kieselsteine',
          description: 'Der Spieler betäubt kritisch getroffene Ziele für 1 Runde'
        },
        sunShield: {
          name: 'Sonnenschild',
          description: ''
        },
        moonShield: {
          name: 'Mondschild',
          description: ''
        },
        fireplace: {
          name: 'Kamin',
          description: ''
        },
        specialSnowflake: {
          name: 'Besondere Schneeflocke',
          description: ''
        },
        candyCane: {
          name: 'Zuckerstange',
          description: ''
        },
        shovel: {
          name: 'Schaufel',
          description: ''
        },
        turkey: {
          name: 'Truthahn',
          description: ''
        }
      }
    },
    merchant: {
      name: 'Händler'
    },
    casino: {
      name: 'Casino',
      prize: 'Preis',
      bingo: {
        1: '1x Bingo',
        2: '2x Bingo',
        3: '3x Bingo'
      }
    },
    bank: {
      name: 'Bank',
      description: 'Verwalte deinen Topaz mit 1 von 3 Optionen. Das Verwenden einer Option sperrt die anderen. Das Zurückzahlen von Krediten benötigt und verbraucht keine Aktion.',
      project: {
        name: 'Projekt',
        expandVault: 'Tresor vergrößern',
        persuadeInvestors: 'Investoren überzeugen',
        improveCreditScore: 'Kreditwürdigkeit aufbessern',
        businessMarketing: 'Business-Marketing',
        cardTournament: 'Kartenturnier sponsern',
        fund: 'Finanzieren'
      },
      investment: {
        name: 'Investition',
        description: 'Investiere Topas und erhalte ihn beim nächsten Bank-Event mit Zinsen zurück. Bekomme {0}% Zinsen für die ersten {1} Topas und {2}% für alles darüber',
        invest: 'Investieren'
      },
      loan: {
        name: 'Kredit',
        description: 'Leihe Topas mit {0}% Zinsen und zahle es später zurück. Topas-Schulden werden automatisch zurückgezahlt, wenn du Topas durch volle Kapazität verlieren würdest.',
        repay: 'Zurückzahlen',
        borrow: 'Leihen'
      }
    },
    calendar: 'Kalender',
    rewards: 'Belohnungen'
  },
  globalLevel: {
    name: 'Globale Stufe',
    description: 'Hängt von der Summe verschiedener Faktoren ab. Schaltet neue Funktionen frei',
    mining_0: 'Tiefster zerbrochener Erzminen-Stein',
    mining_1: 'Tiefster zerbrochener Gasriesen-Stein',
    village_0: 'Maximaler Wohnraum',
    horde_0: 'Höchster Zonenboss besiegt',
    farm_0: 'Summe aller Pflanzenstufen',
    gallery_0: 'Log5 der gesamten Schönheit',
    debug: 'Debug'
  },
  theme: {
    name: 'Farbschema',
    icon: {
      hasCustomNavbar: 'Eigene Navigationsleiste',
      hasCustomBackground: 'Eigener Hintergrund',
      hasCustomColors: 'Eigene Farbpalette',
      hasCustomUI: 'Eigene Steuerelemente',
      hasAnimations: 'Enthält Animationen',
      hasParticles: 'Enthält Partikel',
    },
    default: 'Blau',
    cyan: 'Zyan',
    green: 'Grün',
    yellow: 'Gelb',
    orange: 'Orange',
    brown: 'Braun',
    red: 'Rot',
    pink: 'Pink',
    purple: 'Lila',
    grey: 'Grau',
    sepia: 'Sepia',
    factory: 'Fabrik',
    forest: 'Wald',
    cherry: 'Kirschblüte',
    sky: 'Himmel',
    polar: 'Polar',
    prismatic: 'Prismatisch',
    candlelight: 'Kerzenlicht',
    colorful: 'Farbenfroh',
    rain: 'Regen',
    waves: 'Wellen',
    autumnForest: 'Herbstwald',
    frozen: 'Gefroren',
  },
  settings: {
    keybinds: {
      name: 'Tastenbelegung',
      prevMainFeature: {
        name: 'Vorherige Hauptfunktion'
      },
      nextMainFeature: {
        name: 'Nächste Hauptfunktion'
      },
      debugSkip1m: {
        name: 'Überspringe 1 Minute'
      },
      debugSkip10m: {
        name: 'Überspringe 10 Minuten'
      },
      debugSkip1h: {
        name: 'Überspringe 1 Stunde'
      },
      debugSkip1d: {
        name: 'Überspringe 1 Tag'
      }
    },
    theme: {
      name: 'Farbschema'
    },
    general: {
      name: 'Allgemein',
      pause: {
        name: 'Pause'
      },
      dark: {
        name: 'Dunkler Modus'
      },
      autosaveTimer: {
        name: 'Automatisch speichern'
      },
      lang: {
        name: 'Sprache',
        zh: '简体中文',
        en: 'English',
        de: 'Deutsch'
      },
      tabDisplayDesktop: {
        name: 'Tab-Anzeige',
        icon: 'Nur Symbol',
        text: 'Nur Text',
        both: 'Symbol und Text'
      },
      tabDisplayMobile: {
        name: 'Tab-Anzeige',
        icon: 'Nur Symbol',
        text: 'Nur Text',
        both: 'Symbol und Text'
      },
      relativeUpgradeStats: {
        name: 'Relative Verbesserungswerte',
        description: 'Zeigt den Unterschied anstatt vorher / nacher Werte'
      }
    },
    automation: {
      name: 'Automatisierung',
      progressMining: {
        name: 'Bergbau: Autofortschritt-Limit',
        description: 'Wenn ein Stein das erste Mal zerbrochen wird, gehst du automatisch zur nächsten Tiefe, wenn der Stein in X Sekunden oder weniger zerbrochen wird'
      },
      fightHordeBoss: {
        name: 'Horde: Boss automatisch bekämpfen'
      }
    },
    performance: {
      name: 'Performance',
      upgradeListItems: {
        name: 'Verbesserungen pro Seite'
      },
      cssShadows: {
        name: 'Text-Schatten',
        0: 'Keine',
        1: 'Einfach',
        2: 'Weich'
      },
      particleAmount: {
        name: 'Partikelmenge',
        0: 'Keine',
        1: 'Reduziert',
        2: 'Durchschnittlich',
        3: 'Erhöht'
      },
      recordAutoplay: {
        name: 'Autospiel-Daten aufzeichnen'
      }
    },
    notification: {
      name: 'Benachrichtigungen',
      position: {
        name: 'Position',
        0: 'Oben links',
        1: 'Oben',
        2: 'Oben rechts',
        3: 'Unten rechts',
        4: 'Unten',
        5: 'Unten links'
      },
      autosave: {
        name: 'Auto-Speichern-Hinweis'
      },
      backupHint: {
        name: 'Datensicherungs-Hinweis',
        0: 'Aus',
        1: 'Selten',
        2: 'Gelegentlich',
        3: 'Häufig'
      },
      updateCheck: {
        name: 'Nach Updates prüfen'
      },
      note: {
        name: 'Notiz-Hinweis'
      },
      achievement: {
        name: 'Erfolg-Hinweis'
      },
      heirloom: {
        name: 'Erbstück-Hinweis'
      },
      cardPackContent: {
        name: 'Kartenpaket-Inhalt'
      },
      cropReady: {
        name: 'Pflanze reif'
      }
    },
    confirm: {
      name: 'Bestätigungen',
      prestige: {
        name: 'Prestige'
      },
      gem: {
        name: 'Edelstein-Käufe'
      },
      eventToken: {
        name: 'Event-Chip-Käufe'
      },
      farmRareResources: {
        name: 'Käufe mit seltenen Bauernhof-Rohstoffen'
      },
      treasureDelete: {
        name: 'Schätze löschen'
      }
    },
    experiment: {
      name: 'Experimentell',
      warning: 'Diese Einstellungen sind noch experimentell und können fehlerhaft, unfertig, langsam oder verwirrend sein. Aktiviere sie auf eigene Gefahr, und bitte gebe Feedback, falls du sie benutzen solltest! Wenn diese Sektion leer ist, sind gerade keine experimentellen Einstellungen vorhanden oder dein Fortschritt reicht nicht aus, um sie zu sehen',
      currencyLabel: {
        name: 'Zeige Währungsschilder',
        description: 'Währungseinkommen und Zeit bis zur Kapazität werden ohne Herüberfahren mit der Maus angezeigt'
      }
    }
  },
  statBreakdown: {
    base: 'Grundwert',
    min: 'Mindestwert',
    max: 'Höchstwert',
    globalLevel: 'Globale Stufe',
    prestige: 'Prestige',
    graniteBreaksMult: 'Log10 Zerbrechungen',
    miningTemperature: 'Temperatur',
    villageOffering: 'Opfergaben',
    zoneCleared: 'Zone abgeschlossen',
    zoneClearedTotal: 'Höchste Zone abgeschlossen',
    zone: 'Zone',
    hordeBasicLoot: 'Einfache Beute',
    hordeItemPermanent: 'Ausrüstungs-Effekt',
    hordeNostalgia: 'Nostalgie',
    hordeNostalgiaLost: 'Erbstücke gefunden',
    farmEarlyGame: 'Erste Pflanzen',
    cards: 'Karten',
    treasure: 'Schätze',
    debug: 'Debug',
    bankInvestment: 'Investition',
    alloying: 'Legierung',
    miningResin: 'Harz',
    cryolab: 'Kryolabor',
    ritualTier: 'Ritual-Ebene',
    ritualPotionLevel: 'Trank-Stufe',
    ritualHint: 'Gefundene Hinweise',
    ritualIngredient: 'Bonuszutat',
  },

  // Feature specific translations
  mining: {
    mine: 'Bergbau',
    gainSummary: 'Erhalte {0} pro Treffer, {1} (x{2}) pro Zerbrechen, {3} pro Sekunde',
    gainSummaryHit: 'Erhalte {0} pro Treffer',
    gainSummaryBreak: 'Erhalte {0} pro Zerbrechen',
    depthDweller: 'Tiefengräber',
    dweller: {
      title: 'Aktuelle / höchstmögliche Gräbertiefe',
      description1: 'Der Gräber startet schnell und wird langsamer, je näher er an sein Limit kommt.',
      description2: 'Für jeden abgeschlossenen halben Meter aktueller Gräbertiefe erhöht sich die Prestigebelohnung.',
      description3: 'Die höchstmögliche Gräbertiefe beträgt {0}% der maximalen Tiefe im Bergwerk.',
      description4: 'Maximale Gräbertiefe',
      descriptionOvercap: 'Der Gräber kann nach der höchstmöglichen Gräbertiefe für Bonustiefe weiter graben, was die Prestigebelohnung linear erhöht. Das Gräbertempo wird auf {0}% reduziert, und für jede 10% nach der höchstmöglichen Gräbertiefe wird das Tempo erneut auf {0}% gesenkt',
      nextTime: 'Du erreichst {0}m in {1}'
    },
    pickaxePower: 'Dies ist die Kraft deiner Spitzhacke und dein Grundschaden. Erhöhe es, indem du eine bessere Spitzhacke herstellst.',
    damage: 'Schaden',
    timeToBreak: 'Zeit benötigt, um den aktuellen Stein zu zerbrechen',
    durability: 'Haltbarkeit',
    durabilityDescription: 'Die benötigte Schadensmenge, um diesen Stein zu zerbrechen',
    durabilityBreaks: {
      s: 'Dieser Stein wurde {0} Mal zerbrochen',
      p: 'Dieser Stein wurde {0} Mal zerbrochen'
    },
    toughness: 'Zähigkeit',
    toughnessDescription: 'Reduziert eingehenden Schaden um einen flachen Wert',
    toughnessHigh: 'Zähigkeit reduziert deinen Schaden deutlich',
    toughnessTooHigh: 'Zähigkeit zu hoch, um Schaden anzurichten',
    scrapDescription: 'Erhalte Schrott bei jedem Treffer, wenn der Stein bereits einmal zerbrochen wurde. Beim Zerbrechen erhältst du {0}x Schrottmenge',
    scrapNotBroken: 'Du erhältst noch keinen Schrott, weil dieser Stein noch nie zerbrochen wurde',
    oreNotBroken: 'Du erhältst noch kein Erz, weil dieser Stein noch nie zerbrochen wurde',
    oreDescription: {
      short: 'Kann ab {0}m oder tiefer gefunden werden',
      long: 'Kann zwischen {0}m und {1}m gefunden werden, oder darunter, wenn die Tiefe durch {2} teilbar ist'
    },
    rareEarthNotBroken: 'Du erhältst noch keinen Bodenschatz, weil dieser Stein noch nie zerbrochen wurde',
    rareEarthDescription: {
      granite: 'Kann ab {0}m oder tiefer gefunden werden, wenn der Stein 1000 Mal oder öfter zerbrochen wurde. Für jede Zehnerpotenz darüber verdoppelt sich das Einkommen',
      salt: 'Kann ab {0}m oder tiefer gefunden werden, wenn der Stein genau 1 Erz hat',
      coal: 'Kann ab {0}m oder tiefer gefunden werden, wenn der Stein das erste Mal zerborchen wird',
      sulfur: 'Kann ab {0}m oder tiefer gefunden werden, wenn der tiefste Stein getroffen wird',
      niter: 'Kann ab {0}m oder tiefer gefunden werden, wenn der Stein zerbrochen wird und die Anzahl der Zerbrechungen einer Zehnerpotenz entspricht',
      obsidian: 'Kann ab {0}m oder tiefer gefunden werden, wenn die Spitzhacke nicht aufgewertet ist'
    },
    rareEarthNotAffected: 'Dieser Rohstoff wird nicht durch Bodenschatz-Einkommen beeinflusst',
    scrapGainHint: 'Du erhältst keinen Schrott für Steine, die du noch nie zerbrochen hast. Manchmal ist es klüger auf der aktuellen Tiefe zu bleiben, um mehr Schrott zu sammeln, anstatt direkt tiefer zu graben.',
    oreCrafting: 'Klicke auf Erze, um sie in Herstellplätze zu setzen',
    crafting: {
      power: 'Stärke',
      purity: 'Reinheit',
      impurity: 'Unreinheit',
      oreQuality: 'Die Menge an benötigten Erzen zum Herstellen einer Spitzhacke wird durch deine Erz-Qualität geteilt',
      craftPickaxe: 'Spitzhacke herstellen',
      purityDescription: 'Um 50% minimale Qualität zu erreichen, muss die Reinheit so hoch wie die Unreinheit sein.',
      premiumSlot: 'Dies ist ein Premium-Herstellplatz. Unreinheit über x1 ist halbiert und Reinheit verdoppelt.',
      minPurity: 'Du benötigst mindestens 0.1% Qualität, um Spitzhacken herzustellen'
    },
    craftingDescription: 'Verbrauche die ausgewählten Erze und stelle eine neue Spitzhacke mit einem zufälligen Kraftwert her. Wenn dieser Wert die bisherige Spitzhacke ({0} Kraft) übertrifft, tausche sie durch die neue aus.',
    resinDescription: 'Jedes Stück Harz fügt 30% Stärke und 25% Reinheit hinzu. Bis zu {0} Harz kann pro Spitzhacke verwendet werden.',
    smokeDescription: 'Verbrauche sämtlichen Rauch, um eine Spitzhacke mit einem festgelegten Kraftwert herzustellen',
    smeltery: 'Hochofen',
    smelteryTemperatureDescription: 'Erreiche gewisse Temperaturwerte, um neue Hochöfen freizuschalten. Hochöfen erhalten +{0}% Tempo pro Grad über der Anforderung',
    smelteryTemperatureDescription2: 'Dieser Hochofen hat +{0}% Tempo durch die Temperatur',
    smelterySpeedDescription: 'Dieser Hochofen hat eine Grundzeit von {0}',
    smelt: 'Schmelzen',
    enhance: 'Aufwerten',
    enhancement: {
      title: 'Aufwertungen',
      description: 'Benutze Barren, um deine Spitzhacke aufzuwerten. Jeder Barren hat eine einzigartige Aufwertung, die mehrfach angewendet werden kann. Aber sei vorsichtig, jede erfolgreiche Aufwertung erschwert die Nächste, also überlege dir gut, wie du deine Spitzhacke aufwertest',
      barsDescription: 'Aufwertungen benötigen zuerst irgendeine Art von Barren. Die Menge steigt mit jeder Aufwertung',
      enhancementDescription: 'Dann benötigst du Barren, welche die Art der Aufwertung bestimmen. Die Menge steigt mit jeder Aufwertung der selben Barrenart',
      barAluminium: 'Leichtgewicht',
      barBronze: 'Robust',
      barSteel: 'Spitz',
      barTitanium: 'Ausgräber',
      barShiny: 'Reich',
      barIridium: 'Geschmolzen'
    },
    gasGain: {
      0: 'Erhalte ',
      1: '% vom möglichen ',
      2: ' wenn dieser Stein zerbrochen wird. Du kannst in dieser Tiefe bis zu ',
      3: ' sammeln'
    }
  },
  village: {
    job: {
      name: 'Berufe',
      collector: 'Sammler',
      farmer: 'Bauer',
      harvester: 'Erntehelfer',
      miner: 'Minenarbeiter',
      wellWorker: 'Brunnenhelfer',
      librarian: 'Bibliothekar',
      glassblower: 'Glasbläser',
      entertainer: 'Unterhalter',
      lumberjack: 'Holzfäller',
      blastMiner: 'Sprengmeister',
      fisherman: 'Angler',
      scientist: 'Wissenschaftler',
      gardener: 'Gärtner',
      oilWorker: 'Ölarbeiter',
      sculptor: 'Bildhauer',
      explorer: 'Entdecker',
    },
    policy: {
      name: 'Verordnungen',
      taxes: 'Steuern',
      immigration: 'Einwanderung',
      religion: 'Religion',
      scanning: 'Scannen',
    },
    buildings: 'Gebäude',
    village: 'Dorf',
    pray: 'Beten',
    unemployed: 'Arbeitslos',
    unemployedDescription: 'Arbeitslose produzieren keine Rohstoffe. Weise ihnen unten einen Beruf zu',
    taxpayers: 'Steuerzahler',
    taxpayersDescription1: 'Die arbeitende Bevölkerung konsumiert bis zu {0} von jedem Nahrungsmittel pro Sekunde und zahlt {1} ',
    taxpayersDescription2: ' Steuern pro verbrauchtem Lebensmittel.',
    happinessDescription: 'Zufriedenheit beeinflusst das Einkommen aller Rohstoffe (außer Goldmünzen und Glaube)',
    powerDescription: 'Pro Energie steigt das Einkommen von Material und Nahrung um +20%. Deine aktuelle Energie multipliziert das Material- und Nahrungseinkommen mit x{0}',
    pollutionDescription: 'Für jeden Punkt Verschmutzung sinkt die Zufriedenheit um 1%. Sollte die Verschmutzung die Toleranz überschreiten, steigt die Zufriedenheitsstrafe um 1% pro überschrittener Toleranz. Der nächste Punkt Verschmutzung würde die Zufriedenheit um {0}% senken',
    lootDescription: 'Finde jedes Mal neue Beute, wenn die Leiste gefüllt wird',
    lootRarity: 'Beutequalität beeinflusst die Verteilung der Beuteseltenheit:',
    lootNeedQuality: 'Benötigt über {0} Qualität',
    buildingStat: 'Gesamte Gebäudezahl',
    housingStat: 'Gesamte Wohnungszahl (erste 25 pro Gebäude)',
    coinNotAffected: 'Münzen werden nicht durch gesamtes Rohstoffeinkommen beeinflusst',
    faithNotAffected: 'Glaube wird nicht durch gesamtes Rohstoffeinkommen und Mentale-Ressourcen-Einkommen beeinflusst',
    offering: {
      name: 'Opfergaben',
      description: {
        0: 'Opfere ',
        1: ' für ',
        2: ' und erhöhe die Kosten der nächsten Opfergabe. Opferkosten werden beim Prestige mit zurückgesetzt.'
      },
      sacrifice: 'Opfern',
      notUnlocked: 'Diese Opfergabe ist noch nicht freigeschaltet. Du kannst trotzdem Opfergaben einsetzen, aber nicht opfern und die Rohstoffkapazität wird nicht erhöht, bis die Opfergabe freigeschaltet wurde',
      notUnlockedHint: 'Diese Opfergabe ist nicht freigeschaltet, also wird die Rohstoffkapazität noch nicht erhöht',
      autoGen: 'Generiere 1% deiner erhaltenen Opfergaben dieses Durchlaufs ({0}) pro Stunde'
    },
    material: 'Material',
    food: 'Nahrung',
    mental: 'Mentale Ressourcen',
    loot: 'Beute',
    foodConsume: 'Verbrauche bis zu {0} pro Sekunde'
  },
  horde: {
    horde: 'Horde',
    zone: 'Zone',
    player: 'Spieler',
    enemy: 'Gegner',
    loadoutName: 'Set-Name',
    newLoadout: 'Neues Set',
    noLoadouts: 'Keine Sets vorhanden',
    monsterPartHint: 'Gehe zu Zone 10+ und erreiche Gegner #101, um eine neue Währung zu entdecken! Diese Währung ist essentiell, um weiter fortzuschreiten, da sie beim Erhöhen der Knochen-Kapazität hilft.',
    enemyDescription: 'Jeder Gegner in der selben Zone hat x{0} Angriff, x{1} Leben und +{2}% Knochen im Vergleich zum vorherigen Gegner. Dies ist Gegner #{3} und dieser hat x{4} Angriff, x{5} Leben und +{6}% Knochen. All diese Effekte werden bei deinem Tod zurückgesetzt.',
    enemySigil1: {
      s: 'Gegner in dieser Zone haben {0} Zeichen',
      p: 'Gegner in dieser Zone haben {0} Zeichen',
    },
    enemySigil2: {
      s: '.',
      p: ', welche von {0} verschiedenen Arten ausgewählt werden.',
    },
    damageTypes: {
      title: 'Schadensarten',
      description: 'Jeder Angriff hat eine von drei Schadensarten. Verursachter und erlittener Schaden kann für jede Schadensart verändert werden.',
      dealt: 'Verursacht',
      taken: 'Erlitten',
      physic: 'Physisch',
      magic: 'Magisch',
      bio: 'Biologisch'
    },
    itemFindDescription: 'Nachdem du einen Gegner besiegst, hast du eine Chance, diese Ausrüstung zu finden',
    attackDescription: 'Die Menge an angerichtetem Schaden pro Angriff',
    attackConversion: {
      text: 'Normale Angriffe werden jede Sekunde ausgeführt und haben folgende Schadensverteilung: ',
      physic: '{0}% physisch',
      magic: '{0}% magisch',
      bio: '{0}% biologisch'
    },
    healthDescription: 'Die Menge an Schaden, die du erleiden kannst, ohne zu sterben',
    respawnDescription: 'Wie viel Zeit du benötigst, um dich vom Tod zu erholen',
    reviveDescription: 'Anstatt zu sterben, wird eine Wiederbelebung benutzt, um die Leben voll aufzufüllen',
    critDescription: 'Normale Angriffe haben eine Chance, zusätzlichen Schaden anzurichten. Die Kritische Chance kann über 100% hinausgehen, dann wird der Angriffswert mehrfach multipliziert',
    toxicDescription: 'Richtet Giftschaden (biologisch) abhängig vom verursachten Schaden pro Angriff an',
    divisionShieldDescription: 'Teile jeden erlittenen Schaden durch (Teilungsschild + 1) und verliere 1 Teilungsschild nach eingehenden Angriffen',
    firstStrikeDescription: 'Richte zusätzlichen magischen Schaden an, wenn das dein erster Angriff ist',
    spellbladeDescription: 'Richte zusätzlichen magischen Schaden an, nachdem du einen Ausrüstungseffekt benutzt hast. Das funktioniert bei Ausrüstungseffekten mit einer Abklingszeit von unter 10 Sekunden nicht immer',
    cuttingDescription: 'Richte einen Prozentwert des aktuellen Lebens deines Ziels als biologischen Schaden an, nachdem du angegriffen hast',
    recoveryDescription: 'Heile einen Prozentwert deines fehlenden Lebens, wenn du einen Gegner besiegst',
    boss: 'Boss',
    miniboss: 'Miniboss',
    minibossDescription: 'Minibosse nehmen den Platz regulärer Gegner ein und sind etwas stärker. Sie halten wertvolle Beute und bis zu 2 können auf einmal warten. Einen zu besiegen zählt als 4 besiegte normale Gegner',
    minibossSoul: 'Minibosse halten {0} Seelen',
    minibossHeirloom: 'Minibosse halten {0} Seelen und haben eine {1}% Erbstück-Chance ({2} Nostalgie)',
    poisonPlayer: 'Du bist vergiftet und erleidest {0} Schaden pro Sekunde',
    poisonEnemy: 'Dieser Gegner ist vergiftet und erleidet {0} Schaden pro Sekunde',
    silencePlayer: 'Du bist verstummt und kannst keine aktiven Angriffe nutzen',
    silenceEnemy: 'Dieser Gegner ist verstummt und kann keine aktiven Angriffe nutzen',
    stunPlayer: 'Du bist betäubt und kannst nicht angreifen',
    stunEnemy: 'Dieser Gegner ist betäubt und kann nicht angreifen',
    shieldbreak: 'Zerbreche Teilungsschilde schneller',
    stunResist: 'Schnellere Erholung von Betäubungen',
    stunBoss: 'Bosse erhalten +2 Betäubungsresistenz',
    stunMiniboss: 'Minibosse erhalten +1 Betäubungsresistenz',
    bossBioResist: 'Bosse erleiden nur 10% biologischen Schaden',
    minibossBioResist: 'Minibosse erleiden nur 50% biologischen Schaden',
    enemyRespawn: 'Gegner brauchen {0} zum Erscheinen und bis zu {1} Gegner können warten. Wird ein Boss besiegt, erscheinen sofort alle Gegner',
    taunt: {
      title: 'Spottmodus',
      description: 'Im Spottmodus erscheinen Gegner auch dann, wenn keine warten. Alle Gegner, die frühzeitig erscheinen, halten aber keine Beute. Verspotten funktioniert nur auf dem Weg zum Boss',
      on: 'Der Spottmodus ist an',
      off: 'Der Spottmodus ist aus',
      clickToToggle: 'klicke zum Umschalten'
    },
    reachBoss: {
      title: 'Erreiche den Boss',
      description: 'Um den Boss dieser Zone herauszufordern, musst du {0} Gegner in Folge besiegen, ohne zu sterben'
    },
    fightBoss: {
      title: 'Boss bekämpfen',
      description: 'Du hast genügend Gegner besiegt, um den Boss dieser Zone herauszufordern'
    },
    fleeBoss: {
      title: 'Vom Boss flüchten',
      description: 'Renne vor diesem Kampf weg und bekämpfe stattdessen normale Gegner'
    },
    defeatedBoss: {
      title: 'Boss besiegt',
      description: 'Du hast den Boss dieser Zone besiegt und kannst nun zur nächsten Zone aufbrechen'
    },
    souls: 'Seelen',
    stat: {
      crit: 'Kritische Treffer'
    },
    rampage: {
      name: 'Toben',
      description: 'Den selben Gegner zu lange zu bekämpfen macht ihn wütend! Du hast diesen Gegner für {0} bekämpft und er fängt alle {1} das Toben an.',
      effect: 'Jedes Mal wenn ein Gegner tobt, bekommt er x{0} Angriff, +{1}% kritische Chance, +{2}% kritischen Schaden, +{3} Betäubungsresistenz und wird immun gegen Effekte, die den Angriff senken.',
      effectCurrent: 'Dieser Gegner hat {0} Mal getobt. Er hat x{1} Angriff, +{2}% kritische Chance, +{3}% kritischen Schaden und +{4} Betäubungsresistenz.'
    },
    sigil: {
      name: 'Zeichen',
      hasActive: 'Hat einen aktiven Angriff',
      min: 'Kann ab Zone {0} auftreten',
      special: 'Taucht nur unter besonderen Bedingungen auf',
      inactive: 'inaktiv',
      power: 'Angriff',
      health: 'Leben',
      bashing: 'Prügel',
      recovery: 'Erholung',
      toughness: 'Härte',
      strength: 'Stärke',
      magic: 'Magie',
      magicBolt: 'Magiebolzen',
      fireball: 'Feuerball',
      incorporeal: 'Körperlos',
      focus: 'Fokus',
      wisdom: 'Weisheit',
      sparks: 'Funken',
      protection: 'Schutz',
      shielding: 'Schild',
      resistance: 'Resistenz',
      precision: 'Präzision',
      screaming: 'Schreien',
      cure: 'Genesen',
      sharp: 'Spitz',
      spitting: 'Spucken',
      burst: 'Platzen',
      resilience: 'Widerstand',
      growing: 'Wachsen',
      cold: 'Kälte',
      fury: 'Wut',
      angelic: 'Engelhaft',
      toxic: 'Toxisch',
      foulBreath: 'Fauler Atem',
      nuke: 'Vernichten',
      rainbow: 'Regenbogen',
      drain: 'Saugen',
      shocking: 'Schock',
      berserk: 'Berserker',
      iceGiant: 'Eisriese',
      generic: 'Gewöhnlich',
    },
    corruption: {
      name: 'Korruption',
      effects: 'Effekte',
      power: 'Angriff und Leben x',
      sigil: 'Zeichen +',
      revive: 'Wiederbelebung +'
    },
    activeCooldown: 'Effekt-Abklingzeit',
    itemsEquipped: 'Gegenstände ausgerüstet',
    cleared: 'Besiegt',
    fighting: 'Im Kampf',
    items: {
      name: 'Ausrüstung',
      usableInStun: 'Kann in Betäubung genutzt werden',
      utilityOvertime: 'Aktive Nützlichkeiten können mehrere Ladungen halten, welche halb so schnell wie die vorherige aufladen',
      inactive: 'Inaktive Gegenstandseffekte erholen sich von der Abklingzeit mit {0}% der normalen Geschwindigkeit',
      takeEquipped: 'Aktuelle nehmen',
      dagger: 'Dolch',
      shirt: 'Hemd',
      guardianAngel: 'Schutzengel',
      milkCup: 'Milchglas',
      starShield: 'Sternenschild',
      longsword: 'Langschwert',
      mace: 'Streitkolben',
      boots: 'Stiefel',
      liver: 'Leber',
      fireOrb: 'Feuerkugel',
      campfire: 'Lagerfeuer',
      clover: 'Kleeblatt',
      snowflake: 'Schneeflocke',
      oppressor: 'Unterdrücker',
      toxin: 'Gift',
      corruptEye: 'Korruptes Auge',
      meatShield: 'Fleischschild',
      wizardHat: 'Zauberhut',
      redStaff: 'Roter Stab',
      cleansingSpring: 'Reinigende Quelle',
      marblePillar: 'Marmorsäule',
      rainbowStaff: 'Regenbogenstab',
      antidote: 'Gegengift',
      brokenStopwatch: 'Kaputte Stoppuhr',
      luckyCharm: 'Glücksanhänger',
      mailbreaker: 'Rüstungsbrecher',
      club: 'Keule',
      goldenStaff: 'Goldener Stab',
      toxicSword: 'Giftiges Schwert',
      scissors: 'Schere',
      cat: 'Katze',
      healthyFruit: 'Gesundes Obst',
      glasses: 'Brille',
      deadBird: 'Toter Vogel',
      shieldDissolver: 'Schildauflöser',
      calmingPill: 'Beruhigungspille',
      cleansingFluid: 'Reiniger',
      forbiddenSword: 'Verbotenes Schwert',
      corruptedBone: 'Korrupter Knochen',
      plaguebringer: 'Plagenbringer',
      forbiddenShield: 'Verbotener Schild',
      dangerShield: 'Gefahrenschild',
      forbiddenToxin: 'Verbotenes Gift',
      glowingEye: 'Leuchtendes Auge',
      experimentalVaccine: 'Neuartiger Impfstoff',
      microscope: 'Mikroskop',
      moltenShield: 'Geschmolzener Schild',
      cutter: 'Pappschneider',
      book: 'Buch',
      chocolateMilk: 'Schokomilch',
      bigHammer: 'Großer Hammer',
      spookyPumpkin: 'Gruseliger Kürbis',
      strangeChemical: 'Seltsame Chemikalie',
      forbiddenHeartShield: 'Verbotener Herz-Schild',
      cloudStaff: 'Wolkenstab',
      secretWeapon: 'Geheimwaffe',
      bomb: 'Bombe',
      leechingStaff: 'Aussaugender Stab',
      shatteredGem: 'Zersprungener Edelstein',
      firework: 'Feuerwerk',
      bowTie: 'Fliege',
      mysticalAccelerator: 'Mystischer Beschleuniger',
      blazingStaff: 'Lodernder Stab',

      // Chess pieces
      pawn: 'Bauer',
      knight: 'Springer',
      bishop: 'Läufer',
      rook: 'Turm',
      queen: 'Dame',
      king: 'König'
    },
    active: {
      damagePhysic: {
        0: 'Verursache',
        1: 'physischen Schaden'
      },
      damageMagic: {
        0: 'Verursache',
        1: 'magischen Schaden'
      },
      damageBio: {
        0: 'Verursache',
        1: 'biologischen Schaden'
      },
      heal: {
        0: 'Heile',
        1: 'Leben'
      },
      bone: {
        0: 'Erhalte',
        1: 'Knochen der höchsten Zone'
      },
      monsterPart: {
        0: 'Erhalte',
        1: 'Monsterteile der höchsten Zone'
      },
      stun: {
        0: 'Betäube den Gegner für',
        1: ''
      },
      silence: {
        0: 'Verstumme den Gegner für',
        1: ''
      },
      revive: {
        0: 'Stelle',
        1: 'Wiederbelebung her'
      },
      removeAttack: {
        0: 'Entferne',
        1: 'Angriff vom Gegner'
      },
      raiseAttack: {
        0: 'Erhöhe den Angriff dauerhaft um',
        1: ''
      },
      poison: {
        0: 'Verursache',
        1: 'Giftschaden'
      },
      antidote: {
        0: 'Entferne',
        1: 'Gift'
      },
      permanentStat: {
        0: 'Erhöhe ',
        2: ' um',
        1: '(bis zum Prestige)'
      },
      divisionShield: {
        0: 'Erhalte',
        1: 'Teilungsschild'
      },
      removeDivisionShield: {
        0: 'Entferne',
        1: 'Teilungsschild vom Gegner'
      },
      reviveAll: 'Stelle alle Wiederbelebungen her',
      removeStun: 'Entferne Betäubungen',
    },
    heirloom: {
      name: 'Erbstück',
      min: 'Kann ab Zone {0} gefunden werden',
      special: 'Taucht nicht bei gewöhnlichen Minibossen auf',
      description: 'Erbstücke sind mächtige Artefakte, welche bei Minibossen auftauchen und für immer bleiben. Erreiche höhere Zonen, um mehr Arten zu finden',
      descriptionTower: 'Erbstücke sind mächtige Artefakte, welche alle {0} Etagen auftauchen und für immer bleiben. Erreiche höhere Zonen oder andere Türme, um mehr Arten zu finden',
      descriptionDouble: 'Das Erbstück mit der niedrigsten Menge hat die doppelte Chance, zu erscheinen. Wenn mehrere Erbstücke sich die niedrigste Menge teilen, wird diese Regel nicht angewendet.',
      descriptionNostalgia: 'Nostalgie erhöht die Chance auf Erbstücke. Wird ein Erbstück mit der Hilfe von Nostalgie gefunden, wird 1 Nostalgie bis zum nächsten Prestige entfernt.',
      power: 'Kraft',
      fortitude: 'Resistenz',
      wealth: 'Reichtum',
      spirit: 'Spiritualität',
      sharpsight: 'Adlerauge',
      reaping: 'Sense',
      remembrance: 'Andenken',
      holding: 'Speicher',
      expertise: 'Expertise',
      mystery: 'Mysterium',
      brick: 'Ziegel',
      heat: 'Hitze',
      ice: 'Eis',
    },
    itemMastery: {
      name: 'Meistern',
      description: 'Besiege Bosse oder Minibosse ab Zone {0} mit dieser Ausrüstung, um Meisterungspunkte zu erhalten. Je höher die Zone, desto mehr Punkte.',
      gain: 'Erhalte {0} Meisterungspunkte von Bossen dieser Zone, und {1}% von dem Wert ({2}) von Minibossen',
      bonuses: 'Erhöhe die Meisterungsstufe, um neue Boni für diese Ausrüstung freizuschalten',
      current: 'Diese Ausrüstung hat {0} / {1} Meisterungspunkte',
      1: 'Behalte die Ausrüstung nach dem Prestige',
      2: 'Der aktive Effekt kann gesperrt werden, um die passiven Werte der Ausrüstung um +{0}% zu verstärken',
      3: 'Behalte die Ausrüstungsstufe nach dem Prestige',
      4: 'Die Effekt-Abklingzeit ist halbiert, und die Effekt-Sperre verstärkt die Ausrüstung um +{1}% statt +{0}%',
      5: 'Kann bis zu {0} mystische Scherben sammeln. Dieser Wert wird für jede Meisterung um weitere {1} erhöht'
    },
    tower: {
      name: 'Türme',
      description: 'Türme sind besondere Orte, welche einen Schlüssel zum Betreten benötigen. Du kannst Gegner für Kronen und einzigartige Erbstücke bekämpfen, bis du stirbst. Erreiche bestimmte Etagen, um neue Effekte freizuschalten',
      zoneDescription: 'Gegner in diesem Turm sind auf der höchsten erreichten Etage etwa so stark wie ein Gegner in Zone {0}. Sie starten mit der Kraft eines Zone-{1}-Gegners und werden pro Etage um etwa {2} Zonen stärker. Korruption ist in Türmen nicht vorhanden',
      floorTitle: 'Höchste Etage besiegt',
      floorDescription: 'Besiege Gegner auf betimmten Etagen um permanente Effekte freizuschalten:',
      rewardTitle: 'Belohnungen',
      rewardDescription1: 'Erhalte {0} Krone(n) pro besiegten Gegner',
      rewardDescription2: 'Gegner geben alle {0} Etagen Erbstücke, manche Erbstücke können nur in diesem Turm gefunden werden:',
      keyDescription: 'Erhalte {0} Turmschlüssel, wenn du einen neuen Turm freischaltest, und erhalte jede Woche 1 Turmschlüssel (der Nächste in {1})',
      enter: 'Betreten',
      enterCost: 'Benötigt',
      floor: 'Etage {0}',
      brick: 'Ziegelturm',
      fire: 'Feuerturm',
      ice: 'Eisturm',
    }
  },
  farm: {
    farm: 'Bauernhof',
    unlockSeed: 'Saat freischalten',
    experience: 'Erfahrung',
    expToLevelUp: 'Du brauchst noch {0} weitere Ernten, um die nächste Stufe zu erreichen',
    yield: 'Ertrag',
    rareDrops: 'Seltener Ertrag',
    addRareDrop: 'Neuer seltener Ertrag ({0})',
    addRareDropAmount: '{0}-Menge',
    prestige: {
      description: 'Ein Prestige einer Pflanze ist möglich, sobald sie Stufe 4 erreicht. Dadurch wird ihre Prestige-Stufe auf die aktuelle Stufe erhöht, was Vorteile mit sich bringt. Dadurch werden für diese Pflanze Stufe, Erfahrung und Gene zurückgesetzt. Jede Prestige-Stufe erhöht den Ertrag aller Pflanzen um x1.04.',
      current: 'Deine aktuelle Prestige-Stufe ist {0}, was den Ertrag aller Pflanzen um x{1} erhöht.',
      next: 'Ein Prestige dieser Pflanze erhöht die Prestige-Stufe um {0}. Dadurch steigt sie auf {1}, was den Ertrag aller Pflanzen auf x{2} erhöht.',
      nextNoEffect: 'Die Stufe dieser Pflanze ist nicht höher als ihre Prestige-Stufe. Ein Prestige wird die Prestige-Stufe nicht anheben, aber trotzdem Stufe und Gene zurücksetzen.',
      cropOnField: 'Du kannst gerade keinen Prestige durchführen, da sich diese Pflanze noch auf dem Feld befindet'
    },
    button: {
      plantAll: 'Säe die ausgewählte Pflanze ({0}) auf allen leeren Feldern aus. Du kannst auch Saat auf ein einzelnes Feld legen, indem du es anklickst',
      replant: 'Alle ausgewachsenen Pflanzen werden geerntet und auf den gleichen Feldern neu ausgesät',
      replantFertilizer: 'Der selbe Dünger wird auch verwendet (wenn möglich)',
      harvestAll: 'Alle ausgewachsenen Pflanzen werden geerntet. Du kannst auch ein einzelnes Feld ernten, indem du es anklickst',
      delete: 'Entfernt eine Pflanze von einem Feld. Eventuelle Kosten werden nicht erstattet',
      deleteBuilding: 'Gebäude können auch so entfernt werden und landen anschließend wieder im Inventar',
      color: 'Felder können eingefärbt werden, um das Verwalten großer Felder leichter zu gestalten. Wähle eine Farbe aus und klicke auf ein Feld, um es einzufärben. Während du eine Farbe ausgewählt hast, betreffen Massenaktionen nur Felder mit der gleichen Farbe',
      colorFilter: 'Nur Felder mit der gleichen Farbe betroffen',
    },
    timeDescription: 'Benötigte Zeit zum Wachsen',
    overgrowDescription: 'Nach dem Wachsen können Pflanzen erneut wachsen, brauchen aber {0}x (1 / Überwuchern + 1)x so viel Zeit. Jede abgeschlossene Wachstumsphase zählt als zusätzliche Ernte mit sämtlichen Vorteilen.',
    fertilizerCostDescription: 'Benötigte Düngermenge pro Pflanze',
    goldChance: 'Goldchance',
    goldChanceDescription: 'Das Ernten von Pflanzen hat eine Chance, Gold zu geben. Die Wahrscheinlichkeit hängt von der Wachstumszeit der Pflanze und von der Anzahl der platzierten Gartenzwerge ab',
    goldChanceMultiple: 'Goldchancen über 100% erhöhen auch den Goldertrag, du findest garantiert {0} Gold und hast eine Chance von {1}%, 1 weiteres Gold zu finden',
    goldChanceWarning: 'Platziere einen Gartenzwerg auf dem Feld, um Gold zu finden',
    freeUpgrades: {
      s: 'Gen übrig',
      p: 'Gene übrig'
    },
    fertilizerCannotBeBought: 'Nicht kaufbar',
    crop: {
      carrot: 'Karotte',
      blueberry: 'Blaubeere',
      wheat: 'Weizen',
      tulip: 'Tulpe',
      potato: 'Kartoffel',
      raspberry: 'Himbeere',
      barley: 'Gerste',
      dandelion: 'Löwenzahn',
      corn: 'Mais',
      watermelon: 'Wassermelone',
      rice: 'Reis',
      rose: 'Rose',
      leek: 'Lauch',
      honeymelon: 'Honigmelone',
      rye: 'Roggen',
      daisy: 'Gänseblümchen',
      cucumber: 'Gurke',
      grapes: 'Weintrauben',
      hops: 'Hopfen',
      violet: 'Veilchen',
      goldenRose: 'Goldrose'
    },
    gene: {
      name: 'Gen',
      pickLevel: 'Wähle ein Stufe-{0}-Gen',
      dnaDescription: 'Du erhältst DNA, wenn die Pflanze in der Stufe aufsteigt und kannst mit ihr Gen-Verbesserungen kaufen. Die nächste Pflanzenstufe gibt {0} DNA',
      dnaDuplicate: 'Ausgewählte Gene tauchen beim nächsten Prestige nicht auf. Wird kein Gen ausgewählt, sind beim nächsten Prestige alle 4 verfügbar',
      dnaBlocked: 'Blockierte Gene',
      hasUpgrade: 'Hat Gen-Verbesserung',
      yield: 'Ertrag',
      gold: 'Gold',
      exp: 'Erfahrung',
      rareDrop: 'Seltener Ertrag',
      grow: 'Wachsen',
      overgrow: 'Überwuchern',
      giant: 'Riesig',
      grass: 'Gras',
      dna: 'DNA',
      gnome: 'Zwerg',
      lonely: 'Einsam',
      fertile: 'Fruchtbar',
      mystery: 'Mysterium',
      conversion: 'Umwandlung',
      prestige: 'Prestige',
      rareDropChance: 'Entdeckung'
    },
    fertilizerEffect: {
      vegetable: 'Nur Gemüse',
      fruit: 'Nur Früchte',
      grain: 'Nur Getreide',
      flower: 'Nur Blumen'
    },
    building: {
      premium: 'Premium-{0}',
      premiumOwned: 'Premium: {0} in Besitz',
      gardenGnome: {
        name: 'Gartenzwerg',
        description: 'Pflanzen können bei der Ernte Gold aufdecken, wenn der Gartenzwerg auf dem Feld steht. Die Chance hängt von der Wachstumszeit der Pflanze ab.',
        descriptionPremium: 'Pflanzen können bei der Ernte Gold aufdecken, wenn der Gartenzwerg auf dem Feld steht. Die Chance ist verdoppelt und hängt von der Wachstumszeit der Pflanze ab.',
      },
      sprinkler: {
        name: 'Rasensprenger',
        description: 'Pflanzen in der selben Reihe wachsen +50% schneller und haben +150% Überwuchern',
        descriptionPremium: 'Pflanzen in der selben Reihe wachsen +100% schneller und haben +300% Überwuchern',
      },
      lectern: {
        name: 'Rednerpult',
        description: 'Pflanzen in der selben Spalte sammeln dreifache Erfahrung',
        descriptionPremium: 'Pflanzen in der selben Spalte sammeln fünffache Erfahrung',
      },
      pinwheel: {
        name: 'Windrad',
        description: 'Erhöht die Chance auf seltenen Ertrag auf dem gesamten Feld um +1% für jede einzigartige Pflanze in den umliegenden 8 Feldern',
        descriptionPremium: 'Erhöht die Chance auf seltenen Ertrag auf dem gesamten Feld um +2% für jede einzigartige Pflanze in den umliegenden 8 Feldern',
      },
      flag: {
        name: 'Flagge',
        description: 'Erhöht den Ertrag um +50%, wenn die Pflanze an der richtigen Position im Vergleich zur Flagge steht. Gemüse: Oben links, Frucht: Oben rechts, Getreide: Unten links, Blume: Unten rechts',
        descriptionPremium: 'Erhöht den Ertrag um +100%, wenn die Pflanze an der richtigen Position im Vergleich zur Flagge steht. Gemüse: Oben links, Frucht: Oben rechts, Getreide: Unten links, Blume: Unten rechts',
      }
    }
  },
  gallery: {
    gallery: 'Gallerie',
    auction: 'Auktion',
    colorSuffix: 'Farbe',
    openPackage: 'Öffnen',
    colorGainReduced: 'Zusätzliches Einkommen wird nach 100 Farbe auf die Quadratwurzel reduziert',
    idea: {
      tier: 'Stufe-{0}-Idee',
      unlock: 'Idee freischalten',

      makeItPretty: 'Mach\' es hübsch',
      stompBerries: 'Beeren zerstampfen',
      carvePumpkins: 'Kürbis aushöhlen',
      sortWaste: 'Abfall sortieren',
      advertise: 'Werben',
      beImpatient: 'Ungeduldig sein',

      makeLemonade: 'Limonade herstellen',
      growATree: 'Einen Baum großziehen',
      buildComposter: 'Komposthaufen anlegen',
      observeRainbow: 'Regenbogen beobachten',
      buildRedReservoir: 'Rotes Reservoir bauen',
      orderMassiveSafe: 'Massiven Safe bestellen',

      drawOcean: 'Ozean zeichnen',
      makeWine: 'Wein herstellen',
      calculateOdds: 'Chancen ausrechnen',
      buildOrangeReservoir: 'Oranges Reservoir bauen',
      thinkHarder: 'Härter nachdenken',
    },
    nextInspiration: {
      0: 'Nächste ',
      1: ' in '
    }
  },
  gem: {
    newGemsTime: 'Erhalte neue Edelsteine, wenn sich die Leiste füllt. Der Generator erzeugt alle {0} neue Edelsteine.',
    newGemsTimeAchievement: 'Erhalte neue Edelsteine, wenn sich die Leiste füllt. Jeder Erfolg beschleunigt den Generator um +{0}%. Deine {1} Erfolge beschleunigen den Generator um +{2}%, von {3} auf {4}.'
  },
  achievement: {
    relicReward: 'Dieses Relikt wird als Belohnung vergeben, wenn die nächste Stufe dieses Erfolgs erreicht wird.',
    secret: 'Dieser Erfolg ist geheim und gewährt keine Boni.'
  },
  treasure: {
    effectSummary: 'Effekt-Auflistung',
    tier: 'Ebene',
    tierItem: 'Ebene-{0}-Schatz',
    tierEffect: {
      globalLevel: 'Deine globale Stufe erhöht sowohl die höchstmögliche Schatzebene aus auch die Chance auf Schätze mit einer hohen Ebene.',
      upgrade: 'Verbesserungskosten',
      destroy: 'Fragmente beim Zerstören',
      regular: 'Gewöhnliche Effekte',
      special: 'Besondere Effekte'
    },
    buyFragment: {
      0: 'Kaufe Fragmente (',
      1: ') für'
    },
    buyTreasure: 'Erhalte einen Schatz mit zufälliger Ebene und Effekt',
    upgradeDescription: 'Verbessere einen Schatz mit Fragmenten. Die Fragmentkosten hängen von der Ebene und Stufe vom Schatz ab.',
    destroyDescription: 'Zerstöre einen Schatz, um Fragmente abhängig von dessen Ebene zu erhalten. Alle bei Verbesserungen verwendete Fragmente werden ebenfalls erstattet.'
  },
  relic,
  card
}
