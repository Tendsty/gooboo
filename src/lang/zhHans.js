import { zhHans } from 'vuetify/lib/locale';
import card from './zhHans/card';
import consumable from './zhHans/consumable';
import currency from './zhHans/currency';
import mult from './zhHans/mult';
import note from './zhHans/note';
import relic from './zhHans/relic';
import stat from './zhHans/stat';
import unlock from './zhHans/unlock';
import upgrade from './zhHans/upgrade';
import patchnote from './zhHans/patchnote';
import tag from './zhHans/tag';

export default {
  ...zhHans,

  gooboo: {
    buy: '购买',
    craft: '制作',
    feature: '功能',
    features: '功能',
    cantAfford: '无法负担',
    capTooLow: '容量过低',
    equip: '装备',
    unequip: '卸下',
    unequipAll: '全部卸下',
    select: '选择',
    deselect: '取消选择',
    enable: '启用',
    disable: '禁用',
    take: '领取',
    max: '最大',
    maxed: '已满',
    free: '免费',
    capacity: '容量',
    multCapacity: '{0} 容量',
    gain: '获得',
    multGain: '{0} 获得',
    apply: '应用',
    reset: '重置',
    unlock: '解锁',
    keep: '保留',
    uncap: '无最大等级',
    consumable: '消耗品',
    lock: '锁定',
    upgrade: '升级',
    upgrades: '升级',
    upgradeVerb: '升级',
    upgradesPrestige: '声望升级',
    prestige: '声望',
    prestigeDescription: '重置此功能以换取声望货币',
    prestigeTime: '本次本次声望已花费时间',
    saveManual: '保存',
    saveExport: '导出到文件',
    saveImport: '从文件加载',
    resetProgress: '重置进度',
    closeAll: '全部关闭',
    draw: '抽取',
    finish: '完成',
    boost: '加速',
    skip: '跳过',
    level: '等级',
    chance: '几率',
    amount: '数量',
    effect: '效果',
    effects: '效果',
    confirm: '确认',
    cancel: '取消',
    maxLevel: '最大等级',
    inventory: '背包',
    newGame: '新游戏',
    levelSuffix: '级',
    delete: '删除',
    convert: '转换',
    add: '添加',
    sort: '排序',
    leave: '离开',
    noFilter: '无筛选',
    mainFeatures: '主要功能',
    sideFeatures: '侧边功能',
    playedBefore: {
      0: '之前玩过？在这里加载你的存档 ',
      1: '这里'
    },
    offlineSummary: {
      title: '欢迎回来！你已离线 {0}',
      newVersion: '新版本！',
      upgradesFinished: '升级完成',
      downloadBackup: '下载备份',
      eventEnded: '活动已结束',
      eventStarted: '活动已开始',
      toFeature: '前往功能'
    },
    operator: {
      '>=': '至少',
      '>': '超过',
      '<=': '至多',
      '<': '低于',
      '==': '等于'
    }
  },
  endOfContent: {
    name: '内容结束',
    description: '你已到达此功能的内容结尾，此后的进度将比预期更慢。等待未来的更新或专注于其他功能以继续推进'
  },
  message: {
    achievement: {
      get: '成就达成！',
      gained: '已获得',
      relicGained: '遗物已获得'
    },
    card: {
      get: '卡包内容',
      new: '新！',
      newShiny: '闪！',
    },
    feature: {
      feature: '新功能已解锁！',
      subfeature: '新子功能已解锁！',
      school: '新学科已解锁！',
      general: '新将军已解锁！'
    },
    heirloom: {
      get: '发现传家宝'
    },
    note: {
      get: '发现笔记 #{0}',
      read: '阅读'
    },
    save: {
      success: '游戏已保存',
      error: '自动保存失败'
    },
    prize: {
      get: '你赢得了奖品！',
      bingo1: '宾果！',
      bingo2: '双宾果！',
      bingo3: '三宾果！'
    },
    school: {
      get: '课程完成！',
      getExam: '考试完成！',
      score: '得分：{0}',
      perfectScore: '（完美！）',
      grade: '等级 {0}%',
      gradePlus: '你的等级提升了！',
      dust: '+{0} 金色粉尘',
      bonusDust: '+{0} 奖励粉尘',
    },
    unlock: {
      card: '新卡包！',
      general: '新任务线！',
      treasure: '新宝物效果！',
      book: '新书！',
    },
    update: {
      get: '新更新！',
      apply: '刷新 + 应用'
    },
    import: {
      message: '无法加载文件',
      base64: '解码失败',
      json: '无法解析 JSON',
      key: '加载的存档缺少必需数据',
      version: '此文件来自更高版本的游戏（v{0}，当前版本：v{1}）',
      testing: '测试版本的存档不能在正式版中使用',
      testingVersion: '旧测试版本的存档无法使用',
      migration: '从 v{0} 迁移到 v{1} 时发生错误',
      checksum: '校验和无效',
    }
  },
  duplicateTab: {
    title: 'Gooboo 已在另一个标签页中运行',
    description: '为防止存档不一致，Gooboo 只能运行一次。请关闭此标签页并返回已存在的标签页中的游戏。'
  },
  reset: {
    feature: '想重新开始？在这里你可以重置单个功能的进度，而不影响游戏的其他部分。',
    warning: '这不是声望操作，不会有任何奖励或退款。重置无法撤销',
    deleteSave: '你也可以在这里删除整个存档：',
    deleteButton: '删除存档'
  },
  prestigeDescription: {
    mining_ember: '获得相当于当前居民深度一定百分比的余烬',
    village_blessing: '信仰将转化为祝福',
    village_shares: '获得相当于当前铜币数量 0.1% 的股份',
    horde_soulEmpowered: '被腐蚀的灵魂将转化为强化灵魂',
    horde_courage: '达到等级 10 时获得勇气，此后每升一级获得更多',
    gallery_cash: '根据本次运行获得的总美感获得现金',
  },
  prestigeFormula: {
    gallery_cash: '现金 = 10^(log8(美感 / 100B)^0.7)',
  },
  confirm: {
    title: '确认操作',
    prestige: '你即将进行声望操作，重置此功能的所有进度以换取声望货币。你确定要进行声望操作吗？',
    prestigeNoGain: '你即将进行声望操作，重置所有进度。由于进度不足，你不会获得任何声望货币。你确定要进行声望操作吗？',
    prestigeCrop: '你即将对此作物进行声望操作，重置其所有等级、经验和基因，以换取所有作物的永久获得加成。你确定要进行声望操作吗？',
    upgrade: {
      0: '你即将购买升级 ',
      1: '，这需要稀有货币。你确定要购买吗？'
    },
    shop: '你即将购买活动奖励，这需要稀有货币。你确定要购买吗？',
    theme: {
      0: '你即将购买主题 ',
      1: '，这需要稀有货币。你确定要购买吗？'
    },
    cardPack: {
      0: '你即将购买卡包 ',
      1: '，这需要稀有货币。你确定要购买吗？'
    },
    cardShinyPack: {
      0: '你即将购买闪卡包 ',
      1: '，这需要稀有货币。你确定要购买吗？'
    },
    weatherChaosFishingRodBuy: '你即将购买钓鱼竿 "{0}"，这需要稀有货币。你确定要购买吗？',
    summerFestivalCellBuy: '你即将购买新的岛屿格子，这需要稀有货币。你确定要购买吗？',
    farmCrop: '你即将种植需要稀有货币的作物。你确定要购买吗？',
    galleryMotivation: '你即将购买灵感，这需要稀有货币。你确定要购买吗？',
    treasure: '你即将购买新宝物，这需要稀有货币。你确定要购买吗？',
    schoolExamPass: '你没有足够的考试通行证，但可以用蓝宝石购买。你确定要这样做吗？',
    relicGlyph: '更换底座将重置所有雕文的当前等级进度。你确定要这样做吗？',
    treasureFragment: '你即将购买碎片，这需要稀有货币。你确定要购买吗？',
    treasureDelete: '你即将销毁宝物，这将返还碎片。你确定要这样做吗？',
    buyDiamondForge: '你即将在遗物上花费钻石。你确定要这样做吗？',
    casinoBingoBuy: '你即将购买宾果卡，这需要稀有货币。你确定要购买吗？',
    casinoWheelSpin: '你即将旋转幸运轮盘，这需要稀有货币。你确定要这样做吗？',
    consumable: '此操作需要你没有的消耗品。你想用稀有货币购买吗？',
    reset: {
      text: '你确定要重置 {0} 功能吗？此操作无法撤销！',
    },
    resetAll: '你确定要删除你的存档吗？此操作无法撤销！'
  },
  feature: {
    subfeature: '子功能',

    // Main features
    mining: '采矿',
    village: '村庄',
    horde: '部落',
    farm: '农场',
    gallery: '画廊',

    // Side features
    note: '笔记',
    relic: '遗物',
    gem: '宝石',
    achievement: '成就',
    school: '学校',
    card: '卡牌',
    general: '将军',
    event: '活动',
    treasure: '宝物',
    cryolab: '低温实验室',
    debug: '调试',

    // Subfeatures
    miningGas: '气体',
    villageCrafting: '制作',
    hordeClasses: '职业',
    schoolLiterature: '文学',
    schoolHistory: '历史',
    schoolArt: '艺术',
    schoolChemistry: '化学',
    generalOrladee: 'Orladee',
    generalOppenschroe: 'Oppenschroe',
    generalBellux: 'Bellux',
    generalOnoclua: 'Onoclua',
    generalOmnisolix: 'Omnisolix',

    // Meta
    meta: '游戏'
  },
  subfeature: {
    mining: {
      0: '矿石矿',
      1: '气体巨星',
    },
    village: {
      0: '工人',
      1: '工匠公会',
    },
    horde: {
      0: '装备',
      1: '职业',
    },
    farm: {
      0: '花园',
    },
    gallery: {
      0: '自由模式',
    }
  },
  unlock,
  mult,
  tag,
  text: {
    hordeBattlePassUpgrade: '新升级',
    hordeBattlePassPrestigeUpgrade: '新声望升级',
    hordeLootElementalEssence: '掉落元素精华',
    hordeRespawnFaster: '敌人重生速度加倍',
    farmBonusDna: '+5 DNA',
    farmUnlockDna: '解锁 DNA 升级，效果为你未选择的所有 1 级基因',
    farmGnomeBoost: '每个附近的花园地精使所有收获获得增加 4%（高级地精为 6%）',
    farmLonelyGrow: '如果没有同类型其他作物在田地上，生长速度加快 30% 并获得 +150% 过度生长',
    farmFertileBoost: '每种植肥料的蓝宝石消耗使产量增加 30%',
    farmYieldConversion: '将 5% 产量转化为其他产量类型',
    farmFastPrestige: '声望使作物等级降低 5 而不是重置为 0',
    farmLuckyHarvest: '1% 几率恢复 8 点 倍收获',
    farmSelfless: '所有作物产量增加 +3%（最多叠加至 +30%）',
    farmUnyielding: '收获时有 40% 几率免费重新种植此作物',
    farmTeamwork: '每种类型的一个作物拥有此基因时，所有作物产量翻倍',
    farmHunter: '此植物特有的资源稀有掉落变为可狩猎。狩猎几率等于你的稀有掉落几率的 1%。每次狩猎成功，资源容量增加基础值的 10%，基础狩猎几率降低 5%',
    farmPatient: '自选择此基因以来，每过一天产量增加 +3%，60 天时最多 +180%',
  },
  upgrade,
  currency,
  stat,
  consumable,
  patchnote,
  info: {
    title: 'Gooboo',
    subtitle: '由 Tendsty 开发',
    testing: '测试版',
    text: 'Gooboo 是一款放置/增量游戏，你在一个神秘未知的世界中管理多个功能。收集不同的资源来购买各种各样的升级，以增加你的资源获得。推进主要功能以解锁新内容并了解更多关于这个世界的信息。当进度开始放缓时，对单个功能进行声望操作，将你的收益提升到新的水平。',
    updates: {
      web: '你正在使用网页版。游戏会定期检查更新，自动使用最新版本并在有更新时通知你。',
      desktop: {
        0: '你正在使用桌面版。你需要手动在 ',
        1: '发布页面',
        2: ' 检查更新。'
      },
      offline: {
        0: '你正在使用离线版。你需要手动在 ',
        1: '发布页面',
        2: ' 检查更新。'
      },
      steam: '你正在使用 Steam 版本。更新通过 Steam 处理。'
    },
    testingDescription: {
      0: '你正在使用测试版本。功能可能未完成或有错误，游戏机制可能随时更改。你可以在 ',
      1: '这里',
      2: ' 玩正式版（测试版本的存档不能在正式版中使用）'
    },
    viewPatchnotes: '查看补丁说明',
    numberFormatting: '数字格式',
    numberFormattingDescription: '为了保持数字可读性，超大（和超小）数字使用下方的单位进行格式化。',
    bigNumbers: '大数字',
    smallNumbers: '小数字',
    timeUnits: '时间单位',
    timeUnit: {
      s: '秒',
      m: '分',
      h: '时',
      d: '天'
    },
    socials: {
      title: '社交媒体',
      text: 'Gooboo 可以独立游玩，无需外部指南。但如果你想和其他玩家交流，可以访问这些地方：',
      viewCode: '查看源代码',
      patreon: 'Patreon',
      reddit: 'Reddit',
      discord: 'Discord'
    },
    supportMe: {
      title: '支持我',
      text: '本游戏免费，没有内购或广告。如果你想支持开发，请查看我的 Patreon 页面：',
      patreon: 'Patreon'
    },
    tech: {
      title: '使用的技术',
      web: '网页',
      fonts: '字体',
      testing: '自动化测试',
      vue: 'Vue.js',
      vuetify: 'Vuetify',
      vuex: 'vuex',
      snackbars: 'v-snackbars',
      color: 'color',
      mdi: 'Material Design 图标',
      jsfiledownload: 'Javascript 文件下载',
      seedrandom: 'seedrandom',
      caveat: 'Caveat',
      roboto: 'Roboto',
      robotomono: 'Roboto Mono',
      cypress: 'Cypress',
      jest: 'Jest',
      github: 'GitHub',
      website: '网站',
      googlefonts: 'Google 字体'
    },
    cheater: {
      0: {
        title: '光荣',
        description: '游玩游戏时未使用以下任何工具',
      },
      50: {
        title: '好奇',
        description: '使用工具预测未来结果',
      },
      100: {
        title: '自动化',
        description: '使用工具自动执行类人操作，同时仍遵循游戏规则',
      },
      150: {
        title: '存档滥用',
        description: '使用工具或存档/加载功能来预测未来结果，并基于此信息做出购买决策或改变结果',
      },
      200: {
        title: '作弊者',
        description: '编辑游戏变量或使用工具实现原本不可能的结果',
      },
      selfMark: '设置作弊状态',
      selfMarkDescription: '你可以在这里将自己标记为作弊者。这纯粹是视觉上的，可以随时撤销',
      noDetected: '未检测到作弊',
      featureDetected: '在以下功能中检测到作弊：',
      featureDetected2: '你可以通过完全重置这些功能来移除作弊标记',
      globalDetected: '检测到作弊，你的存档已被永久标记',
      selfMarkClick: '如果你在作弊而游戏没有正确检测到，你可以点击查看选项将自己标记为作弊者',
    },
    statistics: {
      name: '统计',
      overview: '概览',
      other: '其他',
      gained: '已获得',
      maxOwned: '最高数量',
      currentTotal: '当前 / 总计',
      defaultPlayerName: '玩家',
    }
  },
  error: {
    tech: {
      vuejs: 'Vue.js',
      javascript: 'Javascript'
    },
    title: '{0} 错误',
    source: '来源：{0}',
    position: '第 {0} 行，第 {1} 列',
    reportBug: '报告错误'
  },
  note,
  school: {
    school: '学校',
    beginner: {
      title: '仍在学习中',
      description: '你是这所学校的新生，你的金色粉尘奖励降低至 {0}%。达到更高的全局等级以减少此惩罚，并在达到全局等级 175 时完全移除。'
    },
    subjectBookGain: '每个已解锁学科每小时给予 10 本书，无论等级如何。',
    passCapGain: '你每天获得一张新的考试通行证（下一个在 {0}），并且每 10 个全局等级获得一张。',
    buyPass: {
      0: '如果你尝试考试而没有足够的通行证，它们将自动购买，每个 ',
      1: ' '
    },
    library: '图书馆',
    practice: '练习',
    practiceDescription: '无时间压力地练习此学科，但无奖励或等级',
    study: '学习',
    studyDescription: '在 {0} 中获得尽可能高的分数，如果在最佳等级上学习，还有机会提升你的等级。根据你的分数，你获得（或失去）到下一等级的进度。预期平均分为 {1}。',
    studyNoF: '你在 F 等级时不能失去等级进度。',
    takeExam: '参加考试',
    takeExamDescription: '参加考试，你有 {0} 来获得尽可能高的分数。你将获得金色粉尘作为奖励（{1} - {2}，基于你的表现和选择的等级）。如果你获得 {3} 分，考试评为完美，你将解锁下一等级。',
    takeExamNoF: '你在 F 等级时不能参加考试。',
    takeExamNoFStudy: '先学习一点！',
    takeExamCost: '需要',
    examDustFull: '你的远古沙漏已满！你将获得奖励粉尘而不是金色粉尘，需要时间准备使用。',
    examDustOvercap: '你的远古沙漏几乎满了。此次考试获得的某些金色粉尘可能会转化为奖励粉尘。',
    answer: '回答',
    begin: '课程开始！',
    beginExam: '考试开始！',
    grade: '等级',
    gradeDescription: '等级决定此学科的难度。你可以随时在等级之间切换，并通过足够的学习或获得完美考试分数来解锁更好的等级。',
    totalPoints: '总点数',
    multipass: {
      description: '你可以在一次考试中使用多个通行证来增加奖励。每使用一个额外的通行证，你获得：',
      dust: '100% 获得的金色粉尘作为奖励粉尘',
      points: '+75% 总点数'
    },
    math: {
      name: '数学',
      subtitle: '解方程',
      description: '回答各种方程来提高你的分数。每个正确答案获得 1 分，每个错误答案失去 5 秒。随着你的等级提高，数字变大并引入新的运算符。',
    },
    literature: {
      name: '文学',
      subtitle: '写句子',
      description: '输入显示的句子来提高你的分数。每输入一个句子获得 1 分。同一个句子会保持直到正确输入，你可以看到下一个句子的开头。随着你的等级提高，句子和单词变长并引入新的特殊字符。',
    },
    history: {
      name: '历史',
      subtitle: '记住日期',
      description: '记住显示的日期并找到匹配的对（最多 5 个）来提高你的分数。没有为你之前见过的日期找到配对会失去 5 秒。随着你的等级提高，年份变大并添加更多年份。',
      newGame: '新游戏，新年份！准备好...',
      year: '年',
      examInfo: '在考试中，你有两次机会记住日期。在你的第一个答案完成后，你会得到一组新的日期和问题'
    },
    art: {
      name: '艺术',
      subtitle: '混合颜色',
      description: '正确猜测颜色来提高你的分数。将显示两种颜色，猜测它们混合的结果。每个正确答案获得 1 分，每个错误答案失去 5 秒。随着你的等级提高，添加更多答案并且答案变得更相似。',
    },
    chemistry: {
      name: '化学',
      subtitle: '观察实验',
      description: '观看具有不同形状的实验。实验后，会问一个问题，你需要估计答案。随着你的等级提高，添加更多形状和问题类型，你的答案需要更精确。',
      newGame: '新游戏，新实验！准备好...',
      questionShape: {
        0: '有多少个 ',
        1: '？',
      },
      questionSize: {
        text: '有多少个 {0} 形状？',
        0: '小',
        1: '中等',
        2: '大',
      },
      questionSpin: {
        text: '有多少个形状 {0}？',
        0: '逆时针旋转',
        1: '不旋转',
        2: '顺时针旋转',
      },
      questionMoveRandom: {
        text: '有多少个形状 {0}？',
        0: '不移动',
        1: '移动',
      },
      questionMoveDirection: {
        text: '有多少个形状正在 {0} 移动？',
        0: '水平',
        1: '垂直',
        2: '对角',
      },
      answer: '答案是 {0}',
    },
    book: {
      name: '书',
      get: '当你达到 {0} 级或累积 {1} 总点数时获得此书',
      buy: {
        0: '你也可以点击立即获得此书，花费 ',
        1: '',
      },
      skipped: '你花费 {0} 翡翠提前获得此书，当你达到 {1} 级或累积 {2} 总点数时将返还',
      scalesWithGL: '随全局等级缩放',
      scalesUpTo: '最多至 {0}',
      read: '阅读',
    }
  },
  hourglass: {
    title: '远古沙漏',
    subtitle: '跳过此功能的时间',
    subtitleSchool: '将考试通行证转化为金色粉尘',
    timeInMinutes: '时间（分钟）',
    bonusTitle: '奖励粉尘',
    bonusDescription: '超过容量的金色粉尘将作为奖励粉尘获得。每秒，你将 1 个奖励粉尘转化为金色粉尘。',
  },
  cryolab: {
    frozen: '{0} / {1} 功能已暂停',
    active: '激活：{0}%',
    activeTitle: '声望获得（激活）',
    activeDescription: '被动获得相当于你每日最佳声望 {0}% 的声望货币。这仅在功能冻结时激活。',
    passive: '被动：{0}%',
    passiveTitle: '声望获得（被动）',
    passiveDescription: '被动获得相当于你每日最佳声望 {0}% 的声望货币。这仅在功能未冻结时激活。',
    expDescription: '你有 {0} / {1} 经验，如果此功能被冻结，每天获得 {2} 经验。',
    expDescription2: '经验获得基于从此功能获得的全局等级（{0}）。',
    expNext: '下一等级效果：',
    expNoGain: '要获得此功能的经验，请先获得一些声望货币',
    expFormula: '经验 = 1.015^全局等级 * 全局等级 * 2',
    nextLevelTime: '到达下一等级需要 {0}',
    cropExp: '每种作物最多获得此数量的经验（较高的基础生长时间减少获得的经验）。然后乘以最高和当前作物等级之间的差值（处于最高等级的作物不获得经验）',
    frozenFeature: {
      title: '功能已暂停',
      description: '此功能已被低温实验室暂停。你在此功能中不会获得任何进度，但会自动获得声望货币。'
    }
  },
  general: {
    completionReward: '完成奖励',
    questGained: '{0} 已获得',
    questHighestAmount: '最高 {0} 数量',
    questEquipCard: '卡牌已激活',
    questFailedSubfeature: '你在错误的子功能中！声望后重试',
    questFailedTime: '时间限制已到！声望后重试',
    questFailedRelicActive: '遗物激活已使用！声望后重试',
    questFailedCard: '卡牌未激活！声望后重试',
    questFailedCardUnowned: '没有更多此卡牌的副本！访问商人获得更多',
    grobodal: {
      name: 'Grobodal',
      diggingDeeper: '更深入地挖掘',
      combatTraining: '战斗训练',
      searchingTheArchives: '搜索档案',
      gardening: '园艺',
      pitchBlack: '漆黑',
      masterOfTheSystem: '系统大师',
      thinkPlayerThink: '思考，玩家，思考！',
      discoveringTheMystery: '发现谜团',
      prettyAndPeaceful: '美丽而和平',
      doubleTrouble: '双重麻烦',
      allIn: '全力以赴',
    },
    orladee: {
      name: 'Orladee',
      beautyOfThisWorld: '此世界的美感',
      colorVariety: '颜色多样性',
      fieldTesting: '实地测试',
      shiningBright: '闪耀明亮',
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
      notFound: '未找到商店',
      bought: '有货'
    },
    cinders: {
      name: '灰烬',
      perProducer: '每个生产者',
      candle: {
        tealight: '茶蜡',
        regular: '蜡烛',
        aroma: '香薰蜡烛',
        chandelier: '吊灯',
        duration: '持续 {0}',
        sootGain: {
          0: '产生 ',
          1: ' ',
          2: ' 燃烧后'
        }
      }
    },
    bloom: {
      name: '绽放',
      tier: '阶',
      canSell: '可以 {0} 出售',
      sell: '选择要出售的花。当你在背包满时获得一朵花，该类型的最低阶花将自动出售。',
      dragToBreeder: '拖拽一朵花到这里开始繁殖',
      wildGrowth: '在你背包中的所有花上获得一个随机基因。这不能绕过每朵花 3 个基因的限制。',
      boost: '立即获得 1 天进度',
      genes: '基因',
      wildgrowth: '野生生长',
      flower: {
        daisy: '雏菊',
        poppy: '罂粟',
        iris: '鸢尾',
        lily: '百合',
        orchid: '兰花',
        cornflower: '矢车菊',
      },
      gene: {
        valuable: {
          name: '珍贵',
          description: '3倍花朵价值'
        },
        mutating: {
          name: '变异',
          description: '2倍基因几率'
        },
        splitting: {
          name: '分裂',
          description: '25% 几率繁殖 2 朵新花'
        },
        resistant: {
          name: '抗性',
          description: '+10% 阶几率'
        },
        huge: {
          name: '巨大',
          description: '+1 阶并在合并时消耗此基因'
        }
      }
    },
    weatherChaos: {
      name: '天气混乱',
      chanceToCatch: '捕捉几率',
      powerNeeded: '需要钓鱼力量',
      maxSize: '最大尺寸',
      owned: '已拥有',
      fishingPowerDescription: '钓鱼力量决定你可以捕捉哪些鱼。达到双倍钓鱼力量要求以获得捕捉该鱼的最大几率。',
      fishSizeDescription: '尺寸等于或低于平均值的鱼被捕捉的几率相同。其他尺寸每高于平均值一点就变得更难捕捉。',
      fishDescription: '如果你没有捕捉到宝物，你有几率捕捉到鱼。可用的鱼类型基于位置和天气。',
      trashTitle: '垃圾几率',
      trashDescription: '当你未能捕捉到宝物或鱼时，你会捕捉到垃圾。',
      treasureDescription: '你有小几率捕捉到宝物。如果你的钓鱼力量至少为 {0}，它可能包含鱼饵、新钓鱼竿或新位置的钥匙。',
      treasureDescriptionFinal: '你有小几率捕捉到宝物。它可能包含鱼饵或新钓鱼竿。',
      changeWeather: '改变天气',
      location: {
        pond: '池塘',
        lake: '湖泊',
        river: '河流',
        ocean: '海洋',
        mountain: '山脉',
        cave: '洞穴',
      },
      fish: {
        bronzefish: '青铜鱼',
        snail: '蜗牛',
        cablebiter: '电缆咬手',
        blueshimmer: '蓝闪',
        introvero: '内向鱼',
        zapling: '幼苗鱼',
        starcone: '星锥',
        phelaria: '荧光藻',
        coldgil: '冷鳃',
        silverbrass: '银黄铜',
        circlejelly: '圆果冻',
        woodcrawler: '木爬虫',
        longdano: '长齿鱼',
        legabara: '腿巴巴',
        biggiesnail: '大蜗牛',
        sunshine: '阳光鱼',
        platiglob: '扁球',
        stormdazer: '风暴瞪鱼',
        riverTurtle: '河龟',
        streamsnail: '溪蜗牛',
        ralmon: '罗鲑',
        wonelle: '沃鲵',
        grillgil: '烤鳃',
        sleepysoo: '睡呼',
        oozior: '泥浆兽',
        paleblob: '苍白团',
        crystakin: '水晶皮',
        shadowbiter: '暗咬手',
      },
      fishingRod: {
        name: '钓鱼竿',
        basic: '基础',
        fast: '快速',
        leafy: '多叶',
        heavy: '重型',
        hardwood: '硬木',
        master: '大师',
        smelly: '腥臭',
        turbo: '涡轮',
        golden: '黄金',
        dull: '迟钝',
        mystical: '神秘',
        twins: '双子',
      },
      bait: {
        juicyBait: '多汁鱼饵',
        rainbowBait: '彩虹鱼饵',
        trashNet: '垃圾网',
        magnet: '磁铁',
      }
    },
    summerFestival: {
      name: '夏日祭典',
      produces: '生产',
      producesNothing: '不生产',
      empty: '空',
      constructing: '建造中',
      upgrading: '升级中',
      deleting: '删除中',
      emptyQueue: '建筑队列为空',
      inQueue: '在队列中',
      inDeletionQueue: '在删除队列中',
      placeOn: '必须放置在',
      rotateDescription: '旋转建筑',
      deleteDescription: '删除此建筑。资源不退还，这需要在建筑队列中花费时间。',
      complete: '完成',
      build: '建造',
      freeExpansion: {
        s: '{0} 次免费扩展',
        p: '{0} 次免费扩展'
      },
      quest: {
        name: '任务',
        currency: '收集 {0} ',
        building: '建造 {0}x {2} 等级 {1}'
      },
      tile: {
        beach: '海滩',
        water: '水',
        palm: '棕榈树',
        forest: '森林',
        mountain: '山脉',
        plain: '平原',
        land: '陆地'
      },
      tilePos: {
        0: '中心',
        1: '右',
        2: '右下',
        3: '左下',
        4: '左',
        5: '左上',
        6: '右上'
      },
      building: {
        collector: {
          name: '收集器',
          description: '自动从相邻格子收集资源'
        },
        mainStage: {
          name: '主舞台',
          description: '生产音乐并解锁更多建筑'
        },
        speaker: {
          name: '扬声器',
          description: ''
        },
        vegetablePatch: {
          name: '菜园',
          description: ''
        },
        kitchen: {
          name: '厨房',
          description: '使用原料制作餐点',
          action: {
            coconutSalad: '椰子沙拉',
            saltyShell: '咸壳',
            lemonCandy: '柠檬糖果',
            steak: '牛排',
            fishSticks: '鱼条',
          }
        },
        sawmill: {
          name: '锯木厂',
          description: '将建筑材料切割成组件',
          action: {
            cutPlates: '切割板材',
            cutSandstone: '切割砂岩',
            smeltSteel: '熔炼钢铁',
            combineMaterial: '组合材料'
          }
        },
        huntingArea: {
          name: '狩猎区',
          description: ''
        },
        excavator: {
          name: '挖掘机',
          description: ''
        },
        lighthouse: {
          name: '灯塔',
          description: ''
        },
        grill: {
          name: '烤架',
          description: '使用煤炭烹饪食物',
          action: {
            cookMeat: '烹饪肉',
            cookFish: '烹饪鱼'
          }
        },
        mine: {
          name: '矿山',
          description: '从山脉中提取资源'
        },
        hugeSpade: {
          name: '大铁锹',
          description: '从海滩挖沙'
        },
        shellOpener: {
          name: '贝壳开启器',
          description: '开启贝壳获得金属零件和稀有物品',
          action: {
            openShell: '开启贝壳'
          }
        },
        waterPurifier: {
          name: '净水器',
          description: '净化咸海水并提取盐'
        },
        fishingNet: {
          name: '渔网',
          description: '从海洋中捕鱼'
        },
        pepperField: {
          name: '辣椒田',
          description: '种植和收获辣椒植物'
        },
        beehive: {
          name: '蜂箱',
          description: '从勤劳的蜜蜂那里取蜜'
        },
        citrusPlantation: {
          name: '柑橘种植园',
          description: '种植柑橘类水果并收获'
        }
      },
      buildingEffect: {
        autocollectMult: '自动收集数量',
        pearlChance: '珍珠几率',
      }
    },
    nightHunt: {
      name: '暗夜狩猎',
      potions: '药剂',
      performRitual: '执行仪式',
      performRitualDescription: '消耗所有选择的原料来执行仪式。如果你找到正确的原料组合，解锁新药剂。位置也很重要！',
      asBonusIngredient: '作为奖励原料',
      findablePotions: '此阶可发现的药剂',
      ritualStabilityDescription: '稳定性基于百分比影响多个几率：',
      ritualStabilityDescription1: '100% - 200%：保留基础原料的几率（当前 {0}%）',
      ritualStabilityDescription2: '0% - 100%：保留奖励原料的几率（当前 {0}%）',
      ritualStabilityDescription3: '-100% - 0%：仪式失败而不获得任何奖励的几率（当前 {0}%）',
      ritualSuccessDescription: '成功的仪式将产生暗夜狩猎代币用于新仪式，并可能发现新药剂。对已知道剂的成功仪式会提升其等级，产生暗夜狩猎代币并使该药剂达到下一等级更难。',
      ritualFamiliarityDescription: '如果仪式失败，将此数量增加到此仪式的稳定性和成功几率。此奖励叠加并在仪式成功时重置。',
      ritualHintDescription: '几率揭示关于槽位或原料数量的提示。提示仅在成功的新仪式中给出。每发现一个提示，此几率降低 {0}%。当被提示的仪式被发现时，提示和提示几率惩罚重置。',
      clickToAdd: '点击原料将它们添加到仪式中',
      ingredientSizeDescription: '原料尺寸允许你每魔法货币找到更多原料',
      favouriteIngredient: {
        title: '喜爱原料',
        description: '你可以选择一个原料作为喜爱，每次你找到一个原料时也会收到你喜爱的原料',
        copy: '复制找到的原料',
      },
      sackDescription: '袋子可能以高魔法量出现，消耗 10 倍更多魔法并包含 10 倍数量的原料，均匀分配给所有可用原料',
      newDescription: {
        empty: '在这里你可以看到当前配方是否是新的（之前未成功过）',
        isNew: '这是一个新配方，如果成功你将收到一个暗夜狩猎代币',
        isNewNoToken: '这是一个新配方',
        isNewPotion: '你还可能发现一个新药剂',
        discoveredPotion: '这是一个已知的药剂配方。如果此仪式成功，你将提升药剂等级并收到暗夜狩猎代币',
        pointless: '这是一个已知配方，对此执行更多仪式没有意义'
      },
      potion: {
        power: '力量药剂',
        insight: '洞察药剂',
        rage: '愤怒药剂',
        calming: '镇静药剂',
        sorrow: '悲伤药剂',
        energy: '能量药剂',
        nature: '自然药剂',
        intensity: '强烈药剂',
        hysteria: '歇斯底里药剂',
        insanity: '疯狂药剂',
        patience: '耐心药剂',
        transformation: '变形药剂',
        silence: '沉默药剂',
        photosynthesis: '光合作用药剂',
        sun: '太阳药剂',
        growth: '生长药剂',
        solidification: '固化药剂',
        liquification: '液化药剂',
        glowing: '发光药剂',
        stasis: '停滞药剂',
        creativity: '创造力药剂',
        poison: '毒药药剂',
        warmth: '温暖药剂',
      }
    },
    snowdown: {
      name: '雪地争霸',
      fightCount: '战斗',
      fight: '战斗',
      fightDescription: '以几个雪球的代价与显示的对手战斗',
      fightWin: '如果你赢了，你获得',
      fightWinProducer: '一个你选择的生产者',
      fightWinItem: '三个随机物品之一',
      pickProducer: '选择生产者',
      pickItem: '选择物品',
      reroll: '重掷',
      rerollDescription: '将拥有的物品重掷为另一个物品',
      buyItem: '购买物品',
      buyItemDescription: '获得三个随机物品之一',
      attackDescription: '你的攻击造成的伤害量。最终伤害量将在你攻击力的 80% 到 120% 之间',
      healthDescription: '你在冻结并无法战斗之前可以承受的伤害量',
      defenseDescription: '按固定量减少受到的伤害',
      critDescription: '每点暴击等级增加你造成暴击的几率 1%。暴击造成 +10 伤害。超过 25% 暴击几率后，随着你的暴击几率接近 75%，每点暴击等级获得的暴击几率减少。每失去 1% 暴击几率，获得 +0.2 暴击伤害。乘法攻击增加也增加暴击伤害',
      blockDescription: '增加你格挡攻击并不受伤害的几率',
      boost: '立即获得 1 天进度',
      revenge: {
        name: '复仇',
        description: '你已连续输掉 {0} 场战斗。这会增加你的属性直到你赢得一场雪球战斗',
        statsBase: '输掉战斗时获得 +5% 攻击和生命',
        statsScaling: '输掉战斗时获得 +5% 攻击和生命，+{0} 暴击等级和 +{1} 格挡等级。每次你输掉战斗时，你还会每场失败战斗额外获得 +{2}% 攻击和生命'
      },
      fighter: {
        snowOwl: '雪鹗',
        dog: '狗',
        cat: '猫',
        penguin: '企鹅',
        rabbit: '兔子',
        turtle: '乌龟',
        toddler: '幼儿',
        babysitter: '保姆',
        kid: '小孩',
        toughKid: '强壮小孩',
        teenager: '青少年',
        bully: '恶霸',
        youngAdult: '年轻人',
        hooligan: '流氓',
        adult: '成人',
        veteran: '老兵',
        wallOfIce: '冰墙',
        snowBot: '雪地机器人'
      },
      item: {
        rollingPin: {
          name: '擀面杖',
          description: ''
        },
        forest: {
          name: '森林',
          description: ''
        },
        snowCannon: {
          name: '雪炮',
          description: ''
        },
        shepherd: {
          name: '牧羊人',
          description: ''
        },
        animalTooth: {
          name: '动物牙齿',
          description: ''
        },
        collar: {
          name: '项圈',
          description: ''
        },
        chili: {
          name: '辣椒',
          description: ''
        },
        drumstick: {
          name: '鼓槌',
          description: ''
        },
        mouse: {
          name: '老鼠',
          description: '当你的其中一只宠物攻击时为玩家恢复 1 点生命值'
        },
        bone: {
          name: '骨头',
          description: '你的宠物攻击时恢复 1 点生命值'
        },
        gravestone: {
          name: '墓石',
          description: '宠物回合结束时为玩家和其他宠物恢复 15 点生命值'
        },
        spikedCollar: {
          name: '尖刺项圈',
          description: '随机宠物增加 30 点暴击等级和格挡等级，此奖励在回合结束时转移到另一只随机宠物'
        },
        heartCollar: {
          name: '心形项圈',
          description: '随机宠物复活一次'
        },
        treatBag: {
          name: '零食袋',
          description: '宠物可以选择恢复 50% 最大生命值而不是攻击。每个袋子 3 个零食'
        },
        tennisBall: {
          name: '网球',
          description: '当玩家回合结束时所有宠物复活'
        },
        appleJuice: {
          name: '苹果汁',
          description: '玩家可以选择恢复 50% 最大生命值而不是攻击。单次使用'
        },
        hotWater: {
          name: '热水',
          description: '玩家以 25% 生命复活一次'
        },
        dumbbell: {
          name: '哑铃',
          description: '玩家攻击时攻击力增加 0.5'
        },
        target: {
          name: '靶子',
          description: '玩家攻击时暴击等级增加 4'
        },
        gloves: {
          name: '手套',
          description: '玩家被攻击时攻击力增加 0.2，暴击等级增加 1'
        },
        snowboard: {
          name: '滑雪板',
          description: '前 5 次玩家攻击必定暴击'
        },
        tea: {
          name: '茶',
          description: '敌人回合结束后，玩家下次攻击恢复 25 点生命值 并暴击'
        },
        starShield: {
          name: '星之盾',
          description: '玩家在前 3 回合防御力增加 5'
        },
        coffee: {
          name: '咖啡',
          description: '玩家暴击时恢复 8 点生命值'
        },
        pebbles: {
          name: '卵石',
          description: '玩家暴击时使目标眩晕目标 1 回合'
        },
        sunShield: {
          name: '日之盾',
          description: ''
        },
        moonShield: {
          name: '月之盾',
          description: ''
        },
        fireplace: {
          name: '壁炉',
          description: ''
        },
        sharpSnowflake: {
          name: '尖雪花',
          description: ''
        },
        candyCane: {
          name: '糖果杖',
          description: ''
        },
        shovel: {
          name: '铲子',
          description: ''
        },
        turkey: {
          name: '火鸡',
          description: ''
        }
      }
    },
    merchant: {
      name: '商人'
    },
    casino: {
      name: '赌场',
      prize: '奖品',
      bingo: {
        1: '1倍 宾果',
        2: '2倍 宾果',
        3: '3倍 宾果'
      }
    },
    bank: {
      name: '银行',
      description: '在 3 个选项之一中管理你的黄玉。使用一个选项会禁用所有其他选项。偿还贷款不需要或消耗行动。',
      project: {
        name: '项目',
        expandVault: '扩展金库',
        persuadeInvestors: '说服投资者',
        improveCreditScore: '提高信用评分',
        businessMarketing: '商业营销',
        cardTournament: '赞助卡牌锦标赛',
        fund: '资助'
      },
      investment: {
        name: '投资',
        description: '投资黄玉以在下次银行活动时连本带利取回。前 {1} 个黄玉获得 {0}% 利息，超出部分获得 {2}%',
        invest: '投资'
      },
      loan: {
        name: '贷款',
        description: '以 {0}% 利息借入黄玉并稍后偿还。当你以满容量获得黄玉时，黄玉债务会自动偿还。',
        repay: '偿还',
        borrow: '借入'
      }
    },
    calendar: '日历',
    rewards: '奖励'
  },
  globalLevel: {
    name: '全局等级',
    description: '基于多个值的总和。用于解锁新功能',
    mining_0: '打破的最深矿石矿岩石',
    mining_1: '打破的最深气体巨星岩石',
    village_0: '最大住房',
    village_1: '制作里程碑达成',
    horde_0: '击败的最高区域首领',
    horde_1: '战斗通行证等级',
    farm_0: '所有作物等级总和',
    gallery_0: '总美感的对数4',
    debug: '调试'
  },
  theme: {
    name: '主题',
    icon: {
      hasCustomNavbar: '自定义导航栏',
      hasCustomBackground: '自定义背景',
      hasCustomColors: '自定义调色板',
      hasCustomUI: '自定义界面元素',
      hasAnimations: '包含动画',
      hasParticles: '包含粒子',
    },
    default: '蓝色',
    cyan: '青色',
    green: '绿色',
    yellow: '黄色',
    orange: '橙色',
    brown: '棕色',
    red: '红色',
    pink: '粉色',
    purple: '紫色',
    grey: '灰色',
    sepia: '棕褐色',
    factory: '工厂',
    forest: '森林',
    cherry: '樱花',
    sky: '天空',
    polar: '极地',
    prismatic: '棱镜',
    candlelight: '烛光',
    colorful: '多彩',
    rain: '雨天',
    waves: '海浪',
    autumnForest: '秋日森林',
    frozen: '冰冻',
  },
  settings: {
    keybinds: {
      name: '快捷键',
      prevMainFeature: {
        name: '上一个主要功能'
      },
      nextMainFeature: {
        name: '下一个主要功能'
      },
      debugSkip1m: {
        name: '跳过 1 分钟'
      },
      debugSkip10m: {
        name: '跳过 10 分钟'
      },
      debugSkip1h: {
        name: '跳过 1 小时'
      },
      debugSkip1d: {
        name: '跳过 1 天'
      }
    },
    theme: {
      name: '主题'
    },
    general: {
      name: '通用',
      pause: {
        name: '暂停'
      },
      dark: {
        name: '深色模式'
      },
      autosaveTimer: {
        name: '自动保存'
      },
      lang: {
        name: '语言',
        en: '英语',
        de: '德语',
        zhHans: '简体中文'
      },
      tabDisplayDesktop: {
        name: '标签页显示',
        icon: '仅图标',
        text: '仅文字',
        both: '图标和文字'
      },
      tabDisplayMobile: {
        name: '标签页显示',
        icon: '仅图标',
        text: '仅文字',
        both: '图标和文字'
      },
      relativeUpgradeStats: {
        name: '相对升级属性',
        description: '显示差值而不是之前/之后的值'
      },
      showFormulas: {
        name: '显示公式'
      },
      useLegacyFarmSelect: {
        name: '旧农场选择',
        description: '使用旧菜单在农场中选择作物和建筑'
      },
      numberFormatting: {
        name: '数字格式',
        standard: '标准',
        scientific: '科学计数',
        engineering: '工程计数'
      },
      showDetailedPatchnotes: {
        name: '显示详细补丁说明'
      },
      showAllCards: {
        name: '显示所有卡牌'
      },
      showEfficiencyStats: {
        name: '显示效率属性'
      }
    },
    automation: {
      name: '自动化',
      progressMining: {
        name: '采矿自动进度限制',
        description: '第一次打破岩石时，如果打破它需要 X 秒或更少，你自动前进到下一深度'
      },
      fightHordeBoss: {
        name: '自动战斗部落首领'
      }
    },
    performance: {
      name: '性能',
      upgradeListItems: {
        name: '每页升级数'
      },
      cssShadows: {
        name: '文字阴影',
        0: '无',
        1: '简单',
        2: '平滑'
      },
      cssAnimations: {
        name: 'CSS 动画'
      },
      particleAmount: {
        name: '粒子数量',
        0: '无',
        1: '减少',
        2: '平均',
        3: '增加'
      }
    },
    notification: {
      name: '通知',
      position: {
        name: '位置',
        0: '左上',
        1: '顶部',
        2: '右上',
        3: '右下',
        4: '底部',
        5: '左下'
      },
      autosave: {
        name: '自动保存提示'
      },
      backupHint: {
        name: '备份提示',
        0: '关',
        1: '稀有',
        2: '平均',
        3: '常见'
      },
      updateCheck: {
        name: '检查更新'
      },
      note: {
        name: '笔记提示'
      },
      achievement: {
        name: '成就提示'
      },
      heirloom: {
        name: '传家宝提示'
      },
      cardPackContent: {
        name: '卡包内容'
      },
      cropReady: {
        name: '作物就绪'
      }
    },
    confirm: {
      name: '确认',
      prestige: {
        name: '声望'
      },
      gem: {
        name: '宝石购买'
      },
      eventToken: {
        name: '活动代币购买'
      },
      farmRareResources: {
        name: '农场稀有资源购买'
      },
      treasureDelete: {
        name: '宝物删除'
      }
    },
    experiment: {
      name: '实验性',
      warning: '这些设置仍是实验性的，可能有错误、未完成、性能消耗大或令人困惑。启用它们风险自负，如果你在使用它们，请留下反馈！如果此部分为空，暂时没有实验性设置可用，或者你推进得不够远而无法看到它们',
      currencyLabel: {
        name: '显示货币标签',
        description: '显示货币获得和到达容量前的事件，无需悬停'
      }
    }
  },
  statBreakdown: {
    base: '基础值',
    min: '最小值',
    max: '最大值',
    globalLevel: '全局等级',
    prestige: '声望',
    graniteBreaksMult: '对数10打破次数',
    miningTemperature: '温度',
    miningObsidianPenalty: '强化惩罚',
    villageOffering: '供奉',
    zoneCleared: '区域已清除',
    zoneClearedTotal: '最高区域已清除',
    zone: '区域',
    hordeMaxDifficulty: '已清除难度',
    hordeBasicLoot: '基础战利品',
    hordeEquipmentPermanent: '装备效果',
    hordeMastery: '装备精通',
    hordeRest: '休息',
    hordeNostalgia: '怀旧',
    hordeNostalgiaLost: '已发现传家宝',
    hordeClassMult: '职业倍率',
    hordeClassLevel: '职业等级',
    hordeClassLowerLimit: '下限',
    hordeBattlePass: '战斗通行证',
    hordeEnergy: '能量',
    hordeMana: '法力',
    hordeHealth: '生命',
    hordeTime: '时间',
    hordeSacrifice: '牺牲',
    hordeRaid: '袭击胜利',
    hordeSkeleton: '骷髅',
    hordeEnemyActive: '敌人激活',
    farmEarlyGame: '首批作物',
    farmGiantCrop: '巨型作物',
    galleryCanvas: '画布',
    relicGlyph: '雕文',
    cards: '卡牌',
    cardsShiny: '闪卡',
    treasure: '宝物',
    eventPower: '活动能量',
    debug: '调试',
    bankInvestment: '投资',
    alloying: '合金化',
    miningResin: '树脂',
    cryolab: '低温实验室',
    ritualTier: '仪式阶',
    ritualPotionLevel: '药剂等级',
    ritualHint: '已发现提示',
    ritualIngredient: '奖励原料',
    snowdownRevenge: '复仇',
    interest: '利息',
    multiplier: '倍率',
    grouped: '已分组（{0}）',
    generalBonusCompletions: '遗物电池',
  },

  // Feature specific translations
  mining: {
    mine: '矿场',
    gainSummary: '每次命中获得 {0}，打破时获得 {1}（x{2}），每秒获得 {3}',
    gainSummaryHit: '每次命中获得 {0}',
    gainSummaryBreak: '打破时获得 {0}',
    depthDweller: '深度居民',
    dweller: {
      title: '当前 / 最高可能居民深度',
      description1: '居民开始时很快，越接近其限制越慢。',
      description2: '当前居民深度每完成半米，你的声望奖励增加。',
      description3: '最高可能居民深度是你矿井最大深度的 {0}%。',
      description4: '最大居民深度',
      descriptionOvercap: '居民在达到最高可能深度后可以获得奖励深度，使你的声望奖励线性增加。居民速度降低到 {0}%，并且在最高可能深度之后每 10% 再次降低速度到 {0}%',
      nextTime: '你在 {1} 内到达 {0}米'
    },
    pickaxePower: '这是你的镐的威力和基础伤害。通过制作更好的镐来增加。',
    damage: '伤害',
    timeToBreak: '打破当前岩石所需时间',
    durability: '耐久度',
    durabilityDescription: '打破此岩石所需的伤害量',
    durabilityBreaks: {
      s: '此岩石已被打破 {0} 次',
      p: '此岩石已被打破 {0} 次'
    },
    toughness: '硬度',
    toughnessDescription: '按固定量减少受到的伤害',
    toughnessHigh: '硬度正在严重降低你的伤害',
    toughnessTooHigh: '硬度太高，无法造成任何伤害',
    scrapDescription: '在你至少打破此岩石一次后，每次造成伤害时获得废料。当你打破岩石时，你获得 {0} 倍废料奖励',
    scrapNotBroken: '你尚未获得废料，因为此岩石从未被打破',
    oreNotBroken: '你尚未获得矿石，因为此岩石从未被打破',
    oreDescription: {
      short: '可以在 {0} 米或更深处找到',
      long: '可以在 {0} 米 - {1} 米处找到，或者如果深度可被 {2} 整除则在更深处'
    },
    rareEarthNotBroken: '你尚未获得稀土，因为此岩石从未被打破',
    rareEarthDescription: {
      granite: '对于已被打破 1000 次或更多的岩石，可以在 {0} 米或更深处找到。每超过该值 10 倍的打破次数，获得量翻倍',
      salt: '对于恰好有 1 个矿石的岩石，可以在 {0} 米或更深处找到',
      coal: '在每颗岩石的第一次打破时，可以在 {0} 米或更深处找到',
      sulfur: '当击中最深岩石时，可以在 {0} 米或更深处找到',
      niter: '在 10 的次数的岩石打破时，可以在 {0} 米或更深处找到',
      obsidian: '如果你的镐未被强化，可以在 {0} 米或更深处找到',
      deeprock: '如果当前深度的各位数字之和为 14 或更高，可以在 {0} 米或更深处找到',
      glowshard: '可以在 {0} 米或更深处找到，在限制之下每米有 0.1% 几率。获得一个需要你再挖 1 米深，此限制每天降低 10%',
      limestone: '可以在任何质数的深度找到。在存在石灰岩的深度你获得更少废料',
      moonshard: '如果深度居民已达到该深度，可以在 {0} 米或更深处找到',
      phosphorus: '如果深度可被 25 整除，可以在 {0} 米或更深处找到。在存在磷的深度你不获得烟雾'
    },
    rareEarthNotAffected: '此资源不受稀土获得的影响',
    scrapGainHint: '当你击中以前从未打破过的岩石时，你不会获得废料。有时更明智的做法是留在当前深度收集更多废料，而不是立即向下挖掘。',
    oreCrafting: '点击矿石将它们添加到制作槽位',
    crafting: {
      power: '威力',
      purity: '纯度',
      impurity: '杂质',
      oreQuality: '制作镐所需的矿石量除以你的矿石品质',
      craftPickaxe: '制作镐',
      purityDescription: '要达到 50% 最低品质，你的纯度需要匹配你的杂质。',
      premiumSlot: '这是高级制作槽位。x1 以上的杂质减半，纯度翻倍。',
      minPurity: '你需要至少 0.1% 最低品质来制作镐'
    },
    craftingDescription: '消耗选定的矿石并创建一个具有随机威力值的新镐。如果它比你的当前镐（{0} 威力）更好，替换它。',
    resinDescription: '每片树脂增加 30% 威力和 25% 纯度。每次制作镐最多可以使用 {0} 片树脂。',
    smokeDescription: '消耗所有烟雾以创建具有固定威力值的新镐',
    smeltery: '熔炼炉',
    smelteryTemperatureDescription: '达到特定温度以解锁更多熔炼炉。熔炼炉在要求之上每度也获得 +{0}% 速度',
    smelteryTemperatureDescription2: '此熔炼炉因温度而获得 +{0}% 速度',
    smelterySpeedDescription: '此熔炼炉的基础时间为 {0}',
    smelt: '熔炼',
    enhance: '强化',
    enhancement: {
      title: '强化',
      description: '使用金属条对你的镐应用强化。每个金属条都有自己的独特强化，可以多次应用。',
      disableDescription: '你可以暂时禁用所有强化以再次收集黑曜石，但你根据应用的强化数量获得更少黑曜石',
      maximumDescription: '你只能拥有有限数量的强化，所以考虑一下你在镐上放置哪些。',
      barAluminium: '轻量',
      barBronze: '坚固',
      barSteel: '锋利',
      barTitanium: '挖掘器',
      barShiny: '丰富',
      barIridium: '熔熔',
      barDarkIron: '虚空',
    },
    gasGain: {
      0: '获得 ',
      1: '% 你可获得的 ',
      2: ' 当你打破此岩石时。你最多可以在这个深度获得 ',
      3: ''
    },
    beacon: {
      noBeacon: '无信标',
      clickToPlace: '点击放置信标',
      selectToPlace: '选择一个信标来放置',
      place: '放置',
      remove: '移除信标',
      removeDescription: '你可以随时移除信标，但你需要等待 20 小时才能移除另一个',
      removeCooldown: '等待 {0} 才能再次移除信标',
      piercing: '穿透信标',
      rich: '丰富信标',
      wonder: '奇迹信标',
      hope: '希望信标',
    },
    anomaly: {
      name: '异常',
      toughness: '此岩石有 100 倍硬度'
    }
  },
  village: {
    job: {
      name: '工作',
      collector: '收集者',
      farmer: '农夫',
      harvester: '收割者',
      miner: '矿工',
      wellWorker: '井工',
      librarian: '图书管理员',
      glassblower: '吹玻璃工',
      entertainer: '演艺者',
      lumberjack: '伐木工',
      blastMiner: '爆破矿工',
      fisherman: '渔民',
      scientist: '科学家',
      gardener: '园丁',
      oilWorker: '石油工人',
      sculptor: '雕刻家',
      explorer: '探险家',
    },
    policy: {
      name: '政策',
      taxes: '税收',
      immigration: '移民',
      religion: '宗教',
      scanning: '扫描',
    },
    crafting: {
      unlockNew: '新制作配方：',
      owned: '{0} 已拥有',
      changeStat: {
        value: '增加值至 {0}',
        timeNeeded: '减少制作时间至 {0}'
      },
      nextEffect: '下次制作效果',
      special: {
        description: '特殊制作在制作时提供永久加成，其进度在声望时不重置。它们的成本随每次制作增加，并且没有里程碑'
      },
      crafts: '{0} / {1} 次制作',
      sellEvery: '每约 {0} 出售 1 个',
      sellPrice: '出售价格（价值：{0}）',
      rope: '绳子',
      woodenPlanks: '木板',
      brick: '砖块',
      screws: '螺钉',
      waterBottle: '水瓶',
      cocktailGlass: '鸡尾酒杯',
      boomerang: '回力标',
      polishedGem: '抛光宝石',
      oilLamp: '油灯',
      shower: '淋浴',
      pouch: '小袋',
      cupboard: '碗柜',
      weight: '哑铃',
      scissors: '剪刀',
      herbTea: '草药茶',
      glasses: '眼镜',
      arrows: '箭矢',
      bowl: '碗',
      chain: '锁链',
      spear: '长矛',
      goldenRing: '金戒指',
      poisonedArrows: '毒箭',
      frostSpear: '霜矛',
      spicySoup: '辣汤',
      stopwatch: '秒表',
      smallChest: '小箱子',
      bush: '灌木',
      handSaw: '手锯',
      garage: '车库',
      diamondRing: '钻石戒指',
    },
    buildings: '建筑',
    village: '村庄',
    pray: '祈祷',
    unemployed: '失业',
    unemployedDescription: '失业市民不生产资源。在下方分配他们到工作',
    taxpayers: '纳税者',
    taxpayersDescription1: '所有工作市民每秒最多消耗 {0} 每个食物，并支付等于 {1} ',
    taxpayersDescription2: ' 每个消耗的食物物品的税收。',
    happinessDescription: '幸福度修改所有资源获得（除了金币和信仰）',
    powerDescription: '每个能量获得所有材料和食物获得 +20% 增加。你当前的能量将材料和食物获得乘以 x{0}',
    pollutionDescription: '每点污染降低幸福度 1%。如果你有超过容忍度的污染，幸福度惩罚每增加一点超过容忍度的污染就增加 1%。你的下一点污染将降低幸福度 {0}%',
    lootDescription: '每次进度条满时找到新战利品',
    lootRarity: '战利品质量决定你的战利品稀有度分布：',
    lootNeedQuality: '需要超过 {0} 质量',
    buildingStat: '建造的总建筑数',
    housingStat: '建造的总住房（每个建筑前 25 个）',
    coinNotAffected: '金币不受"所有资源获得"影响',
    faithNotAffected: '信仰不受"所有资源获得"和"精神资源获得"影响',
    artisanDescription: '工匠可以被分配为你制作物品',
    counterDescription: '柜台可以用来向你的村民出售制作的物品',
    offering: {
      name: '供奉',
      description: {
        0: '牺牲 ',
        1: ' 用于 ',
        2: ' 并增加供奉获得 ',
        3: '/小时'
      },
      sacrifice: '牺牲',
      notUnlocked: '此供奉尚未解锁。你仍然可以花费供奉，但不能牺牲，并且资源容量在解锁供奉之前不会应用',
      notUnlockedHint: '此供奉尚未解锁，所以资源容量还不应用'
    },
    material: '材料',
    food: '食物',
    mental: '精神资源',
    loot: '战利品',
    specialIngredient: '特殊原料',
    foodConsume: '每秒最多消耗 {0}'
  },
  horde: {
    horde: '部落',
    zone: '区域',
    player: '玩家',
    enemy: '敌人',
    loadoutName: '装备方案名称',
    newLoadout: '新建装备方案',
    noLoadouts: '暂无装备方案',
    monsterPartHint: '前往区域10+并击败第101个敌人以发现新货币！该货币对于进一步推进至关重要，因为它可以帮助你提升骨头容量。',
    enemyDescription: '同一区域中的每个敌人相比前一个敌人拥有 x{0} 攻击力、x{1} 生命值和 +{2}% 骨头。这是第 {3} 个敌人，拥有 x{4} 攻击力、x{5} 生命值和 +{6}% 骨头。所有这些效果在你死亡时重置。',
    enemyDescriptionClasses: '同一区域中的每个敌人相比前一个敌人拥有 x{0} 攻击力、x{1} 生命值和 +{2}% 鲜血。这是第 {3} 个敌人，拥有 x{4} 攻击力、x{5} 生命值和 +{6}% 鲜血。所有这些效果在你死亡时重置。',
    enemySigil1: {
      s: '此区域中的敌人拥有 {0} 个符号',
      p: '此区域中的敌人拥有 {0} 个符号',
    },
    enemySigil2: {
      s: '。',
      p: '，从 {0} 种不同类型中选择。',
    },
    damageTypes: {
      title: '伤害类型',
      description: '每次攻击拥有三种伤害类型之一。可以针对每种伤害类型修改造成的和受到的伤害。',
      dealt: '造成',
      taken: '受到',
      physic: '物理',
      magic: '魔法',
      bio: '生物'
    },
    itemFindDescription: '击败敌人后你有几率找到此装备',
    attackDescription: '每次攻击造成的伤害量',
    attackConversion: {
      text: '常规攻击每秒发生一次，具有以下伤害分布：',
      physic: '{0}% 物理',
      magic: '{0}% 魔法',
      bio: '{0}% 生物',
      strengthAmp: '每点力量使你的常规攻击伤害增加 +{0}%，总计 +{1}%。这使你的常规攻击伤害增加到 {2}。'
    },
    healthDescription: '你在死亡前可以承受的伤害量',
    respawnDescription: '你从死亡中恢复需要多少时间',
    reviveDescription: '使用复活来恢复至满生命值，而不是死亡',
    critDescription: '常规攻击有几率造成增加的伤害。暴击几率可以超过100%，在这种情况下攻击伤害会多次增加',
    toxicDescription: '造成毒素伤害（生物），等于攻击造成伤害的一定百分比',
    divisionShieldDescription: '将你受到的所有伤害除以（分割盾 + 1），并在受到攻击后失去 1 点分割盾',
    divisionShieldReplenishDescription: '击败敌人后补充你缺失分割盾的 {0}%',
    firstStrikeDescription: '如果这是你的第一次攻击，造成额外的魔法伤害',
    spellbladeDescription: '使用装备效果后造成额外的魔法伤害。对于冷却时间低于10秒的装备效果，这并不总是有效',
    cuttingDescription: '攻击后以生物伤害造成目标当前生命值的一定百分比',
    recoveryDescription: '击杀敌人后恢复你缺失生命值的一定百分比',
    defenseDescription: '以你最大生命值的一定百分比减少受到的伤害',
    executeDescription: '如果敌人低于特定生命值阈值，立即击杀',
    hasteDescription: '减少战斗主动技能的冷却时间',
    hasteFormula: 'CD = 基础CD / (1 + 急速 / 100)',
    energyDescription: '一些主动技能需要能量来使用。它会随时间自动恢复',
    manaDescription: '一些主动技能需要法力来使用。它会随时间缓慢恢复',
    boss: '首领',
    raidboss: '团队副本首领',
    rareLoot: '稀有战利品',
    rareLootDescription: '每隔几分钟，被击败的敌人会掉落稀有战利品。',
    poisonPlayer: '你已中毒，每秒受到 {0} 点伤害',
    poisonEnemy: '此敌人已中毒，每秒受到 {0} 点伤害',
    silencePlayer: '你已被沉默，无法使用主动技能',
    silenceEnemy: '此敌人已被沉默，无法使用主动技能',
    stunPlayer: '你已被眩晕，无法攻击',
    stunEnemy: '此敌人已被眩晕，无法攻击',
    shieldbreak: '更快地打破分割盾',
    statusResist: '更快地从状态效果中恢复',
    stunBoss: '首领获得 +2 眩晕抗性',
    bossBioResist: '首领只受到 10% 生物伤害，但受到 35% 更多的魔法伤害',
    enemyRespawn: '敌人需要 {0} 才能重新生成，最多可以有 {1} 个敌人在等待。击败首领会立即重新生成所有敌人',
    bossBonusDifficulty: '首领难度',
    bossNoReward: '你可以在任何难度下再次与这个首领战斗，但不会因此获得奖励',
    energyIncompatible: '你当前选择的职业无法使用此饰品，因为它需要能量',
    manaIncompatible: '你当前选择的职业无法使用此饰品，因为它需要法力',
    taunt: {
      title: '嘲讽模式',
      description: '开启嘲讽后，即使没有敌人在等待，敌人也会持续生成，但所有提前生成的敌人不携带战利品。嘲讽仅在尝试到达首领时有效',
      on: '嘲讽模式已开启',
      off: '嘲讽模式已关闭',
      clickToToggle: '点击切换'
    },
    reachBoss: {
      title: '到达首领',
      description: '要挑战此区域的首领，你需要不死亡地击败 {0} 个敌人'
    },
    fightBoss: {
      title: '与首领战斗',
      description: '你已经击败了足够多的敌人，可以挑战此区域的首领了'
    },
    fleeBoss: {
      title: '逃离首领',
      description: '逃离这场战斗并继续与常规敌人战斗'
    },
    defeatedBoss: {
      title: '首领已击败',
      description: '你已经击败了此区域的首领，这允许你前往下一个区域'
    },
    souls: '灵魂',
    stat: {
      crit: '暴击'
    },
    rampage: {
      name: '暴怒',
      description: '与同一个敌人战斗太久会让它愤怒！你已经与这个敌人战斗了 {0}，它开始每 {1} 进入一次暴怒状态。',
      effect: '每次敌人暴怒时，它会获得 x{0} 攻击力、+{1} 状态抗性和对攻击降低效果的免疫。',
      effectCurrent: '此敌人已经暴怒了 {0} 次。它拥有 x{1} 攻击力和 {2} 状态抗性。'
    },
    sigil: {
      name: '符号',
      hasActive: '有主动效果',
      min: '在区域 {0} 或更高区域出现',
      special: '仅在特殊条件下出现',
      inactive: '未激活',
      power: '力量',
      health: '生命',
      bashing: '重击',
      recovery: '恢复',
      toughness: '韧性',
      strength: '力量',
      magic: '魔法',
      magicBolt: '魔法飞弹',
      fireball: '火球',
      incorporeal: '虚无',
      focus: '专注',
      wisdom: '智慧',
      sparks: '火花',
      protection: '保护',
      shielding: '护盾',
      resistance: '抗性',
      precision: '精准',
      screaming: '尖叫',
      cure: '治愈',
      sharp: '锋利',
      spitting: '吐息',
      burst: '爆发',
      resilience: '恢复力',
      growing: '成长',
      cold: '寒冷',
      fury: '暴怒',
      angelic: '天使',
      toxic: '毒素',
      foulBreath: '恶息',
      nuke: '核爆',
      rainbow: '彩虹',
      drain: '吸取',
      shocking: '电击',
      defense: '防御',
      executing: '处决',
      raidRage: '团本狂怒',
      monstrousToughness: '怪物韧性',
      berserk: '狂暴',
      iceGiant: '冰巨人',
      generic: '通用',
    },
    corruption: {
      name: '腐化',
      effects: '效果',
      power: '攻击和生命值 x{0}',
      sigil: '符号 +{0}',
      revive: '复活 +{0}',
      execute: '处决 +{0}%'
    },
    activeCooldown: '主动技能冷却',
    activeBuffFor: '持续 {0}：',
    itemsEquipped: '已装备装备槽位',
    cleared: '已清除',
    fighting: '战斗中',
    equipment: {
      name: '装备',
      usableInStun: '眩晕时可以使用',
      utilityOvertime: '实用主动技能可以以之前一半的速度存储多次充能',
      inactive: '非激活战斗主动技能以通常速率的 {0}% 恢复冷却时间',
      takeEquipped: '取下装备',
      dagger: '匕首',
      shirt: '衬衫',
      guardianAngel: '守护天使',
      milkCup: '牛奶杯',
      starShield: '星盾',
      longsword: '长剑',
      mace: '钉锤',
      boots: '靴子',
      liver: '肝脏',
      fireOrb: '火焰宝珠',
      campfire: '篝火',
      clover: '四叶草',
      snowflake: '雪花',
      oppressor: '压制者',
      toxin: '毒素',
      corruptEye: '腐化之眼',
      meatShield: '肉盾',
      wizardHat: '巫师帽',
      redStaff: '红杖',
      cleansingSpring: '净化之泉',
      marblePillar: '大理石柱',
      rainbowStaff: '彩虹法杖',
      antidote: '解毒剂',
      brokenStopwatch: '损坏的秒表',
      luckyCharm: '幸运符',
      mailbreaker: '破甲者',
      club: '棍棒',
      goldenStaff: '金杖',
      toxicSword: '毒剑',
      scissors: '剪刀',
      cat: '猫',
      healthyFruit: '健康水果',
      glasses: '眼镜',
      deadBird: '死鸟',
      shieldDissolver: '护盾溶解剂',
      calmingPill: '镇静药丸',
      cleansingFluid: '净化液',
      forbiddenSword: '禁忌之剑',
      corruptedBone: '腐化之骨',
      plaguebringer: '瘟疫使者',
      forbiddenShield: '禁忌之盾',
      dangerShield: '危险之盾',
      forbiddenToxin: '禁忌毒素',
      glowingEye: '发光之眼',
      experimentalVaccine: '实验性疫苗',
      microscope: '显微镜',
      moltenShield: '熔岩之盾',
      cutter: '美工刀',
      book: '书籍',
      chocolateMilk: '巧克力牛奶',
      bigHammer: '大锤',
      spookyPumpkin: '诡异南瓜',
      strangeChemical: '奇怪化学品',
      forbiddenHeartShield: '禁忌心盾',
      cloudStaff: '云杖',
      secretWeapon: '秘密武器',
      bomb: '炸弹',
      leechingStaff: '吸血法杖',
      shatteredGem: '碎裂宝石',
      hourglass: '沙漏',
      glue: '胶水',
      firework: '烟花',
      bowTie: '领结',
      forbiddenStopwatch: '禁忌秒表',
      mysticalAccelerator: '神秘加速器',
      blazingStaff: '烈焰法杖',
      stoneplate: '石板甲',
      shield: '盾牌',
      armor: '盔甲',
      natureStone: '自然之石',
      evergrowingVine: '永恒藤蔓',
      energyDrink: '能量饮料',
      dragonheart: '龙心',
      prism: '棱镜',
      deathsword: '死亡之剑',
      needle: '针',
      mine: '地雷',
      maskOfJoy: '欢乐面具',
      doubleEdgedSword: '双刃剑',
      critCore: '暴击核心',
      heavyGauntlet: '重型护手',
      dumbbell: '哑铃',
      essenceExtractor: '精华提取器',
      spellbook: '法术书',
      forbiddenScissors: '禁忌剪刀',
      basicSpear: '基础长矛',
      cursedEye: '诅咒之眼',

      // Blessed equipment
      blessedSword: '祝福之剑',
      blessedArmor: '祝福之甲',
      blessedBow: '祝福之弓',
      blessedFlame: '祝福之焰',
      blessedWater: '祝福之水',
      blessedShield: '祝福之盾',

      // Chess pieces
      pawn: '兵',
      knight: '马',
      bishop: '象',
      rook: '车',
      queen: '后',
      king: '王'
    },
    active: {
      damagePhysic: {
        0: '造成',
        1: '点物理伤害'
      },
      damageMagic: {
        0: '造成',
        1: '点魔法伤害'
      },
      damageBio: {
        0: '造成',
        1: '点生物伤害'
      },
      maxdamagePhysic: {
        0: '造成敌人最大生命值',
        1: '%的物理伤害'
      },
      maxdamageMagic: {
        0: '造成敌人最大生命值',
        1: '%的魔法伤害'
      },
      maxdamageBio: {
        0: '造成敌人最大生命值',
        1: '%的生物伤害'
      },
      heal: {
        0: '恢复',
        1: '点生命值'
      },
      bone: {
        0: '获得',
        1: '根最高区域的骨头'
      },
      blood: {
        0: '获得',
        1: '份最高难度的鲜血'
      },
      monsterPart: {
        0: '获得',
        1: '个最高区域的怪物部件'
      },
      stun: {
        0: '眩晕对手',
        1: '秒'
      },
      silence: {
        0: '沉默对手',
        1: '秒'
      },
      revive: {
        0: '恢复',
        1: '点复活次数'
      },
      removeAttack: {
        0: '移除对手的',
        1: '点攻击力'
      },
      poison: {
        0: '施加',
        1: '层中毒'
      },
      antidote: {
        0: '移除',
        1: '层中毒'
      },
      permanentStat: {
        0: '',
        2: '',
        1: '（本局有效）'
      },
      gainStat: {
        0: '',
        2: '',
        1: '（永久生效）'
      },
      divisionShield: {
        0: '获得',
        1: '点分割盾'
      },
      removeDivisionShield: {
        0: '移除对手的',
        1: '点分割盾'
      },
      executeKill: {
        0: '立即击杀生命值低于',
        1: '%的敌人'
      },
      refillEnergy: {
        0: '恢复',
        1: '点能量'
      },
      refillMana: {
        0: '恢复',
        1: '点法力'
      },
      buff: {
        duration: '增益持续时间',
        suffix: '（增益）',
      },
      canCrit: '暴击效率为 {0}%',
      canCritDiff: '主动技能暴击效率',
      reviveAll: '恢复所有复活次数',
      removeStun: '移除眩晕效果',
      addStack: '提升此装备的属性（本局有效）',
      baseValue: '基础',
    },
    heirloom: {
      name: '传承物',
      tabName: '传承物',
      boost: {
        name: '传承物增强',
        description: '此传承物的增强等级为 {0}，提升其效果（^{1}）：',
      },
      min: '在区域 {0} 或更高区域出现',
      special: '不会出现在稀有战利品中',
      description: '传承物是强大的神器，可以从稀有战利品中找到并永久保留。到达更高区域可以找到更多类型',
      descriptionTower: '传承物是强大的神器，可以每 {0} 层找到并永久保留。到达更高区域或不同塔楼可以找到更多类型',
      descriptionDouble: '数量最少的传承物获得双倍掉落几率。如果你有多个传承物数量并列最少，则此效果不适用。',
      descriptionNostalgia: '乡愁增加你找到传承物的几率。在乡愁的帮助下找到一个传承物会移除1点乡愁，直到下次转生',
      power: '力量',
      fortitude: '坚韧',
      wealth: '财富',
      spirit: '精神',
      sharpsight: '锐视',
      reaping: '收割',
      remembrance: '回忆',
      holding: '持有',
      expertise: '专精',
      mystery: '神秘',
      freezing: '冻结',
      brick: '砖块',
      heat: '热量',
      ice: '冰霜',
      crystal: '水晶',
      vitality: '活力',
      nature: '自然',
    },
    itemMastery: {
      name: '精通',
      description: '使用此装备在区域 {0} 或更高区域击败首领或获得稀有战利品以赚取精通点数。更高的区域获得更多精通点数。',
      bonuses: '提升你的精通等级以解锁此装备的奖励',
      current: '此装备有 {0} / {1} 精通点数',
      1: '转生后保留装备',
      2: '增加禁用装备主动技能的选项，使被动效果提升 +{0}%',
      3: '转生后保留装备等级',
      4: '主动技能强度提升 1.5 倍，禁用主动技能时获得 +{1}% 提升而非 +{0}%',
      5: '最多可收集 {0} 个神秘碎片。每个精通等级额外增加 {1} 个'
    },
    raid: {
      title: '团队副本',
      name: '团队副本',
      description: '团队副本是特殊场所，需要团队副本钥匙才能进入。挑战强大的团队副本首领以提升你的属性并永久改进你的传承物',
      keyDescription: '首次击败团队副本首领时获得 {0} 个团队副本钥匙，每天获得 {1} 个团队副本钥匙（下一个在 {2}）',
      victory: '团队副本胜利',
      victoryDescription: '你已经击败了 {0} 个团队副本首领，提升你的属性直到转生。每击败一个团队副本首领，你获得：',
      raidbossDescription: '击败团队副本首领会增加你的团队副本钥匙容量并增加未来团队副本首领的难度。当前团队副本首领的强度大约相当于区域 {0} 的首领。更强的团队副本首领在击败时提供更好的传承物增强。',
      raidbossFail: '未能击败团队副本首领时，你将获得前一个团队副本首领的奖励。',
      fight: '战斗',
      slay: '击杀',
      slayAll: '全部击杀',
      slayDescription: '使用团队副本钥匙获得已击败的最强团队副本首领的所有奖励，无需战斗。如果你在上次团队副本胜利后未选择传承物增强，将随机选择一种。',
      slayConvert: '如果你获得的团队副本钥匙超过持有上限，这将自动发生。',
    },
    element: {
      elementalUpgrade: '{0} 元素',
      elementalStats: '{0} 升级',
      enemyStats: '敌人属性',
      enemyActive: '敌人主动技能',
      enemyActiveDescription: '提升敌人主动技能的威力，新技能在 0、20、35 和 50 级解锁',
      playerElement: '玩家元素',
      ice: '冰',
      thunder: '雷',
      water: '水',
    },
    tower: {
      name: '塔楼',
      description: '塔楼是特殊场所，需要塔楼钥匙才能进入。你可以与敌人战斗获得皇冠和独特的传承物，直到死亡。到达特定楼层以永久解锁新奖励',
      zoneDescription: '此塔楼中你到达的最高楼层的敌人强度大约相当于区域 {0} 的敌人。他们从区域 {1} 的敌人强度开始，每层获得相当于 {2} 个区域的属性',
      floorTitle: '已击败的最高楼层',
      floorDescription: '在特定楼层击败敌人以解锁永久奖励：',
      rewardTitle: '奖励',
      rewardDescription1: '每个被击败的敌人获得 {0} 个皇冠',
      rewardDescription2: '敌人每 {0} 层给予传承物，某些传承物为此塔楼独有：',
      keyDescription: '解锁新塔楼时获得 {0} 个塔楼钥匙，每周获得 1 个塔楼钥匙（下一个在 {1}）',
      enter: '进入',
      enterCost: '需要',
      floor: '第 {0} 层',
      brick: '砖块塔',
      fire: '火焰塔',
      ice: '冰霜塔',
      danger: '危险塔',
      toxic: '毒素塔',
      forest: '森林塔',
    },
    classes: {
      level: '职业等级',
      levelDescription: '随着时间获得职业等级，增加你的鲜血获得、鲜血容量和勇气获得。你还可以获得每个职业等级 {0} 点技能点。',
      skill: '技能',
      skillPointsLeft: '剩余 {0} 点技能点',
      skillPointCost: '需要 {0} 点技能点来升级',
      skillTreeChoice: '在这里你可以做出选择，选择其中一个技能会锁定其他路径',
      stanceClick: '姿态 - 点击切换',
      skillName: {
        energyConvert: '能量转换',
        stab: '刺击',
        combatHeal: '战斗治疗',
        brawl: '斗殴',
        spark: '火花',
        smash: '猛击',
        lootSearch: '战利品搜索',
        doubleStrike: '双重打击',
        smallFireball: '小火球',
        fullRecovery: '完全恢复',
        supercharge: '超级充能',

        energyOnCrit: '能量涌动',
        longshot: '远射',
        eagleEye: '鹰眼',
        fireArrows: '火箭',
        poisonArrow: '毒箭',
        healOnCrit: '恢复',
        reduceCooldownOnCrit: '无情',
        bloodOnCrit: '嗜血',
        shockArrow: '闪电箭',
        sharpArrow: '锐箭',
        sharpMind: '锐智',
        forestBlessing: '森林祝福',

        manaRest: '法力休息',
        magicMissile: '魔法飞弹',
        fireball: '火球',
        shockBlast: '闪电冲击',
        heal: '治疗',
        barrier: '屏障',
        earthquake: '地震',
        manasteal: '法力窃取',
        waterBolt: '水箭',
        iceBlast: '冰霜冲击',
        focus: '专注',
        smite: '惩戒',
        conjure: '召唤',
        ascend: '升华',
        deepFocus: '深度专注',

        damageRamp: '伤害递增',
        heavyHit: '重击',
        shieldBash: '盾击',
        statRamp: '力量递增',
        refuge: '庇护',
        consecrate: '祝圣',
        blessing: '祝福',
        fortify: '强化',
        parry: '招架',
        smite2: '惩戒',

        challenge: '挑战',
        parrotAttack: '鹦鹉攻击',
        plunder: '掠夺',
        bottleOBrew: '酿造瓶',
        bombToss: '投弹',
        cannonball: '炮弹',
        invigoratingBottle: '活力瓶',
        treasureChest: '宝箱',
        bountyBoard: '赏金板',
        pirateShip: '海盗船',

        sneak: '潜行',
        elementOfSurprise: '惊喜元素',
        backstab: '背刺',
        smokeBomb: '烟雾弹',
        comboStrike: '连击',
        cursedDagger: '诅咒匕首',
        swiftStrike: '迅捷打击',
        shuriken: '手里剑',
        knockout: '击倒',
        hiddenExplosive: '隐藏爆炸物',
        herbTea: '草药茶',
        meditation: '冥想',
        flow: '流',
        pickpocket: '扒手',
        secretTechnique: '秘技',

        combatStance: '战斗姿态',
        lootingStance: '掠夺姿态',
        learningStance: '学习姿态',
        crimsonPact: '深红契约',
        crimsonRitual: '深红仪式',
        reincarnation: '轮回',
        crimsonCurse: '深红诅咒',
        sacrificialDagger: '祭祀匕首',
        crimsonHeart: '深红之心',
        despair: '绝望',
        drainLife: '生命汲取',
        hex: '诅咒',
        darkRitual: '暗黑仪式',
        occultRestoration: '神秘恢复',
        harvest: '收割',
        summonAbomination: '召唤憎恶',
        occultThunder: '神秘雷电',
      },
      adventurer: {
        name: '冒险家',
        description: '一个全能战士，可以应对各种情况'
      },
      archer: {
        name: '弓箭手',
        description: '一个远程战士，专注于暴击和稳定伤害'
      },
      mage: {
        name: '法师',
        description: '一个利用法术快速对付敌人的战士，并允许自动施法'
      },
      knight: {
        name: '骑士',
        description: '一个耐打的战士，慢慢击倒对手，但可以应对强敌'
      },
      assassin: {
        name: '刺客',
        description: '一个敏捷的战士，专注于快速击杀敌人'
      },
      shaman: {
        name: '萨满',
        description: '一个与自然绑定的战士，利用治疗和毒素来赢得战斗'
      },
      pirate: {
        name: '海盗',
        description: '海盗可能不是最好的战斗者，但擅长掠夺'
      },
      undead: {
        name: '亡灵',
        description: '一个弱小的战士，但用数量优势来弥补这个弱点'
      },
      cultist: {
        name: '邪教徒',
        description: '一个全能战士，一次专注于一项任务'
      },
      scholar: {
        name: '学者',
        description: '一个辅助战士，帮助其他职业'
      }
    },
    battlePass: {
      name: '战斗通行证',
      quest: {
        stat: '达到 {0} {1}',
        zone: '通关 {0} 个区域 {1}',
        level: '达到等级 {0}',
        boss: '击败 {0} 个首领（+{1}）'
      },
      statType: {
        base: '基础 {0}',
        total: '总 {0}',
      },
      bossDoubleReward: '首领任务使战斗通行证进阶2级',
    },
    enemyName: {
      soldier: '士兵',
      officer: '军官',
      hunter: '猎人',
      sniper: '狙击手',
      strongMonkey: '强壮猴子',
      angryMonkey: '愤怒猴子',
      dartMonkey: '飞镖猴子',
      monkeyWizard: '猴子巫师',
      monkeyDefender: '猴子防御者',
      monkeyMonk: '猴子僧侣',
      puppy: '小狗',
      kitten: '小猫',
      seal: '海豹',
      piglet: '小猪',
      panda: '熊猫',
      koala: '考拉',
      rabbit: '兔子',
      guineaPig: '豚鼠',
    },
    bossName: {
      ohilio_guard1: '守卫A',
      ohilio_guard2: '守卫B',
      ohilio: 'ohilio',
      chriz1: 'Chriz',
      chriz2: 'Chriz',
      mina: 'Mina',

      armed_skeleton: '骷髅',
    },
    area: {
      zoneEndless: '无尽区域',
      zoneBoss: '首领 ({0})',
      zone: '区域 {0}',
      digsite: '挖掘场',
      digsiteDescription: '击败强大的骷髅首领以解锁在此区域寻找怪物牙齿的能力。',
      digsiteWeakness: '此骷髅弱点为 {0} 职业，使用任何其他职业会使骷髅获得 x{1} 攻击力和生命值。',
      digsiteWeaknessTitle: '骷髅弱点',
      digsiteWeaknessShort: '弱点为 {0}',
      difficulty: '{0} 难度',
      enemyAmount: '此区域有 {0} 个敌人',
      warzone: '战区',
      monkeyJungle: '猴子丛林',
      loveIsland: '爱情岛',
    },
    sign: {
      sign_1: {
        text: '我的瞄准是完美的，我从不失手！你最好小心点！',
        signed: 'ohilio',
      },
      sign_2: {
        text: '你觉得你能伤害我？不可能！我会闪避一切，你甚至无法击中我！我是不可触及的！',
        signed: 'ohilio',
      },
      sign_3: {
        text: '我是最伟大的，最好的，完美的，不可战胜的！就连我的守卫与我相比也算不了什么！你觉得你有机会对抗我吗？哈！准备受死吧！',
        signed: 'ohilio',
      },
      sign_4: {
        text: '在仔细观察这些可爱的动物后，你注意到它们不是真实的。它们只是鬼火！但它们为什么在这里？是为了让你感到难过吗？没时间思考这个了，你需要战斗以通过这些动物灵魂',
        signed: '???',
      },
    },
    quest: {
      name: '任务',
      description: '完成任务以推进你的战斗通行证并解锁永久奖励',
      completed: '{0} 已完成',
      allCompleted: '所有任务已完成',
    },
    trinket: {
      rarity: {
        0: '未拥有',
        1: '普通',
        2: '优秀',
        3: '稀有',
        4: '史诗',
        5: '传说',
        6: '神话',
        7: '非凡',
        8: '光辉',
        9: '棱彩',
        10: '终极',
        timeless: '永恒'
      },
      equipped: '已选择的饰品（转生后装备）',
      vitality: '活力',
      energy: '能量',
      magic: '魔法',
      fists: '拳法',
      sparks: '火花',
      haste: '急速',
      precision: '精准',
      wrath: '怒火',
      strength: '力量',
      toxins: '毒素',
      wisdom: '智慧',
      extraction: '萃取',
      learning: '学习',
      preservation: '保鲜',
      energize: '充能',
      automation: '自动化',
      cure: '治愈',
      stone: '石头',
      duality: '二元',
      love: '爱心',
    },
    sacrifice: {
      name: '献祭',
      description: '在这里你可以临时献祭装备槽位以换取强大的奖励'
    }
  },
  farm: {
    farm: '农场',
    unlockSeed: '解锁种子',
    experience: '经验',
    expToLevelUp: '你还需要 {0} 次收获才能达到下一级',
    yield: '产量',
    rareDrop: '稀有掉落',
    rareDrops: '稀有掉落物',
    huntedRareDrops: '已狩猎稀有掉落物',
    addRareDrop: '添加稀有掉落物 ({0})',
    addRareDropAmount: '{0} 数量',
    prestige: {
      description: '你可以转生已达到等级 4 的作物，将其转生等级提升至当前等级以获得奖励。这将重置该作物的所有经验、等级和基因。每个转生等级使所有作物的产量乘以 x1.04。',
      current: '你当前的转生等级为 {0}，产量乘以 x{1}。',
      next: '转生此作物将使你的转生等级增加 {0}。这将使你的总转生等级提升至 {1}，产量提升至 x{2}。',
      nextNoEffect: '你的等级不高于此作物的转生等级。转生不会增加你的转生等级，但仍会重置等级和基因。',
      cropOnField: '你现在无法转生，因为此作物在田地上',
      increasedGLRequirement: '达到等级 10 后，作物每两级才增加一次全局等级',
      noMoreGL: '达到等级 40 后，作物停止增加全局等级',
    },
    button: {
      plantAll: '在所有空地上种植选定的作物 ({0})。你也可以点击空地来种植单个作物',
      replant: '所有成熟的作物将被收获并重新种植在同一地块上',
      replantFertilizer: '将尽可能使用相同的肥料',
      harvestAll: '收获所有成熟的作物。你也可以点击单个作物来收获',
      delete: '从地块上移除作物。花费的资源将被退还',
      deleteBuilding: '装饰物也可以通过此方式移除并返回到你的库存',
      color: '地块可以被着色以简化大型田地的管理。选择一种颜色并点击地块来涂抹它。当你选择了一种颜色时，批量操作只影响相同颜色的地块',
      colorFilter: '仅影响此颜色的地块',
    },
    timeDescription: '生长所需时间',
    overgrowDescription: '完全生长后，你的植物可以继续生长以增加所有收获获得。每达到 100%，生长时间乘以 {0}x。',
    overgrowFormula: '时间倍数 = (1 / 过度生长 + 1)x',
    fertilizerCostDescription: '每个作物需要的肥料',
    goldChance: '金币几率',
    goldChanceDescription: '收获植物时有几率获得金币，基于作物生长时间和放置的花园地精数量',
    goldChanceMultiple: '超过 100% 的金币几率仍然增加金币获得，你保证找到 {0} 个金币并有 {1}% 几率多找 1 个',
    goldChanceWarning: '在田地上放置花园地精以开始找到金币',
    specialCropEffect: '达到下一级以获得：',
    freeUpgrades: {
      s: '剩余基因',
      p: '剩余基因'
    },
    fertilizerCannotBeBought: '无法购买',
    divider: {
      specialCrop: '特殊作物',
      decoration: '装饰'
    },
    crop: {
      carrot: '胡萝卜',
      blueberry: '蓝莓',
      wheat: '小麦',
      tulip: '郁金香',
      potato: '土豆',
      raspberry: '树莓',
      barley: '大麦',
      dandelion: '蒲公英',
      corn: '玉米',
      watermelon: '西瓜',
      rice: '水稻',
      rose: '玫瑰',
      leek: '韭菜',
      honeymelon: '蜜瓜',
      rye: '黑麦',
      daisy: '雏菊',
      cucumber: '黄瓜',
      grapes: '葡萄',
      hops: '啤酒花',
      violet: '紫罗兰',
      sweetPotato: '红薯',
      strawberry: '草莓',
      sesame: '芝麻',
      sunflower: '向日葵',
      spinach: '菠菜',
      currant: '醋栗',
      redwheat: '红麦',
      poppy: '罂粟',
      pumpkin: '南瓜',
      blackberry: '黑莓',
      millet: '小米',
      petunia: '矮牵牛',
      chili: '辣椒',
      fern: '蕨类',
      reed: '芦苇',
      wildflower: '野花',
      cactus: '仙人掌',
      cress: '水芹',
      goldenRose: '金色玫瑰',
      ancientFern: '远古蕨类',
    },
    giantCrop: {
      name: '巨型作物',
      regular: '你当前正在种植普通作物',
      giant: '你当前正在种植巨型作物',
      clickToToggle: '点击切换',
      description: '你可以种植巨型作物以获得更大的收获。它们具有修改后的属性：',
      stat: {
        0: '生长时间从 {0} 增加到 {1}',
        1: '肥料成本从 {0} 增加到 {1}',
        2: '所有收获获得 x{0}',
        3: '作物成本 x{0}',
        4: '经验获得 x{0}',
      },
      efficiency: '此巨型作物的时间效率为 {0}%',
    },
    gene: {
      name: '基因',
      upgrade: '基因升级',
      pickLevel: '选择等级 {0} 基因',
      dnaDescription: '当此作物达到新等级时，你获得 1 个 DNA，可以花费在基因升级上',
      dnaDuplicate: '你选择的基因不会出现在下次转生中。不选择基因会使所有 4 个基因在下一次转生中可用',
      dnaBlocked: '已封锁基因',
      hasUpgrade: '已有基因升级',
      lockOnField: '当地块上有此作物时，无法选择此基因',
      basics: '基础',
      yield: '产量',
      gold: '金币',
      exp: '经验',
      rareDrop: '稀有掉落',
      grow: '生长',
      overgrow: '过度生长',
      mutate: '变异',
      grass: '草类',
      dna: 'DNA',
      gnome: '地精',
      lonely: '孤独',
      fertile: '肥沃',
      mystery: '神秘',
      conversion: '转化',
      prestige: '转生',
      rareDropChance: '发现',
      lucky: '幸运',
      finalize: '完成',
      selfless: '无私',
      unyielding: '不屈',
      teamwork: '团队',
      hunter: '猎人',
      patient: '耐心',
    },
    fertilizerEffect: {
      vegetable: '仅蔬菜',
      berry: '仅浆果',
      grain: '仅谷物',
      flower: '仅花卉',
      special: '仅特殊作物',
    },
    building: {
      premium: '高级：{0}',
      premiumOwned: '高级：已拥有 {0}',
      owned: '已拥有 {0}',
      gardenGnome: {
        name: '花园地精',
        description: '当地块上的作物收获时，如果花园地精放置在田地上，可能会给予金币。几率基于作物生长时间。',
      },
      sprinkler: {
        name: '洒水器',
        description: '同一行的作物生长速度 +{0}% 更快，并且 +{1}% 过度生长',
        care: '照料更可能出现',
      },
      lectern: {
        name: '讲台',
        description: '同一列的作物给予 +{0}% 经验',
      },
      pinwheel: {
        name: '风车',
        description: '周围8个地块中每种独特作物使整个田地的稀有掉落几率乘以一定倍数，最大为 {0}x',
        rareDrop: '乘以整个田地的稀有掉落几率',
      },
      flag: {
        name: '旗帜',
        description: '如果它们位于与旗帜相关的正确位置，产量增加 +{0}%。蔬菜：左上，浆果：右上，谷物：左下，花卉：右下',
      }
    },
    care: {
      wateringCan: '洒水壶',
      description1: '只要洒水壶装有雨水，照料会随时间出现在普通作物上。最多总共 {0} 个作物可以同时激活照料。将鼠标悬停在作物上的洒水壶图标上以应用照料。',
      description2: '雨水以最高 {0}/小时的速度积累，基础容量为 {1}。雨水在该值以上继续积累，但速度略有降低。',

      empty: '洒水壶完全空了。等待一会儿直到更多照料出现。',
      low: '洒水壶几乎空了。雨水以全速积累，照料出现得非常慢。',
      mid: '洒水壶装有一点水。雨水以接近全速的速度积累，照料出现得慢。',
      half: '洒水壶装有很多水。雨水以中等速度积累，照料以平均速度出现。',
      high: '洒水壶几乎满了。雨水以低速积累，照料出现得快。',
      full: '洒水壶满了。雨水积累得非常慢，照料出现得非常快。',

      improve: '照料类型改进：{0}',
      add: '照料类型添加：{0}',
      disable: '照料类型禁用：{0}',

      yield: '产量',
      gold: '金币',
      exp: '经验',
      rareDrop: '稀有掉落',
      time: '时间',
    }
  },
  gallery: {
    gallery: '画廊',
    auction: '拍卖',
    colorSuffix: '颜色',
    openPackage: '打开',
    colorGainReduced: '超过 100 颜色后，额外获得减少为平方根',
    drumCompounding: '为了能够找到此鼓，你还必须找到同一包中所有之前颜色的鼓。这降低了找到此鼓的有效几率',
    allConverterInfo: '转换颜色总是消耗所有转换器',
    converterOverload: '你拥有的转换器远远超过此转换所需的颜色，导致 x{0} 转换获得',
    idea: {
      tier: '等级 {0} 创意',
      unlock: '解锁创意',

      makeItPretty: '使之精美',
      stompBerries: '踩浆果',
      carvePumpkins: '雕刻南瓜',
      sortWaste: '分类垃圾',
      advertise: '做广告',
      beImpatient: '急躁',
      beExcited: '兴奋',

      makeLemonade: '制作柠檬汁',
      growATree: '种树',
      buildComposter: '建造堆肥箱',
      observeRainbow: '观察彩虹',
      buildRedReservoir: '建造红色水库',
      orderMassiveSafe: '订购大型保险箱',
      buyPen: '购买笔',

      drawOcean: '画海洋',
      makeWine: '制作葡萄酒',
      calculateOdds: '计算概率',
      buildOrangeReservoir: '建造橙色水库',
      thinkHarder: '更努力思考',
      paintFaster: '更快绘画',
      buyBrush: '购买画笔',

      harvestOranges: '收获橘子',
      pulverizeGold: '粉碎金币',
      buildYellowReservoir: '建造黄色水库',
      paintForFun: '为乐趣绘画',
      printNewspaper: '印刷报纸',
      expandCanvas: '扩展画布',
      hyperfocus: '高度专注',

      cutGrass: '割草',
      shapeClay: '塑形粘土',
      buildGreenReservoir: '建造绿色水库',
      beMysterious: '保持神秘',

      lookAtTheSky: '看天空',
      chewBubblegum: '嚼泡泡糖',
      buildBlueReservoir: '建造蓝色水库',
    },
    nextInspiration: {
      0: '下一个 ',
      1: ' 在 '
    },
    shapes: {
      name: '形状',
      upgrades: '形状升级',
      description: '拖动一个形状到相邻的位置以交换位置，或点击一个形状以收集它。收集需要5个相同类型的形状相连，每个形状获得的形状数量等于收集连击数。',
      cost: '每次行动花费',
      special: {
        name: '特殊形状',
        description: '特殊形状有 {0}% 的几率出现以替代普通形状，特殊收集给予 {1}x 形状。网格上只能有一个特殊形状',
        bomb: '+ 形阵中的所有形状被特殊收集',
        dice: '所有与上方（或如果在顶行则与下方）形状不匹配的形状将被重新滚动',
        accelerator: '周围8个形状被特殊收集。如果所有8个形状都相同，花费最多100点动力以获得更多形状',
        sparkles: '4个直接相邻的形状被常规收集（如果可能）并算作一个大连击',
        hourglass: '立即获得转换器和包，收集形状以增加时间',
        chest: '特殊收集10个附近形状，8个周围的形状以及左右两侧的形状。如果所有10个形状都不同，获得特殊奖励并再次以基础值应用特殊形状倍数'
      },
      buyFor: {
        0: '购买',
        1: '花费'
      },
      reroll: '重新滚动整个网格花费',
      unlock: '解锁形状：{0}',
      circle: '圆形',
      rectangle: '矩形',
      triangle: '三角形',
      star: '星形',
      ellipse: '椭圆形',
      heart: '心形',
      square: '正方形',
      octagon: '八边形',
      pentagon: '五边形',
      hexagon: '六边形',
      bomb: '炸弹',
      dice: '骰子',
      accelerator: '加速器',
      sparkles: '火花',
      hourglass: '沙漏',
      chest: '宝箱',
    },
    canvas: {
      name: '画布',
      description: '在画布上放置颜色以缓慢增加其画布等级，授予你永久奖励',
      level: '画布等级',
      untilNextLevel: '距离下一级还需 {0}'
    }
  },
  gem: {
    newGemsTime: '每次进度条满时获得新的红宝石和绿宝石。生成器每 {0} 创造新的宝石。',
    newGemsTimeAchievement: '每次进度条满时获得新的红宝石和绿宝石。每个成就使生成速度增加 +{0}%。你的 {1} 个成就使生成速度从 {3} 增加到 {4}，增加了 +{2}%。',
    newGemsTimeSecondary: '每次进度条满时获得新的次级宝石。生成器每 {0} 创造新的宝石。',
    newGemsTimeAchievementSecondary: '每次进度条满时获得新的次级宝石。每个成就使生成速度增加 +{0}%。你的 {1} 个成就使生成速度从 {3} 增加到 {4}，增加了 +{2}%。',
    newDiamondTime: '每次进度条满时获得一颗钻石。生成器每 {0} 创造钻石。',
    diamondForge: '钻石锻造厂',
  },
  achievement: {
    nextReward: '完成此成就的下一等级时，这将作为奖励给予。',
    secret: '此成就是隐藏的，不给予任何奖励。'
  },
  treasure: {
    effectSummary: '效果摘要',
    effectOwned: '你拥有 {0} 个具有此效果的宝物',
    effectMax: '只有最强的 {0} 个宝物生效（{1} / {0}）',
    effectMinTier: '此效果只出现在等级 {0} 或更高的宝物上',
    eventPowerDescription: '活动能量无法通过购买宝物获得，需要使用特定修饰符添加到现有宝物上。每点活动能量使所有功能的声望获得增加 +0.15%，你的活动能量限制为全球等级的 20%。',
    eventPowerEffect: '你的活动能量将所有声望获得乘以 x{0}',
    eventPowerOvercap: '你拥有的活动能量超过限制 {0}',
    upArrowFragments: '添加此修饰符使删除此宝物时获得的碎片增加 {0}',
    expanderFragments: '添加此修饰符将等级降至 0，退还花费的碎片，并使删除此宝物时获得的碎片增加 {0}',
    expanderEffect: '一个月内升级到等级 {0}，一年内升级到等级 {1}',
    level: '等级',
    tier: '等级',
    tierItem: '等级 {0} 宝物',
    emptySlot: '空槽位（点击选择）',
    modifiers: '修饰符',
    specialGroup: '特殊',
    tierEffect: {
      globalLevel: '你的全局等级同时增加宝物等级和更高等级宝物的几率。',
      wildcard: '万能卡几率',
      upgrade: '升级成本',
      destroy: '摧毁时获得的碎片',
      regular: '普通效果',
      special: '特殊效果'
    },
    buyFragment: {
      0: '购买碎片（',
      1: '）花费'
    },
    buyTreasure: '获得一个具有随机等级和效果的宝物',
    upgradeDescription: '使用碎片升级宝物。碎片消耗取决于宝物等级和级别。',
    destroyDescription: '摧毁宝物以根据宝物等级获得碎片。所有花费在升级该宝物上的碎片也将被退还。'
  },
  relic,
  card
}
