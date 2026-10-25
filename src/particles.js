/**
 * ITea.inc Canvas Visual Engine
 * Renders the interactive ITea Smart Mug, boiling liquid bubbles, rising steam and tea leaves.
 */

export class CoreVisualizer {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.width = canvas.width = canvas.offsetWidth || 360;
    this.height = canvas.height = canvas.offsetHeight || 360;

    this.sparks = []; // Liquid droplets & splash
    this.shockwaves = []; // Water ripples
    this.steam = []; // Rising steam particles
    this.leaves = []; // Ambient floating tea leaves

    this.orbitAngle = 0;
    this.bubbleTimer = 0;

    this.initSteamAndLeaves();
    this.handleResize = this.resize.bind(this);
    window.addEventListener('resize', this.handleResize);
  }

  resize() {
    if (!this.canvas) return;
    const rect = this.canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.width = rect.width;
    this.height = rect.height;
    this.canvas.width = rect.width * dpr;
    this.canvas.height = rect.height * dpr;
    this.ctx.scale(dpr, dpr);
  }

  initSteamAndLeaves() {
    this.leaves = [];
    for (let i = 0; i < 16; i++) {
      this.leaves.push({
        x: Math.random() * 300,
        y: Math.random() * 300,
        r: Math.random() * 6 + 4,
        angle: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.04,
        vx: (Math.random() - 0.5) * 0.5,
        vy: Math.random() * 0.4 + 0.2
      });
    }
  }

  // Triggered when user taps the mug
  emitSparks(x, y, count = 10, isCrit = false, heatMultiplier = 1) {
    const rect = this.canvas.getBoundingClientRect();
    const localX = x !== undefined ? x - rect.left : this.width / 2;
    const localY = y !== undefined ? y - rect.top : this.height / 2;

    const baseColor = isCrit
      ? '#ffd166' // Golden Leaf Crit
      : heatMultiplier >= 5
      ? '#fb8500' // Hot Amber
      : '#70e000'; // Fresh Green Matcha

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * (isCrit ? 7 : 4) + 1.5;
      this.sparks.push({
        x: localX,
        y: localY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 1.5, // Splash upward
        size: Math.random() * (isCrit ? 4.5 : 3) + 1.5,
        color: baseColor,
        life: 1,
        decay: Math.random() * 0.035 + 0.02
      });
    }

    // Ripple
    this.shockwaves.push({
      x: localX,
      y: localY,
      r: 10,
      maxR: isCrit ? 85 : 55,
      color: isCrit ? '#ffd166' : 'rgba(112, 224, 0, 0.8)',
      alpha: 1
    });
  }

  triggerBreachEffect() {
    const cx = this.width / 2;
    const cy = this.height / 2;
    for (let i = 0; i < 60; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 9 + 3;
      this.sparks.push({
        x: cx,
        y: cy,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: Math.random() * 5 + 2,
        color: i % 2 === 0 ? '#ffd166' : '#70e000',
        life: 1,
        decay: Math.random() * 0.02 + 0.015
      });
    }
    this.shockwaves.push({
      x: cx,
      y: cy,
      r: 15,
      maxR: 160,
      color: '#00f0ff',
      alpha: 1
    });
  }

  render(state, dt) {
    const ctx = this.ctx;
    const cx = this.width / 2;
    const cy = this.height / 2 + 10;

    ctx.clearRect(0, 0, this.width, this.height);

    const heatRatio = state.heat / state.maxHeat; // 0 to 1
    this.orbitAngle += 0.015 * (1 + heatRatio * 2);

    // 1. Steam Generator (rises from top of mug)
    if (Math.random() < 0.35 + heatRatio * 0.5) {
      this.steam.push({
        x: cx + (Math.random() - 0.5) * 70,
        y: cy - 75,
        vx: (Math.random() - 0.5) * 0.8,
        vy: -(Math.random() * 1.5 + 1.2 + heatRatio * 2),
        r: Math.random() * 8 + 6,
        alpha: 0.65,
        decay: 0.012 + Math.random() * 0.008
      });
    }

    // Render Steam
    for (let i = this.steam.length - 1; i >= 0; i--) {
      const s = this.steam[i];
      s.x += s.vx + Math.sin(Date.now() * 0.003 + s.y * 0.05) * 0.4;
      s.y += s.vy;
      s.r += 0.25;
      s.alpha -= s.decay;

      if (s.alpha <= 0 || s.y < 0) {
        this.steam.splice(i, 1);
        continue;
      }

      ctx.save();
      ctx.globalAlpha = s.alpha * 0.5;
      ctx.fillStyle = heatRatio > 0.6 ? '#ffb703' : 'rgba(230, 245, 235, 0.9)';
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    // 2. Ambient Falling Tea Leaves
    for (const leaf of this.leaves) {
      leaf.y += leaf.vy;
      leaf.x += leaf.vx;
      leaf.angle += leaf.rotSpeed;
      if (leaf.y > this.height + 20) {
        leaf.y = -20;
        leaf.x = Math.random() * this.width;
      }

      ctx.save();
      ctx.translate(leaf.x, leaf.y);
      ctx.rotate(leaf.angle);
      ctx.globalAlpha = 0.25;
      ctx.fillStyle = '#70e000';
      ctx.beginPath();
      ctx.ellipse(0, 0, leaf.r, leaf.r * 0.45, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    // 3. Ambient Tea Aroma Halo around Barista
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(this.orbitAngle);
    ctx.beginPath();
    ctx.arc(0, 0, 110, 0, Math.PI * 2);
    ctx.strokeStyle = state.isVpnActive ? '#0284c7' : (heatRatio > 0.8 ? '#f59e0b' : 'rgba(16, 185, 129, 0.4)');
    ctx.lineWidth = 2.5;
    ctx.setLineDash([16, 12, 6, 12]);
    ctx.stroke();

    // Orbiting Tea Nodes
    for (let i = 0; i < 3; i++) {
      ctx.rotate((Math.PI * 2) / 3);
      ctx.fillStyle = state.isVpnActive ? '#0284c7' : (heatRatio > 0.8 ? '#f59e0b' : '#10b981');
      ctx.shadowColor = ctx.fillStyle;
      ctx.shadowBlur = 8;
      ctx.beginPath();
      ctx.arc(110, 0, 5, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();

    // 4. Boiling Aroma Bubbles & Steam Spikes
    this.bubbleTimer += dt * (2 + heatRatio * 8);
    if (this.bubbleTimer > 0.35) {
      this.bubbleTimer = 0;
      const angle = Math.random() * Math.PI * 2;
      const dist = 95 + Math.random() * 20;
      this.sparks.push({
        x: cx + Math.cos(angle) * dist,
        y: cy + Math.sin(angle) * dist,
        vx: (Math.random() - 0.5) * 0.6,
        vy: -(Math.random() * 2 + 1 + heatRatio * 3),
        size: Math.random() * 3 + 2,
        color: '#ffffff',
        life: 0.9,
        decay: 0.04
      });
    }

    // 6. Ripples / Shockwaves
    for (let i = this.shockwaves.length - 1; i >= 0; i--) {
      const sw = this.shockwaves[i];
      sw.r += 3;
      sw.alpha -= 0.04;
      if (sw.alpha <= 0 || sw.r >= sw.maxR) {
        this.shockwaves.splice(i, 1);
        continue;
      }
      ctx.save();
      ctx.beginPath();
      ctx.arc(sw.x, sw.y, sw.r, 0, Math.PI * 2);
      ctx.strokeStyle = sw.color;
      ctx.globalAlpha = sw.alpha;
      ctx.lineWidth = 2.5;
      ctx.stroke();
      ctx.restore();
    }

    // 7. Splash Drops & Bubbles
    for (let i = this.sparks.length - 1; i >= 0; i--) {
      const p = this.sparks[i];
      p.x += p.vx;
      p.y += p.vy;
      p.life -= p.decay;

      if (p.life <= 0) {
        this.sparks.splice(i, 1);
        continue;
      }

      ctx.save();
      ctx.globalAlpha = p.life;
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    ctx.restore();
  }

  destroy() {
    window.removeEventListener('resize', this.handleResize);
  }
}
