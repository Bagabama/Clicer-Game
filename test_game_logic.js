import { GameState, CONTAINMENT_LAYERS, UPGRADE_DEFINITIONS, SKILL_DEFINITIONS, MASTERY_TREE } from './src/gameState.js';

console.log('--- STARTING GAME LOGIC AUDIT ---');

// Mock localStorage
const mockStorage = {};
global.localStorage = {
  getItem: (key) => mockStorage[key] || null,
  setItem: (key, val) => { mockStorage[key] = val; },
  removeItem: (key) => { delete mockStorage[key]; }
};

const state = new GameState();

// 1. Initial State Check
console.assert(state.energy === 0, 'Energy starts at 0');
console.assert(state.currentLayerIndex === 0, 'Layer starts at 0');
console.assert(state.comboMultiplier === 1, 'Combo starts at 1');
console.assert(state.calculateBaseClickPower() === 1, 'Base click power is 1');
console.assert(state.calculatePassivePerSec() === 0, 'Passive starts at 0');
console.log('✓ Initial state valid');

// 2. Perform 10 Taps and check heat & energy
for (let i = 0; i < 10; i++) {
  state.performTap(false);
}
console.assert(state.totalClicks === 10, '10 clicks counted');
console.assert(state.energy >= 10, `Energy accumulated: ${state.energy}`);
console.assert(state.heat > 0, `Heat built up: ${state.heat}`);
console.log('✓ Active clicking and heat buildup valid');

// 3. Test Upgrades
state.energy = 5000;
const firstUpgrade = UPGRADE_DEFINITIONS[0];
const buySuccess = state.buyUpgrade(firstUpgrade.id);
console.assert(buySuccess, 'Upgrade buy successful');
console.assert(state.upgrades[firstUpgrade.id] === 1, 'Upgrade rank incremented');
console.assert(state.calculateBaseClickPower() > 1, 'Click power increased after upgrade');
console.log('✓ Upgrade system valid');

// 4. Test Offline Penalty Check
// Simulate 1 hour offline
state.lastSaved = Date.now() - 3600 * 1000;
// Add some passive
state.upgrades['drone_unit'] = 10; // 30/sec passive
const passive = state.calculatePassivePerSec();
console.assert(passive === 30, `Passive rate is ${passive}`);

const offlineReport = state.processOfflineEarnings();
console.assert(offlineReport !== null, 'Offline report generated');
console.assert(offlineReport.elapsedMinutes === 60, 'Elapsed minutes detected');
console.assert(offlineReport.cappedMinutes === 30, 'Capped at 30 minutes');
// 30 min * 60s * 30/s * 0.05 efficiency = 2700
console.log(`Offline earned: ${offlineReport.energyGained} (expected ~2700 with 5% throttle)`);
console.assert(offlineReport.energyGained <= 2750 && offlineReport.energyGained >= 2650, '5% offline penalty correctly applied');
console.log('✓ Anti-idle offline penalty (5% throttle, 30m cap) verified');

// 5. Test Containment Layer Breach
state.energy = 0;
state.layerProgress = 0;
state.currentLayerIndex = 0;
const layer1Req = CONTAINMENT_LAYERS[0].energyReq;
state.addEnergy(layer1Req + 10);
console.assert(state.currentLayerIndex === 1, `Breached to layer 1! Current index: ${state.currentLayerIndex}`);
console.log('✓ Containment layer progression and breach valid');

// 6. Test Supernova Rebirth (Prestige)
state.totalEnergyEarned = 10000000; // 10M energy
console.assert(state.canSupernova(), 'Can supernova with 10M energy');
const pendingSDM = state.calculatePendingSDM();
console.assert(pendingSDM > 0, `Pending SDM: ${pendingSDM}`);
const sdmGained = state.performSupernova();
console.assert(sdmGained === pendingSDM, 'SDM gained matches pending');
console.assert(state.stellarDarkMatter === sdmGained, 'Stellar dark matter stored');
console.assert(state.energy === 0, 'Energy reset to 0');
console.assert(state.currentLayerIndex === 0, 'Layer reset to 0 for new accelerated cycle');
console.assert(state.supernovaCount === 1, 'Supernova counter incremented');
console.log('✓ Supernova rebirth prestige system verified');

// 7. Test Mastery Skill Tree
const firstMastery = MASTERY_TREE[0];
const buyMasterySuccess = state.buyMastery(firstMastery.id);
console.assert(buyMasterySuccess, 'Mastery purchased with SDM');
console.assert(state.masteries[firstMastery.id] === 1, 'Mastery rank 1');
console.assert(state.calculateBaseClickPower() > 1, 'Permanent prestige bonus active on fresh run');
console.log('✓ Mastery tree permanent multiplier verified');

console.log('--- ALL LOGIC AUDITS PASSED CLEANLY ---');
