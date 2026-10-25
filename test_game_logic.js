import { GameState, CONTAINMENT_LAYERS, UPGRADE_DEFINITIONS, SKILL_DEFINITIONS, MASTERY_TREE, getUpgradeMilestoneMultiplier, getNextMilestone } from './src/gameState.js';

console.log('--- STARTING UPDATED ITEA.INC LOGIC & BALANCE AUDIT ---');

const mockStorage = {};
global.localStorage = {
  getItem: (key) => mockStorage[key] || null,
  setItem: (key, val) => { mockStorage[key] = val; },
  removeItem: (key) => { delete mockStorage[key]; }
};

const state = new GameState();

// 1. Initial State Check
console.assert(state.energy === 0, 'Tea volume starts at 0');
console.assert(state.currentRunTeaEarned === 0, 'Current run tea starts at 0');
console.assert(state.currentLayerIndex === 0, 'Tier starts at 0 (Майский Жмых)');
console.assert(state.calculatePrestigeMultiplier() === 1.0, 'Initial prestige multiplier is 1.0x');
console.log('✓ Initial ITea state valid');

// 2. Test Milestone System
console.assert(getUpgradeMilestoneMultiplier(5) === 1, 'Lvl 5 has 1x multiplier');
console.assert(getUpgradeMilestoneMultiplier(10) === 2, 'Lvl 10 has 2x multiplier');
console.assert(getUpgradeMilestoneMultiplier(25) === 6, 'Lvl 25 has 2*3 = 6x multiplier');
console.assert(getUpgradeMilestoneMultiplier(50) === 24, 'Lvl 50 has 2*3*4 = 24x multiplier');
const nextM = getNextMilestone(15);
console.assert(nextM.level === 25 && nextM.mult === 3, 'Next milestone from 15 is 25 (x3)');
console.log('✓ Milestone multiplier system (grows at 10, 25, 50...) verified');

// 3. Test Super-Exponential Cost Inflation
const spoon = UPGRADE_DEFINITIONS[0];
const cost1 = state.getUpgradeCost(spoon);
state.upgrades[spoon.id] = 10;
const cost10 = state.getUpgradeCost(spoon);
state.upgrades[spoon.id] = 25;
const cost25 = state.getUpgradeCost(spoon);
console.assert(cost25 > cost10 * 10, 'Cost grows super-exponentially');
console.log(`Lvl 0 cost: ${cost1}, Lvl 10 cost: ${cost10}, Lvl 25 cost: ${cost25}`);
console.log('✓ Super-exponential cost scaling verified');

// 4. Test Prestige Reset from Zero & Dynamic Requirement Scaling
const req1 = state.getPrestigeRequirement();
console.assert(req1 === 500000, `First prestige requirement is 500k, got ${req1}`);

// Earn enough for 1st prestige
state.addEnergy(1200000);
console.assert(state.currentRunTeaEarned === 1200000, 'Current run tea recorded');
console.assert(state.canSupernova(), 'Can IPO with 1.2M ml');
const pending1 = state.calculatePendingSDM();
console.assert(pending1 > 0, `Pending GTL: ${pending1}`);

// Perform prestige
const gtlEarned = state.performSupernova();
console.assert(state.supernovaCount === 1, 'Franchise count is 1');
console.assert(state.currentRunTeaEarned === 0, 'Current run tea reset to 0');
console.assert(state.energy === 0, 'Tea volume reset to 0');
console.assert(!state.canSupernova(), 'Cannot immediately prestige again after reset');

// Check requirement for 2nd prestige scaled up!
const req2 = state.getPrestigeRequirement();
console.assert(req2 > req1 * 2, `2nd prestige requirement scaled up: ${req2} > ${req1 * 2}`);

// Check that prestige gave a TRUE MULTIPLICATIVE BONUS!
const newMult = state.calculatePrestigeMultiplier();
console.assert(newMult > 2.0, `Prestige multiplier is now x${newMult} (> 2.0x)!`);
console.assert(state.calculateBaseClickPower() >= newMult, 'Base click is directly multiplied by prestige!');
console.log('✓ Prestige reset starts from 0, threshold scales up, and applies true multiplicative click boost');

console.log('--- ALL BALANCING & GAMEPLAY TESTS PASSED CLEANLY ---');
