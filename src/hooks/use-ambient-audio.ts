"use client";

import { useCallback, useEffect, useRef, useState } from "react";

// Pentatonic & Romantic celestial harmonics: A4, C#5, E5, F#5, G#5, B5, C#6
const CHIME_FREQS = [440, 554.37, 659.25, 739.99, 830.61, 987.77, 1108.73];

// Emotional Chord root frequencies (A -> F# -> D -> E)
const CHORD_ROOTS = [110, 92.5, 73.42, 82.41];

export function useAmbientAudio() {
  const [enabled, setEnabled] = useState(false);
  const ctxRef = useRef<AudioContext | null>(null);
  const masterRef = useRef<GainNode | null>(null);
  const chimeTimerRef = useRef<number | null>(null);
  const chordTimerRef = useRef<number | null>(null);
  const oscsRef = useRef<OscillatorNode[]>([]);
  const padGainRef = useRef<GainNode | null>(null);
  const currentRootIndex = useRef(0);

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
    const root = CHORD_ROOTS[0];
    const voices: Array<[OscillatorType, number, number]> = [
      ["sine", root, 1.0],
      ["sine", root * 1.5, 0.75], // fifth
      ["triangle", root * 2.0, 0.45], // octave
      ["sine", root * 2.5, 0.3], // third
    ];

    for (const [type, freq, vol] of voices) {
      const osc = ctx.createOscillator();
      osc.type = type;
      osc.frequency.value = freq;
      const g = ctx.createGain();
      g.gain.value = 0.85 * vol;
      osc.connect(g);
      g.connect(padGain);
      osc.start();
      oscsRef.current.push(osc);
    }

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
    setEnabled(true);
  }, [buildGraph, scheduleChimes]);

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
