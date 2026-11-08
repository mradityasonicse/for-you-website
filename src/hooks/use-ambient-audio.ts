"use client";

import { useCallback, useEffect, useRef, useState } from "react";

// Pentatonic & Romantic celestial harmonics: A4, C#5, E5, F#5, G#5, B5, C#6
const CHIME_FREQS = [440, 554.37, 659.25, 739.99, 830.61, 987.77, 1108.73];

// Emotional Chord Progressions (Amaj9 -> F#m11 -> Dmaj9 -> E6sus4)
const CHORD_VOICES = [
  [110.0, 164.81, 220.0, 277.18], // Amaj9
  [92.5, 138.59, 185.0, 220.0],   // F#m11
  [73.42, 110.0, 146.83, 185.0],  // Dmaj9
  [82.41, 110.0, 123.47, 164.81], // E6sus4
];

export function useAmbientAudio() {
  const [enabled, setEnabled] = useState(false);
  const ctxRef = useRef<AudioContext | null>(null);
  const masterRef = useRef<GainNode | null>(null);
  const chimeTimerRef = useRef<number | null>(null);
  const chordTimerRef = useRef<number | null>(null);
  const oscsRef = useRef<OscillatorNode[]>([]);
  const voiceOscsRef = useRef<OscillatorNode[]>([]);
  const padGainRef = useRef<GainNode | null>(null);
  const currentChordIdx = useRef(0);

  const playChime = useCallback(() => {
    const ctx = ctxRef.current;
    const master = masterRef.current;
    if (!ctx || !master) return;
    const freq = CHIME_FREQS[Math.floor(Math.random() * CHIME_FREQS.length)];
    const now = ctx.currentTime;

    for (const detune of [0, 6]) {
      const osc = ctx.createOscillator();
      osc.type = "sine";
      osc.frequency.value = freq;
      osc.detune.value = detune;

      const g = ctx.createGain();
      g.gain.setValueAtTime(0.0001, now);
      g.gain.exponentialRampToValueAtTime(0.035, now + 0.04);
      g.gain.exponentialRampToValueAtTime(0.0001, now + 3.2);

      osc.connect(g);
      g.connect(master);
      osc.start(now);
      osc.stop(now + 3.4);
    }
  }, []);

  const scheduleChimes = useCallback(() => {
    if (chimeTimerRef.current) window.clearTimeout(chimeTimerRef.current);
    const tick = () => {
      playChime();
      chimeTimerRef.current = window.setTimeout(tick, 2000 + Math.random() * 2800);
    };
    chimeTimerRef.current = window.setTimeout(tick, 600);
  }, [playChime]);

  const scheduleChords = useCallback(() => {
    if (chordTimerRef.current) window.clearTimeout(chordTimerRef.current);
    const cycle = () => {
      chordTimerRef.current = window.setTimeout(() => {
        const ctx = ctxRef.current;
        if (!ctx) return;
        currentChordIdx.current = (currentChordIdx.current + 1) % CHORD_VOICES.length;
        const targetFreqs = CHORD_VOICES[currentChordIdx.current];
        const now = ctx.currentTime;
        voiceOscsRef.current.forEach((osc, idx) => {
          if (targetFreqs[idx]) {
            osc.frequency.cancelScheduledValues(now);
            osc.frequency.setValueAtTime(osc.frequency.value, now);
            osc.frequency.exponentialRampToValueAtTime(targetFreqs[idx], now + 3.5);
          }
        });
        cycle();
      }, 8500);
    };
    cycle();
  }, []);

  const buildGraph = useCallback(() => {
    const ctx = ctxRef.current;
    if (!ctx) return;

    const master = ctx.createGain();
    master.gain.value = 0;
    master.connect(ctx.destination);
    masterRef.current = master;

    const padGain = ctx.createGain();
    padGain.gain.value = 0.045;
    padGainRef.current = padGain;

    const lowpass = ctx.createBiquadFilter();
    lowpass.type = "lowpass";
    lowpass.frequency.value = 460;
    lowpass.Q.value = 0.8;
    padGain.connect(lowpass);
    lowpass.connect(master);

    // Warm lush polyphonic pad voices
    const initChord = CHORD_VOICES[0];
    const types: OscillatorType[] = ["sine", "sine", "triangle", "sine"];
    const vols = [1.0, 0.75, 0.45, 0.3];

    voiceOscsRef.current = [];
    initChord.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      osc.type = types[i];
      osc.frequency.value = freq;
      const g = ctx.createGain();
      g.gain.value = 0.85 * vols[i];
      osc.connect(g);
      g.connect(padGain);
      osc.start();
      oscsRef.current.push(osc);
      voiceOscsRef.current.push(osc);
    });

    // Slow breathing LFO on master pad gain
    const lfo = ctx.createOscillator();
    lfo.type = "sine";
    lfo.frequency.value = 0.08;
    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 0.015;
    lfo.connect(lfoGain);
    lfoGain.connect(padGain.gain);
    lfo.start();
    oscsRef.current.push(lfo);
  }, []);

  const enable = useCallback(() => {
    if (!ctxRef.current) {
      ctxRef.current = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      buildGraph();
    }
    const ctx = ctxRef.current;
    if (ctx && ctx.state === "suspended") {
      ctx.resume();
    }
    const master = masterRef.current;
    if (ctx && master) {
      const now = ctx.currentTime;
      master.gain.cancelScheduledValues(now);
      master.gain.setValueAtTime(master.gain.value, now);
      master.gain.linearRampToValueAtTime(1, now + 1.2);
    }
    scheduleChimes();
    scheduleChords();
    setEnabled(true);
  }, [buildGraph, scheduleChimes, scheduleChords]);

  const disable = useCallback(() => {
    const ctx = ctxRef.current;
    const master = masterRef.current;
    if (ctx && master) {
      const now = ctx.currentTime;
      master.gain.cancelScheduledValues(now);
      master.gain.setValueAtTime(master.gain.value, now);
      master.gain.linearRampToValueAtTime(0.0001, now + 0.8);
    }
    if (chimeTimerRef.current) window.clearTimeout(chimeTimerRef.current);
    if (chordTimerRef.current) window.clearTimeout(chordTimerRef.current);
    setEnabled(false);
  }, []);

  const toggle = useCallback(() => {
    if (enabled) disable();
    else enable();
  }, [enabled, disable, enable]);

  useEffect(() => {
    return () => {
      if (chimeTimerRef.current) window.clearTimeout(chimeTimerRef.current);
      if (chordTimerRef.current) window.clearTimeout(chordTimerRef.current);
      for (const osc of oscsRef.current) {
        try {
          osc.stop();
        } catch {}
      }
      if (ctxRef.current && ctxRef.current.state !== "closed") {
        ctxRef.current.close();
      }
    };
  }, []);

  return { enabled, toggle, enable, disable };
}
