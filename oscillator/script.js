window.AudioContext = window.AudioContext || window.webkitAudioContext;

const audioCtx = new AudioContext();

const oscNode = new OscillatorNode(audioCtx, {
  /*
   * Several common waveforms are available such as "sine", "square" or "sawtooth".
   * For a full list see https://developer.mozilla.org/en-US/docs/Web/API/OscillatorNode/type.
   */
  type: "sine",
  /*
   * The frequency of the oscillator in hertz, 440 equals an "A4" on a piano.
   * See https://en.wikipedia.org/wiki/Piano_key_frequencies
   * for mapping between keys and frequencies.
   */
  frequency: 50,
});

const gainNode = new GainNode(audioCtx, {
  // The default value is `1`. We reduce the volume to half of that.
  gain: 0.2,
});

/*
 * A `PannerNode` applies a panning effect,
 * which can be used to change how the audio signal is distributed
 * between the stereo channels.
 */
const pannerNode = new PannerNode(audioCtx, {
  /*
   * The default is `0`.
   * `1` moves the audio signal to the right stereo channel.
   */
  positionX: 1,
});

/*
 * We route our audio from the oscillator through the effect node,
 * through the gain node, and from there to the output.
 */
oscNode.connect(pannerNode).connect(gainNode).connect(audioCtx.destination);

// Start playing sound. WARNING: can be loud!
oscNode.start();
audioCtx.resume();
// Stop sound after 3 seconds.
setTimeout(() => oscNode.stop(), 1000);
