/**
 * ITea.inc: Silicon Valley Tea Tycoon & Tea_VPN
 * Main Controller with Mascot, Milestones, Booster Modals & True Prestige Scaling
 */

import { GameState, CONTAINMENT_LAYERS, UPGRADE_DEFINITIONS, SKILL_DEFINITIONS, MASTERY_TREE, getUpgradeMilestoneMultiplier, getNextMilestone, MASCOT_LORE } from './gameState.js';
import { CoreVisualizer } from './particles.js';
import { sounds } from './audio.js';
import { haptics } from './haptics.js';

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

class GameApp {
  constructor() {
    this.state = new GameState();
    this.canvas = document.getElementById('core-canvas');
    this.visualizer = null;
    this.floatingLayer = document.getElementById('floating-numbers');
    this.sparkElem = document.getElementById('spark-anomaly');

    this.sparkActive = false;
    this.sparkTimer = 25;
    this.lastFrameTime = performance.now();

    this.init();
  }

  init() {
    this.state.load();

    if (this.canvas) {
      this.visualizer = new CoreVisualizer(this.canvas);
    }

    const offlineReport = this.state.processOfflineEarnings();
    if (offlineReport && offlineReport.energyGained > 0) {
      this.showOfflineModal(offlineReport);
    }

    this.bindEvents();
    this.renderUpgradesList();
    this.renderLayersList();
    this.renderMasteryList();

    requestAnimationFrame(this.gameLoop.bind(this));

    setInterval(() => this.state.save(), 5000);
    window.addEventListener('beforeunload', () => this.state.save());
  }

  bindEvents() {
    // Smart Mug Tap
    const coreTarget = document.getElementById('core-touch-target');
    if (coreTarget) {
      coreTarget.addEventListener('pointerdown', (e) => {
        e.preventDefault();
        sounds.ensureContext();
        this.handleCoreTap(e.clientX, e.clientY);
      });
    }

    // Mascot Tap: cycle lore & play chime
    const mascotBar = document.getElementById('mascot-bar');
    if (mascotBar) {
      mascotBar.addEventListener('click', () => {
        sounds.playClick(3);
        haptics.tap();
        const randLore = MASCOT_LORE[Math.floor(Math.random() * MASCOT_LORE.length)];
        this.state.setLore(randLore);
        const mascotText = document.getElementById('mascot-text');
        if (mascotText) mascotText.textContent = randLore;
      });
    }

    // Golden Tea Bag Collect
    if (this.sparkElem) {
      this.sparkElem.addEventListener('pointerdown', (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.collectGoldenBag();
      });
    }

    // Tea_VPN Sponsor Ad Banner Click
    const vpnBanner = document.getElementById('tea-vpn-banner');
    if (vpnBanner) {
      vpnBanner.addEventListener('click', () => {
        this.openTeaVpnAdModal();
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

    // Booster Buttons with Click & Info
    SKILL_DEFINITIONS.forEach(def => {
      const btn = document.getElementById(`skill-${def.id}`);
      if (btn) {
        btn.addEventListener('click', () => {
          const isUnlocked = (this.state.currentLayerIndex + 1) >= def.reqLayer;
          const skill = this.state.skills[def.id];

          if (!isUnlocked || (skill && skill.cooldownTimer > 0)) {
            // Show booster explanation modal
            this.openBoosterInfoModal(def, isUnlocked);
            return;
          }

          if (this.state.activateSkill(def.id)) {
            if (def.id === 'vpn_tunnel') {
              sounds.playVpnConnect();
            } else {
              sounds.playClick(6);
            }
            haptics.skill();
            if (this.visualizer) {
              this.visualizer.triggerBreachEffect();
            }
          }
        });
      }
    });

    // Booster Info Modal Close
    const btnBoosterInfoClose = document.getElementById('btn-booster-info-close');
    const modalBoosterInfo = document.getElementById('modal-booster-info');
    if (btnBoosterInfoClose && modalBoosterInfo) {
      btnBoosterInfoClose.addEventListener('click', () => modalBoosterInfo.classList.remove('open'));
    }

    // Sound toggle
    const btnSound = document.getElementById('btn-sound');
    if (btnSound) {
      btnSound.addEventListener('click', () => {
        const enabled = sounds.toggleSound();
        btnSound.textContent = enabled ? '🔊' : '🔇';
      });
    }

    // Haptics toggle
    const btnHaptics = document.getElementById('btn-haptics');
    if (btnHaptics) {
      btnHaptics.addEventListener('click', () => {
        const enabled = haptics.toggle();
        btnHaptics.textContent = enabled ? '📳' : '📴';
        if (enabled) haptics.tap();
      });
    }

    // Settings Modal
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

    // Hard reset
    const btnHardReset = document.getElementById('btn-hard-reset');
    if (btnHardReset) {
      btnHardReset.addEventListener('click', () => {
        if (confirm('ВНИМАНИЕ: Сбросить всю чайную империю ITea.inc, включая франшизы и акции?')) {
          this.state.hardReset();
        }
      });
    }

    // Modal close buttons
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

    // Supernova / Franchise IPO Button
    const btnSupernova = document.getElementById('btn-supernova-action');
    if (btnSupernova) {
      btnSupernova.addEventListener('click', () => {
        if (this.state.canSupernova()) {
          const sdm = this.state.calculatePendingSDM();
          if (confirm(`Выйти на IPO? Вы получите +${sdm} Золотых Листьев (GTL). Базовый клик будет умножен на x${this.state.calculatePrestigeMultiplier().toFixed(1)}, а текущий объём сбросится с нуля для новой франшизы!`)) {
            this.state.performSupernova();
            sounds.playRebirth();
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

  openBoosterInfoModal(def, isUnlocked) {
    const modal = document.getElementById('modal-booster-info');
    if (!modal) return;
    document.getElementById('booster-info-title').textContent = def.name;
    document.getElementById('booster-info-desc').textContent = isUnlocked
      ? def.desc
      : `🔒 Заблокировано! Требуется открыть ${CONTAINMENT_LAYERS[def.reqLayer - 1].name} (Грейд ${def.reqLayer}).\n\nЭффект: ${def.desc}`;
    document.getElementById('booster-info-duration').textContent = `${def.duration} сек.`;
    document.getElementById('booster-info-cd').textContent = `${def.cooldown} сек.`;
    modal.classList.add('open');
  }

  openTeaVpnAdModal() {
    const modal = document.getElementById('modal-vpn-ad');
    const timerFill = document.getElementById('vpn-ad-timer-fill');
    const statusText = document.getElementById('vpn-ad-status');
    const claimBtn = document.getElementById('btn-vpn-ad-claim');

    if (!modal) return;
    modal.classList.add('open');

    timerFill.style.transition = 'none';
    timerFill.style.width = '0%';
    claimBtn.style.display = 'none';
    statusText.textContent = 'Туннелирование чая через Tea_VPN... (3 сек)';

    setTimeout(() => {
      timerFill.style.transition = 'width 3s linear';
      timerFill.style.width = '100%';
    }, 50);

    setTimeout(() => {
      statusText.textContent = '✓ Соединение защищено! Пинг 2мс! Бонус готов!';
      claimBtn.style.display = 'block';
      sounds.playVpnConnect();
      haptics.comboTier();
    }, 3050);

    claimBtn.onclick = () => {
      const bonus = this.state.activateTeaVpnAdBoost();
      modal.classList.remove('open');
      sounds.playGoldenBag();
      haptics.skill();
      if (this.visualizer) this.visualizer.triggerBreachEffect();

      const stage = document.getElementById('tab-reactor');
      const cx = stage ? stage.clientWidth / 2 : 180;
      const cy = stage ? stage.clientHeight / 2 : 250;
      this.spawnFloatingNumber(cx, cy, bonus, true);
    };
  }

  handleCoreTap(clientX, clientY) {
    const tapResult = this.state.performTap(false);

    if (tapResult.isCrit) {
      sounds.playCrit();
      haptics.crit();
      const app = document.getElementById('app-frame');
      app.classList.remove('screen-shake');
      void app.offsetWidth;
      app.classList.add('screen-shake');
    } else {
      sounds.playClick(tapResult.comboMultiplier);
      haptics.tap();
    }

    if (this.visualizer) {
      this.visualizer.emitSparks(clientX, clientY, tapResult.isCrit ? 15 : 8, tapResult.isCrit, tapResult.comboMultiplier);
    }

    this.spawnFloatingNumber(clientX, clientY, tapResult.damage, tapResult.isCrit);
    this.checkBreachAlert();
  }

  spawnFloatingNumber(x, y, amount, isCrit) {
    if (!this.floatingLayer) return;
    const elem = document.createElement('div');
    elem.className = `floating-num ${isCrit ? 'crit' : ''}`;
    elem.textContent = (isCrit ? '🍃 +' : '+') + formatNumber(amount) + ' мл';

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
    document.getElementById('offline-earned').textContent = `+${formatNumber(report.energyGained)} мл`;
    modal.classList.add('open');
  }

  checkBreachAlert() {
    if (this.lastRecordedLayer !== undefined && this.state.currentLayerIndex > this.lastRecordedLayer) {
      sounds.playTierUp();
      haptics.layerBreach();
      if (this.visualizer) this.visualizer.triggerBreachEffect();

      const breachedLayer = CONTAINMENT_LAYERS[this.lastRecordedLayer];
      const modal = document.getElementById('modal-breach');
      if (modal && breachedLayer) {
        document.getElementById('breach-layer-title').textContent = `${breachedLayer.name} освоен!`;
        document.getElementById('breach-layer-desc').textContent = breachedLayer.desc;
        document.getElementById('breach-perk-text').textContent = breachedLayer.perk;
        modal.classList.add('open');
      }
      this.renderLayersList();
    }
    this.lastRecordedLayer = this.state.currentLayerIndex;
  }

  collectGoldenBag() {
    if (!this.sparkActive) return;
    this.sparkActive = false;
    this.sparkElem.style.display = 'none';

    sounds.playGoldenBag();
    haptics.comboTier();

    const baseClick = this.state.calculateBaseClickPower();
    const sparkRank = this.state.masteries['tea_bag_flux'] || 0;
    const sparkMultiplier = 1 + sparkRank * 0.75;

    const reward = baseClick * 40 * this.state.getMaxComboMultiplier() * sparkMultiplier;
    this.state.addEnergy(reward);
    this.state.heat = this.state.maxHeat;

    this.state.setLore('Заваркин: «Ура! Золотой пакетик пойман! Чайник раскалён до кипения!»');

    if (this.visualizer) {
      this.visualizer.triggerBreachEffect();
    }

    const rect = this.sparkElem.getBoundingClientRect();
    this.spawnFloatingNumber(rect.left + 24, rect.top + 24, reward, true);

    this.sparkTimer = 35 + Math.random() * 15;
  }

  updateSpark(dt) {
    if (this.sparkActive) return;

    this.sparkTimer -= dt;
    if (this.sparkTimer <= 0) {
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
      const nextM = getNextMilestone(rank);

      card.innerHTML = `
        <div class="upgrade-info">
          <div class="upgrade-title-row">
            <span class="upgrade-name">${def.name}</span>
            <span class="upgrade-rank-tag">Ранг ${rank}</span>
          </div>
          <span class="upgrade-desc">${def.desc}</span>
          <div class="milestone-strip">
            <span class="milestone-badge">
              ${nextM ? `До бонуса x${nextM.mult}: ${rank}/${nextM.level} ур.` : 'МАКС БОНУС'}
            </span>
          </div>
        </div>
        <button id="buy-btn-${def.id}" class="buy-btn" ${isAffordable ? '' : 'disabled'}>
          <span style="font-size: 0.65rem; opacity: 0.8;">КУПИТЬ</span>
          <span>${formatNumber(cost)} мл</span>
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
    const nextM = getNextMilestone(rank);

    const rankTag = card.querySelector('.upgrade-rank-tag');
    if (rankTag) rankTag.textContent = `Ранг ${rank}`;

    const milestoneBadge = card.querySelector('.milestone-badge');
    if (milestoneBadge) {
      milestoneBadge.textContent = nextM
        ? `До бонуса x${nextM.mult}: ${rank}/${nextM.level} ур.`
        : 'МАКС БОНУС';
    }

    const buyBtn = card.querySelector(`#buy-btn-${id}`);
    if (buyBtn) {
      buyBtn.disabled = !isAffordable;
      buyBtn.innerHTML = `
        <span style="font-size: 0.65rem; opacity: 0.8;">КУПИТЬ</span>
        <span>${formatNumber(cost)} мл</span>
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
          <span>Грейд ${layer.id}: ${layer.name}</span>
          <span style="font-size: 0.75rem; color: ${isBreached ? 'var(--tea-green)' : (isCurrent ? 'var(--tea-amber)' : 'var(--text-muted)')}; font-weight: 800;">
            ${isBreached ? '✓ ОСВОЕН' : (isCurrent ? '🍵 ТЕКУЩИЙ' : '🔒 ЗАБЛОКИРОВАН')}
          </span>
        </div>
        <div style="font-size: 0.72rem; color: var(--text-dim);">${layer.desc}</div>
        <div class="layer-perk-badge">
          <span>🍃 Эффект:</span>
          <span>${layer.perk}</span>
        </div>
        <div style="font-size: 0.7rem; font-family: 'JetBrains Mono', monospace; color: var(--text-muted); margin-top: 2px;">
          Требуемый объём: ${formatNumber(layer.energyReq)} мл
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
        <button id="buy-mastery-${def.id}" class="buy-btn" style="border-color: var(--crit-gold); background: rgba(255, 209, 102, 0.2);" ${isAffordable ? '' : 'disabled'}>
          <span style="font-size: 0.65rem; opacity: 0.8;">${isMax ? 'МАКС' : 'КУПИТЬ'}</span>
          <span>${isMax ? '—' : `${cost} GTL`}</span>
        </button>
      `;

      const buyBtn = card.querySelector(`#buy-mastery-${def.id}`);
      buyBtn.addEventListener('click', () => {
        if (this.state.buyMastery(def.id)) {
          sounds.playVpnConnect();
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
    // 1. Total Tea Volume
    const energyElem = document.getElementById('energy-val');
    if (energyElem) energyElem.textContent = formatNumber(this.state.energy);

    // 2. Click & Passive displays
    const clickElem = document.getElementById('click-power-val');
    if (clickElem) {
      const totalClick = this.state.calculateBaseClickPower() * this.state.comboMultiplier;
      clickElem.textContent = `${formatNumber(totalClick)} мл`;
    }

    const passiveElem = document.getElementById('passive-val');
    if (passiveElem) {
      passiveElem.textContent = `${formatNumber(this.state.calculatePassivePerSec())} мл/с`;
    }

    const sdmElem = document.getElementById('sdm-val');
    if (sdmElem) {
      sdmElem.textContent = `${formatNumber(this.state.stellarDarkMatter)} GTL`;
    }

    // 3. Mascot Dialogue
    const mascotText = document.getElementById('mascot-text');
    if (mascotText && mascotText.textContent !== this.state.currentLore) {
      mascotText.textContent = this.state.currentLore;
    }

    // 4. Current Ceremonial Tier
    const currentLayer = CONTAINMENT_LAYERS[this.state.currentLayerIndex];
    if (currentLayer) {
      const layerBadge = document.getElementById('layer-badge');
      if (layerBadge) layerBadge.textContent = `ГРЕЙД ${currentLayer.id}`;

      const layerName = document.getElementById('layer-name');
      if (layerName) layerName.textContent = currentLayer.name;

      const pct = Math.min(100, (this.state.layerProgress / currentLayer.energyReq) * 100);
      const layerPct = document.getElementById('layer-pct');
      if (layerPct) layerPct.textContent = `${pct.toFixed(1)}%`;

      const layerFill = document.getElementById('layer-bar-fill');
      if (layerFill) layerFill.style.width = `${pct}%`;
    }

    // 5. Boil Temperature
    const comboVal = document.getElementById('combo-multiplier-val');
    if (comboVal) {
      const heatRatio = this.state.heat / this.state.maxHeat;
      const tempC = Math.round(60 + heatRatio * 40);
      const statusLabel = tempC >= 98 ? '🔥 КИПЕНИЕ!' : (tempC >= 80 ? 'Горячий' : 'Тёплый');
      comboVal.textContent = `x${this.state.comboMultiplier.toFixed(2)} (${tempC}°C ${statusLabel})`;
    }
    const comboFill = document.getElementById('combo-bar-fill');
    if (comboFill) {
      const heatPct = (this.state.heat / this.state.maxHeat) * 100;
      comboFill.style.width = `${heatPct}%`;
    }

    // 6. Franchise IPO Pending GTL & Cycle Progress (0% to 100%)
    const prestigeReq = this.state.getPrestigeRequirement();
    const cycleProgress = Math.min(100, (this.state.currentRunTeaEarned / prestigeReq) * 100);

    const cycleTxt = document.getElementById('prestige-cycle-progress-txt');
    if (cycleTxt) {
      cycleTxt.textContent = `${formatNumber(this.state.currentRunTeaEarned)} / ${formatNumber(prestigeReq)} мл`;
    }

    const cycleBar = document.getElementById('prestige-cycle-bar');
    if (cycleBar) {
      cycleBar.style.width = `${cycleProgress.toFixed(1)}%`;
    }

    const prestigeMultTxt = document.getElementById('current-prestige-mult');
    if (prestigeMultTxt) {
      prestigeMultTxt.textContent = `x${this.state.calculatePrestigeMultiplier().toFixed(2)}`;
    }

    const pendingSDM = this.state.calculatePendingSDM();
    const pendingSDMElem = document.getElementById('pending-sdm-val');
    if (pendingSDMElem) pendingSDMElem.textContent = formatNumber(pendingSDM);

    const btnSupernova = document.getElementById('btn-supernova-action');
    if (btnSupernova) {
      btnSupernova.disabled = pendingSDM <= 0;
    }

    // 7. Upgrades affordability
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

    this.updateSkillsUI();
  }

  gameLoop(timestamp) {
    const dt = Math.min(0.1, (timestamp - this.lastFrameTime) / 1000);
    this.lastFrameTime = timestamp;

    this.state.update(dt);
    this.updateSpark(dt);

    if (this.visualizer) {
      this.visualizer.render(this.state, dt);
    }

    this.updateUI();
    requestAnimationFrame(this.gameLoop.bind(this));
  }
}

window.addEventListener('DOMContentLoaded', () => {
  window.app = new GameApp();
});
