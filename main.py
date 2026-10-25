"""
ITea.inc: Silicon Valley Tea Tycoon & Tea_VPN
Standalone Pygame Version with Graphic Interface, Mascot, Dialogues & Deep Balance.
"""

import sys
import os
import math
import time
import json
import random
import pygame

# Initialize Pygame
pygame.init()
pygame.mixer.init()

WIDTH, HEIGHT = 440, 840
FPS = 60

# Colors (ITea Dark Jade & Cyber Palette)
BG_DEEP = (5, 13, 7)
BG_SURFACE = (10, 24, 15)
BG_CARD = (16, 36, 23)
BG_CARD_HOVER = (24, 52, 34)

TEA_GREEN = (112, 224, 0)
TEA_AMBER = (255, 183, 3)
TEA_ORANGE = (251, 133, 0)
VPN_CYAN = (0, 240, 255)
CRIT_GOLD = (255, 209, 102)

TEXT_MAIN = (240, 250, 242)
TEXT_DIM = (143, 168, 149)
TEXT_MUTED = (83, 110, 90)
BORDER_GLASS = (112, 224, 0, 45)

screen = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption("ITea.inc: Silicon Valley Tea Tycoon & Tea_VPN")
clock = pygame.time.Clock()

# Fonts
font_title = pygame.font.SysFont("Arial", 22, bold=True)
font_large = pygame.font.SysFont("Courier New", 26, bold=True)
font_mid = pygame.font.SysFont("Arial", 14, bold=True)
font_small = pygame.font.SysFont("Arial", 12)
font_tiny = pygame.font.SysFont("Arial", 10)

# Number formatter
def format_number(num):
    if num < 1000:
        return f"{num:.1f}" if num % 1 != 0 else str(int(num))
    suffixes = ['', 'K', 'M', 'B', 'T', 'Qa', 'Qi', 'Sx', 'Sp', 'Oc', 'No']
    i = int(math.floor(math.log10(max(1, num)) / 3))
    if i >= len(suffixes):
        return f"{num:.2e}"
    val = num / (10 ** (i * 3))
    return f"{val:.2f} {suffixes[i]}"

# Milestone definitions
MILESTONES = [10, 25, 50, 100, 175, 275, 400, 550, 750, 1000]
MILESTONE_MULTS = [2, 3, 4, 5, 6, 8, 10, 15, 20, 25]

def get_milestone_multiplier(rank):
    mult = 1
    for i, m in enumerate(MILESTONES):
        if rank >= m:
            mult *= MILESTONE_MULTS[i]
        else:
            break
    return mult

def get_next_milestone(rank):
    for i, m in enumerate(MILESTONES):
        if rank < m:
            return m, MILESTONE_MULTS[i]
    return None, None

# Upgrades definition
UPGRADE_DEFS = [
    {"id": "kinetic_spoon", "name": "Кинетическая Ложечка", "baseCost": 20, "costMult": 1.18, "clickBonus": 1.5, "passiveBonus": 0, "desc": "Перемешивает чай с квантовым ускорением."},
    {"id": "smart_mug_heater", "name": "USB-Подогрев Кружки", "baseCost": 110, "costMult": 1.20, "clickBonus": 6, "passiveBonus": 0.5, "desc": "Питается от макбука. Удерживает кипяток."},
    {"id": "intern_with_kettle", "name": "Стажер с Чайником", "baseCost": 350, "costMult": 1.22, "clickBonus": 3, "passiveBonus": 4, "desc": "Регулярно подливает кипяток (+4 мл/с)."},
    {"id": "pressure_infuser", "name": "Пресс-Инжектор", "baseCost": 1600, "costMult": 1.25, "clickBonus": 28, "passiveBonus": 2, "desc": "Выжимает из листьев максимум танина."},
    {"id": "wifi_tea_strainer", "name": "Ситечко с Wi-Fi", "baseCost": 7500, "costMult": 1.27, "clickBonus": 95, "passiveBonus": 8, "desc": "Нано-фильтрация заварки, +1.5% крит."},
    {"id": "office_tea_cooler", "name": "Кулер с ITea OS", "baseCost": 36000, "costMult": 1.29, "clickBonus": 60, "passiveBonus": 65, "desc": "Авто-заварка для всего офиса (+65 мл/с)."},
    {"id": "tea_vpn_node", "name": "Сервер Tea_VPN", "baseCost": 180000, "costMult": 1.32, "clickBonus": 450, "passiveBonus": 25, "desc": "Защищенный туннель доставки чая."},
    {"id": "auto_brewing_rack", "name": "Чайная Стойка 42U", "baseCost": 950000, "costMult": 1.34, "clickBonus": 700, "passiveBonus": 480, "desc": "Блейд-серверы, заваривающие элитный улун."},
    {"id": "tannin_accelerator", "name": "Коллайдер Танина", "baseCost": 5500000, "costMult": 1.37, "clickBonus": 3800, "passiveBonus": 160, "desc": "Атомный распад чайного листа (+3,800 мл)."},
    {"id": "quantum_tea_rig", "name": "Квантовый Заварник", "baseCost": 35000000, "costMult": 1.40, "clickBonus": 24000, "passiveBonus": 1200, "desc": "Заваривает чай во всех ветках Git (+24k мл)."}
]

# Ceremonial Tiers (10 Layers)
TIER_DEFS = [
    {"id": 1, "name": "Пакетик «Майский Жмых»", "req": 1000, "perk": "+25% к силе клика"},
    {"id": 2, "name": "Офисный Липтон из кулера", "req": 8000, "perk": "Навык «Оверклок Чайника»"},
    {"id": 3, "name": "Зеленый Сенча с дедлайном", "req": 65000, "perk": "Макс. температура до x7.5"},
    {"id": 4, "name": "Габа Улун с нейростимулятором", "req": 450000, "perk": "+10% шанс крита"},
    {"id": 5, "name": "Да Хун Пао Архитектора", "req": 3500000, "perk": "Навык «Tea_VPN Hyper-Tunnel»"},
    {"id": 6, "name": "Маття Латте из коворкинга", "req": 28000000, "perk": "Чай остывает на 45% медленнее"},
    {"id": 7, "name": "Пуэр 2008 года с криптофермы", "req": 220000000, "perk": "Золотые пакетики в 2.5 раза чаще"},
    {"id": 8, "name": "Чай на слезах джуниоров", "req": 1800000000, "perk": "Навык «Тайфун Заварки»"},
    {"id": 9, "name": "Императорский Драконий Чай CEO", "req": 15000000000, "perk": "Криты дают x3 объёма"},
    {"id": 10, "name": "Чайная Сингулярность ITea", "req": 120000000000, "perk": "100% Заварка Вселенной! Выход на IPO!"}
]

MASCOT_LORE = [
    "Мяу! Я Заваркин, твой чайный архитектор. Кликай по кружке!",
    "Каждые 10, 25, 50 ур. дают множитель x2, x3, x4! Качай уровни!",
    "Чайник остывает без тапов! Жми быстрее, держи 100°C!",
    "Цены растут быстрее дохода? Выходи на IPO и забирай акции!",
    "Tea_VPN шифрует наш чай по протоколу ChaCha20-Tea!",
    "Престиж навсегда умножает клики в разы! Без сброса не пройти!",
    "Смотри рекламу спонсора Tea_VPN — получишь турбо-буст!",
    "Опять прод упал? Ща заварю пуэр, всё починим."
]

# Asset loaders (Cozy Cafe BG, Anime Barista, Mascot Cat)
mascot_surf = None
if os.path.exists("assets/mascot.jpg"):
    try:
        raw_img = pygame.image.load("assets/mascot.jpg")
        mascot_surf = pygame.transform.smoothscale(raw_img, (54, 54))
    except Exception as e:
        print("Could not load mascot image:", e)

cafe_bg_surf = None
if os.path.exists("assets/cafe_bg.jpg"):
    try:
        raw_bg = pygame.image.load("assets/cafe_bg.jpg")
        cafe_bg_surf = pygame.transform.smoothscale(raw_bg, (WIDTH, HEIGHT))
    except Exception as e:
        print("Could not load cafe bg:", e)

barista_surf = None
if os.path.exists("assets/barista.jpg"):
    try:
        raw_barista = pygame.image.load("assets/barista.jpg")
        barista_surf = pygame.transform.smoothscale(raw_barista, (180, 180))
    except Exception as e:
        print("Could not load barista image:", e)

# Customer Story Dialogues
STORY_EVENTS = [
    {
        "id": "story_start",
        "author": "Стажер Максим (Junior)",
        "text": "Здравствуйте! Сказали, без кружки чая пулл-реквест не примут... Держите чаевые!",
        "reward": 150,
        "trigger": lambda s: s.total_tea >= 50
    },
    {
        "id": "story_lvl10",
        "author": "Аня (Frontend Ninja)",
        "text": "Ложечка крутится со скоростью 60 FPS! Доход за клик удвоился (x2)!",
        "reward": 800,
        "trigger": lambda s: any(r >= 10 for r in s.upgrades.values())
    },
    {
        "id": "story_lvl25",
        "author": "Денис (Senior Backend)",
        "text": "25-й уровень утроил (x3) весь чайный поток компании! Бэкенд выдержал!",
        "reward": 5000,
        "trigger": lambda s: any(r >= 25 for r in s.upgrades.values())
    },
    {
        "id": "story_tier2",
        "author": "Сисадмин Петрович",
        "text": "Офисный кулер пропатчен! Врубай Оверклок чайника на 100°C!",
        "reward": 12000,
        "trigger": lambda s: s.current_tier_idx >= 1
    },
    {
        "id": "story_lvl50",
        "author": "Тимлид Артем",
        "text": "Спринт закрыт досрочно благодаря чаю! Множитель клика вырос в 4 раза!",
        "reward": 60000,
        "trigger": lambda s: any(r >= 50 for r in s.upgrades.values())
    }
]

class Particle:
    def __init__(self, x, y, is_crit=False, color=TEA_GREEN):
        self.x = x
        self.y = y
        angle = random.uniform(0, math.pi * 2)
        speed = random.uniform(2, 6) if not is_crit else random.uniform(4, 10)
        self.vx = math.cos(angle) * speed
        self.vy = math.sin(angle) * speed - 1.5
        self.size = random.uniform(2, 4) if not is_crit else random.uniform(3, 6)
        self.color = color
        self.life = 1.0
        self.decay = random.uniform(0.02, 0.05)

    def update(self):
        self.x += self.vx
        self.y += self.vy
        self.life -= self.decay

    def draw(self, surface):
        if self.life > 0:
            alpha_color = self.color
            pygame.draw.circle(surface, alpha_color, (int(self.x), int(self.y)), int(self.size * self.life))

class FloatingText:
    def __init__(self, x, y, text, is_crit=False):
        self.x = x
        self.y = y
        self.text = text
        self.is_crit = is_crit
        self.life = 1.0
        self.color = CRIT_GOLD if is_crit else (255, 255, 255)
        self.font = font_title if is_crit else font_mid

    def update(self):
        self.y -= 1.8
        self.life -= 0.025

    def draw(self, surface):
        if self.life > 0:
            rendered = self.font.render(self.text, True, self.color)
            surface.blit(rendered, (self.x - rendered.get_width() // 2, self.y))

class SteamParticle:
    def __init__(self, x, y):
        self.x = x + random.uniform(-30, 30)
        self.y = y
        self.vx = random.uniform(-0.5, 0.5)
        self.vy = -random.uniform(1.2, 2.8)
        self.r = random.uniform(6, 12)
        self.life = 1.0
        self.decay = random.uniform(0.015, 0.025)

    def update(self):
        self.x += self.vx + math.sin(time.time() * 2 + self.y * 0.05) * 0.3
        self.y += self.vy
        self.r += 0.2
        self.life -= self.decay

    def draw(self, surface):
        if self.life > 0:
            s = pygame.Surface((int(self.r * 2), int(self.r * 2)), pygame.SRCALPHA)
            alpha = int(self.life * 70)
            pygame.draw.circle(s, (220, 245, 230, alpha), (int(self.r), int(self.r)), int(self.r))
            surface.blit(s, (int(self.x - self.r), int(self.y - self.r)))

class GameState:
    def __init__(self):
        self.energy = 0
        self.current_run_tea = 0
        self.total_tea = 0
        self.gtl = 0
        self.supernova_count = 0
        self.current_tier_idx = 0
        self.tier_progress = 0

        self.upgrades = {u["id"]: 0 for u in UPGRADE_DEFS}
        self.heat = 0
        self.max_heat = 100
        self.combo_mult = 1.0

        # Skills: active_timer, cooldown_timer
        self.skills = {
            "overdrive": {"active": 0, "cd": 0, "duration": 15, "max_cd": 45, "name": "Оверклок (100°C)", "desc": "100°C кипяток (x7.50) на 15с", "req": 2},
            "vpn_tunnel": {"active": 0, "cd": 0, "duration": 12, "max_cd": 60, "name": "Tea_VPN (x4)", "desc": "Учетверяет клик на 12с", "req": 5},
            "tea_typhoon": {"active": 0, "cd": 0, "duration": 15, "max_cd": 90, "name": "Тайфун (Крит)", "desc": "100% крит x2.5 на 15с", "req": 8}
        }

        self.lore_text = MASCOT_LORE[0]
        self.lore_timer = 10
        self.active_story = None
        self.completed_stories = set()

        self.load()

    def get_prestige_req(self):
        return int(500000 * (2.2 ** self.supernova_count))

    def get_prestige_mult(self):
        # TRUE MULTIPLICATIVE PRESTIGE MULTIPLIER!
        return (1 + self.supernova_count * 1.5) * (1 + self.gtl * 0.20)

    def calculate_base_click(self):
        base_click_sum = 0.0
        global_milestone_mult = 1.0
        for u in UPGRADE_DEFS:
            rank = self.upgrades[u["id"]]
            if rank > 0:
                base_click_sum += rank * u["clickBonus"]
                global_milestone_mult *= get_milestone_multiplier(rank)

        power = (1.0 + base_click_sum) * global_milestone_mult

        if self.current_tier_idx >= 1:
            power *= 1.25

        power += self.calculate_passive() * 0.10
        # Multiplied by prestige!
        power *= self.get_prestige_mult()

        if self.skills["vpn_tunnel"]["active"] > 0:
            power *= 4.0

        return max(1.0, power)

    def calculate_passive(self):
        base_passive = 0.0
        global_milestone_mult = 1.0
        for u in UPGRADE_DEFS:
            rank = self.upgrades[u["id"]]
            if rank > 0 and u["passiveBonus"] > 0:
                base_passive += rank * u["passiveBonus"]
                global_milestone_mult *= get_milestone_multiplier(rank)

        if base_passive <= 0:
            return 0.0

        return base_passive * global_milestone_mult * self.get_prestige_mult()

    def get_upgrade_cost(self, u_def):
        rank = self.upgrades[u_def["id"]]
        base_inf = u_def["costMult"] ** rank
        super_inf = 1.035 ** max(0, rank - 15)
        return int(u_def["baseCost"] * base_inf * super_inf)

    def buy_upgrade(self, u_id):
        u_def = next(u for u in UPGRADE_DEFS if u["id"] == u_id)
        cost = self.get_upgrade_cost(u_def)
        if self.energy >= cost:
            self.energy -= cost
            self.upgrades[u_id] += 1
            new_rank = self.upgrades[u_id]
            prev_m = get_milestone_multiplier(new_rank - 1)
            cur_m = get_milestone_multiplier(new_rank)
            if cur_m > prev_m:
                self.lore_text = f"Заваркин: «Уровень {new_rank} у {u_def['name']}! Бонус x{cur_m // prev_m}!»"
                self.lore_timer = 7
            return True
        return False

    def perform_tap(self):
        self.heat = min(self.max_heat, self.heat + 8)

        base = self.calculate_base_click()
        combo = self.combo_mult

        crit_chance = 0.08
        if self.current_tier_idx >= 3:
            crit_chance += 0.10
        if self.skills["tea_typhoon"]["active"] > 0:
            crit_chance = 1.0

        is_crit = random.random() < crit_chance
        crit_mult = 3.2 if not is_crit else (3.2 * 2.5 if self.skills["tea_typhoon"]["active"] > 0 else 3.2)
        if self.current_tier_idx >= 8:
            crit_mult *= 3.0

        final_dmg = base * combo * (crit_mult if is_crit else 1.0)
        self.add_energy(final_dmg)
        return final_dmg, is_crit

    def add_energy(self, amt):
        self.energy += amt
        self.current_run_tea += amt
        self.total_tea += amt
        self.tier_progress += amt

        # Tier progression
        cur_tier = TIER_DEFS[self.current_tier_idx]
        if self.tier_progress >= cur_tier["req"]:
            if self.current_tier_idx < len(TIER_DEFS) - 1:
                self.current_tier_idx += 1
                self.tier_progress = 0
                self.lore_text = f"Заваркин: «Ура! Открыт грейд: {TIER_DEFS[self.current_tier_idx]['name']}!»"
                self.lore_timer = 7

    def can_prestige(self):
        req = self.get_prestige_req()
        return self.current_run_tea >= req

    def get_pending_gtl(self):
        req = self.get_prestige_req()
        if self.current_run_tea < req:
            return 0
        excess = self.current_run_tea / req
        return max(1, int(8 * (excess ** 0.5)))

    def do_prestige(self):
        pending = self.get_pending_gtl()
        if pending <= 0:
            return 0

        self.gtl += pending
        self.supernova_count += 1

        # RESET THIS CYCLE FROM ZERO!
        self.energy = 0
        self.current_run_tea = 0
        self.tier_progress = 0
        self.current_tier_idx = 0
        self.heat = 0
        self.combo_mult = 1.0

        self.upgrades = {u["id"]: 0 for u in UPGRADE_DEFS}
        for s in self.skills.values():
            s["active"] = 0
            s["cd"] = 0

        self.lore_text = f"Заваркин: «Франшиза #{self.supernova_count} запущена! Клик умножен на x{self.get_prestige_mult():.1f}!»"
        self.lore_timer = 8
        self.save()
        return pending

    def activate_skill(self, s_id):
        s = self.skills[s_id]
        if self.current_tier_idx + 1 < s["req"]:
            return False
        if s["active"] > 0 or s["cd"] > 0:
            return False
        s["active"] = s["duration"]
        s["cd"] = s["max_cd"]

        if s_id == "overdrive":
            self.heat = self.max_heat
            self.combo_mult = 7.5

        self.lore_text = f"Заваркин: «Бустер {s['name']} активирован!»"
        self.lore_timer = 6
        return True

    def update(self, dt):
        # Passive
        passive = self.calculate_passive()
        if passive > 0:
            self.add_energy(passive * dt)

        # Heat decay
        if self.skills["overdrive"]["active"] <= 0:
            decay = 18.0
            if self.current_tier_idx >= 5:
                decay *= 0.55
            self.heat = max(0, self.heat - decay * dt)

        max_combo = 7.5 if self.current_tier_idx >= 2 else 5.0
        self.combo_mult = 1.0 + (self.heat / self.max_heat) * (max_combo - 1.0)

        # Skills timers
        for s in self.skills.values():
            if s["active"] > 0:
                s["active"] = max(0, s["active"] - dt)
            elif s["cd"] > 0:
                s["cd"] = max(0, s["cd"] - dt)

        # Lore cycle
        self.lore_timer -= dt
        if self.lore_timer <= 0:
            self.lore_text = random.choice(MASCOT_LORE)
            self.lore_timer = 12

        # Story events check
        if not self.active_story:
            for ev in STORY_EVENTS:
                if ev["id"] not in self.completed_stories and ev["trigger"](self):
                    self.active_story = ev
                    break

    def save(self):
        data = {
            "energy": self.energy,
            "current_run_tea": self.current_run_tea,
            "total_tea": self.total_tea,
            "gtl": self.gtl,
            "supernova_count": self.supernova_count,
            "current_tier_idx": self.current_tier_idx,
            "tier_progress": self.tier_progress,
            "upgrades": self.upgrades
        }
        with open("pygame_save.json", "w", encoding="utf-8") as f:
            json.dump(data, f)

    def load(self):
        if os.path.exists("pygame_save.json"):
            try:
                with open("pygame_save.json", "r", encoding="utf-8") as f:
                    data = json.load(f)
                    self.energy = data.get("energy", 0)
                    self.current_run_tea = data.get("current_run_tea", 0)
                    self.total_tea = data.get("total_tea", 0)
                    self.gtl = data.get("gtl", 0)
                    self.supernova_count = data.get("supernova_count", 0)
                    self.current_tier_idx = min(data.get("current_tier_idx", 0), len(TIER_DEFS) - 1)
                    self.tier_progress = data.get("tier_progress", 0)
                    if "upgrades" in data:
                        for k, v in data["upgrades"].items():
                            if k in self.upgrades:
                                self.upgrades[k] = v
            except Exception as e:
                print("Save load error:", e)

# Main Game Loop
def main():
    state = GameState()
    particles = []
    floating_texts = []
    steam_particles = []

    current_tab = "reactor" # 'reactor', 'upgrades', 'tiers', 'franchise'
    scroll_offset = 0

    running = True
    save_timer = 0
    shake_timer = 0

    while running:
        dt = clock.tick(FPS) / 1000.0
        state.update(dt)

        save_timer += dt
        if save_timer > 5.0:
            state.save()
            save_timer = 0

        if shake_timer > 0:
            shake_timer -= dt

        # Event handling
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                state.save()
                running = False
                break

            elif event.type == pygame.MOUSEBUTTONDOWN and event.button == 1:
                mx, my = event.pos

                # Story dialogue modal click
                if state.active_story:
                    modal_y = HEIGHT // 2 - 110
                    claim_rect = pygame.Rect(WIDTH // 2 - 100, modal_y + 155, 200, 42)
                    if claim_rect.collidepoint(mx, my):
                        reward = state.active_story["reward"]
                        state.add_energy(reward)
                        floating_texts.append(FloatingText(WIDTH // 2, HEIGHT // 2, f"+{format_number(reward)} мл", True))
                        state.completed_stories.add(state.active_story["id"])
                        state.active_story = None
                    continue

                # Tab Buttons at bottom
                if my >= HEIGHT - 55:
                    tab_w = WIDTH // 4
                    if mx < tab_w:
                        current_tab = "reactor"
                    elif mx < tab_w * 2:
                        current_tab = "upgrades"
                    elif mx < tab_w * 3:
                        current_tab = "tiers"
                    else:
                        current_tab = "franchise"
                    continue

                # Mascot Bar click: cycle lore
                if 50 <= my <= 100:
                    state.lore_text = random.choice(MASCOT_LORE)
                    state.lore_timer = 12
                    continue

                # Tab specific clicks
                if current_tab == "reactor":
                    # Mug tap area (center)
                    cx, cy = WIDTH // 2, HEIGHT // 2 - 20
                    dist = math.hypot(mx - cx, my - cy)
                    if dist <= 105:
                        dmg, is_crit = state.perform_tap()
                        if is_crit:
                            shake_timer = 0.2
                        # Particles
                        color = CRIT_GOLD if is_crit else TEA_GREEN
                        for _ in range(12 if is_crit else 6):
                            particles.append(Particle(mx, my, is_crit, color))
                        # Floating text
                        txt = f"💥 +{format_number(dmg)} мл" if is_crit else f"+{format_number(dmg)} мл"
                        floating_texts.append(FloatingText(mx, my, txt, is_crit))

                    # Booster clicks (bottom of reactor)
                    by = HEIGHT - 130
                    bw = (WIDTH - 40) // 3
                    skill_ids = ["overdrive", "vpn_tunnel", "tea_typhoon"]
                    for idx, s_id in enumerate(skill_ids):
                        bx = 20 + idx * bw
                        if bx <= mx <= bx + bw - 6 and by <= my <= by + 55:
                            state.activate_skill(s_id)

                elif current_tab == "upgrades":
                    # Upgrades list
                    card_y = 115 - scroll_offset
                    for u in UPGRADE_DEFS:
                        buy_rect = pygame.Rect(WIDTH - 110, card_y + 10, 95, 36)
                        if buy_rect.collidepoint(mx, my):
                            state.buy_upgrade(u["id"])
                        card_y += 62

                elif current_tab == "franchise":
                    # Prestige button
                    btn_rect = pygame.Rect(40, 240, WIDTH - 80, 48)
                    if btn_rect.collidepoint(mx, my) and state.can_prestige():
                        state.do_prestige()

            elif event.type == pygame.MOUSEWHEEL:
                if current_tab == "upgrades":
                    scroll_offset = max(0, min(scroll_offset - event.y * 25, 200))

        # --- DRAWING ---
        screen_shake_offset = (0, 0)
        if shake_timer > 0:
            screen_shake_offset = (random.randint(-4, 4), random.randint(-4, 4))

        if cafe_bg_surf:
            screen.blit(cafe_bg_surf, (0, 0))
            overlay = pygame.Surface((WIDTH, HEIGHT), pygame.SRCALPHA)
            overlay.fill((246, 250, 246, 215)) # Light porcelain wash
            screen.blit(overlay, (0, 0))
        else:
            screen.fill(BG_DEEP)

        # 1. Header (Brand & Stats)
        header_surf = pygame.Surface((WIDTH, 50))
        header_surf.fill(BG_SURFACE)
        pygame.draw.line(header_surf, TEA_GREEN, (0, 49), (WIDTH, 49), 1)

        title_render = font_title.render("ITea.inc", True, TEA_GREEN)
        header_surf.blit(title_render, (16, 12))

        tea_txt = f"{format_number(state.energy)} мл"
        tea_render = font_large.render(tea_txt, True, TEXT_MAIN)
        header_surf.blit(tea_render, (WIDTH - tea_render.get_width() - 16, 10))
        screen.blit(header_surf, (0, 0))

        # 2. Mascot & Mini-Lore Strip
        mascot_y = 54
        pygame.draw.rect(screen, BG_CARD, (14, mascot_y, WIDTH - 28, 48), border_radius=10)
        pygame.draw.rect(screen, (TEA_GREEN[0], TEA_GREEN[1], TEA_GREEN[2], 60), (14, mascot_y, WIDTH - 28, 48), 1, border_radius=10)

        if mascot_surf:
            screen.blit(mascot_surf, (18, mascot_y - 3))
        else:
            pygame.draw.circle(screen, TEA_GREEN, (38, mascot_y + 24), 18)

        lore_r = font_small.render(state.lore_text[:50], True, TEXT_MAIN)
        lore_r2 = font_tiny.render(state.lore_text[50:105], True, TEXT_DIM)
        screen.blit(lore_r, (76, mascot_y + 8))
        screen.blit(lore_r2, (76, mascot_y + 26))

        # 3. TAB RENDERING
        if current_tab == "reactor":
            # Tier & Combo Banner
            tier = TIER_DEFS[state.current_tier_idx]
            tier_txt = font_mid.render(f"Грейд {tier['id']}: {tier['name']}", True, TEA_GREEN)
            screen.blit(tier_txt, (18, 110))

            pct = min(1.0, state.tier_progress / tier["req"])
            pygame.draw.rect(screen, (0, 0, 0), (18, 130, WIDTH - 36, 7), border_radius=4)
            pygame.draw.rect(screen, TEA_GREEN, (18, 130, int((WIDTH - 36) * pct), 7), border_radius=4)

            # Boil Temp
            temp_c = int(60 + (state.heat / state.max_heat) * 40)
            status_txt = "🔥 100°C КИПЕНИЕ!" if temp_c >= 98 else f"{temp_c}°C Тёплый"
            temp_render = font_small.render(f"Температура: x{state.combo_mult:.2f} ({status_txt})", True, TEA_AMBER)
            screen.blit(temp_render, (18, 144))

            pygame.draw.rect(screen, (0, 0, 0), (18, 162, WIDTH - 36, 6), border_radius=3)
            pygame.draw.rect(screen, TEA_AMBER, (18, 162, int((WIDTH - 36) * (state.heat / state.max_heat)), 6), border_radius=3)

            # Center Target (Anime Barista with steam & speech bubble)
            cx = WIDTH // 2 + screen_shake_offset[0]
            cy = HEIGHT // 2 - 20 + screen_shake_offset[1]

            # Steam
            if random.random() < 0.35:
                steam_particles.append(SteamParticle(cx, cy - 80))
            for sp in steam_particles[:]:
                sp.update()
                sp.draw(screen)
                if sp.life <= 0:
                    steam_particles.remove(sp)

            # Circular Barista Portrait
            if barista_surf:
                pygame.draw.circle(screen, (255, 255, 255), (cx, cy), 94)
                pygame.draw.circle(screen, TEA_GREEN, (cx, cy), 95, 3)
                screen.blit(barista_surf, (cx - 90, cy - 90))

                # Speech Bubble
                bubble_w, bubble_h = 240, 28
                bx = cx - bubble_w // 2
                by = cy - 130
                pygame.draw.rect(screen, (255, 255, 255), (bx, by, bubble_w, bubble_h), border_radius=12)
                pygame.draw.rect(screen, TEA_GREEN, (bx, by, bubble_w, bubble_h), 1, border_radius=12)
                bubble_txt = font_tiny.render("«Завариваю свежий чай! 🍵»", True, (16, 46, 28))
                screen.blit(bubble_txt, (cx - bubble_txt.get_width() // 2, by + 7))
            else:
                # Fallback mug
                pygame.draw.circle(screen, (30, 48, 35), (cx + 60, cy), 32, 10)
                pygame.draw.circle(screen, TEA_GREEN, (cx + 60, cy), 32, 2)
                mug_rect = pygame.Rect(cx - 55, cy - 60, 110, 120)
                pygame.draw.rect(screen, (16, 26, 18), mug_rect, border_radius=20)
                pygame.draw.rect(screen, TEA_GREEN, mug_rect, 3, border_radius=20)
                liquid_color = TEA_ORANGE if temp_c >= 90 else TEA_AMBER
                liquid_rect = pygame.Rect(cx - 48, cy - 10, 96, 62)
                pygame.draw.rect(screen, liquid_color, liquid_rect, border_radius=12)
                pygame.draw.circle(screen, (255, 255, 255), (cx, cy + 20), 10)

            # Stats above boosters
            click_p = state.calculate_base_click() * state.combo_mult
            stat_lbl = font_mid.render(f"Клик: {format_number(click_p)} мл | Авто: {format_number(state.calculate_passive())} мл/с", True, TEXT_MAIN)
            screen.blit(stat_lbl, (WIDTH // 2 - stat_lbl.get_width() // 2, HEIGHT - 165))

            # Booster Buttons (with full clear descriptions!)
            by = HEIGHT - 130
            bw = (WIDTH - 40) // 3
            skill_ids = ["overdrive", "vpn_tunnel", "tea_typhoon"]
            for idx, s_id in enumerate(skill_ids):
                s = state.skills[s_id]
                bx = 20 + idx * bw
                is_unlocked = state.current_tier_idx + 1 >= s["req"]
                is_active = s["active"] > 0
                bg = (30, 70, 45) if is_active else (BG_CARD if is_unlocked else (10, 18, 12))

                b_rect = pygame.Rect(bx, by, bw - 6, 55)
                pygame.draw.rect(screen, bg, b_rect, border_radius=10)
                border_c = VPN_CYAN if is_active else (TEA_GREEN if is_unlocked else (40, 60, 45))
                pygame.draw.rect(screen, border_c, b_rect, 2 if is_active else 1, border_radius=10)

                name_r = font_small.render(s["name"][:12], True, TEXT_MAIN if is_unlocked else TEXT_MUTED)
                desc_r = font_tiny.render(s["desc"][:16], True, TEA_AMBER if is_unlocked else TEXT_MUTED)
                screen.blit(name_r, (bx + 6, by + 8))
                screen.blit(desc_r, (bx + 6, by + 26))

                if s["cd"] > 0 and not is_active:
                    cd_r = font_mid.render(f"{int(s['cd'])}s", True, TEA_GREEN)
                    screen.blit(cd_r, (bx + bw // 2 - 12, by + 18))
                elif not is_unlocked:
                    lock_r = font_tiny.render(f"С {s['req']} гр.", True, TEXT_MUTED)
                    screen.blit(lock_r, (bx + 6, by + 38))

        elif current_tab == "upgrades":
            # Upgrades Header
            up_h = font_mid.render("Чайные Модули (Каждые 10, 25, 50 ур. бонус x2, x3...):", True, TEA_AMBER)
            screen.blit(up_h, (16, 110))

            card_y = 135 - scroll_offset
            for u in UPGRADE_DEFS:
                if 80 <= card_y <= HEIGHT - 70:
                    rank = state.upgrades[u["id"]]
                    cost = state.get_upgrade_cost(u)
                    next_m, next_mult = get_next_milestone(rank)

                    card_rect = pygame.Rect(14, card_y, WIDTH - 28, 56)
                    pygame.draw.rect(screen, BG_CARD, card_rect, border_radius=10)
                    pygame.draw.rect(screen, (TEA_GREEN[0], TEA_GREEN[1], TEA_GREEN[2], 50), card_rect, 1, border_radius=10)

                    name_r = font_mid.render(f"{u['name']} (ур. {rank})", True, TEXT_MAIN)
                    screen.blit(name_r, (22, card_y + 6))

                    m_txt = f"Бонус x{next_mult} на {next_m} ур. ({rank}/{next_m})" if next_m else "МАКС БОНУС"
                    m_r = font_tiny.render(m_txt, True, TEA_AMBER)
                    screen.blit(m_r, (22, card_y + 24))

                    desc_r = font_tiny.render(u["desc"][:45], True, TEXT_DIM)
                    screen.blit(desc_r, (22, card_y + 38))

                    # Buy Button
                    can_buy = state.energy >= cost
                    buy_rect = pygame.Rect(WIDTH - 110, card_y + 10, 95, 36)
                    pygame.draw.rect(screen, (30, 80, 45) if can_buy else (15, 25, 18), buy_rect, border_radius=8)
                    pygame.draw.rect(screen, TEA_GREEN if can_buy else TEXT_MUTED, buy_rect, 1, border_radius=8)

                    cost_r = font_small.render(f"{format_number(cost)} мл", True, TEXT_MAIN if can_buy else TEXT_MUTED)
                    screen.blit(cost_r, (WIDTH - 105, card_y + 20))

                card_y += 62

        elif current_tab == "tiers":
            th = font_mid.render("10 Чайных Грейдов ITea.inc (Цель игры):", True, TEA_GREEN)
            screen.blit(th, (16, 110))

            card_y = 135
            for t in TIER_DEFS:
                is_unlocked = state.current_tier_idx >= t["id"] - 1
                is_cur = state.current_tier_idx == t["id"] - 1
                bg = (24, 52, 34) if is_cur else (BG_CARD if is_unlocked else (10, 16, 12))

                c_rect = pygame.Rect(14, card_y, WIDTH - 28, 52)
                pygame.draw.rect(screen, bg, c_rect, border_radius=8)
                pygame.draw.rect(screen, TEA_GREEN if is_cur else (40, 60, 45), c_rect, 1, border_radius=8)

                title_r = font_mid.render(f"Грейд {t['id']}: {t['name']}", True, TEXT_MAIN if is_unlocked else TEXT_MUTED)
                status_txt = "✓ ОСВОЕН" if state.current_tier_idx > t["id"] - 1 else ("ТЕКУЩИЙ" if is_cur else "ЗАБЛОКИРОВАН")
                status_r = font_tiny.render(status_txt, True, TEA_GREEN if is_unlocked else TEXT_MUTED)
                screen.blit(title_r, (22, card_y + 8))
                screen.blit(status_r, (WIDTH - status_r.get_width() - 24, card_y + 8))

                perk_r = font_tiny.render(f"Бонус: {t['perk']} | Нужно: {format_number(t['req'])} мл", True, TEA_AMBER if is_unlocked else TEXT_MUTED)
                screen.blit(perk_r, (22, card_y + 28))

                card_y += 58

        elif current_tab == "franchise":
            fh = font_title.render("Выход на IPO (Франшиза / Престиж)", True, TEA_AMBER)
            screen.blit(fh, (WIDTH // 2 - fh.get_width() // 2, 115))

            desc1 = font_small.render("Сброс прогресса навсегда умножает клики!", True, TEXT_DIM)
            screen.blit(desc1, (WIDTH // 2 - desc1.get_width() // 2, 145))

            req = state.get_prestige_req()
            cycle_pct = min(1.0, state.current_run_tea / req)
            p_txt = font_mid.render(f"Цель цикла: {format_number(state.current_run_tea)} / {format_number(req)} мл ({cycle_pct*100:.1f}%)", True, TEXT_MAIN)
            screen.blit(p_txt, (18, 175))

            pygame.draw.rect(screen, (0, 0, 0), (18, 198, WIDTH - 36, 10), border_radius=5)
            pygame.draw.rect(screen, TEA_AMBER, (18, 198, int((WIDTH - 36) * cycle_pct), 10), border_radius=5)

            mult_txt = font_large.render(f"Множитель франшизы: x{state.get_prestige_mult():.2f}", True, CRIT_GOLD)
            screen.blit(mult_txt, (WIDTH // 2 - mult_txt.get_width() // 2, 218))

            # Prestige Button
            can_p = state.can_prestige()
            p_btn = pygame.Rect(40, 260, WIDTH - 80, 48)
            pygame.draw.rect(screen, (40, 110, 50) if can_p else (20, 30, 22), p_btn, border_radius=12)
            pygame.draw.rect(screen, TEA_GREEN if can_p else TEXT_MUTED, p_btn, 2, border_radius=12)

            btn_txt = font_mid.render(f"ОТКРЫТЬ ФРАНШИЗУ (+{state.get_pending_gtl()} GTL)", True, TEXT_MAIN if can_p else TEXT_MUTED)
            screen.blit(btn_txt, (WIDTH // 2 - btn_txt.get_width() // 2, 274))

            # Info box
            box_rect = pygame.Rect(18, 325, WIDTH - 36, 120)
            pygame.draw.rect(screen, BG_CARD, box_rect, border_radius=10)
            i1 = font_small.render("• Цена нового сброса теперь растет с каждой франшизой!", True, TEXT_DIM)
            i2 = font_small.render("• Прогресс цикла честно сбрасывается с 0 мл.", True, TEXT_DIM)
            i3 = font_small.render("• Доход за клик умножается (x1.5 за франшизу + акции)!", True, TEA_AMBER)
            screen.blit(i1, (26, 335))
            screen.blit(i2, (26, 365))
            screen.blit(i3, (26, 395))

        # 4. Particles & Floating Numbers
        for p in particles[:]:
            p.update()
            p.draw(screen)
            if p.life <= 0:
                particles.remove(p)

        for ft in floating_texts[:]:
            ft.update()
            ft.draw(screen)
            if ft.life <= 0:
                floating_texts.remove(ft)

        # 5. Bottom Navigation Bar
        nav_h = 55
        nav_y = HEIGHT - nav_h
        pygame.draw.rect(screen, BG_SURFACE, (0, nav_y, WIDTH, nav_h))
        pygame.draw.line(screen, (TEA_GREEN[0], TEA_GREEN[1], TEA_GREEN[2], 50), (0, nav_y), (WIDTH, nav_y), 1)

        tab_w = WIDTH // 4
        tabs = [
            ("reactor", "Кружка", "🍵"),
            ("upgrades", "Модули", "⚡"),
            ("tiers", "Грейды", "🏆"),
            ("franchise", "Франшиза", "📈")
        ]
        for idx, (t_id, t_label, t_ico) in enumerate(tabs):
            tx = idx * tab_w
            is_sel = (current_tab == t_id)
            if is_sel:
                pygame.draw.rect(screen, (TEA_GREEN[0], TEA_GREEN[1], TEA_GREEN[2], 40), (tx + 4, nav_y + 4, tab_w - 8, nav_h - 8), border_radius=8)

            ico_r = font_mid.render(t_ico, True, TEA_GREEN if is_sel else TEXT_DIM)
            lbl_r = font_tiny.render(t_label, True, TEA_GREEN if is_sel else TEXT_DIM)
            screen.blit(ico_r, (tx + tab_w // 2 - ico_r.get_width() // 2, nav_y + 8))
        # 6. STORY POPUP MODAL
        if state.active_story:
            overlay = pygame.Surface((WIDTH, HEIGHT), pygame.SRCALPHA)
            overlay.fill((0, 0, 0, 160))
            screen.blit(overlay, (0, 0))

            modal_w, modal_h = WIDTH - 50, 230
            modal_x = 25
            modal_y = HEIGHT // 2 - modal_h // 2

            pygame.draw.rect(screen, (255, 255, 255), (modal_x, modal_y, modal_w, modal_h), border_radius=18)
            pygame.draw.rect(screen, (16, 185, 129), (modal_x, modal_y, modal_w, modal_h), 2, border_radius=18)

            author_r = font_mid.render(f"💬 {state.active_story['author']}:", True, (16, 46, 28))
            screen.blit(author_r, (modal_x + 18, modal_y + 18))

            text_lines = [
                state.active_story['text'][:38],
                state.active_story['text'][38:76],
                state.active_story['text'][76:115]
            ]
            for l_idx, line in enumerate(text_lines):
                if line:
                    line_r = font_small.render(line, True, (40, 60, 48))
                    screen.blit(line_r, (modal_x + 18, modal_y + 46 + l_idx * 20))

            reward_r = font_mid.render(f"Бонусные чаевые: +{format_number(state.active_story['reward'])} мл", True, (217, 119, 6))
            screen.blit(reward_r, (modal_x + 18, modal_y + 118))

            claim_rect = pygame.Rect(WIDTH // 2 - 100, modal_y + 160, 200, 42)
            pygame.draw.rect(screen, (16, 185, 129), claim_rect, border_radius=12)
            btn_txt = font_mid.render("ПРИНЯТЬ ЧАЙ 🍵", True, (255, 255, 255))
            screen.blit(btn_txt, (claim_rect.centerx - btn_txt.get_width() // 2, claim_rect.centery - btn_txt.get_height() // 2))

        pygame.display.flip()

    pygame.quit()
    sys.exit()

if __name__ == "__main__":
    main()
