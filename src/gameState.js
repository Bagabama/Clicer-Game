/**
 * ITea.inc - Deep Economy, Milestone Multipliers, Super-Exponential Inflation,
 * True Multiplicative Prestige & Lore Dialogue Engine
 */

export const MILESTONES = [10, 25, 50, 100, 175, 275, 400, 550, 750, 1000];
export const MILESTONE_MULTS = [2, 3, 4, 5, 6, 8, 10, 15, 20, 25];

export function getUpgradeMilestoneMultiplier(rank) {
  let mult = 1;
  for (let i = 0; i < MILESTONES.length; i++) {
    if (rank >= MILESTONES[i]) {
      mult *= MILESTONE_MULTS[i];
    } else {
      break;
    }
  }
  return mult;
}

export function getNextMilestone(rank) {
  for (let i = 0; i < MILESTONES.length; i++) {
    if (rank < MILESTONES[i]) {
      return { level: MILESTONES[i], mult: MILESTONE_MULTS[i] };
    }
  }
  return null;
}

export const CONTAINMENT_LAYERS = [
  {
    id: 1,
    name: 'Пакетик «Майский Жмых»',
    energyReq: 1000,
    perk: '+25% к базовой силе ручной заварки',
    desc: 'Пластиковый стаканчик и безымянный пакетик из кладовки стартапа. Начало пути ITea.inc!',
    lore: 'Заваркин: «С этого пакетика начинались Яндекс и Гугл. Жми на кружку!»'
  },
  {
    id: 2,
    name: 'Офисный Липтон из кулера',
    energyReq: 8000,
    perk: 'Разблокировка навыка «Оверклок Чайника»',
    desc: 'Классический чай программистов под дедлайн. Вода еле теплая, но кофеин бодрит.',
    lore: 'Заваркин: «Вода из кулера пахнет пластиком, но код сам себя не закоммитит!»'
  },
  {
    id: 3,
    name: 'Зеленый Сенча с дедлайном',
    energyReq: 65000,
    perk: 'Максимальная температура заварки поднята до 7.5x',
    desc: 'Настоящие японские листья, заряженные на исправление критических багов в проде.',
    lore: 'Заваркин: «Сенча успокаивает нервы перед созвоном с заказчиком. Держи темп!»'
  },
  {
    id: 4,
    name: 'Габа Улун с нейростимулятором',
    energyReq: 450000,
    perk: '+10% к шансу Идеальной Заварки (крита)',
    desc: 'Чай с гамма-аминомасляной кислотой для Senior Architect. Полная концентрация мысли.',
    lore: 'Заваркин: «Габа разогнала нейроны. Теперь криты будут сыпаться как пулл-реквесты!»'
  },
  {
    id: 5,
    name: 'Да Хун Пао Архитектора',
    energyReq: 3500000,
    perk: 'Разблокировка навыка «Tea_VPN Hyper-Tunnel»',
    desc: 'Утёсный чай с горы Уи. Туннелирует заварку прямо в мозг разработчика.',
    lore: 'Заваркин: «Туннелируем поставки чая в обход DPI и блокировок чайников!»'
  },
  {
    id: 6,
    name: 'Маття Латте из коворкинга',
    energyReq: 28000000,
    perk: 'Чай в кружке остывает на 45% медленнее',
    desc: 'Взбитая пудра маття на кокосовом молоке. Модно, стильно, долго держит тепло.',
    lore: 'Заваркин: «Хипстеры в коворкинге оценили. Тепло держится вдвое дольше!»'
  },
  {
    id: 7,
    name: 'Пуэр 2008 года с криптофермы',
    energyReq: 220000000,
    perk: 'Золотые чайные пакетики появляются в 2.5 раза чаще',
    desc: 'Выдержанный блин шу-пуэра, хранившийся рядом с видеокартами во время майнинг-бума.',
    lore: 'Заваркин: «Этот пуэр выдержан на теплом воздухе ферм биткоина. Чистый тонизирующий хешрейт!»'
  },
  {
    id: 8,
    name: 'Чай на слезах джуниоров',
    energyReq: 1800000000,
    perk: 'Разблокировка навыка «Тайфун Заварки»',
    desc: 'Квантовый напиток, полученный после ночного деплоя в пятницу вечером.',
    lore: 'Заваркин: «Горький вкус пятничного падения базы данных. Зато 100% криты!»'
  },
  {
    id: 9,
    name: 'Императорский Драконий Чай CEO',
    energyReq: 15000000000,
    perk: 'Идеальные заварки дают утроенный объём (x3)',
    desc: 'Эксклюзивный сорт для совета директоров Кремниевой Долины. Вкус венчурных инвестиций.',
    lore: 'Заваркин: «Сам Илон Маск заказывает у нас этот сорт для полётов на Марс!»'
  },
  {
    id: 10,
    name: 'Чайная Сингулярность ITea.inc',
    energyReq: 120000000000,
    perk: '100% Заварка Достигнута! Время выходить на IPO и строить глобальную франшизу!',
    desc: 'Абсолютная гармония кода и чайного листа. Все чайники подключены к Tea_VPN.',
    lore: 'Заваркин: «Мы победили вселенную! Выходи на IPO и забирай акции!»'
  }
];

export const UPGRADE_DEFINITIONS = [
  {
    id: 'kinetic_spoon',
    name: 'Кинетическая Ложечка',
    category: 'active',
    baseCost: 20,
    costMult: 1.18,
    clickBonus: 1.5,
    passiveBonus: 0,
    desc: 'Каждое перемешивание заваривает чай интенсивнее.'
  },
  {
    id: 'smart_mug_heater',
    name: 'Кружка с USB-подогревом',
    category: 'active',
    baseCost: 110,
    costMult: 1.20,
    clickBonus: 6,
    passiveBonus: 0.5,
    desc: 'Питается от ноутбука. +6 мл к клику, помогает удерживать кипение.'
  },
  {
    id: 'intern_with_kettle',
    name: 'Стажер с электрочайником',
    category: 'passive',
    baseCost: 350,
    costMult: 1.22,
    clickBonus: 3,
    passiveBonus: 4,
    desc: 'Джуниор регулярно подливает кипяток (+4 мл/с) и дублирует тапы (+3 мл).'
  },
  {
    id: 'pressure_infuser',
    name: 'Чайный Пресс-Инжектор',
    category: 'active',
    baseCost: 1600,
    costMult: 1.25,
    clickBonus: 28,
    passiveBonus: 2,
    desc: 'Выжимает из чайных листьев всё до последней капли. +28 мл к клику.'
  },
  {
    id: 'wifi_tea_strainer',
    name: 'Умное Ситечко с Wi-Fi',
    category: 'active',
    baseCost: 7500,
    costMult: 1.27,
    clickBonus: 95,
    passiveBonus: 8,
    desc: 'Фильтрует чаинки на наноуровне. +95 мл к клику, +1.5% крит. шанс.'
  },
  {
    id: 'office_tea_cooler',
    name: 'Кулер с протоколом ITea',
    category: 'passive',
    baseCost: 36000,
    costMult: 1.29,
    clickBonus: 60,
    passiveBonus: 65,
    desc: 'Офисная станция заварки. +65 мл/с, увеличивает награду за Золотые Пакетики.'
  },
  {
    id: 'tea_vpn_node',
    name: 'Серверная Нода Tea_VPN',
    category: 'active',
    baseCost: 180000,
    costMult: 1.32,
    clickBonus: 450,
    passiveBonus: 25,
    desc: 'Сверхзащищенный туннель доставки чая. +450 мл к клику, +30% к урону крита.'
  },
  {
    id: 'auto_brewing_rack',
    name: 'Чайный Серверный Стеллаж',
    category: 'passive',
    baseCost: 950000,
    costMult: 1.34,
    clickBonus: 700,
    passiveBonus: 480,
    desc: 'Стойка 42U, где вместо блейд-серверов заваривается элитный улун (+480 мл/с).'
  },
  {
    id: 'tannin_accelerator',
    name: 'Гипер-Ускоритель Танина',
    category: 'active',
    baseCost: 5500000,
    costMult: 1.37,
    clickBonus: 3800,
    passiveBonus: 160,
    desc: 'Ядерный распад чайного кофеина. Гигантский прирост к заварке: +3,800 мл.'
  },
  {
    id: 'quantum_tea_rig',
    name: 'Квантовая Чайная Станция',
    category: 'active',
    baseCost: 35000000,
    costMult: 1.40,
    clickBonus: 24000,
    passiveBonus: 1200,
    desc: 'Заваривает чай во всех параллельных ветках Git одновременно: +24,000 мл!'
  }
];

export const SKILL_DEFINITIONS = [
  {
    id: 'overdrive',
    name: 'Оверклок Чайника',
    duration: 15,
    cooldown: 45,
    desc: 'Мгновенно доводит чайник до 100°C и блокирует остывание на максимальном множителе (x7.5) на 15 сек.',
    reqLayer: 2
  },
  {
    id: 'vpn_tunnel',
    name: 'Tea_VPN Hyper-Tunnel',
    duration: 12,
    cooldown: 60,
    desc: 'Туннелирует чай через Tea_VPN: учетверяет урон активного клика (x4) на 12 секунд.',
    reqLayer: 5
  },
  {
    id: 'tea_typhoon',
    name: 'Тайфун Заварки',
    duration: 15,
    cooldown: 90,
    desc: 'Каждый клик становится Идеальной Заваркой (100% крит) с дополнительным множителем x2.5 на 15 сек.',
    reqLayer: 8
  }
];

export const MASTERY_TREE = [
  {
    id: 'barista_mastery',
    name: 'Чайный Бариста ITea',
    cost: 5,
    costMult: 2.5,
    maxRank: 10,
    desc: '+50% к базовой силе ручной заварки за ранг.'
  },
  {
    id: 'thermal_insulation',
    name: 'Двойная Термоизоляция',
    cost: 8,
    costMult: 2.8,
    maxRank: 5,
    desc: 'Замедляет остывание чайника на 25% и повышает макс. множитель на +1x за ранг.'
  },
  {
    id: 'golden_leaf_crit',
    name: 'Идеальная Заварка',
    cost: 15,
    costMult: 3.0,
    maxRank: 8,
    desc: '+5% к шансу крита и +75% к критическому множителю за ранг.'
  },
  {
    id: 'tea_bag_flux',
    name: 'Умные Чайные Пакетики',
    cost: 12,
    costMult: 2.5,
    maxRank: 5,
    desc: 'Золотые пакетики появляются на 30% чаще и дают на 75% больше чая за ранг.'
  },
  {
    id: 'franchise_capital',
    name: 'Венчурный Капитал ITea',
    cost: 25,
    costMult: 3.5,
    maxRank: 5,
    desc: 'Каждый клик дает на 25% больше прогресса к текущему чайному грейду.'
  }
];

export const MASCOT_LORE = [
  'Мяу! Добро пожаловать в ITea.inc! Я Заваркин, твой чайный архитектор. Кликай кружку!',
  'Чайник остывает без тапов! В холодном чае плавают только баги и сорванные дедлайны!',
  'Каждые 10, 25, 50 уровней навыка дают огромный множитель x2, x3, x4! Качай уровни!',
  'Цены растут быстрее дохода? Это инфляция Кремниевой Долины! Пора открывать Франшизу!',
  'Престиж (IPO) умножает доход в разы навсегда! Чем больше сбросов, тем быстрее прогресс.',
  'Tea_VPN шифрует наш чай по протоколу ChaCha20-Tea. Пинг до Цейлона минимальный!',
  'Смотри рекламу спонсора Tea_VPN — получишь мгновенный турбо-буст и кипяток 100°C!',
  'В пятницу вечером чай особенно крепок. Деплоим без страха!',
  'Золотой пакетик на экране! Лови его, пока стажеры не утащили на кухню!'
];

export class GameState {
  constructor() {
    this.energy = 0; // Current tea ml
    this.currentRunTeaEarned = 0; // Reset upon prestige!
    this.totalEnergyEarned = 0; // Lifetime stat
    this.totalClicks = 0;
    this.totalCrits = 0;
    this.stellarDarkMatter = 0; // Golden Tea Leaves (GTL)
    this.totalSDMEarned = 0;
    this.supernovaCount = 0; // Franchises launched

    // Ceremonial Tier tracking
    this.currentLayerIndex = 0;
    this.layerProgress = 0;

    // Upgrades: map of upgradeId -> rank
    this.upgrades = {};
    UPGRADE_DEFINITIONS.forEach(u => this.upgrades[u.id] = 0);

    // Mastery ranks: map of masteryId -> rank
    this.masteries = {};
    MASTERY_TREE.forEach(m => this.masteries[m.id] = 0);

    // Boil temperature / Combo heat
    this.heat = 0;
    this.maxHeat = 100;
    this.comboMultiplier = 1;

    // Tea_VPN Ad Boost status
    this.isVpnAdActive = false;
    this.vpnAdTimer = 0;

    // Skills
    this.skills = {};
    SKILL_DEFINITIONS.forEach(s => {
      this.skills[s.id] = { active: false, activeTimer: 0, cooldownTimer: 0 };
    });

    // Mascot Dialogue
    this.currentLore = MASCOT_LORE[0];
    this.loreTimer = 0;

    this.lastTimestamp = Date.now();
    this.lastSaved = Date.now();
  }

  load() {
    try {
      const data = localStorage.getItem('itea_inc_save_v2');
      if (data) {
        const parsed = JSON.parse(data);
        this.energy = Number(parsed.energy) || 0;
        this.currentRunTeaEarned = Number(parsed.currentRunTeaEarned) || 0;
        this.totalEnergyEarned = Number(parsed.totalEnergyEarned) || 0;
        this.totalClicks = Number(parsed.totalClicks) || 0;
        this.totalCrits = Number(parsed.totalCrits) || 0;
        this.stellarDarkMatter = Number(parsed.stellarDarkMatter) || 0;
        this.totalSDMEarned = Number(parsed.totalSDMEarned) || 0;
        this.supernovaCount = Number(parsed.supernovaCount) || 0;
        this.currentLayerIndex = Math.min(Number(parsed.currentLayerIndex) || 0, CONTAINMENT_LAYERS.length - 1);
        this.layerProgress = Number(parsed.layerProgress) || 0;

        if (parsed.upgrades) {
          Object.keys(parsed.upgrades).forEach(id => {
            if (this.upgrades[id] !== undefined) this.upgrades[id] = Number(parsed.upgrades[id]) || 0;
          });
        }
        if (parsed.masteries) {
          Object.keys(parsed.masteries).forEach(id => {
            if (this.masteries[id] !== undefined) this.masteries[id] = Number(parsed.masteries[id]) || 0;
          });
        }
        this.lastSaved = Number(parsed.lastSaved) || Date.now();
        return true;
      }
    } catch (e) {
      console.error('Error loading save:', e);
    }
    return false;
  }

  save() {
    try {
      const data = {
        energy: this.energy,
        currentRunTeaEarned: this.currentRunTeaEarned,
        totalEnergyEarned: this.totalEnergyEarned,
        totalClicks: this.totalClicks,
        totalCrits: this.totalCrits,
        stellarDarkMatter: this.stellarDarkMatter,
        totalSDMEarned: this.totalSDMEarned,
        supernovaCount: this.supernovaCount,
        currentLayerIndex: this.currentLayerIndex,
        layerProgress: this.layerProgress,
        upgrades: this.upgrades,
        masteries: this.masteries,
        lastSaved: Date.now()
      };
      localStorage.setItem('itea_inc_save_v2', JSON.stringify(data));
      this.lastSaved = Date.now();
    } catch (e) {
      console.error('Error saving game:', e);
    }
  }

  processOfflineEarnings() {
    const now = Date.now();
    const elapsedSeconds = Math.max(0, (now - this.lastSaved) / 1000);

    if (elapsedSeconds > 15) {
      const MAX_OFFLINE_SECONDS = 1800; // 30 minutes
      const cappedSeconds = Math.min(elapsedSeconds, MAX_OFFLINE_SECONDS);
      const OFFLINE_PENALTY_EFFICIENCY = 0.05; // 5% cold tea throttle

      const passivePerSec = this.calculatePassivePerSec();
      const offlineGained = passivePerSec * cappedSeconds * OFFLINE_PENALTY_EFFICIENCY;

      if (offlineGained > 0) {
        this.addEnergy(offlineGained);
      }

      return {
        elapsedMinutes: Math.floor(elapsedSeconds / 60),
        cappedMinutes: Math.floor(cappedSeconds / 60),
        energyGained: offlineGained,
        penaltyPercent: 95
      };
    }
    return null;
  }

  // Super-exponential cost scaling after level 15 so costs outpace raw clicks
  getUpgradeCost(upgradeDef) {
    const rank = this.upgrades[upgradeDef.id] || 0;
    const baseInflation = Math.pow(upgradeDef.costMult, rank);
    const superInflation = Math.pow(1.035, Math.max(0, rank - 15));
    return Math.floor(upgradeDef.baseCost * baseInflation * superInflation);
  }

  buyUpgrade(upgradeId) {
    const def = UPGRADE_DEFINITIONS.find(u => u.id === upgradeId);
    if (!def) return false;
    const cost = this.getUpgradeCost(def);
    if (this.energy >= cost) {
      this.energy -= cost;
      const newRank = (this.upgrades[def.id] || 0) + 1;
      this.upgrades[def.id] = newRank;

      // Check if milestone was reached
      const prevMult = getUpgradeMilestoneMultiplier(newRank - 1);
      const curMult = getUpgradeMilestoneMultiplier(newRank);
      if (curMult > prevMult) {
        this.setLore(`Заваркин: «Уровень ${newRank} у ${def.name}! Доход умножен в x${curMult / prevMult}! Вот это буст!»`);
      }

      return true;
    }
    return false;
  }

  getMasteryCost(masteryDef) {
    const rank = this.masteries[masteryDef.id] || 0;
    return Math.floor(masteryDef.cost * Math.pow(masteryDef.costMult, rank));
  }

  buyMastery(masteryId) {
    const def = MASTERY_TREE.find(m => m.id === masteryId);
    if (!def) return false;
    const rank = this.masteries[def.id] || 0;
    if (rank >= def.maxRank) return false;
    const cost = this.getMasteryCost(def);
    if (this.stellarDarkMatter >= cost) {
      this.stellarDarkMatter -= cost;
      this.masteries[def.id] = rank + 1;
      this.setLore(`Заваркин: «Куплены акции ${def.name}! Вся сеть ITea теперь работает эффективнее!»`);
      return true;
    }
    return false;
  }

  // True Multiplicative Prestige Multiplier!
  calculatePrestigeMultiplier() {
    // Each prestige gives +150% multiplicative base
    const franchiseFactor = 1 + this.supernovaCount * 1.5;
    // Each golden tea leaf gives +20% multiplicative base
    const leafFactor = 1 + this.stellarDarkMatter * 0.20;
    return franchiseFactor * leafFactor;
  }

  calculateBaseClickPower() {
    let power = 1;

    UPGRADE_DEFINITIONS.forEach(u => {
      const rank = this.upgrades[u.id] || 0;
      if (rank > 0) {
        const milestoneMult = getUpgradeMilestoneMultiplier(rank);
        power += rank * u.clickBonus * milestoneMult;
      }
    });

    // Tier 1 Perk: +25%
    if (this.currentLayerIndex >= 1) {
      power *= 1.25;
    }

    // Barista Mastery: +50% per rank
    const bmRank = this.masteries['barista_mastery'] || 0;
    power *= (1 + bmRank * 0.50);

    // Passive Synergy: 10% of passive power added to click
    const passive = this.calculatePassivePerSec();
    power += passive * 0.10;

    // Tea_VPN Ad Turbo Boost: +50%
    if (this.isVpnAdActive) {
      power *= 1.5;
    }

    // MULTIPLY BY PRESTIGE MULTIPLIER!
    power *= this.calculatePrestigeMultiplier();

    return Math.max(1, power);
  }

  calculatePassivePerSec() {
    let passive = 0;
    UPGRADE_DEFINITIONS.forEach(u => {
      const rank = this.upgrades[u.id] || 0;
      if (rank > 0) {
        const milestoneMult = getUpgradeMilestoneMultiplier(rank);
        passive += rank * u.passiveBonus * milestoneMult;
      }
    });

    // Multiply passive by prestige too
    passive *= this.calculatePrestigeMultiplier();

    return passive;
  }

  calculateCritChance() {
    let chance = 0.08;

    if (this.currentLayerIndex >= 4) {
      chance += 0.10;
    }

    const caRank = this.masteries['golden_leaf_crit'] || 0;
    chance += caRank * 0.05;

    // Skill 3: 100% crit
    if (this.skills['tea_typhoon'] && this.skills['tea_typhoon'].active) {
      chance = 1.0;
    }

    return Math.min(1.0, chance);
  }

  calculateCritMultiplier() {
    let mult = 3.2;

    if (this.currentLayerIndex >= 9) {
      mult *= 3;
    }

    const caRank = this.masteries['golden_leaf_crit'] || 0;
    mult += caRank * 0.75;

    if (this.skills['tea_typhoon'] && this.skills['tea_typhoon'].active) {
      mult *= 2.5;
    }

    return mult;
  }

  getMaxComboMultiplier() {
    let maxMulti = 5.0;

    if (this.currentLayerIndex >= 3) {
      maxMulti = 7.5;
    }

    const ceRank = this.masteries['thermal_insulation'] || 0;
    maxMulti += ceRank * 1.0;

    return maxMulti;
  }

  performTap(isTimingCrit = false) {
    this.totalClicks++;

    const heatGain = 8;
    this.heat = Math.min(this.maxHeat, this.heat + heatGain);

    const basePower = this.calculateBaseClickPower();
    const comboMult = this.comboMultiplier;

    const critChance = this.calculateCritChance();
    const isCrit = isTimingCrit || (Math.random() < critChance);
    const critMultiplier = isCrit ? this.calculateCritMultiplier() : 1;

    let finalDamage = basePower * comboMult * critMultiplier;

    // Tea_VPN Tunnel skill: x4 echo strikes
    if (this.skills['vpn_tunnel'] && this.skills['vpn_tunnel'].active) {
      finalDamage *= 4.0;
    }

    if (isCrit) {
      this.totalCrits++;
      if (Math.random() < 0.15) {
        this.setLore('Заваркин: «Вот это крит! Золотой лист прямо в кружку!»');
      }
    }

    this.addEnergy(finalDamage);

    return {
      damage: finalDamage,
      isCrit,
      comboMultiplier: comboMult,
      heat: this.heat
    };
  }

  addEnergy(amount) {
    this.energy += amount;
    this.currentRunTeaEarned += amount;
    this.totalEnergyEarned += amount;
    this.layerProgress += amount;
    this.checkLayerBreach();
  }

  checkLayerBreach() {
    const currentLayer = CONTAINMENT_LAYERS[this.currentLayerIndex];
    if (!currentLayer) return false;

    if (this.layerProgress >= currentLayer.energyReq) {
      if (this.currentLayerIndex < CONTAINMENT_LAYERS.length - 1) {
        this.currentLayerIndex++;
        this.layerProgress = 0;
        this.setLore(currentLayer.lore || `Заваркин: «Ура! Открыт ${CONTAINMENT_LAYERS[this.currentLayerIndex].name}!»`);
        return true;
      }
    }
    return false;
  }

  activateSkill(skillId) {
    const skill = this.skills[skillId];
    const def = SKILL_DEFINITIONS.find(s => s.id === skillId);
    if (!skill || !def) return false;
    if (this.currentLayerIndex + 1 < def.reqLayer) return false;
    if (skill.cooldownTimer > 0 || skill.active) return false;

    skill.active = true;
    skill.activeTimer = def.duration;
    skill.cooldownTimer = def.cooldown;

    if (skillId === 'overdrive') {
      this.heat = this.maxHeat;
      this.comboMultiplier = this.getMaxComboMultiplier();
      this.setLore('Заваркин: «Оверклок на 100°C активирован! Чайник ревёт!»');
    } else if (skillId === 'vpn_tunnel') {
      this.setLore('Заваркин: «Tea_VPN туннель включен! Учетверенный урон за клик!»');
    } else if (skillId === 'tea_typhoon') {
      this.setLore('Заваркин: «Тайфун Заварки! Все клики критические!»');
    }

    return true;
  }

  activateTeaVpnAdBoost() {
    this.isVpnAdActive = true;
    this.vpnAdTimer = 30; // 30 seconds
    this.heat = this.maxHeat;
    const bonus = this.calculateBaseClickPower() * 40;
    this.addEnergy(bonus);
    this.setLore('Заваркин: «Спасибо спонсору Tea_VPN! Пинг 2мс, +50% к заварке активировано!»');
    return bonus;
  }

  // Next Prestige Requirement: scales up dynamically per prestige reset!
  getPrestigeRequirement() {
    // 1st: 500,000; 2nd: 1,100,000; 3rd: 2,420,000; 4th: 5,324,000...
    return Math.floor(500000 * Math.pow(2.2, this.supernovaCount));
  }

  // Calculate pending Golden Tea Leaves based on THIS run's earned tea!
  calculatePendingSDM() {
    const req = this.getPrestigeRequirement();
    if (this.currentRunTeaEarned < req) return 0;
    const excess = this.currentRunTeaEarned / req;
    return Math.max(1, Math.floor(8 * Math.pow(excess, 0.5)));
  }

  canSupernova() {
    return this.calculatePendingSDM() > 0;
  }

  performSupernova() {
    const sdmGained = this.calculatePendingSDM();
    if (sdmGained <= 0) return false;

    this.stellarDarkMatter += sdmGained;
    this.totalSDMEarned += sdmGained;
    this.supernovaCount++;

    // RESET THIS RUN FROM ZERO!
    this.energy = 0;
    this.currentRunTeaEarned = 0; // Starts from 0 for the new franchise!
    this.layerProgress = 0;
    this.currentLayerIndex = 0;
    this.heat = 0;
    this.comboMultiplier = 1;

    UPGRADE_DEFINITIONS.forEach(u => this.upgrades[u.id] = 0);
    SKILL_DEFINITIONS.forEach(s => {
      this.skills[s.id] = { active: false, activeTimer: 0, cooldownTimer: 0 };
    });

    this.setLore(`Заваркин: «Ура! Франшиза #${this.supernovaCount} запущена! Базовый клик теперь умножен на x${this.calculatePrestigeMultiplier().toFixed(1)}!»`);
    this.save();
    return sdmGained;
  }

  setLore(text) {
    this.currentLore = text;
    this.loreTimer = 7; // Show for 7 seconds before cycling
  }

  update(dt) {
    // 1. Passive Tea Generation
    const passive = this.calculatePassivePerSec();
    if (passive > 0) {
      this.addEnergy(passive * dt);
    }

    // 2. Heat / Temperature decay
    const isOverdrive = (this.skills['overdrive'] && this.skills['overdrive'].active) || this.isVpnAdActive;
    if (!isOverdrive) {
      let decayRate = 18;
      if (this.currentLayerIndex >= 6) {
        decayRate *= 0.55;
      }
      const ceRank = this.masteries['thermal_insulation'] || 0;
      decayRate *= Math.max(0.2, 1 - ceRank * 0.15);

      this.heat = Math.max(0, this.heat - decayRate * dt);
    }

    const maxCombo = this.getMaxComboMultiplier();
    const heatRatio = this.heat / this.maxHeat;
    this.comboMultiplier = 1 + heatRatio * (maxCombo - 1);

    // 3. Update Skills
    Object.keys(this.skills).forEach(id => {
      const s = this.skills[id];
      if (s.active) {
        s.activeTimer -= dt;
        if (s.activeTimer <= 0) s.active = false;
      } else if (s.cooldownTimer > 0) {
        s.cooldownTimer = Math.max(0, s.cooldownTimer - dt);
      }
    });

    // 4. Update Tea_VPN Ad Boost timer
    if (this.isVpnAdActive) {
      this.vpnAdTimer -= dt;
      if (this.vpnAdTimer <= 0) {
        this.isVpnAdActive = false;
      }
    }

    // 5. Mascot Lore cycle
    this.loreTimer -= dt;
    if (this.loreTimer <= 0) {
      const randomIdx = Math.floor(Math.random() * MASCOT_LORE.length);
      this.currentLore = MASCOT_LORE[randomIdx];
      this.loreTimer = 12; // Cycle every 12 seconds
    }
  }

  hardReset() {
    localStorage.removeItem('itea_inc_save_v2');
    window.location.reload();
  }
}
