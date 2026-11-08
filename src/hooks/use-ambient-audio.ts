"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const NOTES = [440, 493.88, 554.37, 659.25, 739.99, 880]; // A major pentatonic

/**
 * Synthesized ambient dreamscape: a warm breathing pad (root + fifth + octave)
 * with soft pentatonic chimes drifting in every few seconds. No audio files —
 * pure Web Audio, so it weighs nothing and loops forever.
 */
export function useAmbientAudio() {
  const [enabled, setEnabled] = useState(false);
  const ctxRef = useRef<AudioContext | null>(null);
  const masterRef = useRef<GainNode | null>(null);
  const chimeTimerRef = useRef<number | null>(null);
  const oscsRef = useRef<OscillatorNode[]>([]);

  const playChime = useCallback(() => {
    const ctx = ctxRef.current;
    const master = masterRef.current;
    if (!ctx || !master) return;
    const freq = NOTES[Math.floor(Math.random() * NOTES.length)];
    const now = ctx.currentTime;
    for (const detune of [0, 5]) {
      const osc = ctx.createOscillator();
      osc.type = "sine";
      osc.frequency.value = freq;
      osc.detune.value = detune;
      const g = ctx.createGain();
      g.gain.setValueAtTime(0.0001, now);
      g.gain.exponentialRampToValueAtTime(0.028, now + 0.05);
      g.gain.exponentialRampToValueAtTime(0.0001, now + 2.6);
      osc.connect(g);
      g.connect(master);
      osc.start(now);
      osc.stop(now + 2.8);
    }
  }, []);

  const scheduleChimes = useCallback(() => {
    if (chimeTimerRef.current) window.clearTimeout(chimeTimerRef.current);
    const tick = () => {
      playChime();
      chimeTimerRef.current = window.setTimeout(tick, 2400 + Math.random() * 3400);
    };
    chimeTimerRef.current = window.setTimeout(tick, 900);
  }, [playChime]);

  const buildGraph = useCallback(() => {
    const ctx = ctxRef.current;
    if (!ctx) return;
    const master = ctx.createGain();
    master.gain.value = 0;
    master.connect(ctx.destination);
    masterRef.current = master;

    const padGain = ctx.createGain();
    padGain.gain.value = 0.03;
    const lowpass = ctx.createBiquadFilter();
    lowpass.type = "lowpass";
    lowpass.frequency.value = 520;
    lowpass.Q.value = 0.5;
    padGain.connect(lowpass);
    lowpass.connect(master);

    const voices: Array<[OscillatorType, number, number]> = [
      ["sine", 110, 1],
      ["sine", 164.81, 0.7],
      ["triangle", 220, 0.45],
    ];
    for (const [type, freq, vol] of voices) {
      const osc = ctx.createOscillator();
      osc.type = type;
      osc.frequency.value = freq;
      const g = ctx.createGain();
      g.gain.value = 0.9 * vol;
      osc.connect(g);
      g.connect(padGain);
      osc.start();
      oscsRef.current.push(osc);
    }

    // slow breathing LFO on the pad volume
    const lfo = ctx.createOscillator();
    lfo.type = "sine";
    lfo.frequency.value = 0.07;
    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 0.012;
    lfo.connect(lfoGain);
    lfoGain.connect(padGain.gain);
    lfo.start();
    oscsRef.current.push(lfo);
  }, []);

  const enable = useCallback(() => {
    if (!ctxRef.current) {
      ctxRef.current = new AudioContext();
      buildGraph();
    }
    const ctx = ctxRef.current;
    const master = masterRef.current;
    if (!ctx || !master) return;
    void ctx.resume();
    master.gain.cancelScheduledValues(ctx.currentTime);
    master.gain.setTargetAtTime(0.85, ctx.currentTime, 0.6);
    scheduleChimes();
    setEnabled(true);
  }, [buildGraph, scheduleChimes]);

  const disable = useCallback(() => {
    const ctx = ctxRef.current;
    const master = masterRef.current;
    if (!ctx || !master) return;
    master.gain.cancelScheduledValues(ctx.currentTime);
    master.gain.setTargetAtTime(0.0001, ctx.currentTime, 0.25);
    if (chimeTimerRef.current) {
      window.clearTimeout(chimeTimerRef.current);
      chimeTimerRef.current = null;
    }
    setEnabled(false);
  }, []);

  const toggle = useCallback(() => {
    if (enabled) {
      disable();
    } else {
      enable();
    }
  }, [enabled, enable, disable]);

  useEffect(() => {
    return () => {
      if (chimeTimerRef.current) window.clearTimeout(chimeTimerRef.current);
      for (const osc of oscsRef.current) {
        try {
          osc.stop();
        } catch {
          /* already stopped */
        }
      }
      oscsRef.current = [];
      void ctxRef.current?.close().catch(() => undefined);
      ctxRef.current = null;
      masterRef.current = null;
    };
  }, []);

  return { enabled, toggle };
}
