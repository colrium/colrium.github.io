/* eslint-disable react-hooks/refs */
"use client";

import { useEffect, useRef, useCallback, useState } from "react";

// ── Constants ──
const W = 760;
const H = 520;
const TABLE_X = 30;
const TABLE_Y = 30;
const TABLE_W = W - 60;
const TABLE_H = H - 60;
const CX = W / 2;
const CY = H / 2;
const GOAL_W = 160;
const GOAL_DEPTH = 20;
const GOAL_Y1 = CY - GOAL_W / 2;
const GOAL_Y2 = CY + GOAL_W / 2;
const PUCK_R = 14;
const MALLET_R = 24;
const MAX_SCORE = 7;
const FRICTION = 0.995;
const WALL_BOUNCE = 0.82;
const CPU_SPEED = 4.6;
const CPU_REACT = 0.62;
const CPU_ERROR_Y = 26;
const CPU_MISTAKE_CHANCE = 0.018;
const CPU_MISTAKE_DUR = 42;
const CONF_COLORS = [
    "#029bc9",
    "#FF991C",
    "#ffc940",
    "#ffffff",
    "#a855f7",
    "#22c55e",
    "#fb923c",
];

function clamp(v: number, a: number, b: number) {
    return Math.max(a, Math.min(b, v));
}
function lighten(hex: string, amt: number) {
    const r = parseInt(hex.slice(1, 3), 16),
        g = parseInt(hex.slice(3, 5), 16),
        b = parseInt(hex.slice(5, 7), 16);
    return `rgb(${clamp((r + amt * 255) | 0, 0, 255)},${clamp((g + amt * 255) | 0, 0, 255)},${clamp((b + amt * 255) | 0, 0, 255)})`;
}
function darken(hex: string, amt: number) {
    const r = parseInt(hex.slice(1, 3), 16),
        g = parseInt(hex.slice(3, 5), 16),
        b = parseInt(hex.slice(5, 7), 16);
    return `rgb(${Math.max(0, (r - amt * 255) | 0)},${Math.max(0, (g - amt * 255) | 0)},${Math.max(0, (b - amt * 255) | 0)})`;
}

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    life: number;
    col: string;
    size: number;
    glow: boolean;
    gravity: number;
}
interface ConfettiPiece {
    x: number;
    y: number;
    vx: number;
    vy: number;
    rot: number;
    rotV: number;
    w: number;
    h: number;
    col: string;
    life: number;
}
interface TrailPoint {
    x: number;
    y: number;
    spd: number;
}

interface AirHockeyProps {
    onCloseGame?: () => void;
}

export default function AirHockey({ onCloseGame }: AirHockeyProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const stateRef = useRef({
		gameState: "play" as "play" | "goal" | "over",
		paused: false,
		tick: 0,
        shakeX: 0,
        shakeY: 0,
        shakeAmt: 0,
        goalFlash: 0,
        goalWho: "",
        goalMsgScale: 0,
        puckSpeedMult: 1.0,
        lastSpeedUpAt: 0,
        speedUpMsg: "",
        speedUpTimer: 0,
        sloMo: false,
        sloMoAlpha: 0,
        sloMoIntro: 0,
        sloMoLabelTimer: 0,
        showSadFace: false,
        score: { p: 0, cpu: 0 },
        puck: { x: CX, y: CY, vx: 0, vy: 0, r: PUCK_R },
        trail: [] as TrailPoint[],
        player: {
            x: TABLE_X + 130,
            y: CY,
            tx: TABLE_X + 130,
            ty: CY,
            r: MALLET_R,
            pvx: 0,
            pvy: 0,
        },
        cpu: {
            x: W - TABLE_X - 130,
            y: CY,
            r: MALLET_R,
            vx: 0,
            vy: 0,
            mistakeTimer: 0,
            errorY: 0,
            hitCool: 0,
        },
        particles: [] as Particle[],
        confetti: [] as ConfettiPiece[],
        confettiInterval: null as ReturnType<typeof setInterval> | null,
        stats: {
            p: {
                goals: 0,
                streak: 0,
                bestStreak: 0,
                topSpeed: 0,
                powerHits: 0,
            },
            cpu: {
                goals: 0,
                streak: 0,
                bestStreak: 0,
                topSpeed: 0,
                powerHits: 0,
            },
            rallyHits: 0,
            totalHits: 0,
        },
        rawMouseX: TABLE_X + 120,
        rawMouseY: H / 2,
        prevRawX: TABLE_X + 120,
        prevRawY: H / 2,
        mouseVX: 0,
        mouseVY: 0,
        muted: true,
        audioCtx: null as AudioContext | null,
        rafId: 0,
    });

    // React state for DOM-driven UI
    const [uiScore, setUiScore] = useState({ p: 0, cpu: 0 });
    const [uiStats, setUiStats] = useState({
        pStreak: 0,
        pSpeed: 0,
        pPower: 0,
        cpuStreak: 0,
        cpuSpeed: 0,
        cpuPower: 0,
    });
    const [gameOver, setGameOver] = useState<{
        show: boolean;
        playerWon: boolean;
        scoreStr: string;
    }>({ show: false, playerWon: false, scoreStr: "" });
	const [muted, setMuted] = useState(true);
	const [paused, setPaused] = useState(false);

	const s = stateRef.current;

    // ── Audio ──
    const getAudio = useCallback(() => {
        if (!s.audioCtx)
            s.audioCtx = new (
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                window.AudioContext || (window as any).webkitAudioContext
            )();
        if (s.audioCtx.state === "suspended") s.audioCtx.resume();
        return s.audioCtx;
    }, []);

    function getThemeColor(name: string, fallback: string) {
        const value = getComputedStyle(document.documentElement)
            .getPropertyValue(name)
            .trim();
        return value || fallback;
    }

    function hexToRgba(hex: string, alpha: number) {
        const shorthand = /^#([0-9a-f])([0-9a-f])([0-9a-f])$/i;
        const normalized = hex.replace(
            shorthand,
            (_, r, g, b) => `#${r}${r}${g}${g}${b}${b}`,
        );
        const r = parseInt(normalized.slice(1, 3), 16);
        const g = parseInt(normalized.slice(3, 5), 16);
        const b = parseInt(normalized.slice(5, 7), 16);
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }

    function mkNoise(ctx: AudioContext, dur: number) {
        const b = ctx.createBuffer(1, ctx.sampleRate * dur, ctx.sampleRate);
        const d = b.getChannelData(0);
        for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
        const src = ctx.createBufferSource();
        src.buffer = b;
        return src;
    }

    const playSound = useCallback(
        (type: string, speed = 1) => {
            if (s.muted) return;
            const ctx = getAudio();
            const t = ctx.currentTime,
                out = ctx.destination;
            if (type === "hit") {
                const n = mkNoise(ctx, 0.07),
                    bp = ctx.createBiquadFilter(),
                    g = ctx.createGain();
                bp.type = "bandpass";
                bp.frequency.value = 900 + speed * 180 + Math.random() * 400;
                bp.Q.value = 2 + Math.random() * 3;
                g.gain.setValueAtTime(0.5 + Math.min(speed / 18, 0.35), t);
                g.gain.exponentialRampToValueAtTime(0.001, t + 0.05);
                n.connect(bp);
                bp.connect(g);
                g.connect(out);
                n.start(t);
                n.stop(t + 0.07);
            }
            if (type === "wall") {
                const n = mkNoise(ctx, 0.04),
                    hp = ctx.createBiquadFilter(),
                    g = ctx.createGain();
                hp.type = "highpass";
                hp.frequency.value = 1400 + Math.random() * 600;
                g.gain.setValueAtTime(0.28, t);
                g.gain.exponentialRampToValueAtTime(0.001, t + 0.03);
                n.connect(hp);
                hp.connect(g);
                g.connect(out);
                n.start(t);
                n.stop(t + 0.04);
            }
            if (type === "goal") {
                const sub = ctx.createOscillator(),
                    sg = ctx.createGain();
                sub.type = "sine";
                sub.frequency.setValueAtTime(60, t);
                sub.frequency.exponentialRampToValueAtTime(28, t + 0.25);
                sg.gain.setValueAtTime(0.6, t);
                sg.gain.exponentialRampToValueAtTime(0.001, t + 0.3);
                sub.connect(sg);
                sg.connect(out);
                sub.start(t);
                sub.stop(t + 0.3);
                [
                    [0, "sawtooth", 233],
                    [0.01, "sawtooth", 220],
                    [0.02, "sawtooth", 246],
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                ].forEach(([dt, wv, f]: any[]) => {
                    const o = ctx.createOscillator(),
                        g2 = ctx.createGain();
                    o.type = wv;
                    o.frequency.value = f;
                    g2.gain.setValueAtTime(0.15, t + dt);
                    g2.gain.setValueAtTime(0.15, t + 0.5);
                    g2.gain.exponentialRampToValueAtTime(0.001, t + 0.7);
                    o.connect(g2);
                    g2.connect(out);
                    o.start(t + dt);
                    o.stop(t + 0.71);
                });
            }
            if (type === "victory") {
                [
                    [0, 392, 0.12],
                    [0.13, 392, 0.12],
                    [0.26, 392, 0.12],
                    [0.39, 523, 0.45],
                    [0.58, 494, 0.18],
                    [0.77, 440, 0.18],
                    [0.96, 523, 0.6],
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                ].forEach(([dt, f, dur]: any[]) => {
                    [-4, 0, 4].forEach((cents) => {
                        const o = ctx.createOscillator(),
                            g2 = ctx.createGain(),
                            lp = ctx.createBiquadFilter();
                        o.type = "sawtooth";
                        o.frequency.value = f * Math.pow(2, cents / 1200);
                        lp.type = "lowpass";
                        lp.frequency.value = 1800;
                        g2.gain.setValueAtTime(0, t + dt);
                        g2.gain.linearRampToValueAtTime(0.08, t + dt + 0.02);
                        g2.gain.setValueAtTime(0.08, t + dt + dur - 0.03);
                        g2.gain.exponentialRampToValueAtTime(
                            0.001,
                            t + dt + dur,
                        );
                        o.connect(lp);
                        lp.connect(g2);
                        g2.connect(out);
                        o.start(t + dt);
                        o.stop(t + dt + dur + 0.01);
                    });
                });
            }
            if (type === "speedup") {
                const n = mkNoise(ctx, 0.4),
                    bp = ctx.createBiquadFilter(),
                    g = ctx.createGain();
                bp.type = "bandpass";
                bp.Q.value = 5;
                bp.frequency.setValueAtTime(300, t);
                bp.frequency.exponentialRampToValueAtTime(3000, t + 0.38);
                g.gain.setValueAtTime(0.25, t);
                g.gain.exponentialRampToValueAtTime(0.001, t + 0.38);
                n.connect(bp);
                bp.connect(g);
                g.connect(out);
                n.start(t);
                n.stop(t + 0.4);
            }
            if (type === "slomo_in") {
                const o = ctx.createOscillator(),
                    g = ctx.createGain();
                o.type = "sine";
                o.frequency.setValueAtTime(100, t);
                o.frequency.exponentialRampToValueAtTime(36, t + 0.65);
                g.gain.setValueAtTime(0.2, t);
                g.gain.exponentialRampToValueAtTime(0.001, t + 0.7);
                o.connect(g);
                g.connect(out);
                o.start(t);
                o.stop(t + 0.7);
            }
        },
        [getAudio],
    );

    // ── Particles / Confetti ──
    function burst(x: number, y: number, col1: string, col2: string, n = 22) {
        for (let i = 0; i < n; i++) {
            const a = Math.random() * Math.PI * 2,
                spd = 2 + Math.random() * 7;
            s.particles.push({
                x,
                y,
                vx: Math.cos(a) * spd,
                vy: Math.sin(a) * spd,
                life: 1,
                col: Math.random() > 0.5 ? col1 : col2,
                size: 2 + Math.random() * 4,
                glow: Math.random() > 0.4,
                gravity: 0.08 + Math.random() * 0.12,
            });
        }
    }
    function sparkLine(
        x1: number,
        y1: number,
        x2: number,
        y2: number,
        col: string,
        n = 8,
    ) {
        for (let i = 0; i < n; i++) {
            const t2 = Math.random(),
                x = x1 + (x2 - x1) * t2 + (Math.random() - 0.5) * 10,
                y = y1 + (y2 - y1) * t2 + (Math.random() - 0.5) * 10;
            const a = Math.random() * Math.PI * 2,
                spd = 1 + Math.random() * 3;
            s.particles.push({
                x,
                y,
                vx: Math.cos(a) * spd,
                vy: Math.sin(a) * spd,
                life: 1,
                col,
                size: 1.5 + Math.random() * 2,
                glow: true,
                gravity: 0.1,
            });
        }
    }
    function spawnConfetti() {
        for (let i = 0; i < 160; i++) {
            s.confetti.push({
                x: Math.random() * W,
                y: -10 - Math.random() * 120,
                vx: (Math.random() - 0.5) * 5,
                vy: 2 + Math.random() * 4,
                rot: Math.random() * Math.PI * 2,
                rotV: (Math.random() - 0.5) * 0.22,
                w: 6 + Math.random() * 8,
                h: 3 + Math.random() * 4,
                col: CONF_COLORS[
                    Math.floor(Math.random() * CONF_COLORS.length)
                ],
                life: 1,
            });
        }
    }
    function shake(amt: number) {
        s.shakeAmt = Math.max(s.shakeAmt, amt);
    }

    // ── Stat DOM sync ──
    function syncStats() {
        setUiScore({ p: s.score.p, cpu: s.score.cpu });
        setUiStats({
            pStreak: s.stats.p.bestStreak,
            pSpeed: s.stats.p.topSpeed,
            pPower: s.stats.p.powerHits,
            cpuStreak: s.stats.cpu.bestStreak,
            cpuSpeed: s.stats.cpu.topSpeed,
            cpuPower: s.stats.cpu.powerHits,
        });
    }

    // ── Game flow ──
    const resetRound = useCallback((server: "p" | "cpu") => {
        s.trail.length = 0;
        s.puck.x = CX;
        s.puck.y = CY;
        s.puck.vx = 0;
        s.puck.vy = 0;
        s.player.x = TABLE_X + 120;
        s.player.y = CY;
        s.player.pvx = 0;
        s.player.pvy = 0;
        s.cpu.x = W - TABLE_X - 120;
        s.cpu.y = CY;
        s.cpu.vx = 0;
        s.cpu.vy = 0;
        s.cpu.mistakeTimer = 0;
        s.stats.rallyHits = 0;
        if (server === "p") {
            s.puck.vx = -(3.5 + Math.random() * 1.5) * s.puckSpeedMult;
            s.puck.vy = (Math.random() - 0.5) * 3.5 * s.puckSpeedMult;
        } else {
            s.puck.vx = (3.5 + Math.random() * 1.5) * s.puckSpeedMult;
            s.puck.vy = (Math.random() - 0.5) * 3.5 * s.puckSpeedMult;
        }
    }, []);

    const goalScored = useCallback(
        (who: "p" | "cpu") => {
            if (s.gameState !== "play") return;
            s.gameState = "goal";
            s.goalWho = who;
            s.goalFlash = 160;
            s.goalMsgScale = 0;
            const ws = s.stats[who],
                ls = s.stats[who === "p" ? "cpu" : "p"];
            ws.goals++;
            ws.streak++;
            ws.bestStreak = Math.max(ws.bestStreak, ws.streak);
            ls.streak = 0;
            s.score[who]++;
            const totalGoals = s.score.p + s.score.cpu;
            if (totalGoals % 2 === 0 && totalGoals > s.lastSpeedUpAt) {
                s.lastSpeedUpAt = totalGoals;
                s.puckSpeedMult = Math.min(s.puckSpeedMult + 0.14, 2.0);
                const msgs = [
                    "SPEEDING UP!",
                    "FASTER!!",
                    "KICK IT UP!",
                    "NO MERCY!",
                    "LIGHT SPEED!",
                    "HOLD ON!!",
                ];
                s.speedUpMsg =
                    msgs[
                        Math.min(
                            Math.floor(totalGoals / 2 - 1),
                            msgs.length - 1,
                        )
                    ];
                s.speedUpTimer = 130;
                playSound("speedup");
            }
            if (who === "p") burst(TABLE_X, CY, "#029bc9", "#ffffff", 40);
            else burst(W - TABLE_X, CY, "#FF991C", "#ffffff", 40);
            burst(s.puck.x, s.puck.y, "#ffc940", "#ffffff", 30);
            shake(8);
            playSound("goal");
            syncStats();
            const newP = s.score.p,
                newCPU = s.score.cpu;
            if (
                (newP === MAX_SCORE - 1 || newCPU === MAX_SCORE - 1) &&
                !s.sloMo
            ) {
                s.sloMo = true;
                s.sloMoIntro = 80;
                s.sloMoLabelTimer = 170;
                playSound("slomo_in");
            }
            setTimeout(() => {
                if (s.score.p >= MAX_SCORE || s.score.cpu >= MAX_SCORE) {
                    s.gameState = "over";
                    const playerWon = s.score.p >= MAX_SCORE;
                    burst(CX, CY, "#ffc940", "#ffffff", 80);
                    if (playerWon) {
                        playSound("victory");
                        spawnConfetti();
                        setTimeout(spawnConfetti, 400);
                        setTimeout(spawnConfetti, 800);
                        setTimeout(spawnConfetti, 1400);
                        s.confettiInterval = setInterval(spawnConfetti, 1400);
                    } else {
                        s.showSadFace = true;
                    }
                    setGameOver({
                        show: true,
                        playerWon,
                        scoreStr: `${s.score.p} – ${s.score.cpu}`,
                    });
                } else {
                    resetRound(who === "p" ? "cpu" : "p");
                    s.gameState = "play";
                }
            }, 1500);
        },
        [playSound, resetRound],
    );

    const startGame = useCallback(() => {
        s.score.p = 0;
        s.score.cpu = 0;
        s.stats.p = {
            goals: 0,
            streak: 0,
            bestStreak: 0,
            topSpeed: 0,
            powerHits: 0,
        };
        s.stats.cpu = {
            goals: 0,
            streak: 0,
            bestStreak: 0,
            topSpeed: 0,
            powerHits: 0,
        };
        s.stats.rallyHits = 0;
        s.stats.totalHits = 0;
        s.puckSpeedMult = 1.0;
        s.lastSpeedUpAt = 0;
        s.speedUpMsg = "";
        s.speedUpTimer = 0;
        s.sloMo = false;
        s.sloMoAlpha = 0;
        s.sloMoIntro = 0;
        s.sloMoLabelTimer = 0;
        s.confetti.length = 0;
        if (s.confettiInterval) {
            clearInterval(s.confettiInterval);
            s.confettiInterval = null;
        }
        s.showSadFace = false;
        s.particles.length = 0;
        resetRound("p");
        s.gameState = "play";
        setGameOver({ show: false, playerWon: false, scoreStr: "" });
        syncStats();
    }, [resetRound]);

    // ── Physics ──
    function circleMalletCollide(
        pk: typeof s.puck,
        mallet: typeof s.player | typeof s.cpu,
        isPlayer: boolean,
    ) {
        const dx = pk.x - mallet.x,
            dy = pk.y - mallet.y,
            dist = Math.hypot(dx, dy),
            minDist = pk.r + mallet.r;
        if (dist >= minDist || dist < 0.01) return;
        if (!isPlayer && s.cpu.hitCool > 0) {
            pk.x += (dx / dist) * (minDist - dist);
            pk.y += (dy / dist) * (minDist - dist);
            return;
        }
        const nx = dx / dist,
            ny = dy / dist;
        pk.x += nx * (minDist - dist);
        pk.y += ny * (minDist - dist);
        const mvx = isPlayer ? s.player.pvx * 1.8 : (mallet as typeof s.cpu).vx;
        const mvy = isPlayer ? s.player.pvy * 1.8 : (mallet as typeof s.cpu).vy;
        const relVX = pk.vx - mvx,
            relVY = pk.vy - mvy,
            dot = relVX * nx + relVY * ny;
        if (dot >= 0) return;
        const restitution = isPlayer ? 1.3 : 1.1,
            impulse = -(1 + restitution) * dot;
        pk.vx += impulse * nx;
        pk.vy += impulse * ny;
        const spd = Math.hypot(pk.vx, pk.vy),
            cap = (isPlayer ? 20 : 16) * s.puckSpeedMult;
        if (spd > cap) {
            pk.vx = (pk.vx / spd) * cap;
            pk.vy = (pk.vy / spd) * cap;
        }
        if (!isPlayer) s.cpu.hitCool = 20;
        const who = isPlayer ? "p" : "cpu";
        s.stats.rallyHits++;
        const mphSpd = Math.round(spd * 4);
        if (mphSpd > s.stats[who].topSpeed) s.stats[who].topSpeed = mphSpd;
        if (spd > 14) s.stats[who].powerHits++;
        syncStats();
        if (spd > 3) {
            const col = isPlayer ? "#029bc9" : "#FF991C";
            burst(pk.x, pk.y, col, "#ffffff", Math.floor(spd * 1.5));
            if (spd > 19) shake(Math.min((spd - 19) * 0.4, 3));
        }
        playSound("hit", spd);
    }

    function updatePuck(gl: (w: "p" | "cpu") => void) {
        if (s.gameState !== "play") return;
        const spd = Math.hypot(s.puck.vx, s.puck.vy);
        s.trail.push({ x: s.puck.x, y: s.puck.y, spd });
        if (s.trail.length > 18) s.trail.shift();
        if (spd < 0.8) {
            s.puck.vx += (Math.random() - 0.5) * 0.18;
            s.puck.vy += (Math.random() - 0.5) * 0.18;
        } else if (spd < 2.5) {
            s.puck.vx += (Math.random() - 0.5) * 0.06;
            s.puck.vy += (Math.random() - 0.5) * 0.06;
        }
        s.puck.x += s.puck.vx;
        s.puck.y += s.puck.vy;
        s.puck.vx *= FRICTION;
        s.puck.vy *= FRICTION;
        const tx = TABLE_X,
            ty = TABLE_Y,
            tw = TABLE_W,
            th = TABLE_H;
        if (s.puck.y - s.puck.r < ty) {
            s.puck.y = ty + s.puck.r;
            s.puck.vy = Math.abs(s.puck.vy) * WALL_BOUNCE;
            sparkLine(s.puck.x - 20, ty, s.puck.x + 20, ty, "#029bc9");
            playSound("wall");
        }
        if (s.puck.y + s.puck.r > ty + th) {
            s.puck.y = ty + th - s.puck.r;
            s.puck.vy = -Math.abs(s.puck.vy) * WALL_BOUNCE;
            sparkLine(
                s.puck.x - 20,
                ty + th,
                s.puck.x + 20,
                ty + th,
                "#029bc9",
            );
            playSound("wall");
        }
        if (s.puck.x - s.puck.r < tx) {
            if (s.puck.y > GOAL_Y1 && s.puck.y < GOAL_Y2) {
                gl("cpu");
                return;
            }
            s.puck.x = tx + s.puck.r;
            s.puck.vx = Math.abs(s.puck.vx) * WALL_BOUNCE;
            sparkLine(tx, s.puck.y - 20, tx, s.puck.y + 20, "#FF991C");
            playSound("wall");
        }
        if (s.puck.x + s.puck.r > tx + tw) {
            if (s.puck.y > GOAL_Y1 && s.puck.y < GOAL_Y2) {
                gl("p");
                return;
            }
            s.puck.x = tx + tw - s.puck.r;
            s.puck.vx = -Math.abs(s.puck.vx) * WALL_BOUNCE;
            sparkLine(
                tx + tw,
                s.puck.y - 20,
                tx + tw,
                s.puck.y + 20,
                "#FF991C",
            );
            playSound("wall");
        }
        circleMalletCollide(s.puck, s.player, true);
        circleMalletCollide(s.puck, s.cpu, false);
    }

    function updateCPU(ts = 1) {
        const halfW = W / 2,
            homeX = W - TABLE_X - 110;
        const minX = halfW + 10,
            maxX = W - TABLE_X - s.cpu.r - 2,
            minY = TABLE_Y + s.cpu.r + 2,
            maxY = TABLE_Y + TABLE_H - s.cpu.r - 2;
        if (
            Math.random() < CPU_MISTAKE_CHANCE &&
            s.cpu.mistakeTimer === 0 &&
            s.puck.vx > 0
        ) {
            s.cpu.mistakeTimer = CPU_MISTAKE_DUR;
            s.cpu.errorY = (Math.random() - 0.5) * CPU_ERROR_Y * 2;
        }
        if (s.cpu.mistakeTimer > 0) s.cpu.mistakeTimer--;
        if (s.cpu.hitCool > 0) s.cpu.hitCool--;
        const err = s.cpu.mistakeTimer > 0 ? s.cpu.errorY : 0;
        const puckOnMySide = s.puck.x > halfW,
            puckHeadingToMe = s.puck.vx > 0;
        const nearTopWall = s.cpu.y < minY + 20,
            nearBottomWall = s.cpu.y > maxY - 20,
            nearSideWall = s.cpu.x > maxX - 20;
        const cornered = (nearTopWall || nearBottomWall) && nearSideWall;
        const farFromHome = Math.hypot(s.cpu.x - homeX, s.cpu.y - CY) > 150;
        let tx2: number, ty2: number;
        if (cornered || (farFromHome && !puckHeadingToMe)) {
            tx2 = homeX;
            ty2 = CY;
        } else if (puckOnMySide && puckHeadingToMe) {
            const frames = Math.max(
                1,
                Math.min((s.cpu.x - s.puck.x) / Math.max(0.5, s.puck.vx), 60),
            );
            tx2 = clamp(s.puck.x + s.puck.vx * frames * CPU_REACT, minX, maxX);
            ty2 = clamp(
                s.puck.y + s.puck.vy * frames * CPU_REACT + err,
                minY,
                maxY,
            );
        } else if (puckOnMySide) {
            tx2 = clamp(s.puck.x - 8, minX, maxX - 30);
            ty2 = clamp(s.puck.y + err, minY, maxY);
        } else {
            tx2 = homeX;
            ty2 = clamp(s.puck.y * 0.5 + CY * 0.5 + err * 0.3, minY, maxY);
        }
        const prevX = s.cpu.x,
            prevY = s.cpu.y;
        const ddx = tx2 - s.cpu.x,
            ddy = ty2 - s.cpu.y,
            dist = Math.hypot(ddx, ddy);
        if (dist > 0.1) {
            const step = Math.min(dist, CPU_SPEED * ts);
            s.cpu.x += (ddx / dist) * step;
            s.cpu.y += (ddy / dist) * step;
        }
        s.cpu.x = clamp(s.cpu.x, minX, maxX);
        s.cpu.y = clamp(s.cpu.y, minY, maxY);
        s.cpu.vx = s.cpu.x - prevX;
        s.cpu.vy = s.cpu.y - prevY;
    }

    function updatePlayer(ts = 1) {
        const dx = s.rawMouseX - s.prevRawX,
            dy = s.rawMouseY - s.prevRawY;
        s.mouseVX = s.mouseVX * 0.4 + dx * 0.6;
        s.mouseVY = s.mouseVY * 0.4 + dy * 0.6;
        s.prevRawX = s.rawMouseX;
        s.prevRawY = s.rawMouseY;
        if (ts === 1) {
            s.player.x = s.rawMouseX;
            s.player.y = s.rawMouseY;
        } else {
            s.player.x += (s.rawMouseX - s.player.x) * ts * 3;
            s.player.y += (s.rawMouseY - s.player.y) * ts * 3;
            s.player.x = clamp(s.player.x, TABLE_X + MALLET_R + 2, CX - 10);
            s.player.y = clamp(
                s.player.y,
                TABLE_Y + MALLET_R + 2,
                TABLE_Y + TABLE_H - MALLET_R - 2,
            );
        }
        s.player.pvx = s.mouseVX * ts;
        s.player.pvy = s.mouseVY * ts;
    }

    // ── Main loop ──
    useEffect(() => {
        const cv = canvasRef.current;
        if (!cv) return;
        const G = cv.getContext("2d")!;
        cv.width = W;
        cv.height = H;

        function grd(
            x: number,
            y: number,
            r0: number,
            r1: number,
            c0: string,
            c1: string,
        ) {
            const g = G.createRadialGradient(x, y, r0, x, y, r1);
            g.addColorStop(0, c0);
            g.addColorStop(1, c1);
            return g;
        }
        function lgrad(
            x0: number,
            y0: number,
            x1: number,
            y1: number,
            stops: [number, string][],
        ) {
            const g = G.createLinearGradient(x0, y0, x1, y1);
            stops.forEach(([t, c]) => g.addColorStop(t, c));
            return g;
        }

        function getThemeColors() {
            return {
                surface: getThemeColor("--color-surface", "#0a1a2e"),
                surfaceLight: getThemeColor("--color-surface-light", "#e7e4de"),
                surfaceDark: getThemeColor("--color-surface-dark", "#071422"),
                primary: getThemeColor("--color-primary", "#029bc9"),
                primaryLight: getThemeColor("--color-primary-light", "#4af"),
                primaryDark: getThemeColor("--color-primary-dark", "#0d3f5e"),
                accent: getThemeColor("--color-accent", "#FF991C"),
                accentLight: getThemeColor("--color-accent-light", "#ffc940"),
                accentDark: getThemeColor("--color-accent-dark", "#c4710e"),
                secondary: getThemeColor("--color-secondary", "#49a100"),
                secondaryLight: getThemeColor("--color-secondary-light", "#75b627"),
                secondaryDark: getThemeColor("--color-secondary-dark", "#326e00"),
                onSurface: getThemeColor("--color-on-surface", "#ffffff"),
                onSurfaceMute: getThemeColor("--color-on-surface-mute", "#6b6b6b"),
            };
        }

        let theme = getThemeColors();

        function drawTable() {
            const tx = TABLE_X,
                ty = TABLE_Y,
                tw = TABLE_W,
                th = TABLE_H;
            
            G.save();
            G.shadowColor = "rgba(0,180,255,0.2)";
            G.shadowBlur = 28;
            G.strokeStyle = "rgba(0,180,255,0.25)";
            G.lineWidth = 3;
            G.beginPath();
            G.roundRect(tx - 4, ty - 4, tw + 8, th + 8, 14);
            G.stroke();
            G.restore();
            G.fillStyle = lgrad(tx, ty, tx, ty + th, [
                [0, theme.surface],
                [0.5, theme.surfaceLight],
                [1, theme.surface],
            ]);
            G.beginPath();
            G.roundRect(tx, ty, tw, th, 10);
            G.fill();
            G.save();
            G.globalAlpha = 0.055;
            G.fillStyle = theme.accentLight;
            for (let gx = tx + 18; gx < tx + tw - 10; gx += 18)
                for (let gy = ty + 18; gy < ty + th - 10; gy += 18) {
                    G.beginPath();
                    G.arc(gx, gy, 1.8, 0, Math.PI * 2);
                    G.fill();
                }
            G.restore();
            G.save();
            G.strokeStyle = "rgba(0,212,255,0.16)";
            G.lineWidth = 2;
            G.setLineDash([6, 6]);
            G.beginPath();
            G.arc(CX, CY, 60, 0, Math.PI * 2);
            G.stroke();
            G.setLineDash([]);
            G.restore();
            G.save();
            G.strokeStyle = "rgba(0,212,255,0.12)";
            G.lineWidth = 2;
            G.setLineDash([8, 8]);
            G.beginPath();
            G.moveTo(CX, ty + 2);
            G.lineTo(CX, ty + th - 2);
            G.stroke();
            G.setLineDash([]);
            G.restore();
            G.save();
            G.shadowColor = "rgba(0,212,255,0.5)";
            G.shadowBlur = 8;
            G.fillStyle = "rgba(0,212,255,0.4)";
            G.beginPath();
            G.arc(CX, CY, 5, 0, Math.PI * 2);
            G.fill();
            G.restore();
            G.restore();
            // left goal
            G.save();
            G.shadowColor = "#029bc9";
            G.shadowBlur = 14;
            G.strokeStyle = "rgba(0,212,255,0.7)";
            G.lineWidth = 2.5;
            G.beginPath();
            G.moveTo(tx, GOAL_Y1);
            G.lineTo(tx - GOAL_DEPTH, GOAL_Y1);
            G.stroke();
            G.beginPath();
            G.moveTo(tx, GOAL_Y2);
            G.lineTo(tx - GOAL_DEPTH, GOAL_Y2);
            G.stroke();
            G.strokeStyle = "rgba(0,212,255,0.3)";
            G.lineWidth = 1.5;
            G.beginPath();
            G.moveTo(tx - GOAL_DEPTH, GOAL_Y1);
            G.lineTo(tx - GOAL_DEPTH, GOAL_Y2);
            G.stroke();
            G.restore();
            // right goal
            G.save();
            G.shadowColor = "#FF991C";
            G.shadowBlur = 14;
            G.strokeStyle = "rgba(255,45,85,0.7)";
            G.lineWidth = 2.5;
            G.beginPath();
            G.moveTo(tx + tw, GOAL_Y1);
            G.lineTo(tx + tw + GOAL_DEPTH, GOAL_Y1);
            G.stroke();
            G.beginPath();
            G.moveTo(tx + tw, GOAL_Y2);
            G.lineTo(tx + tw + GOAL_DEPTH, GOAL_Y2);
            G.stroke();
            G.strokeStyle = "rgba(255,45,85,0.3)";
            G.lineWidth = 1.5;
            G.beginPath();
            G.moveTo(tx + tw + GOAL_DEPTH, GOAL_Y1);
            G.lineTo(tx + tw + GOAL_DEPTH, GOAL_Y2);
            G.stroke();
            G.restore();
            [GOAL_Y1, GOAL_Y2].forEach((gy) => {
                G.save();
                G.shadowColor = "#029bc9";
                G.shadowBlur = 12;
                G.fillStyle = "#029bc9";
                G.beginPath();
                G.arc(tx, gy, 5, 0, Math.PI * 2);
                G.fill();
                G.restore();
                G.save();
                G.shadowColor = "#FF991C";
                G.shadowBlur = 12;
                G.fillStyle = "#FF991C";
                G.beginPath();
                G.arc(tx + tw, gy, 5, 0, Math.PI * 2);
                G.fill();
                G.restore();
            });
        }

        function drawPuck() {
            s.trail.forEach((tr, i) => {
                const prog = i / s.trail.length,
                    r = prog * 9 * Math.min(tr.spd / 6, 1);
                if (r < 0.5) return;
                G.save();
                G.globalAlpha = prog * 0.55 * Math.min(tr.spd / 5, 1);
                G.fillStyle = grd(
                    tr.x,
                    tr.y,
                    0,
                    r * 2,
                    "rgba(0,212,255,0.9)",
                    "transparent",
                );
                G.beginPath();
                G.arc(tr.x, tr.y, r * 2.2, 0, Math.PI * 2);
                G.fill();
                G.restore();
            });
            const bx = s.puck.x,
                by = s.puck.y,
                br = s.puck.r,
                spd = Math.hypot(s.puck.vx, s.puck.vy);
            G.save();
            G.shadowColor = "#029bc9";
            G.shadowBlur = 24 + spd * 1.5;
            G.fillStyle = grd(
                bx,
                by,
                0,
                br + 8,
                "rgba(0,212,255,0.18)",
                "transparent",
            );
            G.beginPath();
            G.arc(bx, by, br + 14, 0, Math.PI * 2);
            G.fill();
            G.restore();
            G.fillStyle = grd(
                bx - br * 0.3,
                by - br * 0.3,
                br * 0.1,
                br,
                "#ffffff",
                "#cccccc",
            );
            G.beginPath();
            G.arc(bx, by, br, 0, Math.PI * 2);
            G.fill();
            G.save();
            G.shadowColor = "#029bc9";
            G.shadowBlur = 8;
            G.strokeStyle = "#029bc9";
            G.lineWidth = 2.5;
            G.beginPath();
            G.arc(bx, by, br - 1, 0, Math.PI * 2);
            G.stroke();
            G.restore();
            G.strokeStyle = "rgba(0,212,255,0.32)";
            G.lineWidth = 1;
            G.beginPath();
            G.arc(bx, by, br * 0.55, 0, Math.PI * 2);
            G.stroke();
            G.fillStyle = "rgba(255,255,255,0.17)";
            G.beginPath();
            G.ellipse(
                bx - br * 0.28,
                by - br * 0.3,
                br * 0.38,
                br * 0.22,
                -0.4,
                0,
                Math.PI * 2,
            );
            G.fill();
        }

        function drawMallet(
            m: { x: number; y: number; r: number },
            col: string,
            glowCol: string,
        ) {
            const mx = m.x,
                my = m.y,
                mr = m.r;
            G.save();
            G.shadowColor = glowCol;
            G.shadowBlur = 32;
            const halo = G.createRadialGradient(
                mx,
                my,
                mr * 0.6,
                mx,
                my,
                mr + 18,
            );
            halo.addColorStop(0, "transparent");
            halo.addColorStop(0.6, `${glowCol}22`);
            halo.addColorStop(1, "transparent");
            G.fillStyle = halo;
            G.beginPath();
            G.arc(mx, my, mr + 18, 0, Math.PI * 2);
            G.fill();
            G.restore();
            G.save();
            G.globalAlpha = 0.45;
            G.fillStyle = "rgba(0,0,0,0.7)";
            G.beginPath();
            G.ellipse(mx + 3, my + 4, mr, mr * 0.85, 0, 0, Math.PI * 2);
            G.fill();
            G.restore();
            const skirtG = G.createRadialGradient(
                mx - mr * 0.2,
                my - mr * 0.2,
                mr * 0.1,
                mx,
                my,
                mr,
            );
            skirtG.addColorStop(0, lighten(col, 0.12));
            skirtG.addColorStop(0.65, col);
            skirtG.addColorStop(1, darken(col, 0.45));
            G.fillStyle = skirtG;
            G.beginPath();
            G.arc(mx, my, mr, 0, Math.PI * 2);
            G.fill();
            G.save();
            G.shadowColor = glowCol;
            G.shadowBlur = 12;
            G.strokeStyle = glowCol;
            G.lineWidth = 2.5;
            G.beginPath();
            G.arc(mx, my, mr - 1.5, 0, Math.PI * 2);
            G.stroke();
            G.restore();
            const grooveR = mr * 0.72;
            G.strokeStyle = "rgba(0,0,0,0.55)";
            G.lineWidth = 3;
            G.beginPath();
            G.arc(mx, my, grooveR, 0, Math.PI * 2);
            G.stroke();
            G.strokeStyle = "rgba(255,255,255,0.08)";
            G.lineWidth = 1;
            G.beginPath();
            G.arc(mx, my, grooveR + 1.5, 0, Math.PI * 2);
            G.stroke();
            const domeR = mr * 0.62;
            const domeG = G.createRadialGradient(
                mx - domeR * 0.3,
                my - domeR * 0.35,
                0,
                mx,
                my,
                domeR,
            );
            domeG.addColorStop(0, lighten(col, 0.35));
            domeG.addColorStop(0.5, lighten(col, 0.1));
            domeG.addColorStop(1, darken(col, 0.2));
            G.fillStyle = domeG;
            G.beginPath();
            G.arc(mx, my, domeR, 0, Math.PI * 2);
            G.fill();
            G.save();
            G.shadowColor = glowCol;
            G.shadowBlur = 14;
            G.fillStyle = glowCol;
            G.beginPath();
            G.arc(mx, my, 4.5, 0, Math.PI * 2);
            G.fill();
            G.restore();
            G.fillStyle = "rgba(255,255,255,0.28)";
            G.beginPath();
            G.ellipse(
                mx - domeR * 0.3,
                my - domeR * 0.32,
                domeR * 0.32,
                domeR * 0.18,
                -0.5,
                0,
                Math.PI * 2,
            );
            G.fill();
            G.fillStyle = "rgba(255,255,255,0.12)";
            G.beginPath();
            G.ellipse(
                mx - domeR * 0.15,
                my - domeR * 0.5,
                domeR * 0.14,
                domeR * 0.08,
                -0.3,
                0,
                Math.PI * 2,
            );
            G.fill();
        }

        function drawParticles() {
            s.particles.forEach((p) => {
                G.save();
                G.globalAlpha = Math.pow(p.life, 1.4) * 0.9;
                if (p.glow) {
                    G.shadowColor = p.col;
                    G.shadowBlur = 10;
                }
                G.fillStyle = p.col;
                G.beginPath();
                G.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
                G.fill();
                G.restore();
            });
        }
        function updateParticles() {
            for (let i = s.particles.length - 1; i >= 0; i--) {
                const p = s.particles[i];
                p.x += p.vx;
                p.y += p.vy;
                p.vy += p.gravity;
                p.vx *= 0.96;
                p.life -= 0.028;
                if (p.life <= 0) s.particles.splice(i, 1);
            }
        }
        function updateConfettiLocal() {
            for (let i = s.confetti.length - 1; i >= 0; i--) {
                const c = s.confetti[i];
                c.x += c.vx;
                c.y += c.vy;
                c.vy += 0.08;
                c.vx *= 0.99;
                c.rot += c.rotV;
                if (c.y > H + 20) c.life -= 0.05;
                if (c.life <= 0) s.confetti.splice(i, 1);
            }
        }
        function drawConfettiLocal() {
            s.confetti.forEach((c) => {
                G.save();
                G.globalAlpha = c.life;
                G.translate(c.x, c.y);
                G.rotate(c.rot);
                G.fillStyle = c.col;
                G.fillRect(-c.w / 2, -c.h / 2, c.w, c.h);
                G.restore();
            });
        }
        function drawGoalFlash() {
            if (s.goalFlash <= 0 || s.gameState !== "goal") return;
            const prog = s.goalFlash / 160,
                isP = s.goalWho === "p";
            G.save();
            G.globalAlpha = Math.min(prog * 3, 0.16);
            G.fillStyle = isP ? "#029bc9" : "#FF991C";
            G.fillRect(0, 0, W, H);
            G.restore();
            s.goalMsgScale = Math.min(s.goalMsgScale + 0.12, 1);
            const ease = 1 - Math.pow(1 - s.goalMsgScale, 3);
            G.save();
            G.globalAlpha =
                Math.min(1, prog * 3) * Math.min(1, s.goalFlash / 40);
            G.translate(W / 2, H / 2);
            G.scale(ease, ease);
            G.textAlign = "center";
            G.font = '900 64px var(--font-sans)';
            G.fillStyle = isP ? "#029bc9" : "#FF991C";
            G.shadowColor = isP ? "#029bc9" : "#FF991C";
            G.shadowBlur = 40;
            G.fillText("GOAL!", 0, -10);
            G.shadowBlur = 0;
            G.font = '500 13px var(--font-sans)';
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (G as any).letterSpacing = "6px";
            G.fillStyle = isP ? "rgba(0,212,255,0.75)" : "rgba(255,45,85,0.75)";
            G.fillText(isP ? "YOU SCORE" : "COMPUTER SCORES", 0, 32);
            G.restore();
            s.goalFlash--;
        }
        function drawSadFace() {
            const cx = W / 2,
                cy = H / 2 - 30,
                r = 52,
                pulse = 0.85 + Math.sin(s.tick * 0.05) * 0.15;
            G.save();
            G.globalAlpha = 0.82 * pulse;
            G.fillStyle = "#1a0a0a";
            G.beginPath();
            G.arc(cx, cy, r, 0, Math.PI * 2);
            G.fill();
            G.strokeStyle = "#FF991C";
            G.lineWidth = 3;
            G.shadowColor = "#FF991C";
            G.shadowBlur = 18;
            G.beginPath();
            G.arc(cx, cy, r, 0, Math.PI * 2);
            G.stroke();
            G.shadowBlur = 0;
            G.strokeStyle = "#FF991C";
            G.lineWidth = 3.5;
            G.lineCap = "round";
            [
                [-18, -12],
                [18, -12],
            ].forEach(([ex, ey]) => {
                G.beginPath();
                G.moveTo(cx + ex - 7, cy + ey - 7);
                G.lineTo(cx + ex + 7, cy + ey + 7);
                G.stroke();
                G.beginPath();
                G.moveTo(cx + ex + 7, cy + ey - 7);
                G.lineTo(cx + ex - 7, cy + ey + 7);
                G.stroke();
            });
            G.strokeStyle = "#FF991C";
            G.lineWidth = 3.5;
            G.beginPath();
            G.arc(cx, cy + 28, 20, Math.PI * 0.15, Math.PI * 0.85, false);
            G.stroke();
            G.restore();
        }
        function drawSpeedUpMsg() {
            if (s.speedUpTimer <= 0) return;
            const t = s.speedUpTimer / 130,
                scale = t > 0.85 ? 0.5 + (1 - (t - 0.85) / 0.15) * 0.5 : 1,
                alpha = t < 0.2 ? t / 0.2 : 1;
            G.save();
            G.globalAlpha = alpha;
            G.translate(W / 2, H / 2 - 60);
            G.scale(scale, scale);
            G.textAlign = "center";
            G.font = "900 34px var(--font-sans)";
            G.fillStyle = "#000";
            G.fillText(s.speedUpMsg, 2, 2);
            const grd2 = G.createLinearGradient(-100, -30, 100, 10);
            grd2.addColorStop(0, "#ffc940");
            grd2.addColorStop(1, "#b81212");
            G.fillStyle = grd2;
            G.shadowColor = "#ffc940";
            G.shadowBlur = 24;
            G.fillText(s.speedUpMsg, 0, 0);
            G.restore();
            s.speedUpTimer--;
        }

        function loop() {
            s.tick++;
            theme = getThemeColors();
            G.clearRect(0, 0, W, H);
            G.fillStyle = theme.surfaceLight;
            G.fillRect(0, 0, W, H);
            if (s.sloMo) s.sloMoAlpha = Math.min(s.sloMoAlpha + 0.055, 1);
            else s.sloMoAlpha = Math.max(s.sloMoAlpha - 0.07, 0);
            if (s.sloMoIntro > 0) s.sloMoIntro--;
            if (s.sloMoLabelTimer > 0) s.sloMoLabelTimer--;
            const timeScale = s.sloMo ? 0.55 : 1;
            if (s.shakeAmt > 0.3) {
                s.shakeX = (Math.random() - 0.5) * s.shakeAmt * 2;
                s.shakeY = (Math.random() - 0.5) * s.shakeAmt * 2;
                s.shakeAmt *= 0.72;
            } else {
                s.shakeX = 0;
                s.shakeY = 0;
                s.shakeAmt = 0;
            }
            G.save();
            G.translate(s.shakeX, s.shakeY);
            drawTable();
			if (s.gameState === "play" || s.gameState === "goal") {
				if (!s.paused) {
					updatePlayer(timeScale);
					updateCPU(timeScale);
					// scaled puck update
					if (timeScale !== 1) {
						s.puck.vx *= timeScale;
						s.puck.vy *= timeScale;
					}
					updatePuck(goalScored);
					if (timeScale !== 1 && s.gameState === "play") {
						s.puck.vx /= timeScale;
						s.puck.vy /= timeScale;
					}
					updateParticles();
				}
			}
            updateConfettiLocal();
            drawPuck();
            drawMallet(s.cpu, "#2a0a0a", "#FF991C");
            drawMallet(s.player, "#0a1a2a", "#029bc9");
            // drawParticles();
            drawGoalFlash();
            drawSpeedUpMsg();
            drawConfettiLocal();
            if (s.showSadFace) drawSadFace();
            if (s.sloMoAlpha > 0) {
                const vig = G.createRadialGradient(
                    W / 2,
                    H / 2,
                    H * 0.15,
                    W / 2,
                    H / 2,
                    H * 0.75,
                );
                vig.addColorStop(0, "transparent");
                vig.addColorStop(1, `rgba(0,0,0,${0.65 * s.sloMoAlpha})`);
                G.fillStyle = vig;
                G.fillRect(0, 0, W, H);
                const barH = 32 * s.sloMoAlpha;
                G.fillStyle = `rgba(0,0,0,${0.88 * s.sloMoAlpha})`;
                G.fillRect(0, 0, W, barH);
                G.fillRect(0, H - barH, W, barH);
                G.save();
                G.globalAlpha = 0.15 * s.sloMoAlpha;
                G.fillStyle = "#ff0040";
                G.fillRect(0, 0, 5, H);
                G.fillRect(W - 5, 0, 5, H);
                G.fillStyle = "#0080ff";
                G.fillRect(5, 0, 5, H);
                G.fillRect(W - 10, 0, 5, H);
                G.restore();
                if (s.sloMoLabelTimer > 0) {
                    const fadeIn = Math.min(s.sloMoLabelTimer / 20, 1),
                        fadeOut =
                            s.sloMoLabelTimer < 30 ? s.sloMoLabelTimer / 30 : 1;
                    const alpha2 = fadeIn * fadeOut * s.sloMoAlpha,
                        pulse2 = 0.88 + Math.sin(s.tick * 0.12) * 0.12;
                    G.save();
                    G.globalAlpha = alpha2 * pulse2;
                    G.textAlign = "center";
                    G.font = '900 16px var(--font-sans)';
                    G.fillStyle = "rgba(0,0,0,0.5)";
                    G.fillText(
                        "⚡  GAME POINT  ⚡",
                        W / 2 + 1,
                        barH * 0.72 + 1,
                    );
                    G.fillStyle = "#ffc940";
                    G.shadowColor = "#ffc940";
                    G.shadowBlur = 14;
                    G.fillText("⚡  GAME POINT  ⚡", W / 2, barH * 0.72);
                    G.shadowBlur = 0;
                    G.restore();
                }
            }
            G.restore();
            s.rafId = requestAnimationFrame(loop);
        }
        loop();
        startGame();
        return () => {
            cancelAnimationFrame(s.rafId);
            if (s.confettiInterval) clearInterval(s.confettiInterval);
        };
    }, []);

    // ── Input handling ──
    useEffect(() => {
        const cv = canvasRef.current;
        if (!cv) return;
        function pointerToCanvas(clientX: number, clientY: number) {
            const r = cv!.getBoundingClientRect(),
                scaleX = W / r.width,
                scaleY = H / r.height;
            const nx = (clientX - r.left) * scaleX,
                ny = (clientY - r.top) * scaleY;
            s.rawMouseX = clamp(nx, TABLE_X + MALLET_R + 2, CX - 10);
            s.rawMouseY = clamp(
                ny,
                TABLE_Y + MALLET_R + 2,
                TABLE_Y + TABLE_H - MALLET_R - 2,
            );
        }
        const onMouseMove = (e: MouseEvent) =>
            pointerToCanvas(e.clientX, e.clientY);
        const onTouchMove = (e: TouchEvent) => {
            e.preventDefault();
            pointerToCanvas(e.touches[0].clientX, e.touches[0].clientY);
        };
        const onTouchStart = (e: TouchEvent) => {
            e.preventDefault();
            pointerToCanvas(e.touches[0].clientX, e.touches[0].clientY);
        };
		const onKeyDown = (e: KeyboardEvent) => {
			if (e.code === "Space" && s.gameState === "over") startGame();
			if (e.code === "Escape") {
				s.paused = !s.paused;
				setPaused(s.paused);
			}
		};
        document.addEventListener("mousemove", onMouseMove);
        cv.addEventListener("touchmove", onTouchMove, { passive: false });
        cv.addEventListener("touchstart", onTouchStart, { passive: false });
        document.addEventListener("keydown", onKeyDown);
        return () => {
            document.removeEventListener("mousemove", onMouseMove);
            cv.removeEventListener("touchmove", onTouchMove);
            cv.removeEventListener("touchstart", onTouchStart);
            document.removeEventListener("keydown", onKeyDown);
        };
    }, [startGame]);

    const toggleMute = useCallback(() => {
        const next = !s.muted;
        s.muted = next;
        if (!next) getAudio().resume();
        setMuted(next);
    }, [getAudio]);

	return (
		<div className="flex items-center justify-center overflow-hidden select-none cursor-none">
			<div className="flex flex-col md:flex-row items-center gap-0 w-full max-w-[1100px]">
				{/* Left stat panel */}
				<div className="max-lg:hidden">
					<StatPanel
						side="left"
						color="#029bc9"
						label="YOU"
						score={uiScore.p}
						streak={uiStats.pStreak}
						speed={uiStats.pSpeed}
						power={uiStats.pPower}
					/>
				</div>

				{/* Arena */}
				<div className="relative w-full max-w-[760px] aspect-[760/520] mx-auto touch-none">

					{/* Mobile score overlay */}
					<div className="lg:hidden absolute top-1 left-1 right-1 flex justify-between items-center px-2 py-1 z-10 bg-surface/40 rounded">
						<span className="font-bold text-xs tracking-widest text-primary">YOU {uiScore.p}</span>
						<span className="text-[8px] tracking-widest text-on-surface/40 uppercase">FIRST TO 7</span>
						<span className="font-bold text-xs tracking-widest text-accent">{uiScore.cpu} CPU</span>
					</div>

					<canvas
						ref={canvasRef}
						className="block w-full h-full rounded-xl"
						
					/>

					{!gameOver.show && (
						<>
							<button
								onClick={() => {
									s.paused = !s.paused;
									setPaused(s.paused);
								}}
								className="absolute top-2 right-12 z-10 w-7 h-7 flex items-center justify-center rounded-full bg-surface/20 text-yellow-500/70 hover:bg-surface/50 hover:text-yellow-500 text-sm cursor-pointer"
							>
								{paused ? (
									<svg viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3 ml-0.5">
										<path d="M8 5v14l11-7z" />
									</svg>
								) : (
									<svg viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3">
										<path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
									</svg>
								)}
							</button>
							{onCloseGame && (
								<button
									onClick={onCloseGame}
									className="absolute top-2 right-3 z-10 w-7 h-7 flex items-center justify-center rounded-full bg-surface/20 text-red-500/70 hover:bg-surface/50 hover:text-red-500 text-sm cursor-pointer"
								>
									✕
								</button>
							)}
						</>
					)}

					{/* Pause overlay */}
					
					{paused && s.gameState !== "over" && (
						<div className="absolute inset-0 z-20 flex items-center justify-center rounded-xl bg-surface/50 backdrop-blur-[2px]">
							<span className="text-2xl font-bold tracking-[0.3em] text-on-surface/70">
								PAUSED
							</span>
						</div>
					)}

					{/* Game Over overlay */}
					{gameOver.show && (
						<div
							className={`absolute inset-0 flex items-center justify-center rounded-xl bg-surface/60 backdrop-blur-md`}
						>
							<div className="text-center">
								<div
									className="text-7xl leading-none mb-6 block"
									style={{
										animation:
											"facePop 0.5s cubic-bezier(0.36,0.07,0.19,0.97) both",
									}}
								>
									{gameOver.playerWon ? "😄" : "😢"}
								</div>
								<div
									className={`font-black leading-none text-[56px] font-[clamp(36px,7vw,64px)] mb-2 block ${gameOver.playerWon ? "text-primary" : "text-accent"}`}
								>
									{gameOver.playerWon
										? "YOU WIN"
										: "COMPUTER WINS"}
								</div>
								<div className=" font-light text-sm text-on-surface/ mt-0.5">
									{gameOver.playerWon
										? "GAME · SET · MATCH"
										: "BETTER LUCK NEXT TIME"}
								</div>
								<div
									className="text-2xl font-bold text-accent mx-auto mt-4 mb-8 block"
								>
									{gameOver.scoreStr}
								</div>
                                <div className="flex items-center justify-center gap-6">
                                <button
									onClick={startGame}
									className="px-11 py-3 rounded-full text-sm tracking-widest cursor-pointer border border-primary/25 text-primary hover:bg-primary hover:text-surface"
								>
									Play Again
								</button>
                                {onCloseGame && <button
                                    onClick={onCloseGame}
                                    className="px-11 py-3 rounded-full text-sm tracking-widest cursor-pointer border border-red-700/25 text-red-700 hover:bg-red-700 hover:text-on-surface "
                                >
                                    Close Game
                                </button>}
                                </div>
								
							</div>
						</div>
					)}
				</div>

				{/* Right stat panel */}
				<div className="max-lg:hidden">
					<StatPanel
						side="right"
						color="#FF991C"
						label="COMPUTER"
						score={uiScore.cpu}
						streak={uiStats.cpuStreak}
						speed={uiStats.cpuSpeed}
						power={uiStats.cpuPower}
					/>
				</div>
			</div>

			<style>{`
        @keyframes facePop { 0%{transform:scale(0);opacity:0} 65%{transform:scale(1.25);opacity:1} 100%{transform:scale(1);opacity:1} }
      `}</style>
		</div>
	);
}

function StatPanel({
    side,
    color,
    label,
    score,
    streak,
    speed,
    power,
}: {
    side: "left" | "right";
    color: string;
    label: string;
    score: number;
    streak: number;
    speed: number;
    power: number;
}) {
    const borderRadius = side === "left" ? "rounded-l-[16px]" : "rounded-r-[16px]";
    const borderSide = side === "left" ? "border-r-0" : "border-l-0";
    
    return (
        <div
            className={`w-[130px] flex-shrink-0 px-2.5 pt-4 pb-3 bg-surface/50 border border-white/5 flex flex-col items-center gap-0 ${borderRadius} ${borderSide}`}
        >
            <div
                className=" font-bold text-xs tracking-widest mb-1.5 text-center w-full"
                style={{ color }}
            >
                {label}
            </div>
            <div
                className=" font-black text-5xl leading-none mb-1.5 text-center w-full -tracking-[2px]"
                style={{
                    color,
                    textShadow: `0 0 20px ${color}`,
                }}
            >
                {score}
            </div>
            <div className="w-full h-px bg-surface/7 my-1.5" />
            <StatRow label="STREAK" val={streak} />
            <StatRow label="TOP SPEED" val={speed} />
            <StatRow label="POWER HITS" val={power} />
            <div className="w-full h-px bg-secondary/7 my-1.5" />
            <div className=" font-medium text-xs tracking-widest text-on-surface/20 text-center uppercase mt-0.5">
                FIRST TO 7 WINS
            </div>
        </div>
    );
}

function StatRow({ label, val }: { label: string; val: number }) {
    return (
        <div className="w-full flex justify-between items-center mb-2">
            <span className=" font-medium text-xs tracking-[1.5px] text-on-surface/30 uppercase">
                {label}
            </span>
            <span className=" font-bold text-xs text-on-surface/75">
                {val}
            </span>
        </div>
    );
}
