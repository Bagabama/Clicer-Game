/**
 * Core Ignition - Game State, Economy, Containment Layers, Upgrades & Prestige
 */

export const CONTAINMENT_LAYERS = [
  {
    id: 1,
    name: 'Крио-Оболочка (Cryo Shell)',
    energyReq: 1000,
    perk: '+20% к базовой силе активного клика',
    desc: 'Замёрзшая внешняя кора реактора. Растопите её кинетическими импульсами.',
    color: '#00f0ff'
  },
  {
    id: 2,
    name: 'Магнитная Решётка (Magnetic Mesh)',
    energyReq: 8500,
    perk: 'Разблокировка навыка «Тепловой Перегруз»',
    desc: 'Силовое поле, сдерживающее первичную плазму. Пробейте контур поля.',
    color: '#00e5ff'
  },
  {
    id: 3,
    name: 'Плазменная Мантия (Plasma Mantle)',
    energyReq: 65000,
    perk: 'Максимальный множитель Комбо повышен до 7.5x',
    desc: 'Слой бурлящего звёздного гелия. Скорость нагрева ядра возрастает.',
    color: '#38ef7d'
  },
  {
    id: 4,
    name: 'Тахионный Каркас (Tachyon Lattice)',
    energyReq: 450000,
    perk: '+10% к шансу критического удара',
    desc: 'Квантовая структура сверхсветовых частиц. Синхронизирует резонанс кликов.',
    color: '#9d4edd'
  },
  {
    id: 5,
    name: 'Гравитонный Щит (Graviton Shell)',
    energyReq: 3200000,
    perk: 'Разблокировка навыка «Квантовый Резонанс»',
    desc: 'Тяжелая гравитационная ловушка ядра. Требует предельной концентрации импульсов.',
    color: '#ff007a'
  },
  {
    id: 6,
    name: 'Хроно-Демпфер (Chrono Dampener)',
    energyReq: 24000000,
    perk: 'Скорость остывания комбо снижена на 40%',
    desc: 'Искривляет время вокруг ядра, позволяя удерживать Overclock намного дольше.',
    color: '#ff5400'
  },
  {
    id: 7,
    name: 'Кварковый Конденсатор (Quark Condenser)',
    energyReq: 180000000,
    perk: 'Квантовые искры появляются в 2 раза чаще',
    desc: 'Генератор микро-аномалий. Вызывает частые блуждающие плазменные сгустки.',
    color: '#ffaa00'
  },
  {
    id: 8,
    name: 'Горизонт Событий (Event Horizon)',
    energyReq: 1500000000,
    perk: 'Разблокировка навыка «Сингулярный Взрыв»',
    desc: 'Рубеж, за которым свет не может вырваться наружу. Последняя ограда ядра.',
    color: '#d00000'
  },
  {
    id: 9,
    name: 'Мембрана Пустоты (Void Membrane)',
    energyReq: 12000000000,
    perk: 'Критические удары наносят утроенный урон (x3)',
    desc: 'Темная материя сжимает сингулярность до атомной точки. Пробейте её!',
    color: '#7209b7'
  },
  {
    id: 10,
    name: 'Омега-Ядро Сингулярности (Omega Core)',
    energyReq: 100000000000,
    perk: '100% Зажигание достигнуто! Сверхновая вспышка готова!',
    desc: 'Полный триумф технологии. Ядро готово вспыхнуть новой галактической звездой!',
    color: '#ffffff'
  }
];

export const UPGRADE_DEFINITIONS = [
  {
    id: 'kinetic_actuator',
    name: 'Кинетический Привод',
    category: 'active',
    baseCost: 15,
    costMult: 1.15,
    clickBonus: 1,
    passiveBonus: 0,
    desc: 'Усиливает тактильный импульс каждого нажатия на +1 энергии.'
  },
  {
    id: 'thermal_coil',
    name: 'Термо-Индуктор',
    category: 'active',
    baseCost: 80,
    costMult: 1.17,
    clickBonus: 4,
    passiveBonus: 0.2,
    desc: 'Накапливает тепло активных нажатий. +4 к клику, ускоряет комбо.'
  },
  {
    id: 'drone_unit',
    name: 'Нано-Дрон Поддержки',
    category: 'passive',
    baseCost: 250,
    costMult: 1.18,
    clickBonus: 2,
    passiveBonus: 3,
    desc: 'Микро-дрон пассивной накачки (+3/сек), дублирующий часть ваших кликов (+2 к клику).'
  },
  {
    id: 'plasma_injector',
    name: 'Плазменный Инжектор',
    category: 'active',
    baseCost: 1100,
    costMult: 1.20,
    clickBonus: 18,
    passiveBonus: 1,
    desc: 'Впрыскивает супер-горячий дейтерий прямо в точку удара. +18 к силе клика.'
  },
  {
    id: 'resonance_coupler',
    name: 'Резонансный Контур',
    category: 'active',
    baseCost: 5200,
    costMult: 1.22,
    clickBonus: 65,
    passiveBonus: 5,
    desc: 'Создает акустический резонанс в ядре. +65 к клику, +1.5% крит. шанс.'
  },
  {
    id: 'solar_siphon',
    name: 'Солнечный Сифон',
    category: 'passive',
    baseCost: 24000,
    costMult: 1.24,
    clickBonus: 40,
    passiveBonus: 45,
    desc: 'Орбитальная ловушка фотонов. +45/сек, увеличивает награду за квантовые искры.'
  },
  {
    id: 'hyper_piston',
    name: 'Гипер-Поршень Сингулярности',
    category: 'active',
    baseCost: 110000,
    costMult: 1.25,
    clickBonus: 320,
    passiveBonus: 15,
    desc: 'Мощный квантовый пресс. +320 к клику, +30% к урону критических ударов.'
  },
  {
    id: 'dark_fusion_cell',
    name: 'Темноплазменный Реактор',
    category: 'passive',
    baseCost: 650000,
    costMult: 1.27,
    clickBonus: 450,
    passiveBonus: 350,
    desc: 'Генерирует стабильный поток энергии (+350/сек) и передает 10% в силу клика (+450 к клику).'
  },
  {
    id: 'antimatter_drill',
    name: 'Антиматерийный Бур',
    category: 'active',
    baseCost: 3500000,
    costMult: 1.30,
    clickBonus: 2800,
    passiveBonus: 100,
    desc: 'Концентрированный луч позитронов. Колоссальный прирост к активному клику: +2800.'
  },
  {
    id: 'chronos_core',
    name: 'Ячейка Хроно-Сдвига',
    category: 'active',
    baseCost: 22000000,
    costMult: 1.32,
    clickBonus: 16000,
    passiveBonus: 800,
    desc: 'Позволяет каждому клику сжимать временной континуум. +16,000 к клику!'
  }
];

export const SKILL_DEFINITIONS = [
  {
    id: 'overdrive',
    name: 'Тепловой Локдаун',
    duration: 12,
    cooldown: 45,
    desc: 'Мгновенно заполняет шкалу Комбо на максимум и замораживает её спад на 12 секунд.',
    reqLayer: 2
  },
  {
    id: 'quantum_resonance',
    name: 'Квантовый Залп',
    duration: 10,
    cooldown: 60,
    desc: 'Каждый клик вызывает 4 дополнительных эхо-удара по ядру с удвоенной мощностью.',
    reqLayer: 5
  },
  {
    id: 'singularity_warp',
    name: 'Сингулярный Взрыв',
    duration: 15,
    cooldown: 90,
    desc: 'Шанс критического удара равен 100%, а критический урон увеличен в 2.5 раза!',
    reqLayer: 8
  }
];

export const MASTERY_TREE = [
  {
    id: 'kinetic_mastery',
    name: 'Кинетическая Экспансия',
    cost: 5,
    costMult: 2.2,
    maxRank: 10,
    desc: '+35% к базовой силе активного клика за ранг.'
  },
  {
    id: 'combo_endurance',
    name: 'Термическая Стойкость',
    cost: 8,
    costMult: 2.5,
    maxRank: 5,
    desc: 'Замедляет остывание комбо на 25% и повышает макс. множитель на +1x за ранг.'
  },
  {
    id: 'critical_annihilation',
    name: 'Критическая Аннигиляция',
    cost: 15,
    costMult: 2.8,
    maxRank: 8,
    desc: '+4% к шансу крита и +50% к критическому множителю за ранг.'
  },
  {
    id: 'spark_flux',
    name: 'Поток Квантовых Искр',
    cost: 12,
    costMult: 2.2,
    maxRank: 5,
    desc: 'Квантовые аномалии появляются на 25% чаще и дают на 50% больше энергии за ранг.'
  },
  {
    id: 'active_catalyst',
    name: 'Активный Катализатор',
    cost: 25,
    costMult: 3.0,
    maxRank: 5,
    desc: 'Каждый активный клик наносит на 20% больше урона текущему Слою Удержания.'
  }
];

export class GameState {
  constructor() {
    this.energy = 0;
    this.totalEnergyEarned = 0;
    this.totalClicks = 0;
    this.totalCrits = 0;
    this.stellarDarkMatter = 0;
    this.totalSDMEarned = 0;
    this.supernovaCount = 0;

    // Containment Layer tracking
    this.currentLayerIndex = 0;
    this.layerProgress = 0; // Energy accumulated towards current layer

    // Upgrades: map of upgradeId -> rank
    this.upgrades = {};
    UPGRADE_DEFINITIONS.forEach(u => this.upgrades[u.id] = 0);

    // Mastery ranks: map of masteryId -> rank
    this.masteries = {};
    MASTERY_TREE.forEach(m => this.masteries[m.id] = 0);

    // Heat & Combo system
    this.heat = 0;
    this.maxHeat = 100;
    this.comboMultiplier = 1;
    this.comboTier = 1;

    // Skills: skillId -> { active: boolean, activeTimer: number, cooldownTimer: number }
    this.skills = {};
    SKILL_DEFINITIONS.forEach(s => {
      this.skills[s.id] = { active: false, activeTimer: 0, cooldownTimer: 0 };
    });

    // Offline / Timestamp
    this.lastTimestamp = Date.now();
    this.lastSaved = Date.now();
  }

  // Load from LocalStorage
  load() {
    try {
      const data = localStorage.getItem('core_ignition_save_v1');
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
      localStorage.setItem('core_ignition_save_v1', JSON.stringify(data));
      this.lastSaved = Date.now();
    } catch (e) {
      console.error('Error saving game:', e);
    }
  }

  // Calculate Offline Earnings (Strict Anti-Idle penalty: 5% efficiency, max 30 min)
  processOfflineEarnings() {
    const now = Date.now();
    const elapsedSeconds = Math.max(0, (now - this.lastSaved) / 1000);

    // If away for more than 15 seconds
    if (elapsedSeconds > 15) {
      const MAX_OFFLINE_SECONDS = 1800; // 30 minutes cap
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

  // Upgrade Cost Calculation
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

  // Mastery Tree Cost Calculation
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

  // Calculate Base Click Power before combo & crits
  calculateBaseClickPower() {
    let power = 1;

    // Upgrades
    UPGRADE_DEFINITIONS.forEach(u => {
      const rank = this.upgrades[u.id] || 0;
      power += rank * u.clickBonus;
    });

    // Layer 1 Perk: +20%
    if (this.currentLayerIndex >= 1) {
      power *= 1.20;
    }

    // Kinetic Mastery: +35% per rank
    const kmRank = this.masteries['kinetic_mastery'] || 0;
    power *= (1 + kmRank * 0.35);

    // Passive Synergy: 10% of passive power added to click
    const passive = this.calculatePassivePerSec();
    power += passive * 0.10;

    return Math.max(1, power);
  }

  // Calculate Passive Generation per second
  calculatePassivePerSec() {
    let passive = 0;
    UPGRADE_DEFINITIONS.forEach(u => {
      const rank = this.upgrades[u.id] || 0;
      passive += rank * u.passiveBonus;
    });
    return passive;
  }

  // Calculate Crit Chance (0 to 1)
  calculateCritChance() {
    let chance = 0.08; // Base 8%

    // Tachyon Lattice layer perk (+10%)
    if (this.currentLayerIndex >= 4) {
      chance += 0.10;
    }

    // Critical Annihilation mastery (+4% per rank)
    const caRank = this.masteries['critical_annihilation'] || 0;
    chance += caRank * 0.04;

    // Singularity Warp active skill: 100% crit
    if (this.skills['singularity_warp'] && this.skills['singularity_warp'].active) {
      chance = 1.0;
    }

    return Math.min(1.0, chance);
  }

  // Calculate Crit Multiplier
  calculateCritMultiplier() {
    let mult = 3.2; // Base 3.2x

    // Void Membrane layer perk: x3
    if (this.currentLayerIndex >= 9) {
      mult *= 3;
    }

    // Mastery perk: +50% per rank
    const caRank = this.masteries['critical_annihilation'] || 0;
    mult += caRank * 0.50;

    // Singularity Warp skill
    if (this.skills['singularity_warp'] && this.skills['singularity_warp'].active) {
      mult *= 2.5;
    }

    return mult;
  }

  // Get Maximum Combo Multiplier
  getMaxComboMultiplier() {
    let maxMulti = 5.0; // Base max 5x

    // Plasma Mantle layer perk
    if (this.currentLayerIndex >= 3) {
      maxMulti = 7.5;
    }

    // Mastery: +1x per rank
    const ceRank = this.masteries['combo_endurance'] || 0;
    maxMulti += ceRank * 1.0;

    return maxMulti;
  }

  // Perform an Active Tap on the Core
  performTap(isTimingCrit = false) {
    this.totalClicks++;

    // 1. Build Heat
    const heatGain = 9;
    this.heat = Math.min(this.maxHeat, this.heat + heatGain);

    // 2. Compute Click Damage
    const basePower = this.calculateBaseClickPower();
    const comboMult = this.comboMultiplier;

    // Check Critical
    const critChance = this.calculateCritChance();
    const isCrit = isTimingCrit || (Math.random() < critChance);
    const critMultiplier = isCrit ? this.calculateCritMultiplier() : 1;

    let finalDamage = basePower * comboMult * critMultiplier;

    // Quantum Resonance skill: extra echo strikes
    if (this.skills['quantum_resonance'] && this.skills['quantum_resonance'].active) {
      finalDamage *= 3.5;
    }

    if (isCrit) {
      this.totalCrits++;
    }

    // Add Energy & progress current layer
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

    // Check Containment Layer Breach
    this.checkLayerBreach();
  }

  checkLayerBreach() {
    const currentLayer = CONTAINMENT_LAYERS[this.currentLayerIndex];
    if (!currentLayer) return false;

    if (this.layerProgress >= currentLayer.energyReq) {
      // Breached!
      if (this.currentLayerIndex < CONTAINMENT_LAYERS.length - 1) {
        this.currentLayerIndex++;
        this.layerProgress = 0;
        return true;
      }
    }
    return false;
  }

  // Activate an Overclock Skill
  activateSkill(skillId) {
    const skill = this.skills[skillId];
    const def = SKILL_DEFINITIONS.find(s => s.id === skillId);
    if (!skill || !def) return false;
    if (this.currentLayerIndex + 1 < def.reqLayer) return false;
    if (skill.cooldownTimer > 0 || skill.active) return false;

    skill.active = true;
    skill.activeTimer = def.duration;
    skill.cooldownTimer = def.cooldown;

    // Immediate action if Overdrive
    if (skillId === 'overdrive') {
      this.heat = this.maxHeat;
      this.comboMultiplier = this.getMaxComboMultiplier();
    }

    return true;
  }

  // Update Game Loop (called every frame with dt in seconds)
  update(dt) {
    // 1. Passive Energy Income (scaled by active play synergies)
    const passive = this.calculatePassivePerSec();
    if (passive > 0) {
      this.addEnergy(passive * dt);
    }

    // 2. Heat Decay & Combo Multiplier
    const isOverdrive = this.skills['overdrive'] && this.skills['overdrive'].active;
    if (!isOverdrive) {
      // Decay rate: base 18 per sec
      let decayRate = 18;
      // Chrono Dampener perk (-40%)
      if (this.currentLayerIndex >= 6) {
        decayRate *= 0.60;
      }
      // Mastery perk
      const ceRank = this.masteries['combo_endurance'] || 0;
      decayRate *= Math.max(0.2, 1 - ceRank * 0.15);

      this.heat = Math.max(0, this.heat - decayRate * dt);
    }

    // Calculate Combo Multiplier based on heat
    const maxCombo = this.getMaxComboMultiplier();
    const heatRatio = this.heat / this.maxHeat;
    this.comboMultiplier = 1 + heatRatio * (maxCombo - 1);

    // 3. Update Skills
    Object.keys(this.skills).forEach(id => {
      const s = this.skills[id];
      if (s.active) {
        s.activeTimer -= dt;
        if (s.activeTimer <= 0) {
          s.active = false;
        }
      } else if (s.cooldownTimer > 0) {
        s.cooldownTimer = Math.max(0, s.cooldownTimer - dt);
      }
    });
  }

  // Supernova Rebirth (Prestige)
  calculatePendingSDM() {
    // Requires at least 500,000 total energy to rebirth
    if (this.totalEnergyEarned < 500000) return 0;
    const base = Math.floor(12 * Math.pow(this.totalEnergyEarned / 500000, 0.42));
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

    // Reset run progress
    this.energy = 0;
    this.layerProgress = 0;
    this.currentLayerIndex = 0;
    this.heat = 0;
    this.comboMultiplier = 1;

    // Reset upgrades
    UPGRADE_DEFINITIONS.forEach(u => this.upgrades[u.id] = 0);

    // Reset skills
    SKILL_DEFINITIONS.forEach(s => {
      this.skills[s.id] = { active: false, activeTimer: 0, cooldownTimer: 0 };
    });

    this.save();
    return sdmGained;
  }

  // Hard Reset
  hardReset() {
    localStorage.removeItem('core_ignition_save_v1');
    window.location.reload();
  }
}
