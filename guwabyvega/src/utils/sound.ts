// Sound feedback utility for TV Remote navigation (Apple TV haptic sound style)

declare const global: any;

export const playFocusSound = () => {
  try {
    const globalObj = typeof global !== 'undefined' ? global : {};
    const win = globalObj.window || globalObj;

    if (win && (win.AudioContext || win.webkitAudioContext)) {
      const AudioCtx = win.AudioContext || win.webkitAudioContext;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      // Subtle Apple TV click pitch transition (800Hz down to 300Hz over 0.035s)
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.035);

      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.035);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.04);
    }
  } catch (e) {
    // Fallback gracefully if AudioContext is unsupported
  }
};
