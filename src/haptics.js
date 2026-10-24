/**
 * Mobile Haptics Controller for Android devices
 */

class HapticsSystem {
  constructor() {
    this.enabled = true;
  }

  toggle() {
    this.enabled = !this.enabled;
    return this.enabled;
  }

  vibrate(pattern) {
    if (!this.enabled) return;
    if (typeof window !== 'undefined' && 'navigator' in window && 'vibrate' in navigator) {
      try {
        navigator.vibrate(pattern);
      } catch (e) {
        // Safe fail on unsupported or blocked devices
      }
    }
  }

  tap() {
    this.vibrate(12);
  }

  crit() {
    this.vibrate([25, 30, 40]);
  }

  comboTier() {
    this.vibrate([20, 40, 20]);
  }

  skill() {
    this.vibrate([40, 60, 40]);
  }

  layerBreach() {
    this.vibrate([80, 50, 120, 60, 200]);
  }

  supernova() {
    this.vibrate([100, 50, 150, 50, 250, 100, 400]);
  }
}

export const haptics = new HapticsSystem();
