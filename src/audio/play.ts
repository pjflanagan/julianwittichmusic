import * as Tone from "tone";


export function play() {
  const synth = new Tone.Synth().toDestination();
  const now = Tone.now();
  console.log('play');
  // trigger the attack immediately
  synth.triggerAttack("C4", now);
  // wait one second before triggering the release
  synth.triggerRelease(now + 1);
}