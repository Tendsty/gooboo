import { ja } from 'vuetify/lib/locale';
import card from './ja/card';
import consumable from './ja/consumable';
import currency from './ja/currency';
import mult from './ja/mult';
import note from './ja/note';
import relic from './ja/relic';
import stat from './ja/stat';
import unlock from './ja/unlock';
import upgrade from './ja/upgrade';
import patchnote from './en/patchnote'; // no translation
import tag from './ja/tag';

import card_en from './en/card';
import consumable_en from './en/consumable';
import currency_en from './en/currency';
import mult_en from './en/mult';
import note_en from './en/note';
import relic_en from './en/relic';
import stat_en from './en/stat';
import unlock_en from './en/unlock';
import upgrade_en from './en/upgrade';
import patchnote_en from './en/patchnote';
import tag_en from './en/tag';

export default {
  ...ja,

  // default language
  ...card_en,
  ...consumable_en,
  ...currency_en,
  ...mult_en,
  ...note_en,
  ...relic_en,
  ...stat_en,
  ...unlock_en,
  ...upgrade_en,
  ...patchnote_en,
  ...tag_en,

  gooboo: {
    buy: '購入',
    craft: 'クラフト',
    feature: '機能',
    features: '機能',
    cantAfford: '資源の余裕がない',
    capTooLow: '容量が少なすぎる',
    equip: '装備する',
    unequip: '装備を解除する',
    unequipAll: 'すべての装備を解除する',
    select: '選択',
    deselect: '選択解除',
    enable: '有効化',
    disable: '無効化',
    take: '取得',
    max: '最大',
    maxed: '最大',
    free: '解放',
    capacity: '容量',
    multCapacity: '{0}容量',
    gain: '獲得',
    multGain: '{0}獲得',
    apply: '適用',
    reset: 'リセット',
    unlock: 'アンロック',
    keep: '維持',
    uncap: '最大レベルなし',
    consumable: '消費',
    lock: 'ロック',
    upgrade: 'アップグレード',
    upgrades: 'アップグレード',
    upgradeVerb: 'アップグレード',
    upgradesPrestige: 'プレステージアップグレード',
    prestige: 'プレステージ',
    prestigeDescription: 'プレステージ通貨と引き換えにこの機能をリセットする',
    prestigeTime: 'このプレステージサイクルに費やした時間',
    saveManual: 'セーブ',
    saveExport: 'ファイルエクスポート',
    saveImport: 'ファイルロード',
    resetProgress: '進捗のリセット',
    closeAll: '全て閉じる',
    draw: '描く',
    finish: '終わる',
    boost: 'ブースト',
    skip: 'スキップ',
    level: 'レベル',
    chance: 'チャンス',
    amount: '数量',
    effect: '効果',
    effects: '効果',
    confirm: '確定',
    cancel: 'キャンセル',
    maxLevel: '最大レベル',
    inventory: 'インベントリ',
    newGame: '新しいゲーム',
    levelSuffix: 'レベル',
    delete: '削除',
    convert: '変換',
    add: '追加',
    sort: '並び替え',
    leave: '退出',
    noFilter: 'フィルターなし',
    mainFeatures: '主機能',
    sideFeatures: '副機能',
    playedBefore: {
      0: '既にプレイ済みですか？',
      1: 'セーブファイルをロードする。'
    },
    offlineSummary: {
      title: 'ようこそ！{0} オフラインでした',
      newVersion: '新しいバージョン！',
      upgradesFinished: 'アップグレード完了',
      downloadBackup: 'バックアップをダウンロード',
      eventEnded: 'イベント終了',
      eventStarted: 'イベント開始',
      toFeature: '機能へ'
    },
    operator: {
      '>=': '>=',
      '>': '>',
      '<=': '<=',
      '<': '<',
      '==': '='
    }
  },
  endOfContent: {
    name: 'コンテンツの終了',
    description: 'この機能のコンテンツが終了しました。将来のアップデートを待つか、他の機能に集中してください'
  },
  message: {
    achievement: {
      get: '実績獲得！',
      gained: '獲得しました',
      relicGained: '遺物獲得'
    },
    card: {
      get: 'カードパックの内容',
      new: '新規！',
      newShiny: 'レア！',
    },
    feature: {
      feature: '新機能がアンロックされました！',
      subfeature: '新しいサブ機能がアンロックされました！',
      school: '新しい科目がアンロックされました！',
      general: '新しい将軍がアンロックされました！'
    },
    heirloom: {
      get: '家宝を発見しました'
    },
    note: {
      get: 'メモ#{0} 発見',
      read: '読む'
    },
    save: {
      success: 'ゲームをセーブしました',
      error: '自動保存に失敗しました'
    },
    prize: {
      get: '商品が当たりました！',
      bingo1: 'ビンゴ！',
      bingo2: 'ダブルビンゴ！',
      bingo3: 'トリプルビンゴ！'
    },
    school: {
      get: '授業完了！',
      getExam: '試験完了！',
      score: 'スコア: {0}',
      perfectScore: '(パーフェクト！)',
      grade: '{0}%の成績',
      gradePlus: '成績が向上しました！',
      dust: '+{0} 黄金の粉'
    },
    unlock: {
      card: '新しいカードパック！',
      general: '新しいクエストライン！',
      treasure: '新しい宝物効果！',
      book: '新しい本！',
    },
    update: {
      get: '新しいアップデート！',
      apply: '更新 + 適用'
    },
    import: {
      message: 'ファイルを読み込めませんでした',
      base64: 'デコードに失敗しました',
      json: 'JSONを解釈できませんでした',
      key: '読み込んだセーブファイルに必要なデータがありません',
      version: 'このファイルは新しいバージョンのゲーム（v{0}、現在のバージョン: v{1}）からのものです',
      testing: 'テストビルドのファイルはライブバージョンでは使用できません',
      testingVersion: '古いテストビルドのファイルは使用できません',
      migration: 'v{0}からv{1}への移行中にエラーが発生しました',
      checksum: '無効なチェックサム',
    }
  },
  duplicateTab: {
    title: 'Gooboo は既に別のタブで実行されています',
    description: 'セーブファイルとの不整合を防ぐため、Goobooは一度しか実行できません。このタブを閉じて既存のタブでゲームに戻ってください',
  },
  reset: {
    feature: 'やり直したいですか？ここでは、ゲームの他の部分に触れることなく、1つの機能の進行状況をリセットすることができます。',
    warning: 'これはプレステージではなく、これを行ったことによる報酬や返金はありません。リセットの取り消しはできません。',
    deleteSave: 'ここでセーブファイル全体を削除することもできます',
    deleteButton: 'セーブファイルを削除する'
  },
  prestigeDescription: {
    mining_ember: '現在の深層生物の到達深度のパーセンテージに等しい琥珀を得る',
    village_blessing: '信仰が祝福に変わる',
    village_shares: '現在の銅貨の0.1%に相当する取り分を得る',
    horde_soulEmpowered: '堕落した魂が力を得た魂に変わる',
    horde_courage: 'レベル10に到達したときに勇気を獲得し、その後レベルが上がるごとにさらに勇気を獲得する',
    gallery_cash: 'このランで獲得した美の総量に応じた現金を獲得する'
  },
  prestigeFormula: {
    gallery_cash: '現金 = 10^(log8(美しさ / 100B)^0.7)',
  },
  confirm: {
    title: '確認',
    prestige: 'プレステージ通貨と引き換えに、この機能の進行状況をすべてリセットします。本当にプレステージしますか？',
    prestigeNoGain: 'あなたはプレステージしようとしています。進歩がないため、プレステージ通貨がもらえません。本当にプレステージしたいですか？',
    prestigeCrop: 'この作物をプレステージ化し、レベル、経験、遺伝子をすべてリセットする代わりに、すべての作物に永続的な獲得ボーナスを与えようとしています。本当にプレステージしたいですか？',
    upgrade: {
      0: '次のアップグレードを購入しようとしている ',
      1: 'これは宝石を消費します。本当に購入しますか？'
    },
    shop: 'イベント報酬を購入しようとしていますが、希少通貨が必要です。本当に購入しますか？',
    theme: {
      0: '次のテーマを購入しようとしている ',
      1: 'これは宝石を消費します。本当に購入しますか？'
    },
    cardPack: {
      0: '次のカードパックを購入しようとしている ',
      1: 'これは宝石を消費します。本当に購入しますか？'
    },
    cardShinyPack: {
      0: '次のレアカードパックを購入しようとしている ',
      1: 'これは宝石を消費します。本当に購入しますか？'
    },
    weatherChaosFishingRodBuy: 'あなたは宝石を消費する釣り竿「{0}」を買おうとしています。本当に買いますか？',
    summerFestivalCellBuy: '宝石が必要な新しい島のセルを買おうとしています。本当に買いますか？',
    farmCrop: 'あなたは宝石を消費する作物を植えようとしています。本当に購入しますか？',
    galleryMotivation: 'あなたは宝石がかかるモチベーションを買おうとしています。本当にこれを買いますか？',
    treasure: 'あなたは新しい宝物を買おうとしています。本当にこれを買いますか？',
    schoolExamPass: '受験パスが不足していますが、サファイアで購入できます。本当に実行しますか？',
    relicGlyph: '台座を変更すると、すべてのグリフの現在のレベル進行がリセットされます。本当に実行しますか？',
    treasureFragment: 'あなたは希少通貨が必要な欠片を買おうとしています。本当にこれを買いますか？',
    treasureDelete: 'あなたは宝物を破壊しようとしています。本当にこれを買いますか？',
    buyDiamondForge: 'ダイヤモンドを消費して遺物を購入しようとしています。本当に実行しますか？',
    casinoBingoBuy: 'あなたはビンゴカードを買おうとしています。本当にこれを買いますか?',
    casinoWheelSpin: 'あなたは幸運の輪を回そうとしています。本当にこれを買いますか？',
    consumable: 'このアクションには、あなたが持っていない消耗品が必要です。希少通貨で購入しますか？',
    reset: {
      text: '本当に{0}機能をリセットしますか？この操作は元に戻せません！',
    },
    resetAll: '本当にセーブファイルを削除しますか？この操作は元に戻せません！'
  },
  feature: {
    subfeature: 'サブ機能',

    // Main features
    mining: '発掘',
    village: '村',
    horde: '群集',
    farm: '農場',
    gallery: 'ギャラリー',

    // Side features
    note: 'メモ',
    relic: '遺物',
    gem: '宝石',
    achievement: '実績',
    school: '学校',
    card: 'カード',
    general: '将軍',
    event: 'イベント',
    treasure: '宝物',
    cryolab: 'クライオラボ',
    debug: 'デバッグ',

    // Subfeatures
    miningGas: 'ガス',
    villageCrafting: 'クラフト',
    hordeClasses: 'クラス',
    schoolLiterature: '文学',
    schoolHistory: '歴史',
    schoolArt: '芸術',
    schoolChemistry: '化学',
    generalOrladee: 'Orladee',
    generalOppenschroe: 'Oppenschroe',
    generalBellux: 'Bellux',
    generalOnoclua: 'Onoclua',
    generalOmnisolix: 'Omnisolix',

    // Meta
    meta: 'ゲーム'
  },
  subfeature: {
    mining: {
      0: '鉱山',
      1: '巨大ガス',
    },
    village: {
      0: '労働者',
      1: '職人ギルド',
    },
    horde: {
      0: '装備',
      1: 'クラス',
    },
    farm: {
      0: '庭園',
    },
    gallery: {
      0: 'フリースタイル',
    }
  },
  unlock,
  mult,
  tag,
  text: {
    villageIngredientBoxGet: '食材ボックスを3つ受け取る',
    hordeBattlePassUpgrade: '新しいアップグレード',
    hordeBattlePassPrestigeUpgrade: '新しいプレステージアップグレード',
    hordeLootElementalEssence: '属性エッセンスを戦利品として獲得',
    hordeRespawnFaster: '敵の再出現速度が2倍になる',
    farmBonusDna: 'DNA +5',
    farmUnlockDna: '選択しなかったすべてのレベル1遺伝子の効果を持つDNAアップグレードを解放する',
    farmGnomeBoost: '近くの庭園の小人1体につき、収穫量が4%増加する（プレミアム庭園の小人は6%）',
    farmLonelyGrow: '同種の作物が他に畑にない場合、成長速度が30%上昇し、過成長が+150%増加する',
    farmFertileBoost: '肥料1サファイアにつき収穫量を30%増加させます',
    farmYieldConversion: '収量の5%を他の収量タイプに変換する',
    farmFastPrestige: 'プレステージは作物レベルを0にリセットする代わりに5減らす',
    farmLuckyHarvest: '1%の確率で収穫量が8倍になる',
    farmSelfless: 'すべての作物の収穫量が+3%増加する（最大+30%まで累積）',
    farmUnyielding: '40%の確率で、収穫時にこの作物を無料で植え替えられる',
    farmTeamwork: '各タイプの作物1つにこの遺伝子を持たせると、すべての作物の収穫量が2倍になる',
    farmHunter: 'この植物原産の資源レアドロップが狩猟対象となる。狩りの確率はあなたのレアドロップ確率の1%に等しい。狩りが成功するたびに、資源容量が基本値の10%増加し、基本狩猟確率が5%減少します',
    farmPatient: 'この遺伝子が選択されてから1日経過するごとに収穫量が+3%増加し、60日経過時には最大+180%増加する',
  },
  upgrade,
  currency,
  stat,
  consumable,
  patchnote,
  info: {
    title: 'Gooboo',
    subtitle: 'developed by Tendsty',
    testing: 'testing',
    text: 'Gooboo は、神秘的な未知の世界で複数の機能を管理する Idle/Incremental ゲームです。さまざまなリソースを集めて、リソースの獲得量を増やすための多種多様なアップグレードを購入しましょう。新しいコンテンツをアンロックし、この世界についてより深く知るために、メイン機能を進歩させましょう。進行が遅くなり始めたら、各機能をプレステージ化し、獲得した資源を次のレベルに引き上げましょう。',
    updates: {
      web: 'あなたはウェブ版を使用しています。このゲームは定期的にアップデートをチェックし、自動的に最新バージョンを使用し、アップデートが利用可能になると通知します。',
      desktop: {
        0: 'デスクトップ版を使用しています。更新を手動でチェックする必要があります。',
        1: 'リリース',
        2: ' ページ。'
      },
      offline: {
        0: 'オフライン版を使用しています。更新を手動でチェックする必要があります。',
        1: 'リリース',
        2: ' ページ。'
      },
      steam: 'Steam 版を使用しています。更新は Steam によって処理されます。'
    },
    testingDescription: {
      0: 'あなたはテストビルドでプレイしています。機能が未完成であったり、バグがあったり、ゲームの仕組みがいつでも変更される可能性があります。ライブバージョンをプレイすることができます',
      1: 'こちら',
      2: '(テストビルドのセーブファイルは本番バージョンでは使用できません)'
    },
    viewPatchnotes: 'パッチノートを見る',
    numberFormatting: '数値のフォーマット',
    numberFormattingDescription: '数値を読みやすくするために、非常に大きい（および小さい）数値は以下の単位を使用してフォーマットされます。',
    bigNumbers: '大きい数値',
    smallNumbers: '小さい数値',
    timeUnits: '時間単位',
    timeUnit: {
      s: '秒',
      m: '分',
      h: '時',
      d: '日'
    },
    socials: {
      title: 'Socials',
      text: 'Gooboo は外部ガイドなしで単独で遊ぶことができます。しかし、他のプレイヤーと一緒に遊びたい場合は、これらの場所に訪れてください。',
      viewCode: 'ソースコードを見る',
      patreon: 'Patreon',
      reddit: 'Reddit',
      discord: 'Discord'
    },
    supportMe: {
      title: 'Support me',
      text: 'このゲームは無料で、マイクロトランザクションや広告はありません。開発をサポートしたい場合は、私の Patreon ページをチェックしてください。',
      patreon: 'Patreon'
    },
    tech: {
      title: '使用技術',
      web: 'Web',
      fonts: 'Fonts',
      testing: 'Automated testing',
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
    },
    cheater: {
      0: {
        title: 'Honorable',
        description: '後述のツールを使用せずにゲームをプレイした',
      },
      50: {
        title: 'Curious',
        description: '道具を使って将来の結果を予測した',
      },
      100: {
        title: 'Automated',
        description: 'ゲームルールに従いつつ、人間のような行動を自動的に行うツールを使用した',
      },
      150: {
        title: 'Savescummer',
        description: '道具やセーブ／ロード機能を使って将来の結果を予測し、その情報に基づいて購入判断を行ったり結果を変更した',
      },
      200: {
        title: 'Cheater',
        description: 'ゲーム変数を編集したり、通常は不可能な結果を得るためにツールを使用した',
      },
      selfMark: 'チーターステータスを設定する',
      selfMarkDescription: 'ここで自分をチーターとしてマークすることができます。これは純粋に視覚的なもので、いつでも取り消すことができます',
      noDetected: 'チートは検出されませんでした',
      featureDetected: '以下の機能でチートが検出されました',
      featureDetected2: 'これらの機能を完全にリセットすることで、チーターマークを消すことができます',
      globalDetected: 'チートが検出され、セーブファイルに永久マークが付けられました',
      selfMarkClick: '不正行為をしていて、ゲームがそれを正しく検出しなかった場合、クリックすることで不正行為者としてマークするオプションを見ることができます'
    },
    statistics: {
      name: '統計',
      overview: '概要',
      other: 'その他',
      gained: '獲得',
      maxOwned: '最高',
      currentTotal: '現在/合計',
      defaultPlayerName: 'プレイヤー',
    }
  },
  error: {
    tech: {
      vuejs: 'Vue.js',
      javascript: 'Javascript'
    },
    title: '{0}エラー',
    source: 'ソース: {0}',
    position: '行{0}、列{1}',
    reportBug: 'バグを報告する'
  },
  note,
  school: {
    school: '学校',
    beginner: {
      title: 'まだまだ勉強中',
      description: 'あなたはこの学校に新しく入学したため、黄金の粉の報酬が{0}%に減少します。グローバルレベルを上げるとこのペナルティが軽減され、グローバルレベル175になると完全に軽減されます。'
    },
    subjectBookGain: 'アンロックされた各教科は、学年を問わず、1時間に10冊の本を読むことができる。',
    passCapGain: '毎日（次は{0}）、そしてグローバルレベル10ごとに、新しい受験パスがもらえます。',
    buyPass: {
      0: '十分なパスがない状態で試験を受けようとすると、自動的に購入されます（1枚あたり ',
      1: '）',
    },
    library: '図書館',
    practice: '練習',
    practiceDescription: '時間に追われることなくこの科目を練習するが、報酬や成績は得られない。',
    study: '勉強',
    studyDescription: '{0}で可能な限り高いスコアを取得し、最高のグレードで勉強すれば、グレードを向上させるチャンスが得られます。スコアによって次のグレードへの進級が得られます（または損なわれます）。平均スコアは{1}と予想されます。',
    studyNoF: 'Fランクで成績が進まなくなることはない。',
    takeExam: '試験を受ける',
    takeExamDescription: '可能な限り高得点を取るために{0}の試験を受けます。報酬として黄金の粉がもらえます（{1}～{2}。3}点を取ると、試験はパーフェクトと評価され、次のグレードのロックが解除されます。',
    takeExamNoF: 'Fランクでの受験はできない。',
    takeExamNoFStudy: 'まずは少し勉強してください！',
    takeExamCost: '必要',
    examDustFull: '古代の砂時計が満杯です！使用可能になるまで時間が必要な黄金の砂の代わりに、ボーナスの砂を獲得します。',
    examDustOvercap: '古代の砂時計がほぼ満杯です。この試験で得られる黄金の砂の一部がボーナスの砂に変換される可能性があります。',
    answer: '回答',
    begin: 'レッスンが始まる！',
    beginExam: '試験が始める！',
    grade: '成績',
    gradeDescription: '成績によってこの科目の難易度が決まります。学年はいつでも切り替えることができ、十分な勉強をしたり、試験で満点を取ったりすることで、よりよい成績を得ることができます。',
    totalPoints: '合計ポイント',
    multipass: {
      description: '1つの試験で複数のパスを使用して報酬を増やすことができます。追加でパスを1枚使うごとに、次の効果を得ます：',
      dust: '獲得した黄金の砂の100%をボーナスの砂として獲得',
      points: '合計ポイント +75%'
    },
    math: {
      name: '数学',
      subtitle: '方程式を解く',
      description: '様々な計算問題に答えてスコアを上げましょう。正解ごとにスコアが1増え、間違えるごとに残り時間が5秒減少します。成績が上がるにつれて、数値が大きくなり、新しい演算子が登場します。',
    },
    literature: {
      name: '文学',
      subtitle: '文章を書く',
      description: '表示された文章をタイプしてスコアを上げましょう。1文入力するごとに1点加算されます。同じ文は正しくタイプされるまで残り、次の文の始まりを見ることができます。グレードが上がると、文章や単語が長くなり、新しい特殊文字が登場します。',
    },
    history: {
      name: '歴史',
      subtitle: '日付を覚える',
      description: '表示された年号を覚え、対応するペア（最大5組）を見つけてスコアを上げましょう。以前に見た年号のペアを見つけられないと、残り時間が5秒減少します。成績が上がるにつれて、年が大きくなり、登場する年号の数も増えます。',
      newGame: '新しいゲーム、新しい年号！準備はいいですか…',
      year: '年',
      examInfo: '試験では、日付を覚えるチャンスが2回ある。最初の解答が終わると、新しい日付と問題が出題される。'
    },
    art: {
      name: '芸術',
      subtitle: '色を混ぜる',
      description: '色を正しく推測してスコアを上げましょう。2つの色が表示され、それらを混ぜた結果を当てます。正解ごとにスコアが1増え、間違えるごとに残り時間が5秒減少します。成績が上がるにつれて、回答の選択肢が増え、色の違いもより似通ってきます。',
    },
    chemistry: {
      name: '化学',
      subtitle: '実験を観察する',
      description: 'さまざまな形を使った実験を観察します。実験後に質問が出され、その答えを推測する必要があります。成績が上がるにつれて、形や質問の種類が増え、より正確な回答が求められます。',
      newGame: '新しいゲーム、新しい実験！準備はいいですか…',
      questionShape: {
        0: '',
        1: 'はいくつ？',
      },
      questionSize: {
        text: '{0}形はいくつ？',
        0: '小さい',
        1: '中くらいの',
        2: '大きい',
      },
      questionSpin: {
        text: '{0}形はいくつ？',
        0: '反時計回りに回転している',
        1: '回転していない',
        2: '時計回りに回転している',
      },
     questionMoveRandom: {
        text: '{0}形はいくつ？',
        0: '動いていない',
        1: '動いている',
      },
      questionMoveDirection: {
        text: '{0}方向に動いている形はいくつ？',
        0: '水平方向',
        1: '垂直方向',
        2: '斜め方向',
      },
      answer: '答えは {0}',
    },
    book: {
      name: '本',
      get: '{0}等級に到達するか、合計{1}ポイントを獲得するとこの本を入手できます',
      buy: {
      0: 'クリックすると、',
        1: 'でこの本を即座に入手することもできます',
      },
      skipped: '{0}エメラルドを使ってこの本を早期入手しました。{1}等級に到達するか、合計{2}ポイントを獲得すると返還されます',
      scalesWithGL: 'グローバルレベルに応じてスケール',
      scalesUpTo: '{0}まで',
      read: '読む',
    }
  },
  hourglass: {
    title: '古代の砂時計',
    subtitle: 'この機能のために時間をスキップする',
    subtitleSchool: '試験の合格を黄金の粉に変える',
    timeInMinutes: '時間（分）',
    bonusTitle: 'ボーナスの砂',
    bonusDescription: '容量を超えた黄金の砂は、代わりにボーナスの砂として獲得されます。毎秒、ボーナスの砂1を黄金の砂に変換します。',
  },
  cryolab: {
    frozen: '凍結した機能 {0} / {1}',
    active: 'アクティブ: {0}%',
    activeTitle: 'プレステージ獲得(アクティブ)',
    activeDescription: '1日あたり最高のプレステージの{0}%に等しいプレステージ通貨を受動的に得る。この機能が凍結されている時のみ有効です',
    passive: 'パッシブ: {0}%',
    passiveTitle: 'プレステージ獲得(パッシブ)',
    passiveDescription: '1日あたり最高の名声の{0}%に相当する名声通貨を受動的に獲得する。この機能が凍結していない時のみ有効です',
    expDescription: 'この機能が凍結されている場合、あなたは{0} / {1}の経験値を持ち、1日あたり{2}の経験値を得る',
    expDescription2: '経験値の獲得量は、この機能で得られるグローバルレベル（{0}）に基づきます。',
    expNext: '次のレベルの効果：',
    expNoGain: 'この機能の経験値を得るには、まずプレステージ通貨を獲得してください',
    expFormula: '経験値 = 1.015^GL * GL * 2',
    nextLevelTime: '次のレベルに到達するまでに {0} かかります',
    cropExp: '各作物ごとにこの量までの経験値を獲得します（基礎成長時間が長いほど獲得経験値は減少します）。その後、最高作物レベルと現在の作物レベルの差で乗算されます（最高レベルに達している作物は経験値を獲得しません）',
    frozenFeature: {
      title: 'この機能は凍結されました',
      description: 'この機能はクライオラボによって凍結されています。この機能で進捗は得られませんが、プレステージ通貨は自動的に得られます'
    }
  },
  general: {
    completionReward: 'コンプリート報酬',
    questGained: '{0}獲得',
    questHighestAmount: '最高{0}数',
    questEquipCard: 'カード有効',
    questFailedSubfeature: 'サブ機能が違います！プレステージして再挑戦してください',
    questFailedTime: '制限時間に達しました！プレステージして再挑戦してください',
    questFailedCard: 'カードが有効ではありません！プレステージして再挑戦してください',
    questFailedCardUnowned: 'このカードの所持枚数がありません！商人を訪れて入手してください',
    grobodal: {
      name: 'Grobodal',
      diggingDeeper: '深く掘る',
      combatTraining: '戦闘訓練',
      searchingTheArchives: '書庫を調査中',
      gardening: 'ガーデニング',
      pitchBlack: '真っ黒',
      masterOfTheSystem: 'システムのマスター',
      thinkPlayerThink: 'プレイヤーよ、考えろ！',
      discoveringTheMystery: '謎を解明中',
      prettyAndPeaceful: '美しく平和',
      doubleTrouble: '二重トラブル',
      allIn: 'オールイン',
    },
    orladee: {
      name: 'Orladee',
      beautyOfThisWorld: 'この世界の美しさ',
      colorVariety: '色の多様性',
      fieldTesting: '実地テスト',
      shiningBright: '輝き放つ',
    },
    oppenschroe: {
      name: 'Oppenschroe',
    },
    bellux: {
      name: 'Bellux',
    },
    onoclua: {
      name: 'Onoclua',
    },
    omnisolix: {
      name: 'Omnisolix',
    },
  },
  event: {
    shop: {
      notFound: 'ショップが見つかりません',
      bought: '在庫あり'
    },
    cinders: {
      name: '消し灰',
      perProducer: '生産者ごと',
      candle: {
        tealight: 'ティーライト',
        regular: 'キャンドル',
        aroma: 'アロマキャンドル',
        chandelier: 'シャンデリア',
        duration: '持続時間 {0}',
        sootGain: {
          0: '発生',
          1: ' ',
          2: ' 燃焼後'
        }
      }
    },
    bloom: {
      name: '開花',
      tier: 'ティア',
      canSell: '{0}で売ることができる',
      sell: '売る花を選ぶ。インベントリがいっぱいの状態で花を獲得すると、その種類の中で最も低いティアの花が自動的に売却される',
      dragToBreeder: 'ここに花をドラッグして繁殖を開始します',
      wildGrowth: 'インベントリにあるすべての花にランダムな遺伝子を得る。これは1つの花につき3つの遺伝子の制限を回避することはできません',
      boost: '1日分の進捗を即座に得る',
      genes: '遺伝子',
      wildgrowth: '野生の成長',
      flower: {
        daisy: 'ヒナギク',
        poppy: 'ポピー',
        iris: 'アヤメ',
        lily: 'ユリ',
        orchid: 'ラン',
        cornflower: 'セントレア',
      },
      gene: {
        valuable: {
          name: '貴重な',
          description: '3倍の開花価値'
        },
        mutating: {
          name: '突然変異',
          description: '2倍の遺伝子チャンス'
        },
        splitting: {
          name: '分割',
          description: '25%の確率で新しい花を2つ繁殖させる'
        },
        resistant: {
          name: '耐性',
          description: '+10% のティア確率'
        },
        huge: {
          name: '巨大',
          description: '+1ティア、マージ時にこの遺伝子を消費する'
        }
      }
    },
    weatherChaos: {
      name: '天候の混沌',
      chanceToCatch: '捕獲確率',
      powerNeeded: '必要な釣りパワー',
      maxSize: '最大サイズ',
      owned: '所持数',
      fishingPowerDescription: '釣りパワーによって釣れる魚の種類が決定。必要パワーの2倍に達すると、その魚の最大捕獲確率に到達',
      fishSizeDescription: '平均サイズ以下の魚は同じ捕獲確率。平均を超えるサイズは超えるほど捕獲が困難に',
      fishDescription: '宝物を釣り上げなかった場合、魚を釣るチャンスが発生。釣れる魚の種類は場所と天候に依存',
      trashTitle: 'ゴミ出現率',
      trashDescription: '宝物や魚の捕獲に失敗した場合、ゴミを釣り上げる',
      treasureDescription: 'ごく稀に宝物を釣り上げるチャンスが発生。中身はエサ、新しい釣り竿、または釣りパワーが{0}以上なら新エリアの鍵',
      treasureDescriptionFinal: 'ごく稀に宝物を釣り上げるチャンスが発生。中身はエサまたは新しい釣り竿',
      changeWeather: '天候変更',
      location: {
        pond: '池',
        lake: '湖',
        river: '川',
        ocean: '海',
        mountain: '山',
        cave: '洞窟'
      },
      fish: {
        bronzefish: 'ブロンズフィッシュ',
        snail: 'カタツムリ',
        cablebiter: 'ケーブルバイター',
        blueshimmer: 'ブルーシマー',
        introvero: 'イントロヴェロ',
        zapling: 'ザプリング',
        starcone: 'スターコーン',
        phelaria: 'フェラリア',
        coldgil: 'コールドギル',
        silverbrass: 'シルバーブラス',
        circlejelly: 'サークルジェリー',
        woodcrawler: 'ウッドクロウラー',
        longdano: 'ロングダノ',
        legabara: 'レガバラ',
        biggiesnail: 'ビッギースネイル',
        sunshine: 'サンシャイン',
        platiglob: 'プラティグロブ',
        stormdazer: 'ストームデイザー',
        riverTurtle: 'リバーカメ',
        streamsnail: 'ストリームスネイル',
        ralmon: 'ラルモン',
        wonelle: 'ワネル',
        grillgil: 'グリルギル',
        sleepysoo: 'スリーピースー',
        oozior: 'ウージオール',
        paleblob: 'ペールブロブ',
        crystakin: 'クリスタキン',
        shadowbiter: 'シャドウバイター',
      },
      fishingRod: {
        name: '釣り竿',
        basic: '基本',
        fast: '速さ重視',
        leafy: '葉っぱ',
        heavy: '重さ重視',
        hardwood: '堅木',
        master: '達人',
        smelly: 'におい付き',
        turbo: '加速',
        golden: '黄金',
        dull: '鈍い',
        mystical: '神秘',
        twins: 'ツイン',
      },
      bait: {
        juicyBait: 'みずみずしいエサ',
        rainbowBait: '虹色のエサ',
        trashNet: 'ゴミ捕り網',
        magnet: '磁石',
      },
    },
    summerFestival: {
      name: '夏祭り',
      produces: '生産物',
      producesNothing: '何も生産していない',
      empty: '空き',
      constructing: '建設中',
      upgrading: 'アップグレード中',
      deleting: '削除中',
      emptyQueue: '建設キューに何もありません',
      inQueue: 'キュー中',
      inDeletionQueue: '削除キューに登録済み',
      placeOn: 'この上に配置する必要があります',
      rotateDescription: '建物を回転させる',
      deleteDescription: 'この建物を削除します。資源は返還されず、建設キュー内で時間が必要です。',
      complete: '完了',
      build: '建設',
      freeExpansion: {
        s: '{0} 回の無料拡張',
        p: '{0} 回の無料拡張'
      },
      quest: {
        name: 'クエスト',
        currency: '{0} を集める',
        building: '{2}（レベル{1}）を {0} 個建設する'
      },
      tile: {
        beach: 'ビーチ',
        water: '水域',
        palm: 'ヤシの木',
        forest: '森',
        mountain: '山',
        plain: '平原',
        land: '土地'
      },
      tilePos: {
        0: '中央',
        1: '右',
        2: '右下',
        3: '左下',
        4: '左',
        5: '左上',
        6: '右上'
      },
      building: {
        collector: {
          name: 'コレクター',
          description: '隣接するタイルから自動的に資源を集める'
        },
        mainStage: {
          name: 'メインステージ',
          description: '音楽を生産し、さらなる建物のアンロックが可能'
        },
        speaker: {
          name: 'スピーカー',
          description: ''
        },
        vegetablePatch: {
          name: '野菜畑',
          description: ''
        },
        kitchen: {
          name: 'キッチン',
          description: '材料を使って料理を作る',
          action: {
            coconutSalad: 'ココナッツサラダ',
            saltyShell: '塩味の貝',
            lemonCandy: 'レモンキャンディ',
            steak: 'ステーキ',
            fishSticks: 'フィッシュスティック'
          }
        },
        sawmill: {
          name: '製材所',
          description: '建築資材を部品に加工する',
          action: {
            cutPlates: '板を切る',
            cutSandstone: '砂岩を切る',
            smeltSteel: '鋼を精錬する',
            combineMaterial: '材料を合成する'
          }
        },
        huntingArea: {
          name: '狩猟エリア',
          description: ''
        },
        excavator: {
          name: '掘削機',
          description: ''
        },
        lighthouse: {
          name: '灯台',
          description: ''
        },
        grill: {
          name: 'グリル',
          description: '石炭を使って料理をする',
          action: {
            cookMeat: '肉を焼く',
            cookFish: '魚を焼く'
          }
        },
        mine: {
          name: '鉱山',
          description: '山から資源を採掘する'
        },
        hugeSpade: {
          name: '巨大なスコップ',
          description: 'ビーチから砂を掘り出す'
        },
        shellOpener: {
          name: '貝割り機',
          description: '貝を開いて金属部品やレアアイテムを取り出す',
          action: {
            openShell: '貝を開く'
          }
        },
        waterPurifier: {
          name: '浄水器',
          description: '塩水を浄化し、塩を抽出する'
        },
        fishingNet: {
          name: '漁網',
          description: '海から魚を獲る'
        },
        pepperField: {
          name: '唐辛子畑',
          description: '唐辛子を育てて収穫する'
        },
        beehive: {
          name: '蜂の巣',
          description: '働き者のミツバチからはちみつを採る'
        },
        citrusPlantation: {
          name: '柑橘園',
          description: '柑橘類を育てて収穫する'
        }
      },
      buildingEffect: {
        autocollectMult: '自動収集量',
        pearlChance: '真珠出現率',
      }
    },
    nightHunt: {
      name: '夜の狩り',
      potions: 'ポーション',
      performRitual: '儀式を行う',
      performRitualDescription: '選んだ材料をすべて消費して儀式を行う。正しい材料の組み合わせを見つけたら、新しいポーションをアンロックしよう。位置も重要だ！',
      asBonusIngredient: 'ボーナス材料として',
      findablePotions: 'このランクで見つけられるポーション',
      ritualStabilityDescription: '安定性は複数の確率に影響する：',
      ritualStabilityDescription1: '100% ～ 200%：基本材料を保持する確率（現在 {0}%）',
      ritualStabilityDescription2: '0% ～ 100%：ボーナス材料を保持する確率（現在 {0}%）',
      ritualStabilityDescription3: '-100% ～ 0%：報酬なしで儀式が失敗する確率（現在 {0}%）',
      ritualSuccessDescription: '成功した儀式では新しい儀式用の夜の狩りトークンを得られ、新しいポーションが見つかることもある。既知のポーションに対する成功した儀式は、そのポーションのレベルを上げ、夜の狩りトークンを得て、次のレベルに到達するのを難しくする。',
      ritualFamiliarityDescription: '儀式が失敗した場合、この値分だけ安定性と成功率が上昇する。このボーナスは累積し、儀式の成功でリセットされる。',
      ritualHintDescription: 'スロットや材料の量に関するヒントが得られる可能性がある。ヒントは新しい儀式に成功したときのみ得られる。ヒントを得るごとにこの確率は {0}% 減少する。ヒントとヒント確率ペナルティは、そのヒント付き儀式が発見されたときにリセットされる。',
      clickToAdd: '材料をクリックして儀式に追加',
      ingredientSizeDescription: '材料のサイズが大きいほど、魔法通貨あたりに見つけられる材料が増える',
      favouriteIngredient: {
        title: 'お気に入りの材料',
        description: '1つの材料をお気に入りとして選ぶと、材料を見つけるたびにお気に入りの材料も受け取れる',
        copy: '見つけた材料をコピー',
      },
      sackDescription: '魔力が高いと袋が出現することがあり、魔力を10倍消費する代わりに、全ての利用可能な材料に均等に分配された10倍の量の材料を含む',
      newDescription: {
        empty: 'ここでは、現在のレシピが新しい（これまで成功していない）かどうかを確認できる',
        isNew: 'これは新しいレシピで、成功すれば夜の狩りトークンを受け取れる',
        isNewNoToken: 'これは新しいレシピです',
        isNewPotion: '新しいポーションを発見できる可能性もある',
        discoveredPotion: 'これは既知のポーションレシピ。成功すればポーションのレベルが上がり、夜の狩りトークンも得られる',
        pointless: 'これは既知のレシピで、これ以上儀式を行っても意味がない',
      },
      potion: {
        power: '力のポーション',
        insight: '洞察のポーション',
        rage: '怒りのポーション',
        calming: '鎮静のポーション',
        sorrow: '悲しみのポーション',
        energy: '活力のポーション',
        nature: '自然のポーション',
        intensity: '強度のポーション',
        hysteria: 'ヒステリーのポーション',
        insanity: '狂気のポーション',
        patience: '忍耐のポーション',
        transformation: '変化のポーション',
        silence: '沈黙のポーション',
        photosynthesis: '光合成のポーション',
        sun: '太陽のポーション',
        growth: '成長のポーション',
        solidification: '凝固のポーション',
        liquification: '液化のポーション',
        glowing: '発光のポーション',
        stasis: '静止のポーション',
        creativity: '創造性のポーション',
        poison: '毒のポーション',
        warmth: '温もりのポーション',
      }
    },
    snowdown: {
      name: '降雪',
      fightCount: '戦う',
      fight: '戦う',
      fightDescription: '表示された相手と、少数の雪玉を消費して戦う',
      fightWin: '勝てば、次のいずれかを獲得：',
      fightWinProducer: '選んだ生産者1体',
      fightWinItem: 'ランダムな3つのアイテムのうち1つ',
      pickProducer: '生産者を選ぶ',
      pickItem: 'アイテムを選ぶ',
      reroll: '再抽選',
      rerollDescription: '所持中のアイテムを別のアイテムに再抽選する',
      buyItem: 'アイテムを購入',
      buyItemDescription: 'ランダムな3つのアイテムのうち1つを入手',
      attackDescription: '攻撃が与えるダメージ量。最終的なダメージは攻撃力の80%～120%の間になる',
      healthDescription: '凍って戦えなくなるまでに受けられるダメージ量',
      defenseDescription: '受けるダメージを一定量軽減する',
      critDescription: 'クリティカル率がクリット評価1につき1%上昇。クリティカルヒットは+10ダメージ。クリティカル率が25%を超えると、75%に近づくにつれてクリット評価1あたりの上昇量が減少する。失われた1%ごとにクリットダメージ+0.2。乗算的な攻撃上昇もクリットダメージを増加させる',
      blockDescription: '攻撃をブロックしてダメージを受けない確率を上昇させる',
      boost: '1日分の進行を即時獲得する',
      revenge: {
        name: 'リベンジ',
        description: 'あなたは{0}連敗中。この効果により、雪合戦で勝利するまでステータスが上昇する',
        statsBase: '戦闘に敗北するたびに攻撃力と体力が+5%',
        statsScaling: '戦闘に敗北するたびに攻撃力と体力が+5%、クリット評価+{0}、ブロック評価+{1}。さらに連敗ごとに攻撃力と体力が+{2}%ずつ追加される'
      },
      fighter: {
        snowOwl: '雪のフクロウ',
        dog: '犬',
        cat: '猫',
        penguin: 'ペンギン',
        rabbit: 'ウサギ',
        turtle: 'カメ',
        toddler: '幼児',
        babysitter: 'ベビーシッター',
        kid: '子ども',
        toughKid: 'たくましい子ども',
        teenager: 'ティーンエイジャー',
        bully: 'いじめっ子',
        youngAdult: '若者',
        hooligan: '不良',
        adult: '大人',
        veteran: 'ベテラン',
        wallOfIce: '氷の壁',
        snowBot: 'スノーBOT'
      },
      item: {
        rollingPin: {
          name: 'めん棒',
          description: ''
        },
        forest: {
          name: '森',
          description: ''
        },
        snowCannon: {
          name: 'スノーキャノン',
          description: ''
        },
        shepherd: {
          name: '羊飼い',
          description: ''
        },
        animalTooth: {
          name: '動物の牙',
          description: ''
        },
        collar: {
          name: '首輪',
          description: ''
        },
        chili: {
          name: 'チリ',
          description: ''
        },
        drumstick: {
          name: '骨付き肉',
          description: ''
        },
        mouse: {
          name: 'ネズミ',
          description: 'ペットが攻撃するたびにプレイヤーを1回復する'
        },
        bone: {
          name: '骨',
          description: 'ペットが攻撃するたびに1回復する'
        },
        gravestone: {
          name: '墓石',
          description: 'ペットが凍るとプレイヤーと他のペットを15回復する'
        },
        spikedCollar: {
          name: 'トゲ付き首輪',
          description: 'ランダムなペットにクリットとブロック評価を30付与し、凍結時に別のランダムなペットへ移動する'
        },
        heartCollar: {
          name: 'ハートの首輪',
          description: 'ランダムなペットが一度だけ復活する'
        },
        treatBag: {
          name: 'おやつ袋',
          description: 'ペットは攻撃の代わりに最大体力の50%を回復することを選べる。1袋に3つ分のおやつが入っている'
        },
        tennisBall: {
          name: 'テニスボール',
          description: 'プレイヤーが凍るとすべてのペットが復活する'
        },
        appleJuice: {
          name: 'リンゴジュース',
          description: 'プレイヤーは攻撃の代わりに最大体力の50%を回復することができる。使い切り'
        },
        hotWater: {
          name: 'お湯',
          description: 'プレイヤーは体力25%で一度だけ復活する'
        },
        dumbbell: {
          name: 'ダンベル',
          description: '攻撃時にプレイヤーの攻撃力が0.5増加する'
        },
        target: {
          name: '的',
          description: '攻撃時にプレイヤーのクリット評価が4増加する'
        },
        gloves: {
          name: '手袋',
          description: '攻撃を受けたときにプレイヤーの攻撃力が0.2、クリット評価が1増加する'
        },
        snowboard: {
          name: 'スノーボード',
          description: 'プレイヤーの最初の5回の攻撃が必ずクリティカルになる'
        },
        tea: {
          name: 'お茶',
          description: '敵が凍った後の次の攻撃でプレイヤーは25回復し、必ずクリティカルになる'
        },
        starShield: {
          name: '星の盾',
          description: '最初の3ターン、プレイヤーの防御が5増加する'
        },
        coffee: {
          name: 'コーヒー',
          description: 'クリティカル時にプレイヤーが8回復する'
        },
        pebbles: {
          name: '小石',
          description: 'クリティカル時に対象を1ターン気絶させる'
        },
        sunShield: {
          name: '太陽の盾',
          description: ''
        },
        moonShield: {
          name: '月の盾',
          description: ''
        },
        fireplace: {
          name: '暖炉',
          description: ''
        },
        sharpSnowflake: {
          name: '鋭い雪の結晶',
        },
        candyCane: {
          name: 'キャンディケイン',
          description: ''
        },
        shovel: {
          name: 'シャベル',
          description: ''
        },
        turkey: {
          name: '七面鳥',
          description: ''
        }
      }
    },
    merchant: {
      name: '商人'
    },
    casino: {
      name: 'カジノ',
      prize: '賞金',
      bingo: {
        1: '1x ビンゴ',
        2: '2x ビンゴ',
        3: '3x ビンゴ'
      }
    },
    bank: {
      name: '銀行',
      description: 'トパーズを3つのオプションのいずれかで管理します。1つのオプションを使用すると、他のすべてのオプションが無効になります。ローンの返済は、アクションを必要とせず、消費しません。',
      project: {
        name: 'プロジェクト',
        expandVault: '保管庫を拡張する',
        persuadeInvestors: '投資家を説得する',
        improveCreditScore: 'クレジットスコアを改善する',
        businessMarketing: 'ビジネスマーケティング',
        cardTournament: 'カードトーナメントを主催する',
        fund: '資金を提供する'
      },
      investment: {
        name: '投資',
        description: 'トパーズを投資し、次の銀行イベントで利子を得る。最初の{1}個のトパーズには{0}%の利子を、それ以上には{2}%の利子を得る',
        invest: '投資する'
      },
      loan: {
        name: 'ローン',
        description: '{0}%の利息でトパーズを借り、後で返済する。トパーズの借金は、容量いっぱいのトパーズを手に入れたときに自動的に返済される',
        repay: '返済する',
        borrow: '借りる'
      }
    },
    calendar: 'カレンダー',
    rewards: '報酬'
  },
  globalLevel: {
    name: 'グローバルレベル',
    description: '複数の値の合計に基づく。新機能のアンロックに使用。',
    mining_0: '破壊した鉱山の最大深度',
    mining_1: 'Deepest gas giant rock broken',
    village_0: '最大住居数',
    village_1: 'Crafting milestones hit',
    horde_0: 'ボスを倒した最大ゾーン数',
    horde_1: 'Battle pass level',
    farm_0: '全作物レベルの合計',
    gallery_0: 'Log4(美しさの最大値)',
    debug: 'デバッグ'
  },
  theme: {
    name: 'テーマ',
    icon: {
      hasCustomNavbar: 'カスタムナビゲーションバー',
      hasCustomBackground: 'カスタム背景',
      hasCustomColors: 'カスタムカラーパレット',
      hasCustomUI: 'カスタムUI要素',
      hasAnimations: 'アニメーションを含む',
      hasParticles: 'パーティクルを含む',
    },
    default: 'ブルー',
    cyan: 'シアン',
    green: 'グリーン',
    yellow: 'イエロー',
    orange: 'オレンジ',
    brown: 'ブラウン',
    red: 'レッド',
    pink: 'ピンク',
    purple: 'パープル',
    grey: 'グレー',
    sepia: 'セピア',
    factory: '工場',
    forest: '森',
    cherry: '桜',
    sky: '空',
    polar: '極地',
    prismatic: 'プリズム',
    candlelight: 'キャンドルライト',
    colorful: 'カラフル',
    rain: '雨',
    waves: '波',
    autumnForest: '秋の森',
    frozen: '凍結',
  },
  settings: {
    keybinds: {
      name: 'キーバインド',
      prevMainFeature: {
        name: '前のメイン機能'
      },
      nextMainFeature: {
        name: '次のメイン機能'
      },
      debugSkip1m: {
        name: 'Skip 1 minute'
      },
      debugSkip10m: {
        name: 'Skip 10 minutes'
      },
      debugSkip1h: {
        name: 'Skip 1 hour'
      },
      debugSkip1d: {
        name: 'Skip 1 day'
      }
    },
    theme: {
      name: 'テーマ'
    },
    general: {
      name: '一般',
      pause: {
        name: 'ポーズする'
      },
      dark: {
        name: 'ダークモード'
      },
      autosaveTimer: {
        name: 'オートセーブ'
      },
      lang: {
        name: '言語',
        en: 'English',
        de: 'Deutsch',
        ja: '日本語'
      },
      tabDisplayDesktop: {
        name: 'タブ表示',
        icon: 'アイコンのみ',
        text: 'テキストのみ',
        both: 'アイコンとテキスト'
      },
      tabDisplayMobile: {
        name: 'タブ表示',
        icon: 'アイコンのみ',
        text: 'テキストのみ',
        both: 'アイコンとテキスト'
      },
      relativeUpgradeStats: {
        name: '相対的なアップグレードの統計',
        description: 'アップグレード前/アップグレード後の値の代わりに差分を表示'
      },
      useLegacyFarmSelect: {
        name: '旧農場選択',
        description: '農場内の作物や建物を選択するには、旧メニューを使用します'
      },
      showFormulas: {
        name: '数式を表示',
      },
      numberFormatting: {
        name: '数値表記',
        standard: '標準',
        scientific: '科学表記',
        engineering: '工学表記'
      },
      showDetailedPatchnotes: {
        name: '詳細なパッチノートを表示'
      },
      showAllCards: {
        name: 'すべてのカードを表示'
      },
      showEfficiencyStats: {
        name: '効率統計を表示'
      }
    },
    automation: {
      name: '自動化',
      progressMining: {
        name: '採掘の自動進行制限',
        description: '初めて岩を壊すとき、岩を壊すのにかかる時間がX秒以下なら、自動的に次の深度に進む'
      },
      fightHordeBoss: {
        name: '群集のボスと自動戦闘'
      }
    },
    performance: {
      name: 'パフォーマンス',
      upgradeListItems: {
        name: 'ページごとのアップグレード'
      },
      cssShadows: {
        name: 'テキストのシャドウ',
        0: 'なし',
        1: 'シンプル',
        2: 'スムーズ'
      },
      cssAnimations: {
        name: 'CSSアニメーション'
      },
      particleAmount: {
        name: 'パーティクルの量',
        0: 'なし',
        1: '減らす',
        2: '平均',
        3: '増やす'
      },
    },
    notification: {
      name: '通知',
      position: {
        name: '位置',
        0: '上左',
        1: '上',
        2: '上右',
        3: '下右',
        4: '下',
        5: '下左'
      },
      autosave: {
        name: 'オートセーブヒント'
      },
      backupHint: {
        name: 'バックアップヒント',
        0: 'オフ',
        1: 'まれ',
        2: '平均',
        3: '一般'
      },
      updateCheck: {
        name: 'アップデートの確認'
      },
      note: {
        name: 'メモのヒント'
      },
      achievement: {
        name: '実績のヒント'
      },
      heirloom: {
        name: '家宝のヒント'
      },
      cardPackContent: {
        name: 'カードパックの内容'
      },
      cropReady: {
        name: '作物の収穫準備完了'
      }
    },
    confirm: {
      name: '確認',
      prestige: {
        name: 'プレステージ'
      },
      gem: {
        name: '宝石購入'
      },
      eventToken: {
        name: 'イベントトークン購入'
      },
      farmRareResources: {
        name: '希少農場リソース購入'
      },
      treasureDelete: {
        name: '財宝削除'
      }
    },
    experiment: {
      name: '実験的',
      warning: 'これらの設定はまだ実験的なもので、バグがあったり、未完成であったり、パフォーマンスが重かったり、混乱を招く可能性があります。使用する場合はフィードバックを残してください！このセクションが空の場合、実験的な設定はその時点では利用できません',
      currencyLabel: {
        name: '通貨ラベルを表示する',
        description: 'カーソルを合わせることなく、通貨の獲得量と定員に達するまでの時間を表示する'
      }
    }
  },
  statBreakdown: {
    base: '基本値',
    min: '最小値',
    max: '最大値',
    globalLevel: 'グローバルレベル',
    prestige: 'プレステージ',
    graniteBreaksMult: 'Log10 破壊',
    miningTemperature: '温度',
    miningObsidianPenalty: '強化ペナルティ',
    villageOffering: '供物',
    zoneCleared: 'ゾーンクリア',
    zoneClearedTotal: 'クリアしたゾーンの最大値',
    zone: 'ゾーン',
    hordeMaxDifficulty: '難易度クリア',
    hordeBasicLoot: '基本的な戦利品',
    hordeEquipmentPermanent: '装備効果',
    hordeMastery: '装備マスタリー',
    hordeRest: '休息',
    hordeNostalgia: 'ノスタルジア',
    hordeNostalgiaLost: '家宝発見',
    hordeClassMult: 'クラス倍率',
    hordeClassLevel: 'クラスレベル',
    hordeClassLowerLimit: '下限',
    hordeBattlePass: 'バトルパス',
    hordeEnergy: 'エネルギー',
    hordeMana: 'マナ',
    hordeHealth: '体力',
    hordeTime: '時間',
    hordeSacrifice: '生贄',
    hordeRaid: 'レイド勝利',
    hordeSkeleton: 'スケルトン',
    hordeEnemyActive: '敵がアクティブ',
    farmEarlyGame: '初収穫',
    farmGiantCrop: '巨大作物',
    galleryCanvas: 'キャンバス',
    relicGlyph: 'グリフ',
    cards: 'カード',
    cardsShiny: '光るカード',
    treasure: '宝物',
    eventPower: 'イベントパワー',
    debug: 'デバッグ',
    bankInvestment: '投資',
    alloying: '合金化',
    miningResin: '樹脂',
    cryolab: 'クライオラボ',
    ritualTier: '儀式の階層',
    ritualPotionLevel: 'ポーションのレベル',
    ritualHint: '発見されたヒント',
    ritualIngredient: 'ボーナス成分',
    snowdownRevenge: 'リベンジ',
    interest: '興味',
    multiplier: '乗数',
    grouped: 'グループ化（{0}）',
    generalBonusCompletions: '遺物バッテリー',
  },

  // Feature specific translations
  mining: {
    mine: '掘る',
    gainSummary: 'ヒット時に{0}、破壊時に{1}(x{2})、1秒ごとに{3}得る',
    gainSummaryHit: 'ヒット時に{0}得る',
    gainSummaryBreak: '破壊時に{0}(x{2})得る',
    depthDweller: '深層生物',
    dweller: {
      title: '深層生物の現在の/到達可能な最大深度',
      description1: '生物のスタートは速く、限界に近づくほど遅くなる',
      description2: '現在深度が半分になるごとに、プレステージ報酬が増加する',
      description3: '到達可能な最大深度は、あなたの最大深度の{0}%',
      description4: '深層生物の最大深度',
      descriptionOvercap: '最大深度に達した後、深層生物はボーナス深度を得ることができ、あなたのプレステージ報酬に線形増加を与える。速度は{0}%に減少し、到達可能な最大深度に達した後、10%ごとに速度は再び{0}%に減少します',
      nextTime: '{1}で{0}mに到達します',
    },
    pickaxePower: 'これはあなたのつるはしのパワーと基本ダメージです。より良いつるはしを作ることで増やすことができる',
    damege: 'ダメージ',
    timeToBreak: '現在の岩を壊すのに必要な時間',
    durability: '耐久性',
    durabilityDescription: 'この岩を壊すのに必要なダメージ量',
    durabilityBreaks: {
      s: 'この岩は{0}回壊されました',
      p: 'この岩は{0}回壊されました'
    },
    toughness: '硬度',
    toughnessDescription: '受けるダメージを一定量減少させる',
    toughnessHigh: '硬度がダメージを大幅に減少させています',
    toughnessTooHigh: '硬度が高すぎてダメージを与えられない',
    scrapDescription: 'この岩を1回以上破壊してからダメージを与えるたびにスクラップを得る。あなたが岩を破壊したとき、あなたは{0}倍のスクラップ報酬を得る',
    scrapNotBroken: 'この岩は一度も割られたことがないため、まだスクラップを得ることはない',
    oreNotBroken: 'この岩はまだ割られていないため、まだ鉱石を得ることはない',
    oreDescription: {
      short: '{0}m以下で見つけることができる',
      long: '{0}m～{1}m、または深度が{2}で割り切れる場合はそれ以下で見つけることができる'
    },
    rareEarthNotBroken: 'この岩は一度も壊れていないので、希少鉱石はまだ得られません',
    rareEarthDescription: {
      granite: '{0}m以下で、1000回以上破壊された岩から見つけることができる。それ以上の破壊回数が10の累乗を超えるごとに、得られる量が倍増する',
      salt: '{0}m以下で、鉱石がちょうど1つの岩から見つけることができる',
      coal: '{0}m以下で、各岩の最初の破壊時に見つけることができる',
      sulfur: '最も深い岩を破壊したときに、{0}m以下で見つけることができる',
      niter: '{0}m以下で、岩を10の累乗回数で破壊したときに見つけることができる',
      obsidian: 'ピッケルが強化されていない場合に、{0}m以下で見つけることができる',
      deeprock: '現在の深さの各桁の合計が14以上の場合に、{0}m以下で見つけることができる',
      glowshard: '{0}m以下で、限界を超えた1メートルごとに0.1%の確率で見つけることができる。1個獲得するたびにさらに1m掘り進める必要があり、この限界は毎日10%ずつ減少する',
      limestone: '素数の深さで見つけることができます。石灰岩がある深さではスクラップの量が減少します',
      moonshard: '{0}m以下で見つけることができます。ただし、深層生物がその深さに到達している場合のみ',
      phosphorus: '{0}m以下で見つけることができます。ただし、深さが25で割り切れる場合のみ。リンがある深さでは煙は発生しません',
    },
    rareEarthNotAffected: 'この資源は希少鉱石獲得の影響を受けません',
    scrapGainHint: '壊したことのない岩に当たってもスクラップは得られない。すぐに掘り下げるのではなく、より多くのスクラップを集めるために現在の深さに留まる方が賢い場合もある',
    oreCrafting: '鉱石をクリックするとクラフトスロットに追加されます',
    crafting: {
      power: 'パワー',
      purity: '純度',
      impurity: '不純物',
      oreQuality: 'つるはしを作るのに必要な鉱石の量は、鉱石の質で割られます',
      craftPickaxe: 'つるはしをクラフトする',
      purityDescription: '50％の最低品質に達するには、純度が不純物と一致する必要がある。',
      premiumSlot: 'プレミアムクラフトスロット。x1以上の不純物は半減し、純度は2倍になる。',
      minPurity: 'つるはしを作るには、最低0.1%の品質が必要です。'
    },
    craftingDescription: '選択した鉱石を消費し、ランダムなパワー値を持つ新しいつるはしを作成する。そのつるはしが現在のつるはし({0}の威力)よりも優れている場合、そのつるはしと交換する。',
    resinDescription: '樹脂は1個につき30%のパワーと25%の純度を加える。1回のツルハシ製作で{0}個まで使用可能',
    smokeDescription: '全ての煙を消費して、一定のパワーを持つ新しいツルハシを製作する',
    smeltery: '製鉄所',
    smelteryTemperatureDescription: '特定の温度に到達すると、より多くの製錬所のロックを解除できる。また、製錬所は条件を1度上回るごとに速度+{0}%を得る',
    smelteryTemperatureDescription2: 'この製錬所は温度によって速度が+{0}%される',
    smelterySpeedDescription: 'この製錬所の基本時間は{0}',
    smelt: '製錬',
    enhance: '強化',
    enhancement: {
      title: '強化',
      description: 'インゴットを使ってツルハシに強化を適用します。各インゴットには固有の強化効果があり、複数回適用可能です。',
      disableDescription: 'すべての強化を一時的に無効化して黒曜石を再び集めることができますが、適用されている強化の数に応じて入手量は減少します。',
      maximumDescription: '強化には上限があります。どの強化をツルハシに付けるか慎重に考えてください。',
      barAluminium: '軽量',
      barBronze: '頑丈',
      barSteel: '鋭い',
      barTitanium: '掘削機',
      barShiny: '豊か',
      barIridium: '溶融',
      barDarkIron: '空虚',
    },
    gasGain: {
      0: '獲得 ',
      1: '％の取得可能な',
      2: ' をこの岩を壊したときに得られます。最大で ',
      3: ' をこの階層で得られます'
    },
    beacon: {
      noBeacon: 'ビーコンなし',
      clickToPlace: 'クリックしてビーコンを設置',
      selectToPlace: '設置するビーコンを選択',
      place: '設置',
      remove: 'ビーコンを削除',
      removeDescription: 'ビーコンはいつでも削除できますが、次に削除できるまで20時間待つ必要があります',
      removeCooldown: '{0} 待つと再びビーコンを削除できます',
      piercing: '貫通のビーコン',
      rich: '富のビーコン',
      wonder: '驚異のビーコン',
      hope: '希望のビーコン',
    },
    anomaly: {
      name: '異常体',
      toughness: 'この岩は100倍の耐久力を持ちます',
    },
  },
  village: {
    job: {
      name: '仕事',
      collector: '採集者',
      farmer: '農家',
      harvester: '収穫者',
      miner: '採掘師',
      wellWorker: '井戸汲み',
      librarian: '司書',
      glassblower: 'ガラス製造人',
      entertainer: 'エンターテイナー',
      lumberjack: '木こり',
      blastMiner: '爆破鉱夫',
      fisherman: '漁師',
      scientist: '科学者',
      gardener: '庭師',
      oilWorker: '石油労働者',
      sculptor: '彫刻家',
      explorer: '探検家',
    },
    policy: {
      name: '政策',
      taxes: '税',
      immigration: '移民',
      religion: '宗教',
      scanning: 'スキャン',
    },
    crafting: {
      unlockNew: '新しいクラフトレシピ: ',
      owned: '{0} 所持',
      changeStat: {
        value: '価値を{0}に増加',
        timeNeeded: 'クラフト時間を{0}に短縮'
      },
      nextEffect: '次のクラフト効果',
      special: {
        description: '特殊なクラフトは作成時に恒久的なボーナスを提供し、プレステージ時に進行がリセットされません。クラフトのたびにコストが増加し、マイルストーンは存在しません'
      },
      crafts: '{0} / {1} 回クラフト',
      sellEvery: '約{0}ごとに1つ売却',
      sellPrice: '売却価格（価値: {0}）',
      rope: 'ロープ',
      woodenPlanks: '木の板',
      brick: 'レンガ',
      screws: 'ネジ',
      waterBottle: '水のボトル',
      cocktailGlass: 'カクテルグラス',
      boomerang: 'ブーメラン',
      polishedGem: '磨かれた宝石',
      oilLamp: 'オイルランプ',
      shower: 'シャワー',
      pouch: 'ポーチ',
      cupboard: '戸棚',
      weight: '重り',
      scissors: 'はさみ',
      herbTea: 'ハーブティー',
      glasses: '眼鏡',
      arrows: '矢',
      bowl: 'ボウル',
      chain: '鎖',
      spear: '槍',
      goldenRing: '金の指輪',
      poisonedArrows: '毒矢',
      frostSpear: '氷の槍',
      spicySoup: 'スパイシースープ',
      stopwatch: 'ストップウォッチ',
      smallChest: '小さな宝箱',
      bush: '茂み',
      handSaw: '手のこぎり',
      garage: 'ガレージ',
      diamondRing: 'ダイヤの指輪',
    },
    buildings: '建物',
    village: '村',
    pray: '祈り',
    unemployed: '失業者',
    unemployedDescription: '失業者は資源を生み出さない。彼らを以下の仕事に割り当ててください。',
    taxpayers: '納税者',
    taxpayersDescription1: 'すべての勤労市民は、1秒間に各食べ物を{0}まで消費し、消費した食べ物1つにつき{1} ',
    taxpayersDescription2: 'に相当する税金を支払う',
    happinessDescription: '幸福はすべての資源獲得量を修正する（金貨と信仰を除く）',
    powerDescription: '各パワーのすべての資材と食料の獲得量を+20%増加させる。現在のパワーは資材と食料の獲得量をx{0}倍にする。',
    pollutionDescription: '汚染1点につき、幸福度を1%減少させる。汚染度が許容度を超えている場合、幸福度のペナルティは汚染度が許容度を超えるごとに1%増加する。次に汚染された場合、幸福度は{0}%減少します。',
    lootDescription: 'バーが満タンになるたびに新しい戦利品を見つける',
    lootRarity: '戦利品の質は戦利品のレアリティ配分を決定する:',
    lootNeedQuality: '{0}以上の品質が必要',
    buildingStat: '総建築数',
    housingStat: '建築された住宅総数（1建築物につき始めの25件のみ）',
    coinNotAffected: 'コインは 「全資源獲得」の影響を受けない',
    faithNotAffected: '信仰は 「全資源獲得」と 「精神資源獲得」の影響を受けない',
    artisanDescription: '職人を任命し、アイテムを作ってもらうことができる',
    counterDescription: 'カウンターは、村人に工芸品を売るために使うことができる',
    offering: {
      name: '供物',
      description: {
        0: '',
        1: 'を捧げて',
        2: 'と供物の増加 ',
        3: '/h'
      },
      sacrifice: '捧げる',
      notUnlocked: 'この供物はまだアンロックされていません。まだ供物を使うことはできますが、捧げることはできず、供物のロックを解除するまで資源容量は適用されません',
      notUnlockedHint: 'この供物はまだアンロックされていないので、資源容量はまだ適用されません'
    },
    material: '材料',
    food: '食べ物',
    mental: '精神的資源',
    loot: '戦利品',
    specialIngredient: '特別な食材',
    foodConsume: '毎秒最大{0}消費'
  },
  horde: {
    horde: '群衆',
    zone: 'ゾーン',
    player: 'プレイヤー',
    enemy: '敵',
    loadoutName: 'ロードアウト名',
    newLoadout: '新しいロードアウト',
    noLoadouts: 'ロードアウトなし',
    monsterPartHint: 'ゾーン10以上に進み、敵の101番に到達すると新しい通貨を発見できる！この通貨は骨の容量を上げるのに役立つので、さらに前進するのに不可欠だ。',
    enemyDescription: '同じゾーンにいる敵はそれぞれ、前の敵と比べて攻撃力がx{0}、体力がx{1}、骨が+{2}%されている。これは敵#{3}で、攻撃力x{4}、ヘルスx{5}、骨+{6}%。これらの効果はすべて死ぬとリセットされる。',
    enemyDescriptionClasses: '同じゾーンにいる各敵は、前の敵と比べて攻撃力がx{0}、体力がx{1}、血液が+{2}%である。これは敵#{3}で、攻撃力x{4}、体力x{5}、血液+{6}%。これらの効果はすべて死ぬとリセットされる。',
    enemySigil1: {
      s: 'このゾーンの敵は{0}の紋章を持っている',
      p: 'このゾーンの敵は{0}の紋章を持っている',
    },
    enemySigil2: {
      s: '.',
      p: '{0}種類の中から選ばれる。',
    },
    damageTypes: {
      title: 'ダメージタイプ',
      description: 'それぞれの攻撃には3種類のダメージタイプがある。与えるダメージと受けるダメージはダメージタイプごとに変更できる。',
      dealt: '与える',
      taken: '受ける',
      physic: '物理',
      magic: '魔法',
      bio: '生物'
    },
    itemFindDescription: '敵を倒した後、この装備を見つけるチャンスがある。',
    attackDescription: '1回の攻撃で与えるダメージ量',
    attackConversion: {
      text: '通常攻撃は1秒ごとに発生し、以下のようなダメージ配分となっている: ',
      physic: '{0}%物理ダメージ',
      magic: '{0}%魔法ダメージ',
      bio: '{0}%生物ダメージ',
      strengthAmp: '体力1点につき通常攻撃のダメージが＋{0}%増加し、合計＋{1}%増加する。これにより、あなたの通常攻撃のダメージは{2}まで増加する。'
    },
    healthDescription: '死ぬまでに受けることのできるダメージの量',
    respawnDescription: '死から回復するのに必要な時間',
    reviveDescription: '死ぬ代わりに、復活を使って完全な体力に回復する',
    critDescription: '通常攻撃は、ダメージが増加するクリティカルになることがあります。クリティカル確率は100%を超えることがあり、その場合攻撃ダメージが複数回増加します。',
    toxicDescription: '攻撃時に与えたダメージの割合に等しい毒ダメージを与える。',
    divisionShieldDescription: '受ける全てのダメージを (分割の盾+1) で割り、攻撃された後に分割の盾を1失う',
    divisionShieldReplenishDescription: '敵を倒すと、失われた分割の盾の{0}%を回復します。',
    firstStrikeDescription: 'これが最初の攻撃の場合、ボーナスの魔法ダメージを与える',
    spellbladeDescription: '装備効果を使用した後にボーナス魔法ダメージを与える。クールダウンが10秒以下の装備品の効果の場合、この効果は常に働くとは限らない',
    cuttingDescription: '攻撃後、対象の現在の体力の一定割合を生物ダメージとして与える',
    recoveryDescription: '敵を倒した後、不足した体力の一定割合を回復する',
    defenseDescription: '受けるダメージを最大体力の一定割合分減らす',
    executeDescription: '敵が一定の体力を下回ったら即座に殺す',
    hasteDescription: '戦闘アクティブのクールダウンを短縮します。',
    hasteFormula: 'CD = 基本CD / (1 + HASTE / 100)',
    energyDescription: '一部の発動にはエネルギーが必要です。時間経過で自動的に補充される',
    manaDescription: '一部の発動にはマナが必要。時間の経過とともにゆっくりと補充される',
    boss: 'ボス',
    raidboss: 'レイドボス',
    rareLoot: 'レア戦利品',
    rareLootDescription: '数分ごとに、倒した敵がレア戦利品を落とします。',
    poisonPlayer: 'あなたは毒状態で、毎秒{0}のダメージを受ける',
    poisonEnemy: 'この敵は毒状態で、毎秒{0}のダメージを受ける',
    silencePlayer: 'あなたは沈黙状態で、アクティブスキルを使えない',
    silenceEnemy: 'この敵は沈黙状態で、アクティブスキルを使えない',
    stunPlayer: 'あなたはスタン状態で、攻撃できない',
    stunEnemy: 'この敵はスタン状態で、攻撃できない',
    shieldbreak: '分割の盾をより速く破壊する',
    statusResist: '状態異常からの回復が速くなる',
    stunBoss: 'ボスはスタン耐性が+2される',
    bossBioResist: 'ボスは生物学的ダメージを10%しか受けないが、魔法ダメージを35%多く受ける',
    enemyRespawn: '敵のリスポーンには{0}かかり、最大{1}の敵が待機していることがある。ボスを倒すと即座に全ての敵がリスポーンする',
    bossBonusDifficulty: 'ボスの難易度',
    bossNoReward: 'このボスとはどの難易度でも再戦できるが、報酬は得られない',
    energyIncompatible: '現在選択中のクラスでは、このトリンケットを使用できません（エネルギーが必要です）',
    manaIncompatible: '現在選択中のクラスでは、このトリンケットを使用できません（マナが必要です）',
    taunt: {
      title: '挑発モード',
      description: '挑発すると、誰も待機していなくても敵が出現し続けるが、早めに出現した敵は戦利品を持たない。挑発はボスに到達するときのみ有効である。',
      on: '挑発モードはオン',
      off: '挑発モードはオフ',
      clickToToggle: 'クリックして切り替える'
    },
    reachBoss: {
      title: 'ボスに到達する',
      description: 'このゾーンのボスに挑戦するには、{0}の敵を死なずに倒す必要がある。'
    },
    fightBoss: {
      title: 'ボスと戦う',
      description: 'このゾーンのボスに挑戦するのに十分な数の敵を倒した'
    },
    fleeBoss: {
      title: 'ボスから逃げる',
      description: 'この戦いから逃げて、普通の敵と戦い続ける'
    },
    defeatedBoss: {
      title: 'ボスを倒した',
      description: 'このゾーンのボスを倒したので、次のゾーンに移動できるようになります'
    },
    souls: 'ソウル',
    stat: {
      crit: 'クリティカル'
    },
    rampage: {
      name: '暴走',
      description: '同じ敵と長時間戦い続けると、敵が怒り出す！この敵とは{0}戦っており、{1}ごとに暴走を始める。',
      effect: '敵が暴走するたび、攻撃力がx{0}増加し、状態異常耐性が+{1}され、攻撃力低下効果に対して無効になります。',
      effectCurrent: 'この敵はこれまでに{0}回暴走しました。攻撃力はx{1}、状態異常耐性は{2}です。',
    },
    sigil: {
      name: '紋章',
      hasActive: 'アクティブな効果を持つ',
      min: 'ゾーン{0}以上で出現する',
      special: '特殊な条件でのみ出現する',
      inactive: '非アクティブ',
      power: '力',
      health: '体力',
      bashing: 'バッシング',
      recovery: '回復',
      toughness: 'タフネス',
      strength: '力',
      magic: 'マジック',
      magicBolt: 'マジックボルト',
      fireball: '火の玉',
      incorporeal: '無体',
      focus: '集中',
      wisdom: '知恵',
      sparks: '火花',
      protection: '保護',
      shielding: '遮蔽',
      resistance: '抵抗',
      precision: '精密',
      screaming: '悲鳴を上げる',
      cure: '治療',
      sharp: '鋭い',
      spitting: '唾吐き',
      burst: 'バースト',
      resilience: '回復力',
      growing: '成長',
      cold: '冷気',
      fury: '怒り',
      angelic: '天使のような',
      toxic: '毒性',
      foulBreath: '汚い息',
      nuke: '核',
      rainbow: '虹',
      drain: '吸収',
      shocking: '衝撃',
      defense: '防御',
      executing: '実行',
      raidRage: 'レイド激怒',
      monstrousToughness: '怪物的なタフネス',
      berserk: '凶暴化',
      iceGiant: '氷の巨人',
      generic: 'ジェネリック',
    },
    corruption: {
      name: '腐敗',
      effects: '効果',
      power: '攻撃力と体力 x{0}',
      sigil: '紋章+{0}',
      revive: '復活+{0}',
      execute: '実行+{0}%'
    },
    activeCooldown: 'アクティブなクールダウン',
    activeBuffFor: '{0}間:',
    itemsEquipped: '使用した装備スロット',
    cleared: 'クリア済み',
    fighting: '格闘',
    equipment: {
      name: '装備品',
      usableInStun: '気絶状態でも使用可能',
      utilityOvertime: 'ユーティリティ・アクティブは前のチャージの半分の速度で複数のチャージを蓄えることができる',
      inactive: '非アクティブな戦闘アクティブは、通常の{0}%の速度でクールダウンが回復します',
      takeEquipped: '装備を取る',
      dagger: '短剣',
      shirt: 'シャツ',
      guardianAngel: '守護天使',
      milkCup: 'ミルクカップ',
      starShield: '星の盾',
      longsword: '長剣',
      mace: 'メイス',
      boots: 'ブーツ',
      liver: '肝臓',
      fireOrb: 'ファイヤーオーブ',
      campfire: 'キャンプファイヤー',
      clover: 'クローバー',
      snowflake: '雪の結晶',
      oppressor: '抑圧者',
      toxin: '毒素',
      corruptEye: '腐敗した目',
      meatShield: '肉の盾',
      wizardHat: '魔法使いの帽子',
      redStaff: '赤い杖',
      cleansingSpring: '浄化の泉',
      marblePillar: '大理石の柱',
      rainbowStaff: '虹の杖',
      antidote: '解毒剤',
      brokenStopwatch: '壊れたストップウォッチ',
      luckyCharm: '幸運のお守り',
      mailbreaker: 'メイルブレーカー',
      club: 'クラブ',
      goldenStaff: '黄金の杖',
      toxicSword: '毒の剣',
      scissors: 'はさみ',
      cat: '猫',
      healthyFruit: '健康な果物',
      glasses: '眼鏡',
      deadBird: '死んだ鳥',
      shieldDissolver: 'シールド溶解剤',
      calmingPill: '鎮静剤',
      cleansingFluid: '洗浄液',
      forbiddenSword: '禁断の剣',
      corruptedBone: '破損した骨',
      plaguebringer: '疫病をもたらすもの',
      forbiddenShield: '禁断の盾',
      dangerShield: '危険な盾',
      forbiddenToxin: '禁断の毒素',
      glowingEye: '光る目',
      experimentalVaccine: '実験的なワクチン',
      microscope: '顕微鏡',
      moltenShield: '溶けた盾',
      cutter: 'カッターナイフ',
      book: '本',
      chocolateMilk: 'チョコレートミルク',
      bigHammer: '大きなハンマー',
      spookyPumpkin: '不気味なカボチャ',
      strangeChemical: '奇妙な化学薬品',
      forbiddenHeartShield: '禁断のハートシールド',
      cloudStaff: '雲の杖',
      secretWeapon: '秘密の武器',
      bomb: '爆弾',
      leechingStaff: '吸血の杖',
      shatteredGem: '砕けた宝石',
      hourglass: '砂時計',
      glue: '接着剤',
      firework: '花火',
      bowTie: '蝶ネクタイ',
      forbiddenStopwatch: '禁断のストップウォッチ',
      mysticalAccelerator: '神秘的な加速器',
      blazingStaff: '燃える杖',
      stoneplate: 'ストーンプレート',
      shield: '盾',
      armor: '鎧',
      natureStone: '自然石',
      evergrowingVine: '増える蔓',
      energyDrink: 'エナジードリンク',
      dragonheart: 'ドラゴンハート',
      prism: 'プリズム',
      deathsword: '死の剣',
      needle: '針',
      mine: '地雷',
      maskOfJoy: '喜びのマスク',
      doubleEdgedSword: '両刃の剣',
      critCore: 'クリティカルコア',
      heavyGauntlet: 'ヘビーガントレット',
      dumbbell: 'ダンベル',
      essenceExtractor: 'エッセンス抽出器',
      spellbook: '呪文書',
      forbiddenScissors: '禁断のはさみ',
      basicSpear: '基本の槍',
      cursedEye: '呪われた目',
      
      // Blessed equipment
      blessedSword: '祝福の剣',
      blessedArmor: '祝福の鎧',
      blessedBow: '祝福の弓',
      blessedFlame: '祝福の炎',
      blessedWater: '祝福の水',
      blessedShield: '祝福の盾',

      // Chess pieces
      pawn: 'ポーン',
      knight: 'ナイト',
      bishop: 'ビショップ',
      rook: 'ルーク',
      queen: 'クイーン',
      king: 'キング'
    },
    active: {
      damagePhysic: {
        0: '付与',
        1: '物理ダメージ'
      },
      damageMagic: {
        0: '付与',
        1: '魔法ダメージ'
      },
      damageBio: {
        0: '付与',
        1: '生物ダメージ'
      },
      maxdamagePhysic: {
        0: '付与',
        1: '敵の体力の物理ダメージ'
      },
      maxdamageMagic: {
        0: '付与',
        1: '敵のヘルス魔法ダメージ'
      },
      maxdamageBio: {
        0: '付与',
        1: '敵の体力の生物ダメージ'
      },
      heal: {
        0: '回復',
        1: '体力'
      },
      bone: {
        0: '獲得',
        1: '最大のゾーンの骨'
      },
      blood: {
        0: '獲得',
        1: '最高の難易度の血液'
      },
      monsterPart: {
        0: '獲得',
        1: '最大のゾーンのモンスターの部位'
      },
      stun: {
        0: '相手をスタンさせる',
        1: ''
      },
      silence: {
        0: '相手を沈黙させる',
        1: ''
      },
      revive: {
        0: '補充',
        1: '復活'
      },
      removeAttack: {
        0: '除去',
        1: '相手からの攻撃'
      },
      poison: {
        0: '適用',
        1: '毒'
      },
      antidote: {
        0: '除去',
        1: '毒'
      },
      permanentStat: {
        0: '',
        2: '',
        1: '(プレステージまで)'
      },
      gainStat: {
        0: '',
        2: '',
        1: '(永続)'
      },
      divisionShield: {
        0: '獲得',
        1: '分割の盾'
      },
      removeDivisionShield: {
        0: '除去',
        1: '相手からの分割の盾'
      },
      executeKill: {
        0: '以下の敵を殺す',
        1: '体力'
      },
      refillEnergy: {
        0: '回復',
        1: 'エネルギー'
      },
      refillMana: {
        0: '回復',
        1: 'マナ'
      },
      buff: {
        duration: 'バフの持続時間',
        suffix: '(バフ)',
      },
      canCrit: '{0}%の効率でクリティカルを出せる',
      canCritDiff: 'アクティブなクリティカル効率',
      reviveAll: 'すべての復活を補充する',
      removeStun: 'スタンを解除する',
      addStack: 'この装備のステータスを上げる（プレステージまで有効）',
      baseValue: '基礎値',
    },
    heirloom: {
      name: '家宝',
      tabName: '家宝',
      boost: {
        name: '家宝ブースト',
        description: 'この家宝のブーストレベルは{0}で、その効果が増加します（^{1}）：',
      },
      min: 'ゾーン{0}以上で出現する',
      special: 'レア戦利品には出現しません',
      description: '家宝は強力なアーティファクトで、レア戦利品から入手でき、一度手に入れると永続します。より高いゾーンに到達すると、さらに多くの種類を見つけられます',
      descriptionTower: '家宝は{0}階ごとに見つけることができる強力なアーティファクトで、永遠に残る。より多くの種類を見つけるには、より高いゾーンか別の塔に到達しよう',
      descriptionDouble: '最低額の家宝は2倍の確率で与えられる。最低額の家宝が複数ある場合はこの限りではない',
      descriptionNostalgia: 'ノスタルジアは家宝を見つける確率を高めます。ノスタルジアの力を借りて家宝を見つけた場合、次のプレステージまでノスタルジアを1取り除く',
      power: '力',
      fortitude: '不屈',
      wealth: '富',
      spirit: '精神',
      sharpsight: '鋭い視線',
      reaping: '刈り取り',
      remembrance: '追憶',
      holding: '保持',
      expertise: '専門知識',
      mystery: '謎',
      freezing: '凍結',
      brick: 'レンガ',
      heat: '熱',
      ice: '氷',
      crystal: 'クリスタル',
      vitality: '活力',
      nature: '自然',
    },
    itemMastery: {
      name: 'マスタリー',
      description: 'この装備を使ってゾーン{0}以上でボスを倒すか、レア戦利品を入手すると熟練度ポイントを獲得できます。より高いゾーンほど、より多くの熟練度ポイントが得られます。',
      bonuses: 'マスタリーレベルを上げて、この装備のボーナスをアンロックする',
      current: 'この装備のマスタリーポイントは{0} / {1}です',
      1: 'プレステージ後も装備を維持する',
      2: 'パッシブ効果を+{0}%ブーストするために装備品のアクティブを無効にするオプションを追加する',
      3: 'プレステージ後も装備品のレベルを維持する',
      4: 'アクティブの効果が1.5倍になり、アクティブを無効化すると+{0}%ではなく+{1}%のブーストが適用されます',
      5: '神秘の欠片を{0}個まで集めることができる。この値は各マスタリーごとにさらに{1}増加する',
    },
    raid: {
      title: 'レイド',
      name: 'レイド',
      description: 'レイドはレイドキーが必要な特別な場所です。強力なレイドボスに挑戦してステータスを上げ、家宝を永久的に強化しましょう。',
      keyDescription: 'レイドボスを初めて倒すと{0}個のレイドキーを入手し、1日ごとに{1}個のレイドキーを獲得します（次回は{2}後）',
      victory: 'レイド勝利',
      victoryDescription: '{0}体のレイドボスを倒しました。プレステージまでステータスが上昇します。倒したレイドボスごとに次の効果を得ます：',
      raidbossDescription: 'レイドボスを倒すとレイドキーの所持上限が増加し、次のレイドボスの難易度も上がります。現在のレイドボスはゾーン{0}のボスと同程度の強さです。より強力なレイドボスを倒すと、家宝ブーストがより良くなります。',
      raidbossFail: 'レイドボスに敗北すると、前のレイドボスの報酬を代わりに獲得します。',
      fight: '戦う',
      slay: '討伐',
      slayAll: 'すべて討伐',
      slayDescription: 'レイドキーを使って、戦わずに最も強い討伐済みレイドボスの報酬をすべて獲得できます。前回のレイド勝利で家宝ブーストを選んでいない場合は、ランダムで選ばれます。',
      slayConvert: '所持可能なレイドキー数を超えて入手すると、自動的にこの処理が行われます。',
    },
    element: {
      elementalUpgrade: '{0}属性',
      elementalStats: '{0}アップグレード',
      enemyStats: '敵のステータス',
      enemyActive: '敵のアクティブ',
      enemyActiveDescription: '敵のアクティブの威力を強化し、新しいアクティブは0, 20, 35, 50でアンロックされます',
      playerElement: 'プレイヤー属性',
      ice: '氷',
      thunder: '雷',
      water: '水',
    },
    tower: {
      name: 'タワー',
      description: 'タワーは、タワーキーを使って入る特別な場所です。死ぬまで敵と戦い、クラウンやユニークな継承品を手に入れることができます。特定の階層に到達すると、恒久的なボーナスがアンロックされます',
      zoneDescription: 'このタワーで到達した最高階の敵は、ゾーン{0}の敵と同程度の強さです。ゾーン{1}の敵の強さから始まり、階ごとにゾーン{2}分のステータスが上昇します',
      floorTitle: '最高到達階層',
      floorDescription: '特定の階層の敵を倒すと、恒久的なボーナスをアンロックできます:',
      rewardTitle: '報酬',
      rewardDescription1: '敵を1体倒すごとに{0}クラウン獲得',
      rewardDescription2: '敵は{0}階ごとに継承品を落とします。一部の継承品はこのタワー限定です:',
      keyDescription: '新しいタワーをアンロックすると{0}個のタワーキーを獲得し、毎週1個（次は{1}後）入手できます',
      enter: '入る',
      enterCost: '必要',
      floor: '{0}階',
      brick: 'レンガのタワー',
      fire: '火のタワー',
      ice: '氷のタワー',
      danger: '危険のタワー',
      toxic: '毒のタワー',
      forest: '森のタワー',
    },
    classes: {
      level: 'クラスレベル',
      levelDescription: '時間経過でクラスレベルを獲得し、血量の獲得量、血量の上限、勇気の獲得量が増加します。クラスレベルごとに{0}スキルポイントも獲得します。',
      skill: 'スキル',
      skillPointsLeft: '残りスキルポイント: {0}',
      skillPointCost: 'レベルアップに{0}スキルポイント必要',
      skillTreeChoice: 'ここではスキルを一つ選ぶ必要があります。選んだスキルにより他のルートはロックされます',
      stanceClick: '構え - クリックで切り替え',
      skillName: {
        energyConvert: 'エネルギー変換',
        stab: '突き',
        combatHeal: '戦闘回復',
        brawl: '乱闘',
        spark: 'スパーク',
        smash: 'スマッシュ',
        lootSearch: '戦利品探索',
        doubleStrike: '二段攻撃',
        smallFireball: '小火球',
        fullRecovery: '完全回復',
        supercharge: 'スーパー充電',
      
        energyOnCrit: 'エネルギーの奔流',
        longshot: 'ロングショット',
        eagleEye: 'イーグルアイ',
        fireArrows: '火矢',
        poisonArrow: '毒矢',
        healOnCrit: '再生',
        reduceCooldownOnCrit: '容赦なき連撃',
        bloodOnCrit: '血の味',
        shockArrow: 'ショックアロー',
        sharpArrow: '鋭利な矢',
        sharpMind: '鋭敏な思考',
        forestBlessing: '森の祝福',
      
        manaRest: 'マナ回復',
        magicMissile: '魔法ミサイル',
        fireball: '火球',
        shockBlast: '衝撃爆発',
        heal: '回復',
        barrier: 'バリア',
        earthquake: '地震',
        manasteal: 'マナ吸収',
        waterBolt: '水の矢',
        iceBlast: '氷の爆発',
        focus: '集中',
        smite: '打撃',
        conjure: '召喚',
        ascend: '上昇',
        deepFocus: '深い集中',
      
        damageRamp: '増加ダメージ',
        heavyHit: '強打',
        shieldBash: '盾突き',
        statRamp: '増加力',
        refuge: '避難',
        consecrate: '聖別',
        blessing: '祝福',
        fortify: '強化',
        parry: 'パリィ',
        smite2: '打撃',
      
        challenge: '挑戦',
        parrotAttack: 'オウム攻撃',
        plunder: '略奪',
        bottleOBrew: '秘薬の瓶',
        bombToss: '爆弾投げ',
        cannonball: '大砲弾',
        invigoratingBottle: '活力の瓶',
        treasureChest: '宝箱',
        bountyBoard: '賞金掲示板',
        pirateShip: '海賊船',
      
        sneak: '隠密',
        elementOfSurprise: '奇襲の要素',
        backstab: '背後攻撃',
        smokeBomb: '煙幕弾',
        comboStrike: 'コンボ攻撃',
        cursedDagger: '呪われた短剣',
        swiftStrike: '迅速攻撃',
        shuriken: '手裏剣',
        knockout: 'ノックアウト',
        hiddenExplosive: '隠し爆弾',
        herbTea: '薬草茶',
        meditation: '瞑想',
        flow: 'フロー',
        pickpocket: 'スリ',
        secretTechnique: '秘技',
      
        combatStance: '戦闘構え',
        lootingStance: '略奪構え',
        learningStance: '学習構え',
        crimsonPact: '紅の契約',
        crimsonRitual: '紅の儀式',
        reincarnation: '輪廻',
        crimsonCurse: '紅の呪い',
        sacrificialDagger: '生贄の短剣',
        crimsonHeart: '紅の心',
        despair: '絶望',
        drainLife: '生命吸収',
        hex: '呪詛',
        darkRitual: '闇の儀式',
        occultRestoration: 'オカルト修復',
        harvest: '収穫',
        summonAbomination: '忌まわしき者召喚',
        occultThunder: 'オカルトサンダー',
      },
      adventurer: {
        name: '冒険者',
        description: 'あらゆる状況に対応できる万能型の戦士'
      },
      archer: {
        name: 'アーチャー',
        description: 'クリティカル攻撃と継続ダメージに特化した遠距離戦士'
      },
      mage: {
        name: 'メイジ',
        description: '呪文を駆使して敵を素早く倒し、自動詠唱が可能な戦士'
      },
      knight: {
        name: 'ナイト',
        description: '耐久力に優れ、強敵にも対応できる遅攻型の戦士'
      },
      assassin: {
        name: 'アサシン',
        description: '素早く敵を倒すことに特化した機敏な戦士'
      },
      shaman: {
        name: 'シャーマン',
        description: '自然と結びついた戦士で、回復と毒を駆使して戦う'
      },
      pirate: {
        name: 'パイレーツ',
        description: '戦闘には向かないが、略奪には優れる'
      },
      undead: {
        name: 'アンデッド',
        description: '戦闘力は弱いが、数でそれを補う戦士'
      },
      cultist: {
        name: 'カルト信者',
        description: '一度に一つの行動に特化する柔軟な戦士'
      },
      scholar: {
        name: '学者',
        description: '他のクラスを支援するサポート型の戦士'
      }
    },
    battlePass: {
      name: 'バトルパス',
      quest: {
        stat: '{0} {1} に到達',
        zone: 'ゾーン{1}を{0}回クリア',
        level: 'レベル{0}に到達',
        boss: '{0}体のボスを倒す（+{1}）'
      },
      statType: {
        base: '基礎{0}',
        total: '合計{0}',
      },
      bossDoubleReward: 'ボスクエストはバトルパスのレベルを2段階進めます',
    },
    enemyName: {
      soldier: '兵士',
      officer: '警察官',
      hunter: 'ハンター',
      sniper: 'スナイパー',
      strongMonkey: '力持ちのサル',
      angryMonkey: '怒ったサル',
      dartMonkey: 'ダーツサル',
      monkeyWizard: 'サルの魔法使い',
      monkeyDefender: 'サルの守護者',
      monkeyMonk: 'サルの僧侶',
      puppy: '子犬',
      kitten: '子猫',
      seal: 'アザラシ',
      piglet: '子ブタ',
      panda: 'パンダ',
      koala: 'コアラ',
      rabbit: 'ウサギ',
      guineaPig: 'モルモット',
    },
    bossName: {
      ohilio_guard1: 'ガードA',
      ohilio_guard2: 'ガードB',
      ohilio: 'オヒリオ',
      chriz1: 'クリズ',
      chriz2: 'クリズ',
      mina: 'ミナ',

      armed_skeleton: 'スケルトン',
    },
    area: {
      zoneEndless: '無限ゾーン',
      zoneBoss: 'ボス（{0}）',
      zone: 'ゾーン{0}',
      digsite: '発掘現場',
      digsiteDescription: '強力なスケルトンボスを倒して、このエリアでモンスターの歯を見つける能力を解放します。',
      digsiteWeakness: 'このスケルトンは{0}クラスに弱く、他のクラスを使用すると攻撃力と体力がx{1}になります。',
      digsiteWeaknessTitle: 'スケルトンの弱点',
      digsiteWeaknessShort: '{0}に弱い',
      difficulty: '{0} 難易度',
      enemyAmount: 'このゾーンには{0}体の敵がいます',
      warzone: '戦争地帯',
      monkeyJungle: 'サルのジャングル',
      loveIsland: 'ラブアイランド',
    },
    sign: {
      sign_1: {
        text: '俺の狙いは完璧だ、絶対に外さない！気をつけたほうがいいぞ！',
        signed: 'ohilio',
      },
      sign_2: {
        text: '俺にダメージを与えられると思っているのか？絶対無理だ！すべて回避する、当てることすらできない！俺は無敵だ！',
        signed: 'ohilio',
      },
      sign_3: {
        text: '俺は最強、最高、完璧、無敗だ！俺の護衛ですら俺には及ばない！俺に勝てると思っているのか？ハッ！覚悟しろ！',
        signed: 'ohilio',
      },
      sign_4: {
        text: 'この可愛い動物たちをよく見ると、本物ではないことに気づく。彼らはただのウィルオウィスプだ！でもなぜここにいる？気分を悪くさせるためか？考える暇はない、進むにはこの動物の精霊たちと戦わなければならない。',
        signed: '???',
      },
    },
    quest: {
      name: 'クエスト',
      description: 'クエストを達成してバトルパスを進め、恒久的な報酬をアンロックしよう',
      completed: '{0} 件完了',
      allCompleted: 'すべてのクエストを完了しました',
    },
    trinket: {
      rarity: {
        0: '未所持',
        1: 'コモン',
        2: 'アンコモン',
        3: 'レア',
        4: 'エピック',
        5: 'レジェンダリー',
        6: 'ミシック',
        7: 'エクストラオーディナリー',
        8: 'ラディアント',
        9: 'プリズマティック',
        10: 'ファイナライズ',
        timeless: '時を越えしもの'
      },
      equipped: '選択中のトリンケット（プレステージ後に装備）',
      vitality: '活力',
      energy: 'エネルギー',
      magic: '魔法',
      fists: '拳',
      sparks: '火花',
      haste: '迅速',
      precision: '精密',
      wrath: '怒り',
      strength: '強さ',
      toxins: '毒素',
      wisdom: '知恵',
      extraction: '抽出',
      learning: '学習',
      preservation: '保存',
      energize: '活力注入',
      automation: '自動化',
      cure: '治癒',
      stone: '石',
      duality: '二元性',
      love: '愛',
    },
    sacrifice: {
      name: '犠牲',
      description: 'ここでは一時的に装備スロットを犠牲にすることで強力なボーナスを得ることができます'
    },
  },
  farm: {
    farm: '農場',
    unlockSeed: '種のアンロック',
    experience: '経験値',
    expToLevelUp: '次のレベルに到達するには{0}以上の収穫が必要です',
    yield: '収穫量',
    rareDrop: 'レアドロップ',
    rareDrops: 'レアドロップ',
    huntedRareDrops: '狩ったレアドロップ',
    addRareDrop: 'レアドロップを追加({0})',
    addRareDropAmount: '{0}の量',
    prestige: {
      description: 'レベル4に到達した作物をプレステージすることで、ボーナスのために現在のレベルをプレステージレベルとして設定できます。これにより、その作物の経験値、レベル、遺伝子がすべてリセットされます。プレステージレベル1ごとに、すべての作物の収穫量がx1.04倍になります。',
      current: '現在のプレステージレベルは{0}で、収穫量はx{1}倍です。',
      next: 'この作物をプレステージすると、プレステージレベルが{0}上昇します。これにより総プレステージレベルが{1}になり、収穫量はx{2}倍になります。',
      nextNoEffect: 'あなたのレベルはこの作物のプレステージレベルより高くありません。プレステージ化してもプレステージレベルは上がりませんが、レベルと遺伝子はリセットされます',
      cropOnField: 'この作物は畑にあるため、今プレステージ化することはできません',
      increasedGLRequirement: 'レベル10に到達した後、作物は2レベルごとにのみグローバルレベルを増加させます',
      noMoreGL: 'レベル40に到達すると、作物はグローバルレベルを増加させなくなります',
    },
    button: {
      plantAll: '選択された作物 ({0}) をすべての空のタイルに植える。空のタイルをクリックすることで、単一の作物を植えることもできます',
      replant: '栽培された作物はすべて収穫され、同じタイルに再び植えられる',
      replantFertilizer: '（可能であれば）同じ肥料が使われる',
      harvestAll: '栽培した作物をすべて収穫する。単一の作物をクリックして収穫することもできる。',
      delete: 'タイルから作物を削除します。使用した資源は返却されます',
      deleteBuilding: '装飾も同様に削除でき、インベントリに戻されます',
      color: 'タイルには色をつけることができる。色を選んでタイルをクリックすると色が塗られる。色を選択している間、マスアクションは同じ色のタイルにのみ影響する',
      colorFilter: 'この色のタイルにのみ影響する',
    },
    timeDescription: '成長に必要な時間',
    overgrowDescription: '作物が完全に成長した後も、さらに成長して収穫量を増加させることができます。100%成長するごとに成長時間は{0}倍されます。',
    overgrowFormula: 'TIME_MULT = (1 / OVERGROW + 1)x',
    fertilizerCostDescription: '作物ごとに必要な肥料',
    goldChance: 'ゴールドチャンス',
    goldChanceDescription: '作物の成長時間と配置された庭園の小人の量に応じて、植物を収穫するとゴールドを得られるチャンスがあります',
    goldChanceMultiple: '100%以上でも金貨の獲得量は増加し、{0}個の金貨を見つけることが保証され、{1}%の確率でさらに1個の金貨を見つけることができます',
    goldChanceWarning: '畑に庭園の小人を置くとゴールドが見つかり始めます',
    specialCropEffect: '次のレベルに到達すると、以下を獲得します：',
    freeUpgrades: {
      s: '残存遺伝子',
      p: '残存遺伝子'
    },
    fertilizerCannotBeBought: '買えない',
    divider: {
      specialCrop: '特殊作物',
      decoration: '装飾',
    },
    crop: {
      carrot: 'にんじん',
      blueberry: 'ブルーベリー',
      wheat: '小麦',
      tulip: 'チューリップ',
      potato: 'じゃがいも',
      raspberry: 'ラズベリー',
      barley: '大麦',
      dandelion: 'たんぽぽ',
      corn: 'とうもろこし',
      watermelon: 'すいか',
      rice: '米',
      rose: '薔薇',
      leek: 'ねぎ',
      honeymelon: 'ハニーメロン',
      rye: 'ライ麦',
      daisy: 'ヒナギク',
      cucumber: 'きゅうり',
      grapes: 'ブドウ',
      hops: 'ホップ',
      violet: 'すみれ',
      sweetPotato: 'さつまいも',
      strawberry: 'いちご',
      sesame: '胡麻',
      sunflower: 'ひまわり',
      spinach: 'ほうれん草',
      currant: 'カラント',
      redwheat: '赤小麦',
      poppy: 'ポピー',
      pumpkin: 'カボチャ',
      blackberry: 'ブラックベリー',
      millet: 'キビ',
      petunia: 'ペチュニア',
      chili: '唐辛子',
      fern: 'シダ',
      reed: 'アシ',
      wildflower: '野生の花',
      cactus: 'サボテン',
      cress: 'クレソン',
      goldenRose: '黄金のバラ',
      ancientFern: '古代のシダ',
    },
    giantCrop: {
      name: '巨大作物',
      regular: '現在は通常の作物を植えています',
      giant: '現在は巨大作物を植えています',
      clickToToggle: 'クリックで切り替え',
      description: 'より大きな収穫のために巨大作物を植えることができます。ステータスは以下の通り修正されています：',
      stat: {
        0: '成長時間が{0}から{1}に増加',
        1: '肥料コストが{0}から{1}に増加',
        2: '全収穫量 x{0}',
        3: '作物コスト x{0}',
        4: '経験値獲得 x{0}',
      },
      efficiency: 'この巨大作物の時間効率は{0}%です',
    },
    gene: {
      name: '遺伝子',
      upgrade: '遺伝子アップグレード',
      pickLevel: 'レベル{0}の遺伝子を選ぼう',
      dnaDescription: 'この作物が新しいレベルに到達するとDNAを得られ、遺伝子のアップグレードに使うことができます',
      dnaDuplicate: '選択した遺伝子は次のプレステージには現れません。遺伝子を選ばないことで、次のプレステージで4つすべてを使用可能にする',
      dnaBlocked: 'ブロックされた遺伝子',
      hasUpgrade: '遺伝子のアップグレードがある',
      lockOnField: 'この遺伝子はこの作物では収穫できない',
      basics: '基本',
      yield: '収穫量',
      gold: 'ゴールド',
      exp: '経験',
      rareDrop: 'レアドロップ',
      grow: '成長',
      overgrow: '過成長',
      mutate: '変異',
      grass: '草',
      dna: 'DNA',
      gnome: '小人',
      lonely: '寂しい',
      fertile: '肥沃な',
      mystery: '謎',
      conversion: 'コンバージョン',
      prestige: 'プレステージ',
      rareDropChance: '発見',
      lucky: 'ラッキー',
      finalize: '確定',
      selfless: '無私',
      unyielding: '不屈の精神',
      teamwork: 'チームワーク',
      hunter: 'ハンター',
      patient: '患者',
    },
    fertilizerEffect: {
      vegetable: '野菜のみ',
      berry: 'ベリーのみ',
      grain: '穀物のみ',
      flower: '花のみ',
      special: '特殊作物のみ',
    },
    building: {
      premium: 'プレミアム {0}',
      premiumOwned: 'プレミアム: {0}所有',
      owned: '{0}所有',
      gardenGnome: {
        name: '庭園の小人',
        description: '庭園の小人を畑に置くと、畑の作物が収穫時にゴールドを得ることがある。その確率は作物の成長時間によって決まる',
      },
      sprinkler: {
        name: 'スプリンクラー',
        description: '同じ列の作物は成長が+{0}%速くなり、+{1}%過成長する',
        care: 'ケアがより出現しやすくなります',
      },
      lectern: {
        name: '書見台',
        description: '同じ列の作物は獲得経験値が+{0}%になります',
      },
      pinwheel: {
        name: '風車',
        description: '周囲8タイルにある異なる作物ごとに、フィールド全体のレアドロップ確率を乗算します。最大で{0}倍',
        rareDrop: 'フィールド全体のレアドロップ確率を乗算',
      },
      flag: {
        name: '旗',
        description: '作物が旗に対して正しい位置にある場合、収穫量が+{0}%増加します。野菜：左上、ベリー：右上、穀物：左下、花：右下',
      },
    },
    care: {
      wateringCan: 'じょうろ',
      description1: 'じょうろに雨水がある限り、通常の作物には時間経過でケアが発生します。同時に最大{0}作物までケアが有効です。作物のじょうろアイコンにカーソルを合わせるとケアを適用できます。',
      description2: '雨水は最大{0}/hの速度で蓄積され、基礎容量は{1}です。その値を超えても雨水は蓄積されますが、やや低速になります。',
  
      empty: 'じょうろは完全に空です。ケアが再び発生するまで少し待ってください。',
      low: 'じょうろはほぼ空です。雨水は最大速度で蓄積され、ケアは非常に遅く発生します。',
      mid: 'じょうろには少量の水があります。雨水はほぼ最大速度で蓄積され、ケアはゆっくり発生します。',
      half: 'じょうろには多くの水が入っています。雨水は中程度の速度で蓄積され、ケアは平均的な速度で発生します。',
      high: 'じょうろはほぼ満杯です。雨水は低速で蓄積され、ケアは速く発生します。',
      full: 'じょうろは満杯です。雨水は非常に遅く蓄積され、ケアは非常に速く発生します。',
  
      improve: 'ケアタイプが改善されました：{0}',
      add: 'ケアタイプが追加されました：{0}',
      disable: 'ケアタイプが無効化されました：{0}',
  
      yield: '収穫量',
      gold: 'ゴールド',
      exp: '経験値',
      rareDrop: 'レアドロップ',
      time: '時間',
    },
  },
  gallery: {
    gallery: 'ギャラリー',
    auction: 'オークション',
    colorSuffix: '色',
    openPackage: '開く',
    colorGainReduced: '追加獲得量は100色を超えると平方根により減少する',
    drumCompounding: 'このドラム缶を見つけるには、同じパッケージ内の前のすべての色のドラム缶を見つけておく必要がある。そのため、このドラム缶を見つける確率が実質的に下がる',
    allConverterInfo: '色の変換には常にすべての変換器が消費される',
    converterOverload: 'この変換には変換器が色よりもはるかに多くあるため、変換の獲得量はx{0}になる',
    idea: {
      tier: 'ティア{0}のアイデア',
      unlock: 'アイデアをアンロック',

      makeItPretty: 'きれいにする',
      stompBerries: 'ベリーを踏みつぶす',
      carvePumpkins: 'カボチャを彫る',
      sortWaste: 'ゴミを分別する',
      advertise: '宣伝する',
      beImpatient: 'せっかちになる',
      beExcited: 'ワクワクする',

      makeLemonade: 'レモネードを作る',
      growATree: '木を育てる',
      buildComposter: 'コンポスターを作る',
      observeRainbow: '虹を観察する',
      buildRedReservoir: '赤の貯水池を作る',
      orderMassiveSafe: '巨大な金庫を注文する',
      buyPen: 'ペンを買う',

      drawOcean: '海を描く',
      makeWine: 'ワインを作る',
      calculateOdds: '確率を計算する',
      buildOrangeReservoir: 'オレンジの貯水池を作る',
      thinkHarder: 'もっと考える',
      paintFaster: 'もっと早く塗る',
      buyBrush: 'ブラシを買う',

      harvestOranges: 'オレンジを収穫する',
      pulverizeGold: '金を粉砕する',
      buildYellowReservoir: '黄色の貯水池を作る',
      paintForFun: '楽しみで塗る',
      printNewspaper: '新聞を印刷する',
      expandCanvas: 'キャンバスを広げる',
      hyperfocus: '極限集中',

      cutGrass: '草を刈る',
      shapeClay: '粘土を形作る',
      buildGreenReservoir: '緑の貯水池を作る',
      beMysterious: '神秘的になる',

      lookAtTheSky: '空を見る',
      chewBubblegum: 'ガムを噛む',
      buildBlueReservoir: '青の貯水池を作る',
    },
    nextInspiration: {
      0: 'Next ',
      1: ' in '
    },
    shapes: {
      name: '図形',
      upgrades: '図形のアップグレード',
      description: '図形を隣の図形にドラッグして位置を入れ替えるか、クリックして収集します。収集には同じ種類の図形が5つ繋がっている必要があり、図形1つあたりに得られる数は収集コンボに等しいです。',
      cost: '各アクションのコスト',
      special: {
        name: '特殊図形',
        description: '特殊図形は通常の図形の代わりに{0}%の確率で出現し、特殊な収集では{1}倍の図形を得られます。グリッド上には特殊図形は1つまでしか存在できません',
        bomb: '十字型（＋型）に並んだすべての形を特別収集します',
        dice: 'この図形の上（または最上段の場合は下）の図形と一致しないすべての図形を再抽選します',
        accelerator: '周囲8つの形が特殊な収集対象です。8つすべてが同じ場合、最大100のモチベーションを消費してさらに多くの形を獲得できます',
        sparkles: '隣接する4つの図形を通常収集し、1つの大きなコンボとしてカウントします',
        hourglass: '即座にコンバーターとパッケージを取得し、図形を収集することで時間を延長します',
        chest: '周囲の8つと左右の図形、合計10個の図形を特殊収集します。すべて異なる図形であれば、特別な報酬を得て、特殊図形の倍率を元の値で再度適用します'
      },
      buyFor: {
        0: '購入',
        1: '価格:'
      },
      reroll: 'グリッド全体を再抽選: ',
      unlock: '図形のアンロック: {0}',
      circle: '円',
      rectangle: '長方形',
      triangle: '三角形',
      star: '星',
      ellipse: '楕円',
      heart: 'ハート',
      square: '正方形',
      octagon: '八角形',
      pentagon: '五角形',
      hexagon: '六角形',
      bomb: '爆弾',
      dice: 'サイコロ',
      accelerator: '加速器',
      sparkles: 'きらめき',
      hourglass: '砂時計',
      chest: '宝箱',
    },
    canvas: {
      name: 'キャンバス',
      description: 'キャンバスに色を塗ることで徐々にキャンバスレベルが上がり、恒久的なボーナスが得られます',
      level: 'キャンバスレベル',
      untilNextLevel: '次のレベルまで: {0}'
    }
  },
  gem: {
    newGemsTime: 'バーが満タンになるたびに、新しいルビーとエメラルドを獲得します。ジェネレーターは{0}ごとに新しい宝石を生成します。',
    newGemsTimeAchievement: 'バーが満タンになるたびに、新しいルビーとエメラルドを獲得します。各実績は生成速度を+{0}%向上させます。あなたの{1}の実績は生成速度を+{2}%向上させ、{3}から{4}に増加します。',
    newGemsTimeSecondary: 'バーが満タンになるたびに、新しい二次宝石を獲得します。ジェネレーターは{0}ごとに新しい宝石を生成します。',
    newGemsTimeAchievementSecondary: 'バーが満タンになるたびに、新しい二次宝石を獲得します。各実績は生成速度を+{0}%向上させます。あなたの{1}の実績は生成速度を+{2}%向上させ、{3}から{4}に増加します。',
    newDiamondTime: 'バーが満タンになるたびに、ダイヤモンドを1つ獲得します。ジェネレーターは{0}ごとにダイヤモンドを生成します。',
    diamondForge: 'ダイヤモンド鍛造所',
  },
  achievement: {
    nextReward: 'この実績の次のレベルを達成すると報酬として獲得できます',
    secret: 'この実績はシークレットであり、ボーナスは与えられません',
  },
  treasure: {
    effectSummary: '効果の概要',
    effectOwned: 'この効果を持つ宝物を{0}個所有しています',
    effectMax: '最も強力な{0}個の宝物のみが適用されます（{1} / {0}）',
    effectMinTier: 'この効果はティア{0}以上の宝物にのみ現れます',
    eventPowerDescription: 'イベントパワーは宝物を購入しても得られません。特定の修飾子を使って既存の宝物に追加する必要があります。イベントパワー1ポイントごとに、すべての機能のプレステージ獲得量が+0.15%増加します。あなたのイベントパワーはグローバルレベルの20%までに制限されます。',
    eventPowerEffect: 'あなたのイベントパワーはすべてのプレステージ獲得量をx{0}倍にします',
    eventPowerOvercap: '上限に達するために必要な量より{0}多くのイベントパワーがあります',
    upArrowFragments: 'この修飾子を追加すると、宝物を削除したときに得られるフラグメントが{0}増加します',
    expanderFragments: 'この修飾子を追加するとレベルが0に戻り、使用したフラグメントが返却され、宝物を削除したときに得られるフラグメントが{0}増加します',
    expanderEffect: '1か月でレベル{0}に、1年でレベル{1}にアップグレードします',
    level: 'レベル',
    tier: 'ティア',
    tierItem: 'ティア{0}の宝物',
    emptySlot: '空きスロット',
    modifiers: '修飾子',
    specialGroup: '特殊',
    tierEffect: {
      globalLevel: 'あなたのグローバルレベルは宝物のティアと、より高いティアの宝物を得るチャンスの両方を増加させる',
      wildcard: 'ワイルドカードチャンス',
      upgrade: 'アップグレード費用',
      destroy: '破壊されたときのかけら',
      regular: '通常の効果',
      special: '特殊効果'
    },
    buyFragment: {
      0: 'かけらを購入する',
      1: ''
    },
    buyTreasure: 'ランダムなティアと効果を持つ宝物を得る',
    upgradeDescription: 'かけらを使って宝物をアップグレードする。かけらのコストは宝のティアとレベルに依存する',
    destroyDescription: '宝を破壊して宝のレベルに応じたかけらを得る。その宝物のアップグレードに使用したかけらもすべて返却される'
  },
  relic,
  card
}
