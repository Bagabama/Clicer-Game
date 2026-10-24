/**
 * Canvas Visual Engine: Core Plasma, Rotating Rings, Shockwaves & Spark Bursts
 */

export class CoreVisualizer {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.width = canvas.width = canvas.offsetWidth || 360;
    this.height = canvas.height = canvas.offsetHeight || 360;

    this.sparks = [];
    this.shockwaves = [];
    this.stars = [];
    this.rotationAngle1 = 0;
    this.rotationAngle2 = 0;
    this.rotationAngle3 = 0;
    this.pulseScale = 1;
    this.resonancePhase = 0; // For critical ring alignment

    this.initStars();
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

  initStars() {
    this.stars = [];
    for (let i = 0; i < 40; i++) {
      this.stars.push({
        x: Math.random() * 400,
        y: Math.random() * 400,
        r: Math.random() * 1.5 + 0.5,
        alpha: Math.random() * 0.7 + 0.3,
        speed: Math.random() * 0.4 + 0.1
      });
    }
  }

  // Triggered on click / tap
  emitSparks(x, y, count = 12, isCrit = false, heatMultiplier = 1) {
    const rect = this.canvas.getBoundingClientRect();
    const localX = x !== undefined ? x - rect.left : this.width / 2;
    const localY = y !== undefined ? y - rect.top : this.height / 2;

    const baseColor = isCrit
      ? '#ff007a'
      : heatMultiplier >= 5
      ? '#ffaa00'
      : '#00f0ff';

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * (isCrit ? 8 : 4.5) + 2;
      this.sparks.push({
        x: localX,
        y: localY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: Math.random() * (isCrit ? 4.5 : 3) + 1.5,
        color: baseColor,
        life: 1,
        decay: Math.random() * 0.03 + 0.02
      });
    }

    if (isCrit) {
      this.shockwaves.push({
        x: localX,
        y: localY,
        r: 10,
        maxR: 90,
        color: '#ff007a',
        alpha: 1
      });
    }
  }

  triggerBreachEffect() {
    const cx = this.width / 2;
    const cy = this.height / 2;
    for (let i = 0; i < 70; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 10 + 3;
      this.sparks.push({
        x: cx,
        y: cy,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: Math.random() * 5 + 2,
        color: i % 2 === 0 ? '#ffaa00' : '#00f0ff',
        life: 1,
        decay: Math.random() * 0.015 + 0.01
      });
    }
    this.shockwaves.push({
      x: cx,
      y: cy,
      r: 20,
      maxR: 160,
      color: '#ffffff',
      alpha: 1
    });
  }

  render(state, dt) {
    const ctx = this.ctx;
    const cx = this.width / 2;
    const cy = this.height / 2;

    ctx.clearRect(0, 0, this.width, this.height);

    // Heat speed scaling
    const heatRatio = state.heat / state.maxHeat;
    const speedMult = 1 + heatRatio * 2.5;

    this.rotationAngle1 += 0.012 * speedMult;
    this.rotationAngle2 -= 0.018 * speedMult;
    this.rotationAngle3 += 0.025 * speedMult;
    this.resonancePhase = (this.resonancePhase + 0.03) % (Math.PI * 2);

    // 1. Ambient Stardust
    ctx.fillStyle = '#00f0ff';
    for (const star of this.stars) {
      star.y += star.speed;
      if (star.y > this.height) star.y = 0;
      ctx.globalAlpha = star.alpha * 0.4;
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;

    // 2. Quantum Resonance Ring (timing sweet spot ring)
    // Pulsing rhythm ring
    const resonanceR = 75 + Math.sin(this.resonancePhase) * 18;
    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, resonanceR, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(0, 240, 255, ${0.15 + (Math.sin(this.resonancePhase) + 1) * 0.15})`;
    ctx.lineWidth = 1.5;
    ctx.setLineDash([4, 6]);
    ctx.stroke();
    ctx.restore();

    // 3. Containment Layer Outer Ring
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(this.rotationAngle1);
    ctx.beginPath();
    ctx.arc(0, 0, 115, 0, Math.PI * 2);
    ctx.strokeStyle = heatRatio > 0.6 ? '#ffaa00' : 'rgba(0, 240, 255, 0.4)';
    ctx.lineWidth = 2.5;
    ctx.setLineDash([30, 20, 10, 20]);
    ctx.stroke();

    // 4 containment brackets
    for (let i = 0; i < 4; i++) {
      ctx.rotate(Math.PI / 2);
      ctx.fillStyle = heatRatio > 0.8 ? '#ff0055' : '#00f0ff';
      ctx.fillRect(-4, -122, 8, 14);
    }
    ctx.restore();

    // 4. Middle Plasma Turbine Ring
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(this.rotationAngle2);
    ctx.beginPath();
    ctx.arc(0, 0, 92, 0, Math.PI * 2);
    ctx.strokeStyle = state.isSkillActive ? '#ff007a' : 'rgba(121, 40, 202, 0.65)';
    ctx.lineWidth = 4;
    ctx.setLineDash([60, 30, 15, 30]);
    ctx.stroke();
    ctx.restore();

    // 5. Inner Core Glow & Energy Pulsing Sphere
    const baseR = 48 + heatRatio * 12 + Math.sin(Date.now() * 0.005) * 3;
    const grad = ctx.createRadialGradient(cx, cy, baseR * 0.1, cx, cy, baseR * 1.5);

    let coreColorCenter = '#ffffff';
    let coreColorMid = '#00f0ff';
    let coreColorOuter = 'rgba(0, 240, 255, 0)';

    if (state.comboMultiplier >= 8) {
      coreColorMid = '#ffaa00';
      coreColorCenter = '#fff4cc';
    } else if (state.comboMultiplier >= 4) {
      coreColorMid = '#ff007a';
    }

    grad.addColorStop(0, coreColorCenter);
    grad.addColorStop(0.35, coreColorMid);
    grad.addColorStop(0.7, 'rgba(121, 40, 202, 0.4)');
    grad.addColorStop(1, coreColorOuter);

    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, baseR * 1.5, 0, Math.PI * 2);
    ctx.fillStyle = grad;
    ctx.fill();

    // Inner bright kernel
    ctx.beginPath();
    ctx.arc(cx, cy, baseR * 0.45, 0, Math.PI * 2);
    ctx.fillStyle = '#ffffff';
    ctx.shadowColor = coreColorMid;
    ctx.shadowBlur = 20;
    ctx.fill();
    ctx.restore();

    // 6. Shockwaves
    for (let i = this.shockwaves.length - 1; i >= 0; i--) {
      const sw = this.shockwaves[i];
      sw.r += 3.5;
      sw.alpha -= 0.035;

      if (sw.alpha <= 0 || sw.r >= sw.maxR) {
        this.shockwaves.splice(i, 1);
        continue;
      }

      ctx.save();
      ctx.beginPath();
      ctx.arc(sw.x, sw.y, sw.r, 0, Math.PI * 2);
      ctx.strokeStyle = sw.color;
      ctx.globalAlpha = sw.alpha;
      ctx.lineWidth = 3;
      ctx.stroke();
      ctx.restore();
    }

    // 7. Sparks / Particle Bursts
    for (let i = this.sparks.length - 1; i >= 0; i--) {
      const p = this.sparks[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vx *= 0.94;
      p.vy *= 0.94;
      p.life -= p.decay;

      if (p.life <= 0) {
        this.sparks.splice(i, 1);
        continue;
      }

      ctx.save();
      ctx.globalAlpha = p.life;
      ctx.fillStyle = p.color;
      ctx.shadowColor = p.color;
      ctx.shadowBlur = 8;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  destroy() {
    window.removeEventListener('resize', this.handleResize);
  }
}
