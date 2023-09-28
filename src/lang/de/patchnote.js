export default {
  releasedOn: 'veröffentlicht am',
  changeCount: 'Außerdem wurden {0} Dinge verändert, die noch nicht freigeschaltet sind',
  versionType: {
    major: 'Neue Hauptversion',
    minor: 'Neue Version',
    patch: 'Patch'
  },
  type: {
    bugfix: 'Fehlerbehebung',
    balance: 'Balancing',
    qol: 'Bequemlichkeit',
    clarity: 'Klarheit',
    info: 'Info',
    context: 'Kontext',
    new: 'Neu',
    remove: 'Entfernt',
    change: 'Änderung'
  },
  text: {
    addedFeature: 'Funktion hinzugefügt',

    // v1.0.1
    0: 'Die Menge an Schrott im Bergwerk wurde auf den Tiefen am Anfang leicht erhöht',
    1: 'Zeigt einen Hinweis für neue Spieler, dass es beim Heruntergraben kein Schrotteinkommen gibt',
    2: 'Die Gebäudewarteschlange zeigt jetzt den Forschritt vom aktuell gebauten Gebäude an',
    3: 'Gebäude bleiben jetzt in der Liste, bis das Gebäude fertig gebaut ist, wenn das Maximum erreicht wird',
    4: 'Beim Benutzen vom Antwortknopf bleibt das Textfeld jetzt im Fokus',
    5: 'Das Einsetzen von Karten beim Prestige wird jetzt erklärt',
    6: 'Verbesserungslisten merken sich jetzt die zuletzt besuchte Seite',
    7: 'Zeigt einen Hinweis für neue Spieler, welche eine hohe Zone erreichen, ohne Monsterteile zu entdecken',
    8: 'Tooltips erklären jetzt die Werte vom Tiefengräber',
    9: 'Erfolge mit einem Relikt als Belohnung stellen jetzt im Tooltip klar, dass das Relikt bei der nächsten Erfolgsstufe als Belohnung gegeben wird',
    10: 'Die Schulfunktion sollte sich nie so anfühlen, als ob sie wegen ihrer Belohnung notwendig ist, sondern eher als eine Option, mit etwas freier Zeit einen kleinen Schub zu bekommen. Ich ändere deshalb das Belohnungssystem für diese Funktion etwas, um die Schule optionaler zu machen, besonders im frühen Spielverlauf, wo das Überspringen von Zeit einen viel größeren Einfluss hat.',
    11: 'Die Goldstaub-Belohnung wurde reduziert, wenn deine globale Stufe unter 250 liegt (linear)',
    12: 'Der "Streber"-Erfolg ist nun geheim, wodurch er nicht mehr die Edelsteine beschleunigt und nicht mehr für "Überflieger" zählt',
    13: 'Der X-Knopf in der Literatur erzeugt keinen Fehler mehr',

    // v1.1.0
    14: 'Im letzten Patch habe ich bereits einige Notlösungen implementiert, um die Schule angenehmer zu machen. Das hat zwar ein wenig dabei geholfen, den dauerhaften Grind zu reduzieren, aber nicht die Ursachen behoben. Dieses Rework soll den Zeitdruck nehmen, den einige Spieler empfunden haben. Außerdem soll es den Grind-Aspekt entfernen, ohne die aktive Möglichkeit zu nehmen, sich etwas Goldstaub zu erspielen. Gooboo soll ein langfristiges Idle-Game sein und kein aktives Incremental. Das war ebenfalls eine gute Gelegenheit, das intransparente Elo- und Notensystem zu überarbeiten.',
    15: 'Elo-System entfernt',
    16: 'Noten verfallen nicht mehr mit der Zeit',
    17: 'Du kannst nun zwischen freigeschalteten Noten wechseln',
    18: 'Lernen gibt keinen Goldstaub mehr als Belohnung',
    19: 'Grundwert Bucheinkommen pro Fach',
    20: 'Noten erhöhen das Bucheinkommen nicht mehr',
    21: 'Du kannst nun Schüler für Rubine kaufen, welche Bücher für dich sammeln',
    22: 'Zeit zum Lernen',
    23: 'Du erhältst nur noch Notenfortschritt, wenn du auf deiner besten Note lernst. Bei schlechten Ergebnissen kannst du auch Fortschritt verlieren',
    24: 'Üben: Hier kannst du das Fach ohne Zeitdruck ausprobieren und jederzeit gehen, bekommst aber keine Belohnungen',
    25: 'Prüfung: Du hast 1m 15s, um die höchstmögliche Punktzahl zu erreichen. Am Ende erhältst du Goldstaub als Belohnung, abhängig vom Ergebnis un von der ausgewählten Note',
    26: 'Prüfungspässe, sie sind nötig um Prüfungen zu schreiben. Bekomme jeden Tag mehr oder wenn du deine globale Stufe erhöhst, beim Überschreiten der Kapazität werden sie in Goldstaub umgewandelt',
    27: 'Anzahl der Noten reduziert (-- und ++ entfernt, sowie F- und F+). Die Schwierigkeit ist etwa 2/3 einer ganzen Note geringer (hattest du vorher ein C-- kannst du jetzt ein C+ erwarten)',
    28: 'Optimale Punktzahl für Mathe',
    29: 'Den Antwortknopf bei einem leeren Textfeld zu drücken zählt im Mathe-Minispiel nicht mehr als Fehler',
    30: 'Optimale Punktzahl für Literatur',
    31: 'Bei der Literatur werden jetzt Sätze aus einer zufälligen Wortliste statt zufällige Buchstaben verlangt. Zahlen, Groß- und Kleinschreibung sowie Sonderzeichen sind weiterhin Bestandteil für höhere Noten!',
    32: '"Noch am Lernen"-Strafmenge',
    33: '"Noch am Lernen"-Strafe wird bei globaler Stufe entfernt',
    34: 'Deine neue Note basiert auf deiner alten Note und Elo (was höher war). Prüfungspässe von vorherigen globalen Stufen werden rückwirkend erstattet',
    35: 'Perfekte Prüfungsergebnisse (2x optimale Punktzahl) beenden die Schule vorzeitig und bringen dich sofort zur nächsten Note',
    36: 'Extrazeit am Ende vom Geschichte-Minispiel bringt keine Bonuspunkte mehr, sondern beendet den Unterricht vorzeitig',
    37: 'Ein weiterer Hinweis wurde für neue Spieler hinzugefügt, welche schon Karten besitzen, aber noch keinen Prestige durchgeführt haben',
    38: 'Die Beschreibung des Tiefengräbers wurde um eine Sektion erweitert, welche das Tempo erklärt',
    39: 'Sollten die Prüfungspässe ausgehen, kannst du einen für 35 Saphire kaufen',
    40: 'Prüfungspässe wurden zu den möglichen Belohnungen von einigen kleinen Events hinzugefügt',
    41: 'Einstellungen wurden für kleine - mittelgroße Displays auf dem "Neues Spiel"-Bildschirm zentriert',
  },
  v: {
    1: {
      0: 'Ein explosiver Anfang',
      1: 'Direktor ersetzt!',
    }
  }
}
