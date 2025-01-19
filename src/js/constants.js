// game version to play / build
// WEB has auto-updates and shows support links
// OFFLINE hides auto-updates and shows support links (web-based)
// DESKTOP hides auto-updates and shows support links (windows app)
// STEAM hides auto-updates and hides support links
export const APP_ENV = 'WEB';

// enable / disable testing version
export const APP_TESTING = false;

export const LOCAL_STORAGE_NAME = APP_TESTING ? 'goobooTesting' : 'goobooSavefile';

// time conversion
export const SECONDS_PER_MINUTE = 60;
export const SECONDS_PER_HOUR = 3600;
export const SECONDS_PER_DAY = 86400;
export const MINUTES_PER_HOUR = 60;
export const MINUTES_PER_DAY = 1440;
export const HOURS_PER_DAY = 24;

export const MINING_SCRAP_BREAK = 4;
export const MINING_ORE_BREAK = 1;
export const MINING_RARE_DROP_BREAK = 1;
export const MINING_SMOKE_BREAK = 1;
export const MINING_CRAFTING_COMPRESSION = 5;
export const MINING_GRANITE_DEPTH = 50;
export const MINING_SALT_DEPTH = 70;
export const MINING_COAL_DEPTH = 90;
export const MINING_SULFUR_DEPTH = 110;
export const MINING_NITER_DEPTH = 130;
export const MINING_OBSIDIAN_DEPTH = 150;
export const MINING_DEEPROCK_DEPTH = 275;
export const MINING_GLOWSHARD_DEPTH = 9999;//400;
export const MINING_SMELTERY_TEMPERATURE_SPEED = 0.004;
export const MINING_ENHANCEMENT_BARS = 50;
export const MINING_ENHANCEMENT_FINAL = 10;
export const MINING_ENHANCEMENT_BAR_AMOUNT = 10;
export const MINING_ENHANCEMENT_CHANCE_EXPONENT = 0.5;
export const MINING_DWELLER_OVERCAP_MULT = 0.9;
export const MINING_DWELLER_OVERFLOW = 5;

export const VILLAGE_COINS_PER_FOOD = 0.25;
export const VILLAGE_JOY_MIN_HAPPINESS = 1.25;
export const VILLAGE_JOY_PER_HAPPINESS = 0.2;
export const VILLAGE_JOY_HAPPINESS_REDUCTION = 1.2;
export const VILLAGE_MIN_HAPPINESS = 0.01;
export const VILLAGE_OFFERING_PASSIVE_GAIN = 0.02;

export const HORDE_COMBO_ATTACK = 1.025;
export const HORDE_COMBO_HEALTH = 1.01;
export const HORDE_COMBO_BONE = 0.012;
export const HORDE_MONSTER_PART_MIN_ZONE = 10;
export const HORDE_SHARD_PER_EQUIP = 5;
export const HORDE_SHARD_INCREMENT = 2;
export const HORDE_RAMPAGE_ENEMY_TIME = 60;
export const HORDE_RAMPAGE_BOSS_TIME = 300;
export const HORDE_RAMPAGE_ATTACK = 1.5;
export const HORDE_RAMPAGE_CRIT_CHANCE = 0.25;
export const HORDE_RAMPAGE_CRIT_DAMAGE = 0.6;
export const HORDE_RAMPAGE_STUN_RESIST = 1;
export const HORDE_INACTIVE_ITEM_COOLDOWN = 0.05;
export const HORDE_ENEMY_RESPAWN_TIME = 10;
export const HORDE_ENEMY_RESPAWN_MAX = 5;
export const HORDE_MINIBOSS_MIN_ZONE = 21;
export const HORDE_HEIRLOOM_MIN_ZONE = 31;
export const HORDE_KEYS_PER_TOWER = 3;
export const HORDE_HEIRLOOM_TOWER_FLOORS = 5;
export const HORDE_HEIRLOOM_CHANCE_PER_NOSTALGIA = 0.001;
export const HORDE_MASTERY_MINIBOSS_MULT = 0.05;
export const HORDE_DAMAGE_INCREASE_PER_STRENGTH = 0.05;
export const HORDE_LEVEL_MIN_SECONDS = 600;
export const HORDE_SHARD_CHANCE_REDUCTION = 1.075;

export const GALLERY_SHAPES_GRID_WIDTH = 9;
export const GALLERY_SHAPES_GRID_HEIGHT = 6;
export const GALLERY_REROLL_COST = 35;
export const GALLERY_CONVERTER_EXPONENT = 0.0025;
export const GALLERY_MOTIVATION_BUY_COST = 20;
export const GALLERY_MOTIVATION_BUY_AMOUNT = 500;

export const TREASURE_TIER_UPGRADE_MULT = 5;
export const TREASURE_TIER_DESTROY_MULT = 4;
export const TREASURE_TIER_REGULAR_MULT = 2;
export const TREASURE_TIER_SPECIAL_MULT = 1.25;
export const TREASURE_FRAGMENT_BUY_COST = 100;
export const TREASURE_FRAGMENT_BUY_GAIN = 4;

export const GEM_SPEED_BASE = 3600;
export const GEM_SPEED_PER_ACHIEVEMENT = 0.01;

export const SCHOOL_BOOK_BASE_GAIN = 10;
export const SCHOOL_STUDY_TIME = 40;
export const SCHOOL_EXAM_TIME = 75;
export const SCHOOL_EXAM_DUST_MIN = 600;
export const SCHOOL_EXAM_PASS_PRICE = 35;

export const CASINO_BINGO_CARD_COST = 75;
export const CASINO_WHEEL_COST = 50;

export const BANK_INVESTMENT_INTEREST_LARGE = 0.05;
export const BANK_INVESTMENT_INTEREST_SMALL = 0.01;
export const BANK_LOAN_INTEREST = 0.2;

export const BLOOM_WILDGROWTH_COST = 90;
export const BLOOM_BOOST_COST = 140;

export const WEATHER_CHAOS_RESET_COST = 150;
export const WEATHER_CHAOS_BAIT_COST = 90;

export const NIGHT_HUNT_HINT_PENALTY = 0.1;

export const SNOWDOWN_FIGHT_COST = 8;
export const SNOWDOWN_REROLL_COST = 30;
export const SNOWDOWN_BOOST_COST = 55;

export const NIGHT_HUNT_GL_BOOST = 1.01;
