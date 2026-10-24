/**
 * ITea.inc - Game State, Tea Economy, Ceremonial Tiers, Upgrades & Franchise Prestige
 */

export const CONTAINMENT_LAYERS = [
  {
    id: 1,
    name: 'Пакетик «Майский Жмых»',
    energyReq: 500,
    perk: '+20% к базовой силе ручной заварки',
    desc: 'Пластиковый стаканчик и безымянный пакетик из кладовки стартапа. Начало пути ITea.inc!',
    color: '#a3b18a'
  },
  {
    id: 2,
    name: 'Офисный Липтон из кулера',
    energyReq: 4000,
    perk: 'Разблокировка навыка «Оверклок Чайника»',
    desc: 'Классический чай программистов под дедлайн. Вода еле теплая, но кофеин бодрит.',
    color: '#ffb703'
  },
  {
    id: 3,
    name: 'Зеленый Сенча с дедлайном',
    energyReq: 30000,
    perk: 'Максимальная температура заварки поднята до 7.5x',
    desc: 'Настоящие японские листья, заряженные на исправление критических багов в проде.',
    color: '#70e000'
  },
  {
    id: 4,
    name: 'Габа Улун с нейростимулятором',
    energyReq: 220000,
    perk: '+10% к шансу Идеальной Заварки (крита)',
    desc: 'Чай с гамма-аминомасляной кислотой для Senior Architect. Полная концентрация мысли.',
    color: '#38b000'
  },
  {
    id: 5,
    name: 'Да Хун Пао Архитектора',
    energyReq: 1600000,
    perk: 'Разблокировка навыка «Tea_VPN Hyper-Tunnel»',
    desc: 'Утёсный чай с горы Уи. Туннелирует заварку прямо в мозг разработчика.',
    color: '#e76f51'
  },
  {
    id: 6,
    name: 'Маття Латте из коворкинга',
    energyReq: 12000000,
    perk: 'Чай в кружке остывает на 40% медленнее',
    desc: 'Взбитая пудра маття на кокосовом молоке. Модно, стильно, долго держит тепло.',
    color: '#588157'
  },
  {
    id: 7,
    name: 'Пуэр 2008 года с криптофермы',
    energyReq: 90000000,
    perk: 'Золотые чайные пакетики появляются в 2 раза чаще',
    desc: 'Выдержанный блин шу-пуэра, хранившийся рядом с видеокартами во время майнинг-бума.',
    color: '#6f1d1b'
  },
  {
    id: 8,
    name: 'Чай на слезах джуниоров',
    energyReq: 750000000,
    perk: 'Разблокировка навыка «Тайфун Заварки»',
    desc: 'Квантовый напиток, полученный после ночного деплоя в пятницу вечером.',
    color: '#00f0ff'
  },
  {
    id: 9,
    name: 'Императорский Драконий Чай CEO',
    energyReq: 6000000000,
    perk: 'Идеальные заварки дают утроенный объём (x3)',
    desc: 'Эксклюзивный сорт для совета директоров Кремниевой Долины. Вкус венчурных инвестиций.',
    color: '#ffd166'
  },
  {
    id: 10,
    name: 'Чайная Сингулярность ITea.inc',
    energyReq: 50000000000,
    perk: '100% Заварка Достигнута! Время выходить на IPO и строить глобальную франшизу!',
    desc: 'Абсолютная гармония кода и чайного листа. Все сертифицированные чайники планеты подключены к Tea_VPN.',
    color: '#ffffff'
  }
];

export const UPGRADE_DEFINITIONS = [
  {
    id: 'kinetic_spoon',
    name: 'Кинетическая Чайная Ложечка',
    category: 'active',
    baseCost: 15,
    costMult: 1.15,
    clickBonus: 1,
    passiveBonus: 0,
    desc: 'Каждое перемешивание заваривает на +1 мл чая больше.'
  },
  {
    id: 'smart_mug_heater',
    name: 'Кружка с USB-подогревом',
    category: 'active',
    baseCost: 75,
    costMult: 1.16,
    clickBonus: 4,
    passiveBonus: 0.3,
    desc: 'Подключается к ноутбуку. +4 мл к клику, помогает удерживать кипение.'
  },
  {
    id: 'intern_with_kettle',
    name: 'Стажер с электрочайником',
    category: 'passive',
    baseCost: 240,
    costMult: 1.18,
    clickBonus: 2,
    passiveBonus: 3,
    desc: 'Джуниор регулярно подливает кипяток (+3 мл/с) и дублирует тапы (+2 к клику).'
  },
  {
    id: 'pressure_infuser',
    name: 'Чайный Пресс-Инжектор',
    category: 'active',
    baseCost: 1000,
    costMult: 1.20,
    clickBonus: 18,
    passiveBonus: 1,
    desc: 'Выжимает из чайных листьев всё до последней капли. +18 мл к силе клика.'
  },
  {
    id: 'wifi_tea_strainer',
    name: 'Умное Ситечко с Wi-Fi',
    category: 'active',
    baseCost: 4800,
    costMult: 1.22,
    clickBonus: 65,
    passiveBonus: 5,
    desc: 'Фильтрует чаинки на наноуровне. +65 мл к клику, +1.5% крит. шанс.'
  },
  {
    id: 'office_tea_cooler',
    name: 'Кулер с протоколом ITea',
    category: 'passive',
    baseCost: 22000,
    costMult: 1.24,
    clickBonus: 40,
    passiveBonus: 45,
    desc: 'Офисная станция заварки. +45 мл/с, увеличивает награду за Золотые Пакетики.'
  },
  {
    id: 'tea_vpn_node',
    name: 'Серверная Нода Tea_VPN',
    category: 'active',
    baseCost: 105000,
    costMult: 1.25,
    clickBonus: 320,
    passiveBonus: 15,
    desc: 'Сверхзащищенный туннель доставки чая. +320 мл к клику, +30% к урону крита.'
  },
  {
    id: 'auto_brewing_rack',
    name: 'Чайный Серверный Стеллаж',
    category: 'passive',
    baseCost: 600000,
    costMult: 1.27,
    clickBonus: 450,
    passiveBonus: 350,
    desc: 'Стойка 42U, где вместо блейд-серверов заваривается элитный улун (+350 мл/с).'
  },
  {
    id: 'tannin_accelerator',
    name: 'Гипер-Ускоритель Танина',
    category: 'active',
    baseCost: 3200000,
    costMult: 1.30,
    clickBonus: 2800,
    passiveBonus: 100,
    desc: 'Ядерный распад чайного кофеина. Гигантский прирост к заварке: +2,800 мл.'
  },
  {
    id: 'quantum_tea_rig',
    name: 'Квантовая Чайная Станция',
    category: 'active',
    baseCost: 20000000,
    costMult: 1.32,
    clickBonus: 16000,
    passiveBonus: 800,
    desc: 'Заваривает чай во всех параллельных ветках Git одновременно: +16,000 мл!'
  }
];

export const SKILL_DEFINITIONS = [
  {
    id: 'overdrive',
    name: 'Оверклок Чайника',
    duration: 12,
    cooldown: 40,
    desc: 'Мгновенно доводит чайник до 100°C и блокирует остывание на 12 секунд.',
    reqLayer: 2
  },
  {
    id: 'vpn_tunnel',
    name: 'Tea_VPN Hyper-Tunnel',
    duration: 10,
    cooldown: 55,
    desc: 'Туннелирует чай через Tea_VPN. Каждый клик наносит 4 эхо-заварки с удвоенной силой.',
    reqLayer: 5
  },
  {
    id: 'tea_typhoon',
    name: 'Тайфун Заварки',
    duration: 15,
    cooldown: 85,
    desc: 'Каждый клик становится Идеальной Заваркой (100% крит) с множителем x2.5!',
    reqLayer: 8
  }
];

export const MASTERY_TREE = [
  {
    id: 'barista_mastery',
    name: 'Чайный Бариста ITea',
    cost: 5,
    costMult: 2.2,
    maxRank: 10,
    desc: '+35% к базовой силе ручной заварки за ранг.'
  },
  {
    id: 'thermal_insulation',
    name: 'Двойная Термоизоляция',
    cost: 8,
    costMult: 2.5,
    maxRank: 5,
    desc: 'Замедляет остывание чайника на 25% и повышает макс. множитель на +1x за ранг.'
  },
  {
    id: 'golden_leaf_crit',
    name: 'Идеальная Заварка',
    cost: 15,
    costMult: 2.8,
    maxRank: 8,
    desc: '+4% к шансу крита и +50% к критическому множителю за ранг.'
  },
  {
    id: 'tea_bag_flux',
    name: 'Умные Чайные Пакетики',
    cost: 12,
    costMult: 2.2,
    maxRank: 5,
    desc: 'Золотые пакетики появляются на 25% чаще и дают на 50% больше чая за ранг.'
  },
  {
    id: 'franchise_capital',
    name: 'Венчурный Капитал ITea',
    cost: 25,
    costMult: 3.0,
    maxRank: 5,
    desc: 'Каждый клик дает на 20% больше прогресса к текущему чайному грейду.'
  }
];

export class GameState {
  constructor() {
    this.energy = 0; // ml of tea brewed
    this.totalEnergyEarned = 0;
    this.totalClicks = 0;
    this.totalCrits = 0;
    this.stellarDarkMatter = 0; // Golden Tea Leaves (GTL)
    this.totalSDMEarned = 0;
    this.supernovaCount = 0; // Franchises launched

    // Ceremonial Tier tracking
    this.currentLayerIndex = 0;
    this.layerProgress = 0; // ml towards current tier

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

    // Skills: skillId -> { active: boolean, activeTimer: number, cooldownTimer: number }
    this.skills = {};
    SKILL_DEFINITIONS.forEach(s => {
      this.skills[s.id] = { active: false, activeTimer: 0, cooldownTimer: 0 };
    });

    // Offline tracking
    this.lastTimestamp = Date.now();
    this.lastSaved = Date.now();
  }

  // Load from LocalStorage
  load() {
    try {
      const data = localStorage.getItem('itea_inc_save_v1');
      if (data) {
        const parsed = JSON.parse(data);
        this.energy = Number(parsed.energy) || 0;
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

  // Save to LocalStorage
  save() {
    try {
      const data = {
        energy: this.energy,
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
      localStorage.setItem('itea_inc_save_v1', JSON.stringify(data));
      this.lastSaved = Date.now();
    } catch (e) {
      console.error('Error saving game:', e);
    }
  }

  // Offline calculation (Anti-Idle: 5% efficiency, max 30 min)
  processOfflineEarnings() {
    const now = Date.now();
    const elapsedSeconds = Math.max(0, (now - this.lastSaved) / 1000);

    if (elapsedSeconds > 15) {
      const MAX_OFFLINE_SECONDS = 1800; // 30 minutes
      const cappedSeconds = Math.min(elapsedSeconds, MAX_OFFLINE_SECONDS);
      const OFFLINE_PENALTY_EFFICIENCY = 0.05; // 5% efficiency!

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

  getUpgradeCost(upgradeDef) {
    const rank = this.upgrades[upgradeDef.id] || 0;
    return Math.floor(upgradeDef.baseCost * Math.pow(upgradeDef.costMult, rank));
  }

  buyUpgrade(upgradeId) {
    const def = UPGRADE_DEFINITIONS.find(u => u.id === upgradeId);
    if (!def) return false;
    const cost = this.getUpgradeCost(def);
    if (this.energy >= cost) {
      this.energy -= cost;
      this.upgrades[def.id] = (this.upgrades[def.id] || 0) + 1;
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
      return true;
    }
    return false;
  }

  calculateBaseClickPower() {
    let power = 1;

    UPGRADE_DEFINITIONS.forEach(u => {
      const rank = this.upgrades[u.id] || 0;
      power += rank * u.clickBonus;
    });

    // Tier 1 Perk: +20%
    if (this.currentLayerIndex >= 1) {
      power *= 1.20;
    }

    // Barista Mastery: +35% per rank
    const bmRank = this.masteries['barista_mastery'] || 0;
    power *= (1 + bmRank * 0.35);

    // Passive Synergy: 10% of passive power added to click
    const passive = this.calculatePassivePerSec();
    power += passive * 0.10;

    // Tea_VPN Ad Turbo Boost: +50%
    if (this.isVpnAdActive) {
      power *= 1.5;
    }

    return Math.max(1, power);
  }

  calculatePassivePerSec() {
    let passive = 0;
    UPGRADE_DEFINITIONS.forEach(u => {
      const rank = this.upgrades[u.id] || 0;
      passive += rank * u.passiveBonus;
    });
    return passive;
  }

  calculateCritChance() {
    let chance = 0.08;

    // Tier 4 Perk: +10%
    if (this.currentLayerIndex >= 4) {
      chance += 0.10;
    }

    // Mastery perk: +4% per rank
    const caRank = this.masteries['golden_leaf_crit'] || 0;
    chance += caRank * 0.04;

    // Skill 3: 100% crit
    if (this.skills['tea_typhoon'] && this.skills['tea_typhoon'].active) {
      chance = 1.0;
    }

    return Math.min(1.0, chance);
  }

  calculateCritMultiplier() {
    let mult = 3.2;

    // Tier 9 Perk: x3
    if (this.currentLayerIndex >= 9) {
      mult *= 3;
    }

    // Mastery perk: +50% per rank
    const caRank = this.masteries['golden_leaf_crit'] || 0;
    mult += caRank * 0.50;

    // Skill 3
    if (this.skills['tea_typhoon'] && this.skills['tea_typhoon'].active) {
      mult *= 2.5;
    }

    return mult;
  }

  getMaxComboMultiplier() {
    let maxMulti = 5.0;

    // Tier 3 Perk: 7.5x
    if (this.currentLayerIndex >= 3) {
      maxMulti = 7.5;
    }

    // Mastery: +1x per rank
    const ceRank = this.masteries['thermal_insulation'] || 0;
    maxMulti += ceRank * 1.0;

    return maxMulti;
  }

  // Active Click / Tap
  performTap(isTimingCrit = false) {
    this.totalClicks++;

    // Heat gain (kettle boiling up)
    const heatGain = 9;
    this.heat = Math.min(this.maxHeat, this.heat + heatGain);

    const basePower = this.calculateBaseClickPower();
    const comboMult = this.comboMultiplier;

    const critChance = this.calculateCritChance();
    const isCrit = isTimingCrit || (Math.random() < critChance);
    const critMultiplier = isCrit ? this.calculateCritMultiplier() : 1;

    let finalDamage = basePower * comboMult * critMultiplier;

    // Tea_VPN Tunnel skill: 4 echo drops
    if (this.skills['vpn_tunnel'] && this.skills['vpn_tunnel'].active) {
      finalDamage *= 3.5;
    }

    if (isCrit) {
      this.totalCrits++;
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
    }

    return true;
  }

  // Activate Tea_VPN Ad Boost (from sponsor ad)
  activateTeaVpnAdBoost() {
    this.isVpnAdActive = true;
    this.vpnAdTimer = 25; // 25 seconds of turbo boiling
    this.heat = this.maxHeat;
    const bonus = this.calculateBaseClickPower() * 30;
    this.addEnergy(bonus);
    return bonus;
  }

  update(dt) {
    // 1. Passive Tea Generation
    const passive = this.calculatePassivePerSec();
    if (passive > 0) {
      this.addEnergy(passive * dt);
    }

    // 2. Heat / Temperature decay (tea cools down!)
    const isOverdrive = (this.skills['overdrive'] && this.skills['overdrive'].active) || this.isVpnAdActive;
    if (!isOverdrive) {
      let decayRate = 18;
      // Tier 6 perk: -40%
      if (this.currentLayerIndex >= 6) {
        decayRate *= 0.60;
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
  }

  calculatePendingSDM() {
    if (this.totalEnergyEarned < 250000) return 0;
    const base = Math.floor(10 * Math.pow(this.totalEnergyEarned / 250000, 0.44));
    return Math.max(1, base);
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

    this.energy = 0;
    this.layerProgress = 0;
    this.currentLayerIndex = 0;
    this.heat = 0;
    this.comboMultiplier = 1;

    UPGRADE_DEFINITIONS.forEach(u => this.upgrades[u.id] = 0);
    SKILL_DEFINITIONS.forEach(s => {
      this.skills[s.id] = { active: false, activeTimer: 0, cooldownTimer: 0 };
    });

    this.save();
    return sdmGained;
  }

  hardReset() {
    localStorage.removeItem('itea_inc_save_v1');
    window.location.reload();
  }
}
