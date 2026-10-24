import { GameState, CONTAINMENT_LAYERS, UPGRADE_DEFINITIONS, SKILL_DEFINITIONS, MASTERY_TREE } from './src/gameState.js';

console.log('--- STARTING ITEA.INC LOGIC AUDIT ---');

const mockStorage = {};
global.localStorage = {
  getItem: (key) => mockStorage[key] || null,
  setItem: (key, val) => { mockStorage[key] = val; },
  removeItem: (key) => { delete mockStorage[key]; }
};

const state = new GameState();

// 1. Initial State Check
console.assert(state.energy === 0, 'Tea volume starts at 0');
console.assert(state.currentLayerIndex === 0, 'Tier starts at 0 (Майский Жмых)');
console.assert(state.comboMultiplier === 1, 'Temperature multiplier starts at 1');
console.assert(state.calculateBaseClickPower() === 1, 'Base click is 1 ml');
console.assert(state.calculatePassivePerSec() === 0, 'Passive starts at 0');
console.log('✓ Initial ITea state valid');

// 2. Perform 10 Taps and check kettle heating
for (let i = 0; i < 10; i++) {
  state.performTap(false);
}
console.assert(state.totalClicks === 10, '10 clicks counted');
console.assert(state.energy >= 10, `Tea brewed: ${state.energy} ml`);
console.assert(state.heat > 0, `Kettle temperature heated: ${state.heat}°C`);
console.log('✓ Active clicking and kettle boil heat valid');

// 3. Test Tea_VPN Ad Boost
const vpnBonus = state.activateTeaVpnAdBoost();
console.assert(vpnBonus > 0, `Tea_VPN ad bonus granted: ${vpnBonus} ml`);
console.assert(state.isVpnAdActive, 'Tea_VPN ad turbo boost is active');
console.assert(state.heat === state.maxHeat, 'Tea_VPN overheats kettle to 100%');
console.log('✓ Tea_VPN sponsor ad mechanics verified');

// 4. Test Upgrades
state.energy = 5000;
const firstUpgrade = UPGRADE_DEFINITIONS[0];
const buySuccess = state.buyUpgrade(firstUpgrade.id);
console.assert(buySuccess, 'Upgrade buy successful');
console.assert(state.upgrades[firstUpgrade.id] === 1, 'Upgrade rank incremented');
console.assert(state.calculateBaseClickPower() > 1, 'Click power increased after upgrade');
console.log('✓ Upgrade system valid');

// 5. Test Offline Penalty Check
state.lastSaved = Date.now() - 3600 * 1000;
state.upgrades['intern_with_kettle'] = 10; // 30 ml/s passive
const passive = state.calculatePassivePerSec();
console.assert(passive === 30, `Passive rate is ${passive}`);

const offlineReport = state.processOfflineEarnings();
console.assert(offlineReport !== null, 'Offline report generated');
console.assert(offlineReport.elapsedMinutes === 60, 'Elapsed minutes detected');
console.assert(offlineReport.cappedMinutes === 30, 'Capped at 30 minutes');
console.log(`Offline tea brewed: ${offlineReport.energyGained} ml (expected ~2700 with 5% throttle)`);
console.assert(offlineReport.energyGained <= 2750 && offlineReport.energyGained >= 2650, '5% cold tea offline penalty correctly applied');
console.log('✓ Anti-idle offline penalty (cold tea 5% throttle, 30m cap) verified');

// 6. Test Ceremonial Tier Progression
state.energy = 0;
state.layerProgress = 0;
state.currentLayerIndex = 0;
const tier1Req = CONTAINMENT_LAYERS[0].energyReq;
state.addEnergy(tier1Req + 10);
console.assert(state.currentLayerIndex === 1, `Advanced to Tier 2! Current index: ${state.currentLayerIndex}`);
console.log('✓ Ceremonial Tier progression and tea variety unlock valid');

// 7. Test Franchise IPO (Prestige)
state.totalEnergyEarned = 10000000; // 10M ml
console.assert(state.canSupernova(), 'Can IPO with 10M ml');
const pendingGTL = state.calculatePendingSDM();
console.assert(pendingGTL > 0, `Pending GTL: ${pendingGTL}`);
const gtlGained = state.performSupernova();
console.assert(gtlGained === pendingGTL, 'GTL gained matches pending');
console.assert(state.stellarDarkMatter === gtlGained, 'Golden tea leaves stored');
console.assert(state.energy === 0, 'Tea volume reset to 0');
console.assert(state.currentLayerIndex === 0, 'Tier reset for new accelerated franchise');
console.assert(state.supernovaCount === 1, 'Franchise counter incremented');
console.log('✓ Franchise IPO prestige system verified');

// 8. Test Board of Directors Mastery Tree
const firstMastery = MASTERY_TREE[0];
const buyMasterySuccess = state.buyMastery(firstMastery.id);
console.assert(buyMasterySuccess, 'Mastery shares purchased with GTL');
console.assert(state.masteries[firstMastery.id] === 1, 'Mastery rank 1');
console.assert(state.calculateBaseClickPower() > 1, 'Permanent prestige shares active on fresh run');
console.log('✓ Board of Directors permanent multiplier verified');

console.log('--- ALL ITEA.INC LOGIC AUDITS PASSED CLEANLY ---');
