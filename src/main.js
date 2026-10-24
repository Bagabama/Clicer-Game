/**
 * CORE IGNITION: Singularity Break
 * Main Game Controller, Loop, Events & UI Binder
 */

import { GameState, CONTAINMENT_LAYERS, UPGRADE_DEFINITIONS, SKILL_DEFINITIONS, MASTERY_TREE } from './gameState.js';
import { CoreVisualizer } from './particles.js';
import { sounds } from './audio.js';
import { haptics } from './haptics.js';

// Number formatting utility (K, M, B, T, Qa, Qi, etc.)
export function formatNumber(num) {
  if (num === null || num === undefined || isNaN(num)) return '0';
  if (num < 1000) {
    return num >= 10 ? num.toFixed(1) : (num % 1 === 0 ? num.toString() : num.toFixed(1));
  }

  const suffixes = ['', 'K', 'M', 'B', 'T', 'Qa', 'Qi', 'Sx', 'Sp', 'Oc', 'No', 'Dc'];
  const i = Math.floor(Math.log10(num) / 3);
  if (i >= suffixes.length) {
    return num.toExponential(2);
  }
  const formatted = (num / Math.pow(10, i * 3)).toFixed(2);
  return `${formatted} ${suffixes[i]}`;
}

// App Controller
class GameApp {
  constructor() {
    this.state = new GameState();
    this.canvas = document.getElementById('core-canvas');
    this.visualizer = null;
    this.floatingLayer = document.getElementById('floating-numbers');
    this.sparkElem = document.getElementById('spark-anomaly');

    this.sparkActive = false;
    this.sparkTimer = 25; // seconds until first spark
    this.lastFrameTime = performance.now();

    this.init();
  }

  init() {
    // 1. Load state
    this.state.load();

    // 2. Initialize visualizer
    if (this.canvas) {
      this.visualizer = new CoreVisualizer(this.canvas);
    }

    // 3. Process offline earnings
    const offlineReport = this.state.processOfflineEarnings();
    if (offlineReport && offlineReport.energyGained > 0) {
      this.showOfflineModal(offlineReport);
    }

    // 4. Bind DOM events
    this.bindEvents();

    // 5. Build Upgrades, Layers, and Mastery lists in DOM
    this.renderUpgradesList();
    this.renderLayersList();
    this.renderMasteryList();

    // 6. Start Loop
    requestAnimationFrame(this.gameLoop.bind(this));

    // 7. Auto-save every 5s & beforeunload
    setInterval(() => this.state.save(), 5000);
    window.addEventListener('beforeunload', () => this.state.save());
  }

  bindEvents() {
    // Core Click / Multi-touch
    const coreTarget = document.getElementById('core-touch-target');
    if (coreTarget) {
      // Pointerdown handles both mouse & multi-touch taps cleanly
      coreTarget.addEventListener('pointerdown', (e) => {
        e.preventDefault();
        sounds.ensureContext();
        this.handleCoreTap(e.clientX, e.clientY);
      });
    }

    // Quantum Spark Anomaly Tap
    if (this.sparkElem) {
      this.sparkElem.addEventListener('pointerdown', (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.collectSpark();
      });
    }

    // Navigation Tabs
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
      item.addEventListener('click', () => {
        sounds.playClick(1);
        navItems.forEach(n => n.classList.remove('active'));
        item.classList.add('active');

        const targetTabId = item.getAttribute('data-tab');
        document.querySelectorAll('.tab-content-area').forEach(tab => {
          tab.classList.remove('active');
        });
        const targetTab = document.getElementById(targetTabId);
        if (targetTab) {
          targetTab.classList.add('active');
          if (targetTabId === 'tab-reactor' && this.visualizer) {
            this.visualizer.resize();
          }
        }
      });
    });

    // Skill Bar Buttons
    SKILL_DEFINITIONS.forEach(def => {
      const btn = document.getElementById(`skill-${def.id}`);
      if (btn) {
        btn.addEventListener('click', () => {
          if (this.state.activateSkill(def.id)) {
            sounds.playSkill();
            haptics.skill();
            if (this.visualizer) {
              this.visualizer.triggerBreachEffect();
            }
          }
        });
      }
    });

    // Top Header Buttons
    const btnSound = document.getElementById('btn-sound');
    if (btnSound) {
      btnSound.addEventListener('click', () => {
        const enabled = sounds.toggleSound();
        btnSound.textContent = enabled ? '🔊' : '🔇';
      });
    }

    const btnHaptics = document.getElementById('btn-haptics');
    if (btnHaptics) {
      btnHaptics.addEventListener('click', () => {
        const enabled = haptics.toggle();
        btnHaptics.textContent = enabled ? '📳' : '📴';
        if (enabled) haptics.tap();
      });
    }

    const btnSettings = document.getElementById('btn-settings');
    const modalSettings = document.getElementById('modal-settings');
    const btnSettingsClose = document.getElementById('btn-settings-close');
    if (btnSettings && modalSettings) {
      btnSettings.addEventListener('click', () => {
        document.getElementById('stat-total-clicks').textContent = formatNumber(this.state.totalClicks);
        document.getElementById('stat-total-crits').textContent = formatNumber(this.state.totalCrits);
        modalSettings.classList.add('open');
      });
    }
    if (btnSettingsClose && modalSettings) {
      btnSettingsClose.addEventListener('click', () => modalSettings.classList.remove('open'));
    }

    // Hard reset button
    const btnHardReset = document.getElementById('btn-hard-reset');
    if (btnHardReset) {
      btnHardReset.addEventListener('click', () => {
        if (confirm('ВНИМАНИЕ: Сбросить весь прогресс игры, включая престиж и мастерство?')) {
          this.state.hardReset();
        }
      });
    }

    // Modal confirmations
    const btnOfflineConfirm = document.getElementById('btn-offline-confirm');
    if (btnOfflineConfirm) {
      btnOfflineConfirm.addEventListener('click', () => {
        document.getElementById('modal-offline').classList.remove('open');
      });
    }

    const btnBreachConfirm = document.getElementById('btn-breach-confirm');
    if (btnBreachConfirm) {
      btnBreachConfirm.addEventListener('click', () => {
        document.getElementById('modal-breach').classList.remove('open');
      });
    }

    // Supernova Action Button
    const btnSupernova = document.getElementById('btn-supernova-action');
    if (btnSupernova) {
      btnSupernova.addEventListener('click', () => {
        if (this.state.canSupernova()) {
          const sdm = this.state.calculatePendingSDM();
          if (confirm(`Запустить Сверхновую? Вы получите +${sdm} SDM, но текущая энергия и модули будут сброшены для нового ускоренного цикла!`)) {
            this.state.performSupernova();
            sounds.playSupernova();
            haptics.supernova();
            if (this.visualizer) this.visualizer.triggerBreachEffect();
            this.renderUpgradesList();
            this.renderLayersList();
            this.renderMasteryList();
          }
        }
      });
    }
  }

  handleCoreTap(clientX, clientY) {
    const tapResult = this.state.performTap(false);

    // Audio & Haptics
    if (tapResult.isCrit) {
      sounds.playCrit();
      haptics.crit();
      // Screen shake
      const app = document.getElementById('app-frame');
      app.classList.remove('screen-shake');
      void app.offsetWidth;
      app.classList.add('screen-shake');
    } else {
      sounds.playClick(tapResult.comboMultiplier);
      haptics.tap();
    }

    // Particles
    if (this.visualizer) {
      this.visualizer.emitSparks(clientX, clientY, tapResult.isCrit ? 16 : 8, tapResult.isCrit, tapResult.comboMultiplier);
    }

    // Floating damage number
    this.spawnFloatingNumber(clientX, clientY, tapResult.damage, tapResult.isCrit);

    // Check if a layer was breached by this tap
    this.checkBreachAlert();
  }

  spawnFloatingNumber(x, y, amount, isCrit) {
    if (!this.floatingLayer) return;
    const elem = document.createElement('div');
    elem.className = `floating-num ${isCrit ? 'crit' : ''}`;
    elem.textContent = (isCrit ? '💥 +' : '+') + formatNumber(amount);

    const rect = this.floatingLayer.getBoundingClientRect();
    const spawnX = x ? (x - rect.left) : (rect.width / 2);
    const spawnY = y ? (y - rect.top) : (rect.height / 2);

    elem.style.left = `${spawnX}px`;
    elem.style.top = `${spawnY}px`;

    this.floatingLayer.appendChild(elem);
    setTimeout(() => elem.remove(), 950);
  }

  showOfflineModal(report) {
    const modal = document.getElementById('modal-offline');
    if (!modal) return;
    document.getElementById('offline-time').textContent = `${report.elapsedMinutes} мин.`;
    document.getElementById('offline-earned').textContent = `+${formatNumber(report.energyGained)}`;
    modal.classList.add('open');
  }

  checkBreachAlert() {
    // If current layer changed or completed
    const currentLayer = CONTAINMENT_LAYERS[this.state.currentLayerIndex];
    if (this.lastRecordedLayer !== undefined && this.state.currentLayerIndex > this.lastRecordedLayer) {
      // Trigger breach alert
      sounds.playLayerBreach();
      haptics.layerBreach();
      if (this.visualizer) this.visualizer.triggerBreachEffect();

      const breachedLayer = CONTAINMENT_LAYERS[this.lastRecordedLayer];
      const modal = document.getElementById('modal-breach');
      if (modal && breachedLayer) {
        document.getElementById('breach-layer-title').textContent = `${breachedLayer.name} разрушен!`;
        document.getElementById('breach-layer-desc').textContent = breachedLayer.desc;
        document.getElementById('breach-perk-text').textContent = breachedLayer.perk;
        modal.classList.add('open');
      }
      this.renderLayersList();
    }
    this.lastRecordedLayer = this.state.currentLayerIndex;
  }

  collectSpark() {
    if (!this.sparkActive) return;
    this.sparkActive = false;
    this.sparkElem.style.display = 'none';

    sounds.playSparkCollect();
    haptics.comboTier();

    // Reward: massive instant energy burst based on 30x active tap + full heat!
    const baseClick = this.state.calculateBaseClickPower();
    const sparkRank = this.state.masteries['spark_flux'] || 0;
    const sparkMultiplier = 1 + sparkRank * 0.5;

    const reward = baseClick * 35 * this.state.getMaxComboMultiplier() * sparkMultiplier;
    this.state.addEnergy(reward);
    this.state.heat = this.state.maxHeat; // Full overclock!

    if (this.visualizer) {
      this.visualizer.triggerBreachEffect();
    }

    const rect = this.sparkElem.getBoundingClientRect();
    this.spawnFloatingNumber(rect.left + 24, rect.top + 24, reward, true);

    // Reset spark cooldown: 35-50s
    this.sparkTimer = 35 + Math.random() * 15;
  }

  updateSpark(dt) {
    if (this.sparkActive) return;

    this.sparkTimer -= dt;
    if (this.sparkTimer <= 0) {
      // Spawn Spark Anomaly
      this.sparkActive = true;
      if (this.sparkElem) {
        const stage = document.getElementById('tab-reactor');
        const w = stage ? stage.clientWidth - 80 : 250;
        const h = stage ? stage.clientHeight - 180 : 300;

        const startX = 30 + Math.random() * w;
        const startY = 80 + Math.random() * h;

        this.sparkElem.style.left = `${startX}px`;
        this.sparkElem.style.top = `${startY}px`;
        this.sparkElem.style.display = 'flex';

        // Auto-despawn after 8 seconds if not clicked
        setTimeout(() => {
          if (this.sparkActive) {
            this.sparkActive = false;
            this.sparkElem.style.display = 'none';
            this.sparkTimer = 30 + Math.random() * 20;
          }
        }, 8000);
      }
    }
  }

  renderUpgradesList() {
    const container = document.getElementById('upgrades-list');
    if (!container) return;
    container.innerHTML = '';

    UPGRADE_DEFINITIONS.forEach(def => {
      const card = document.createElement('div');
      card.className = 'upgrade-card';
      card.id = `upgrade-card-${def.id}`;

      const rank = this.state.upgrades[def.id] || 0;
      const cost = this.state.getUpgradeCost(def);
      const isAffordable = this.state.energy >= cost;

      card.innerHTML = `
        <div class="upgrade-info">
          <div class="upgrade-title-row">
            <span class="upgrade-name">${def.name}</span>
            <span class="upgrade-rank-tag">Ранг ${rank}</span>
          </div>
          <span class="upgrade-desc">${def.desc}</span>
        </div>
        <button id="buy-btn-${def.id}" class="buy-btn" ${isAffordable ? '' : 'disabled'}>
          <span style="font-size: 0.65rem; opacity: 0.8;">КУПИТЬ</span>
          <span>${formatNumber(cost)}</span>
        </button>
      `;

      const buyBtn = card.querySelector(`#buy-btn-${def.id}`);
      buyBtn.addEventListener('click', () => {
        if (this.state.buyUpgrade(def.id)) {
          sounds.playClick(2);
          haptics.tap();
          this.updateUpgradeCard(def.id);
          this.updateUI();
        }
      });

      container.appendChild(card);
    });
  }

  updateUpgradeCard(id) {
    const def = UPGRADE_DEFINITIONS.find(u => u.id === id);
    if (!def) return;
    const card = document.getElementById(`upgrade-card-${id}`);
    if (!card) return;

    const rank = this.state.upgrades[id] || 0;
    const cost = this.state.getUpgradeCost(def);
    const isAffordable = this.state.energy >= cost;

    const rankTag = card.querySelector('.upgrade-rank-tag');
    if (rankTag) rankTag.textContent = `Ранг ${rank}`;

    const buyBtn = card.querySelector(`#buy-btn-${id}`);
    if (buyBtn) {
      buyBtn.disabled = !isAffordable;
      buyBtn.innerHTML = `
        <span style="font-size: 0.65rem; opacity: 0.8;">КУПИТЬ</span>
        <span>${formatNumber(cost)}</span>
      `;
    }
  }

  renderLayersList() {
    const container = document.getElementById('layers-list');
    if (!container) return;
    container.innerHTML = '';

    CONTAINMENT_LAYERS.forEach((layer, idx) => {
      const card = document.createElement('div');
      const isBreached = idx < this.state.currentLayerIndex;
      const isCurrent = idx === this.state.currentLayerIndex;

      card.className = `layer-card ${isBreached ? 'breached' : ''} ${isCurrent ? 'current' : ''}`;
      card.innerHTML = `
        <div class="layer-card-title">
          <span>Слой ${layer.id}: ${layer.name}</span>
          <span style="font-size: 0.75rem; color: ${isBreached ? 'var(--green-pass)' : (isCurrent ? 'var(--cyan-primary)' : 'var(--text-muted)')}; font-weight: 800;">
            ${isBreached ? '✓ ПРОБИТ' : (isCurrent ? '⚡ ТЕКУЩИЙ' : '🔒 ЗАБЛОКИРОВАН')}
          </span>
        </div>
        <div style="font-size: 0.72rem; color: var(--text-dim);">${layer.desc}</div>
        <div class="layer-perk-badge">
          <span>💎 Эффект:</span>
          <span>${layer.perk}</span>
        </div>
        <div style="font-size: 0.7rem; font-family: 'JetBrains Mono', monospace; color: var(--text-muted); margin-top: 2px;">
          Требуемая энергия: ${formatNumber(layer.energyReq)}
        </div>
      `;
      container.appendChild(card);
    });
  }

  renderMasteryList() {
    const container = document.getElementById('mastery-list');
    if (!container) return;
    container.innerHTML = '';

    MASTERY_TREE.forEach(def => {
      const card = document.createElement('div');
      card.className = 'upgrade-card';
      card.id = `mastery-card-${def.id}`;

      const rank = this.state.masteries[def.id] || 0;
      const cost = this.state.getMasteryCost(def);
      const isMax = rank >= def.maxRank;
      const isAffordable = !isMax && (this.state.stellarDarkMatter >= cost);

      card.innerHTML = `
        <div class="upgrade-info">
          <div class="upgrade-title-row">
            <span class="upgrade-name">${def.name}</span>
            <span class="upgrade-rank-tag">${rank} / ${def.maxRank}</span>
          </div>
          <span class="upgrade-desc">${def.desc}</span>
        </div>
        <button id="buy-mastery-${def.id}" class="buy-btn" style="border-color: var(--magenta-crit); background: rgba(255, 0, 122, 0.2);" ${isAffordable ? '' : 'disabled'}>
          <span style="font-size: 0.65rem; opacity: 0.8;">${isMax ? 'МАКС' : 'КУПИТЬ'}</span>
          <span>${isMax ? '—' : `${cost} SDM`}</span>
        </button>
      `;

      const buyBtn = card.querySelector(`#buy-mastery-${def.id}`);
      buyBtn.addEventListener('click', () => {
        if (this.state.buyMastery(def.id)) {
          sounds.playSkill();
          haptics.comboTier();
          this.renderMasteryList();
          this.updateUI();
        }
      });

      container.appendChild(card);
    });
  }

  updateSkillsUI() {
    SKILL_DEFINITIONS.forEach(def => {
      const btn = document.getElementById(`skill-${def.id}`);
      if (!btn) return;

      const isUnlocked = (this.state.currentLayerIndex + 1) >= def.reqLayer;
      btn.classList.toggle('locked', !isUnlocked);

      const skill = this.state.skills[def.id];
      if (skill) {
        btn.classList.toggle('active-skill', skill.active);
        const overlay = btn.querySelector('.skill-cooldown-overlay');
        if (overlay) {
          if (skill.cooldownTimer > 0 && !skill.active) {
            overlay.classList.add('show');
            overlay.textContent = `${Math.ceil(skill.cooldownTimer)}s`;
          } else {
            overlay.classList.remove('show');
          }
        }
      }
    });
  }

  updateUI() {
    // 1. Energy Displays
    const energyElem = document.getElementById('energy-val');
    if (energyElem) energyElem.textContent = formatNumber(this.state.energy);

    // 2. Active click & Passive displays
    const clickElem = document.getElementById('click-power-val');
    if (clickElem) {
      const totalClick = this.state.calculateBaseClickPower() * this.state.comboMultiplier;
      clickElem.textContent = formatNumber(totalClick);
    }

    const passiveElem = document.getElementById('passive-val');
    if (passiveElem) {
      passiveElem.textContent = `${formatNumber(this.state.calculatePassivePerSec())} /с`;
    }

    const sdmElem = document.getElementById('sdm-val');
    if (sdmElem) {
      sdmElem.textContent = `${formatNumber(this.state.stellarDarkMatter)} SDM`;
    }

    // 3. Containment Layer Progress
    const currentLayer = CONTAINMENT_LAYERS[this.state.currentLayerIndex];
    if (currentLayer) {
      const layerBadge = document.getElementById('layer-badge');
      if (layerBadge) layerBadge.textContent = `СЛОЙ ${currentLayer.id}`;

      const layerName = document.getElementById('layer-name');
      if (layerName) layerName.textContent = currentLayer.name;

      const pct = Math.min(100, (this.state.layerProgress / currentLayer.energyReq) * 100);
      const layerPct = document.getElementById('layer-pct');
      if (layerPct) layerPct.textContent = `${pct.toFixed(1)}%`;

      const layerFill = document.getElementById('layer-bar-fill');
      if (layerFill) layerFill.style.width = `${pct}%`;
    }

    // 4. Combo Heat
    const comboVal = document.getElementById('combo-multiplier-val');
    if (comboVal) {
      comboVal.textContent = `x${this.state.comboMultiplier.toFixed(2)}`;
    }
    const comboFill = document.getElementById('combo-bar-fill');
    if (comboFill) {
      const heatPct = (this.state.heat / this.state.maxHeat) * 100;
      comboFill.style.width = `${heatPct}%`;
    }

    // 5. Supernova Pending SDM
    const pendingSDM = this.state.calculatePendingSDM();
    const pendingSDMElem = document.getElementById('pending-sdm-val');
    if (pendingSDMElem) pendingSDMElem.textContent = formatNumber(pendingSDM);

    const btnSupernova = document.getElementById('btn-supernova-action');
    if (btnSupernova) {
      btnSupernova.disabled = pendingSDM <= 0;
    }

    // 6. Update Upgrade Buttons Affordable States
    UPGRADE_DEFINITIONS.forEach(def => {
      const card = document.getElementById(`upgrade-card-${def.id}`);
      if (card) {
        const cost = this.state.getUpgradeCost(def);
        const buyBtn = card.querySelector(`#buy-btn-${def.id}`);
        if (buyBtn) {
          buyBtn.disabled = this.state.energy < cost;
        }
      }
    });

    // 7. Update Skills
    this.updateSkillsUI();
  }

  gameLoop(timestamp) {
    const dt = Math.min(0.1, (timestamp - this.lastFrameTime) / 1000);
    this.lastFrameTime = timestamp;

    // Update state math
    this.state.update(dt);

    // Update Quantum Spark timer
    this.updateSpark(dt);

    // Render Canvas Visualizer
    if (this.visualizer) {
      this.visualizer.render(this.state, dt);
    }

    // Update UI elements
    this.updateUI();

    requestAnimationFrame(this.gameLoop.bind(this));
  }
}

// Start application when DOM is ready
window.addEventListener('DOMContentLoaded', () => {
  window.app = new GameApp();
});
